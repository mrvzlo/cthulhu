<style lang="scss">
@import '@/assets/css/main.scss';
</style>

<template>
   <div class="min-vh-100 position-relative d-flex flex-column">
      <div class="position-fixed left-border-text start-0 top-50 op-1 h5 translate-middle-y">Позволь мне тебя напугать</div>
      <div class="d-flex z-index-10k justify-content-between container px-0 text-center position-fixed start-50 translate-middle-x" id="header">
         <drop-button>
            <router-link :to="{ path: '/' }" :class="'m-auto btn btn-primary home-animation ' + (cursed ? 'cursed' : '')">
               <i class="fas fa-home fa-fw position-absolute"></i>
               <i class="fas fa-eye fa-fw"></i>
            </router-link>
         </drop-button>
         <drop-button>
            <a class="m-auto btn btn-primary" v-on:click="openWave = !openWave">
               <i class="fas fa-eye fa-fw"></i>
            </a>
         </drop-button>
      </div>

      <div
         class="flex-grow-1 text-center container px-0 py-2 d-flex flex-column"
         id="content"
         :style="'margin-top:' + headerHeight + 'px;margin-bottom:' + footerHeight + 'px'"
      >
         <router-view />
      </div>

      <div class="w-100 z-index-10k position-fixed bottom-0" id="footer">
         <div class="position-relative wave overflow-hidden">
            <img src="~@/assets/images/wave.svg" alt="wave" class="left" />
            <img src="~@/assets/images/wave.svg" alt="wave" class="right" />
         </div>
         <div :class="'bg-primary d-flex ' + (openWave ? 'show' : 'fall') + (cached ? '' : ' first-load')" id="menu">
            <div class="container my-auto d-flex text-center" v-on:click="openWave = !openWave">
               <div></div>
               <a class="unsure text-secondary me-lg-5 me-3" href="https://instagram.com/andrejevve">Instagram</a>
               <a class="unsure text-secondary me-lg-5 me-3" href="https://t.me/andrejevve">Telegram</a>
               <div class="ms-auto text-end text-secondary">made by AndrejevVE</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import SettingsService from './data-layer/saving/settings.service';
import DropButton from './views/shared/drop-button.vue';

@Options({
   components: { DropButton },
})
export default class App extends Vue {
   cursed = false;
   openWave = false;
   headerHeight = 0;
   footerHeight = 0;
   cached = true;
   settings = new SettingsService();

   created() {
      this.cached = !!this.settings.getCached();
      setInterval(() => (this.cursed = !this.cursed && Math.random() < 1 / 4), 3000);
   }

   mounted() {
      if (!this.cached)
         setTimeout(() => {
            this.cached = true;
            this.settings.setCached(new Date().toString());
         }, 1000);

      new ResizeObserver(() => this.resizeContent()).observe(document.getElementById('header')!);
      new ResizeObserver(() => this.resizeContent()).observe(document.getElementById('footer')!);
   }

   resizeContent() {
      this.headerHeight = document.getElementById('header')?.clientHeight ?? 0;
      this.footerHeight = document.getElementById('footer')?.clientHeight ?? 0;
   }
}
</script>
