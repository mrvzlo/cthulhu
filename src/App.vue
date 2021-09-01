<style lang="scss">
@import '@/assets/css/main.scss';
</style>

<template>
   <div class="d-flex flex-column vh-100 position-relative">
      <a class="btn nav-link btn-primary ms-auto m-1 py-1 px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu">
         <i class="fas fa-eye fa-fw"></i>
      </a>
      <div class="flex-grow-1 pt-2 text-center">
         <router-view />
      </div>
      <img src="~@/assets/images/wave.svg" alt="wave" class="wave" />
   </div>

   <div class="offcanvas offcanvas-bottom border-0 bg-transparent" id="menu">
      <img src="~@/assets/images/wave.svg" alt="wave" class="wave" />
      <div class="offcanvas-body py-1 px-0 bg-primary">
         <router-link to="/" class="nav-link" data-bs-dismiss="offcanvas"></router-link>
      </div>
   </div>
</template>
