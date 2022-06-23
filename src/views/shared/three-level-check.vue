<template>
   <div class="d-flex three-level-check w-100px">
      <div class="col p-0 h-100">
         <input class="form-control h-100 fs-5 p-1" v-model="value" readonly />
      </div>
      <div class="col-5 p-0 d-flex flex-column">
         <input class="form-control form-control-small small" readonly :value="div(value, 2)" />
         <input class="form-control form-control-small small" readonly :value="div(value, 5)" />
      </div>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
   props: { value: 0 },
})
export default class ThreeLevelCheck extends Vue {
   div(value: number, division: number): number {
      const result = value / division;
      return Math.floor(result);
   }
}
</script>
