<template>
   <div class="row mt-3 mx-0 justify-content-center">
      <div class="col-lg col-md-3 col-4 mb-2 d-grid" v-for="ability in list" v-bind:key="ability">
         <div class="d-flex justify-content-between">
            <div class="fs-4 align-self-center lh-1">{{ ability.short }}</div>
            <button
               class="btn btn-primary btn-sm py-0 px-1 border-bottom-square"
               data-bs-toggle="modal"
               data-bs-target="#abilityInfo"
               v-on:click="showDescription(ability)"
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
         <div :class="'d-flex three-level-check ' + (character.abilities[ability.id].value ? '' : 'empty')">
            <div class="col-7 p-0">
               <input
                  type="number"
                  class="form-control h-100 fs-5 p-1"
                  v-model="character.abilities[ability.id].value"
                  :readonly="!manual"
                  @change="checkLimit(ability)"
               />
            </div>
            <div class="col-5 p-0">
               <input class="form-control form-control-small" readonly :value="div(ability.id, 2)" />
               <input class="form-control form-control-small" readonly :value="div(ability.id, 5)" />
            </div>
         </div>
      </div>
   </div>

   <modal :modalTitle="modalTitle" :id="'abilityInfo'">
      <div v-html="modalText" class="py-2 px-3"></div>
   </modal>
</template>

<script lang="ts">
import AbilityInterface from '@/data-layer/abilities/ability.interface';
import { Options, Vue } from 'vue-class-component';
import Modal from '@/views/shared/modal.vue';
import Character from './models/character';

@Options({
   props: { list: {} as AbilityInterface[], character: Character, manual: false },
   components: { Modal },
})
export default class AbilityList extends Vue {
   character = new Character();
   modalText = '';
   modalTitle = '';

   div(ability: number, division: number): number {
      const result = this.character.abilities[ability].value / division;
      return Math.floor(result);
   }

   checkLimit(ability: AbilityInterface): void {
      let value = this.character.abilities[ability.id].value;
      if (value < ability.min) value = ability.min;
      if (value > 90) value = 90;
      this.character.abilities[ability.id].value = value;
   }

   showDescription(ability: AbilityInterface): void {
      this.modalTitle = ability.name;
      this.modalText = ability.description;
   }
}
</script>
