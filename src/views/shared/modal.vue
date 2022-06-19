<template>
   <div class="modal" :id="id">
      <div :class="'modal-dialog modal-dialog-centered ' + specificClass">
         <div class="modal-content">
            <div class="modal-header text-center py-2">
               <h5 class="modal-title">{{ modalTitle }}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-start p-0">
               <slot></slot>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
   props: { modalTitle: '', modalText: '', id: '', specificClass: '' },
})
export default class Modal extends Vue {}
</script>
