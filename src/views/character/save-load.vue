<template>
   <div class="h1">Сохранения</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Character from './models/character';
import { CreationSteps } from './models/creation-steps';

@Options({})
export default class SaveLoad extends Vue {}
</script>
