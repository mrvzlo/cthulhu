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

   <div class="btn-group px-3 mt-1 d-inline">
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

   <div class="text-start d-flex justify-content-center mt-2 flex-wrap">
      <div class="px-3 w-250px">
         <div class="d-flex mb-1">
            <span class="me-1 my-auto badge bg-dark w-35px">{{ character.maxHealth }}</span>
            <span class="align-middle me-2 flex-grow-1">Очки здоровья</span>
            <button
               class="btn btn-primary btn-sm py-0 px-1"
               data-bs-toggle="popover"
               data-bs-content="Обозначение жизненных показателей персонажа. Потеря очков приводит к увечьям и даже к смерти."
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
         <div class="d-flex mb-1">
            <span class="me-1 my-auto badge bg-dark w-35px">{{ character.abilities[abilityTypes.Pow].value }}</span>
            <span class="align-middle me-2 flex-grow-1">Очки рассудка</span>
            <button
               class="btn btn-primary btn-sm py-0 px-1"
               data-bs-toggle="popover"
               data-bs-content="Общий уровень самообладания и сознательности. Потеря очков приводит к психическим травмам."
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
         <div class="d-flex mb-1">
            <span class="me-1 my-auto badge bg-dark w-35px">{{ character.maxMana }}</span>
            <span class="align-middle me-2 flex-grow-1">Очки магии</span>
            <button class="btn btn-primary btn-sm py-0 px-1" data-bs-toggle="popover" data-bs-content="Очки позволяющие сотворять заклинания">
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
      </div>
      <div class="px-3 w-250px">
         <div class="d-flex mb-1">
            <span class="me-1 my-auto badge bg-dark w-35px">{{ character.speed }}</span>
            <span class="align-middle me-2 flex-grow-1">Скорость</span>
            <button
               class="btn btn-primary btn-sm py-0 px-1"
               data-bs-toggle="popover"
               data-bs-content="Расстояние в футах, которое персонаж может пройти за игровой раунд."
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
         <div class="d-flex mb-1">
            <span class="me-1 my-auto badge bg-dark w-35px">{{ character.build }}</span>
            <span class="align-middle me-2 flex-grow-1">Комплекция</span>
            <button
               class="btn btn-primary btn-sm py-0 px-1"
               data-bs-toggle="popover"
               data-bs-content="Общий объём мышечной массы, влияющий на бонус к урону в ближнем бою."
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
         <div class="d-flex mb-1">
            <span class="me-1 my-auto badge bg-dark w-35px">{{ character.hobbies }}</span>
            <span class="align-middle me-2 flex-grow-1">Хобби</span>
            <button
               class="btn btn-primary btn-sm py-0 px-1"
               data-bs-toggle="popover"
               data-bs-content="Количество навыков, которые можно изучить в качестве хобби."
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
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
import { AbilitiesEnum } from '@/data-layer/abilities/abilities.enum';
import SaveService from '@/data-layer/saving/saving.service';
import BootstrapHelper from '@/helpers/bootstrap-helper';
import { Options, Vue, prop } from 'vue-class-component';
import Modal from '../shared/modal.vue';
import AbilityList from './ability-list.vue';
import Character from './models/character';
import AbilityService from './services/ability.service';

class Props {
   character: Character = prop({ required: true });
   saveService: SaveService<Character> = prop({ required: true });
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

   mounted() {
      new BootstrapHelper().init();
   }

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
      const wait = this.manual ? 1 : 500;
      if (!this.manual) this.setLuck();
      this.updateDerivatives();
      setTimeout(() => {
         this.character.status++;
         this.saveService.setData(this.character);
      }, wait);
   }

   updateDerivatives() {
      this.character.updateDerivatives();
   }

   setLuck() {
      this.character.abilities[this.abilityTypes.Lck].value = this.service.randomValue();
   }
}
</script>
