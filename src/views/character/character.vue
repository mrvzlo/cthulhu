<template>
   <div class="h1">Создание персонажа</div>
   <template v-if="character">
      <abilities :character="character" :saveService="saveService" v-if="character.status === creationStep.Abilities" />
      <skills
         :character="character"
         :saveService="saveService"
         v-if="character.status > creationStep.Abilities && character.status < creationStep.Done"
      />
      <build-summary :character="character" :saveService="saveService" v-if="character.status === creationStep.Done" />
   </template>
</template>

<script lang="ts">
import SaveService from '@/data-layer/saving/saving.service';
import { Options, Vue } from 'vue-class-component';
import Abilities from './ability-choice.vue';
import Character from './models/character';
import { CreationStep } from './models/creation-step';
import Skills from './skills/skill-choice.vue';
import BuildSummary from './summary.vue';

@Options({ components: { Abilities, Skills, BuildSummary } })
export default class CharacterInfo extends Vue {
   character = new Character();
   creationStep = CreationStep;
   saveService = new SaveService<Character>('character');

   created() {
      this.character = this.saveService.getData(new Character()).result;
   }

   clear() {
      this.saveService.deleteSave();
      this.character = new Character();
   }
}
</script>
