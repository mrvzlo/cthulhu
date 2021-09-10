<template>
   <div class="h1">Зов ктулху 7 издание</div>
   <div class="fs-2 mt-2">Сборник правил</div>

   <div class="mt-4 text-center">
      <div v-on:click="delayedLink('rules')" class="btn btn-primary btn-spiked mt-3">
         <div>Основные правила</div>
      </div>
      <br />
      <div v-on:click="delayedLink('character')" class="btn btn-primary btn-spiked mt-3">
         <div>Создание персонажа</div>
      </div>
   </div>

   <div class="position-absolute left-border-text start-0 op-01 h5">Позволь мне тебя напугать</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Home extends Vue {
   delayedLink(name: string): void {
      setTimeout(() => this.$router.push({ name: name }), 200);
   }
}
</script>
