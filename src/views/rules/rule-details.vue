<template>
   <div class="h1">{{ rule.title }}</div>
   <div v-html="rule.content" class="mt-4 text-start px-2"></div>

   <div v-on:click="delayedLink(service.nextRoute(rule.id))" class="btn btn-outline-primary">
      <i class="fas fa-chevron-down mx-5 px-5"></i>
   </div>
</template>

<script lang="ts">
import RulesInterface from '@/data-layer/rules/rules.interface';
import { Options, Vue } from 'vue-class-component';
import RuleService from './services/rule.service';

@Options({
   components: {},
   computed: {
      rule: function (): RulesInterface {
         return this.service.getByRoute(this.$route.params.id);
      },
   },
})
export default class RuleDetails extends Vue {
   service = new RuleService();

   delayedLink(route: string): void {
      setTimeout(() => {
         this.$router.push({ path: `/rules/${route}` });
      }, 200);
   }
}
</script>
