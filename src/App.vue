<style lang="scss">
@import '@/assets/css/main.scss';
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <a class="btn nav-link btn-primary ms-auto m-1 py-1 px-2" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
         <i class="fas fa-eye fa-fw"></i>
      </a>
      <div class="flex-grow-1 text-center container px-0 mb-50px">
         <router-view />
      </div>
   </div>

   <div class="position-absolute bottom-0 w-100">
      <div class="position-relative wave overflow-hidden">
         <img src="~@/assets/images/wave.svg" alt="wave" class="left" />
         <img src="~@/assets/images/wave.svg" alt="wave" class="right" />
      </div>
      <div class="collapse bg-primary" id="menu">
         <div class="p-0 container">
            <router-link :to="{ name: 'home' }" class="nav-link unsure">Домой</router-link>
         </div>
      </div>
   </div>
</template>
