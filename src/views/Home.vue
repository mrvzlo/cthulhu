<template>
   <div class="h1">Зов ктулху 7 издание</div>

   <div class="mt-4 text-center">
      <delayed-link :route="'character'" class="btn btn-primary btn-spiked mt-3">Создание персонажа </delayed-link>
   </div>

   <div class="position-absolute left-border-text start-0 op-01 h5">Позволь мне тебя напугать</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DelayedLink from './shared/delayed-link.vue';

@Options({
   components: { DelayedLink },
})
export default class Home extends Vue {}
</script>
