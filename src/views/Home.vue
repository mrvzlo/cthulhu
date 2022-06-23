<template>
   <div class="h1">Зов ктулху</div>

   <div class="mt-4 text-center">
      <delayed-link :route="'concept'" class="btn btn-primary btn-spiked mt-3">Концепт игры</delayed-link>
      <br />
      <delayed-link :route="'progress'" class="btn btn-primary btn-spiked mt-3">Развитие персонажа</delayed-link>
      <br />
      <delayed-link :route="'sanity'" class="btn btn-primary btn-spiked mt-3">Психика</delayed-link>
      <br />
      <delayed-link :route="'archetypes'" class="btn btn-primary btn-spiked mt-3">Архетипы</delayed-link>
      <br />
      <delayed-link :route="'character'" class="btn btn-primary btn-spiked mt-3 shadow-xl">Создание персонажа</delayed-link>
      <br />
      <delayed-link :route="'aging'" class="btn btn-primary btn-spiked mt-3">Старение</delayed-link>
      <br />
      <delayed-link :route="'alignment'" class="btn btn-primary btn-spiked mt-3">Мировоззрение</delayed-link>
      <br />
      <delayed-link :route="'fight'" class="btn btn-primary btn-spiked mt-3">Ведение боя</delayed-link>
      <br />
      <delayed-link class="btn btn-primary btn-spiked mt-3">
         <a href="/character-sheet.pdf" class="text-white text-decoration-none" target="_blank">Лист персонажа</a>
      </delayed-link>
   </div>
   <div class="small text-start px-1 mt-auto mt-5 pt-5">
      This website uses trademarks and/or copyrights owned by Chaosium Inc/Moon Design Publications LLC, which are used under Chaosium Inc’s Fan
      Material Policy. We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or
      specifically approved by Chaosium Inc. For more information about Chaosium Inc’s products, please visit www.chaosium.com.
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DelayedLink from './shared/delayed-link.vue';

@Options({
   components: { DelayedLink },
})
export default class Home extends Vue {}
</script>
