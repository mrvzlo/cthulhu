<style lang="scss">
@import '@/assets/css/main.scss';
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <div class="d-flex justify-content-between container px-0 mb-1 text-center">
         <drop-button>
            <router-link :to="{ path: '/' }" :class="'m-auto btn btn-primary home-animation ' + (cursed ? 'cursed' : '')" v-on:click="curse">
               <i class="fas fa-home fa-fw position-absolute"></i>
               <i class="fas fa-eye fa-fw"></i>
            </router-link>
         </drop-button>
         <drop-button>
            <a class="m-auto btn btn-primary" data-bs-toggle="collapse" data-bs-target="#menu">
               <i class="fas fa-eye fa-fw"></i>
            </a>
         </drop-button>
      </div>
      <div class="flex-grow-1 text-center container px-0 mb-2">
         <router-view />
      </div>

      <div class="w-100 z-index-10k">
         <div class="position-relative wave overflow-hidden">
            <img src="~@/assets/images/wave.svg" alt="wave" class="left" />
            <img src="~@/assets/images/wave.svg" alt="wave" class="right" />
         </div>
         <div class="collapse bg-primary" id="menu">
            <div class="p-0 container">
               <router-link :to="{ path: '/' }" class="nav-link unsure">Домой</router-link>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import DropButton from './views/shared/drop-button.vue';

@Options({
   components: { DropButton },
})
export default class App extends Vue {
   cursed = false;

   curse(): void {
      this.cursed = !this.cursed && Math.random() < 1 / 6;
   }
}
</script>
