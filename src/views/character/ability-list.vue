<template>
   <div class="row mt-3 mx-2 justify-content-center">
      <div class="col-lg col-4 mb-2 d-grid px-2 ability-box" v-for="ability in list" v-bind:key="ability">
         <div class="d-flex justify-content-between">
            <div class="fs-4 align-self-center lh-1">{{ ability.short }}</div>
            <button
               class="btn btn-primary btn-sm py-0 px-1 border-bottom-square"
               data-bs-toggle="popover"
               :data-bs-content="showDescription(ability)"
            >
               <i class="fas fa-info fa-fw"></i>
            </button>
         </div>
         <div :class="'d-flex three-level-check ' + (character.abilities[ability.id].value ? '' : 'empty')">
            <div class="col p-0">
               <input
                  type="number"
                  class="form-control h-100 fs-5 p-1"
                  v-model="character.abilities[ability.id].value"
                  :readonly="!manual"
                  @change="checkLimit(ability)"
               />
            </div>
            <div class="col-5 p-0" v-if="!ability.pureRandom">
               <input class="form-control form-control-small" readonly :value="div(ability.id, 2)" />
               <input class="form-control form-control-small" readonly :value="div(ability.id, 5)" />
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import AbilityInterface from '@/data-layer/abilities/ability.interface';
import BootstrapHelper from '@/helpers/bootstrap-helper';
import { Modal } from 'bootstrap';
import { Options, Vue } from 'vue-class-component';
import Character from './models/character';

@Options({
   props: { list: {} as AbilityInterface[], character: Character, manual: false },
   components: { Modal },
})
export default class AbilityList extends Vue {
   modalText = '';
   modalTitle = '';

   mounted() {
      (window as any).baba = () => console.log(this.$props);
      new BootstrapHelper().init();
   }

   div(ability: number, division: number): number {
      const result = (this.$props as any).character.abilities[ability].value / division;
      return Math.floor(result);
   }

   checkLimit(ability: AbilityInterface): void {
      const character = (this.$props as any).character;
      let value = character.abilities[ability.id].value;
      if (value < ability.min) value = ability.min;
      if (value > 90) value = 90;
      character.abilities[ability.id].value = value;
   }

   showDescription(ability: AbilityInterface): string {
      return `<b>${ability.name}</b><br>${ability.description}`;
   }
}
</script>
