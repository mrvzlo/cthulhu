<template>
   <div class="h1">Создание персонажа</div>
   <template v-if="character">
      <ability-choice :character="character" v-if="character.status === creationSteps.Abilities" />
      <skill-choice :character="character" v-if="character.status === creationSteps.Skills" />
   </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Character from './models/character';
import AbilityChoice from './ability-choice.vue';
import SkillChoice from './skill-choice.vue';
import { CreationSteps } from './models/creation-steps';

@Options({
   components: { AbilityChoice, SkillChoice },
})
export default class CharacterInfo extends Vue {
   character = new Character();
   creationSteps = CreationSteps;
}
</script>
