<template>
   <div v-on:click="delayedLink(route)">
      <div>
         <slot></slot>
      </div>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
   props: { route: '' },
})
export default class DelayedLink extends Vue {
   delayedLink(route: string): void {
      setTimeout(() => {
         this.$router.push({ path: `/${route}` });
      }, 200);
   }
}
</script>
