<template>
   <div class="d-flex justify-content-between mt-2">
      <div class="w-50px"></div>
      <div class="fs-2">Набор атрибутов</div>
      <div class="w-50px">
         <button class="btn btn-warning py-1" v-on:click="reset()" v-if="!manual && choice.length !== service.abilitiesCount()">
            <i class="fas fa-sync fa-fw"></i>
         </button>
      </div>
   </div>

   <div class="btn-group px-3 mt-1">
      <button :class="'btn w-100px px-1 btn-sm ' + (tab == 0 ? 'btn-primary' : 'btn-outline-primary')" v-on:click="setDefaultChoice()">
         Стандартный
      </button>
      <button :class="'btn w-100px px-1 btn-sm ' + (tab == 1 ? 'btn-primary' : 'btn-outline-primary')" v-on:click="setRandomChoice()">
         Случайный
      </button>
      <button :class="'btn w-100px px-1 btn-sm ' + (tab == 2 ? 'btn-primary' : 'btn-outline-primary')" v-on:click="setManualChoice()">Ручной</button>
   </div>

   <ability-list :list="service.getAll()" :character="character" :manual="manual" />

   <div class="row my-1 mx-0 justify-content-center" v-if="!manual && choice.length">
      <div class="col-12" v-if="choice.length">Распределите очки для каждого атрибута</div>
      <div class="col d-grid my-1 flex-grow-0" v-for="index in choice.length" v-bind:key="index">
         <a class="btn btn-primary w-50px" data-bs-toggle="modal" data-bs-target="#abilityPick" v-on:click="picked = index - 1">
            {{ choice[index - 1] }}
         </a>
      </div>
   </div>

   <div v-if="manual" class="text-center">
      <div v-if="character.abilityPoints > 0">{{ character.abilityPoints }} свободных очков</div>
      <div v-if="character.abilityPoints < 0">Перебор {{ -character.abilityPoints }} очков</div>
   </div>

   <div class="text-center mt-2">
      <div class="text-start d-inline-block">
         <div class="d-inline">
            <span class="ms-3 me-1 badge bg-dark w-35px">{{ character.maxHealth }}</span>
            <span class="align-middle">Очки здоровья</span>
         </div>
         <br />
         <div class="d-inline">
            <span class="ms-3 me-1 badge bg-dark w-35px">{{ character.abilities[abilityTypes.Pow].value }}</span>
            <span class="align-middle">Очки рассудка</span>
         </div>
         <br />
         <div class="d-inline">
            <span class="ms-3 me-1 badge bg-dark w-35px">{{ character.maxMana }}</span>
            <span class="align-middle">Очки магии</span>
         </div>
      </div>
      <div class="text-start d-inline-block">
         <div class="d-inline">
            <span class="ms-3 me-1 badge bg-dark w-35px">{{ character.speed }}</span>
            <span class="align-middle">Скорость</span>
         </div>
         <br />
         <div class="d-inline">
            <span class="ms-3 me-1 badge bg-dark w-35px">{{ Math.floor(character.abilities[abilityTypes.Agi].value / 2) }}</span>
            <span class="align-middle">Уклонение</span>
         </div>
         <br />
         <div class="d-inline">
            <span class="ms-3 me-1 badge bg-dark w-35px">{{ character.build }}</span>
            <span class="align-middle">Комплекция</span>
         </div>
      </div>
   </div>

   <div v-if="isDone">
      <button class="btn btn-success mt-3" v-on:click="done">
         <i class="fas fa-check px-4"></i>
      </button>
   </div>

   <modal :modalTitle="'Выберите атрибут'" :id="'abilityPick'" :specificClass="'modal-sm'">
      <div class="py-2">
         <div v-for="ability in service.getNotRandom()" v-bind:key="ability">
            <div v-if="character.abilities[ability.id].value === 0" class="dropdown-item px-3" data-bs-dismiss="modal" v-on:click="apply(ability.id)">
               {{ ability.name }}
            </div>
         </div>
      </div>
   </modal>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import AbilityService from './services/ability.service';
import Character from './models/character';
import Modal from '@/views/shared/modal.vue';
import AbilityList from './ability-list.vue';
import { AbilitiesEnum } from '@/data-layer/abilities/abilities.enum';
import { CreationSteps } from './models/creation-steps';

class Props {
   character: Character = prop({ required: true });
}

@Options({
   components: { Modal, AbilityList },
   computed: {
      choice: function (): number[] {
         return this.service.choice;
      },
      isDone: function (): boolean {
         return (this.manual && this.character.abilityPoints == 0) || (!this.manual && this.choice.length === 0);
      },
   },
})
export default class Abilities extends Vue.with(Props) {
   service = new AbilityService();
   abilityTypes = AbilitiesEnum;
   picked = -1;
   tab = 0;

   get manual(): boolean {
      return this.tab === 2;
   }

   created(): void {
      this.setDefaultChoice();
   }

   apply(ability: number): void {
      if (this.picked < 0) return;
      this.$props.character.abilities[ability].value = this.service.choice[this.picked];
      this.service.remove(this.picked);
      this.picked = -1;
   }

   setManualChoice(): void {
      this.tab = 2;
      this.character.abilities.forEach((x) => (x.value = this.service.getById(x.id).min));
   }

   setDefaultChoice(): void {
      this.tab = 0;
      this.reset();
      this.service.setDefaultChoice();
   }

   setRandomChoice(): void {
      this.tab = 1;
      this.reset();
      this.service.setRandomChoice();
   }

   reset(): void {
      this.service.apply(this.character.abilities.map((x) => x.value));
      this.character.abilities.forEach((x) => (x.value = 0));
   }

   done(): void {
      if (!this.manual) this.character.abilities[this.abilityTypes.Lck].value = this.service.randomValue();
      this.character.status++;
   }
}
</script>
