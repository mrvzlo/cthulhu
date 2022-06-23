<template>
   <div class="h1">Создание персонажа</div>
   <template v-if="character">
      <abilities :character="character" v-if="character.status === creationStep.Abilities" />
      <skills :character="character" v-if="character.status > creationStep.Abilities && character.status < creationStep.Done" />
      <build-summary :character="character" v-if="character.status === creationStep.Done" />
   </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Abilities from './ability-choice.vue';
import Character from './models/character';
import { CreationStep } from './models/creation-step';
import Skills from './skills/skill-choice.vue';
import BuildSummary from './summary.vue';

@Options({
   components: { Abilities, Skills, BuildSummary },
})
export default class CharacterInfo extends Vue {
   character = new Character();
   creationStep = CreationStep;

   created() {
      console.log(this.character.abilities);
      this.character.status = CreationStep.Done;
   }
}
</script>
