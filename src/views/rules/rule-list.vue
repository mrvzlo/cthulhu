<template>
   <div class="h1">Основные правила</div>
   <div class="mt-4 text-center">
      <template v-for="rule in service.getAll()" v-bind:key="rule">
         <div v-on:click="delayedLink(rule.route)" class="btn btn-primary btn-spiked mt-3">
            <div>{{ rule.title }}</div>
         </div>
         <br />
      </template>
   </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import RuleService from './services/rule.service';

export default class RuleList extends Vue {
   service = new RuleService();

   delayedLink(route: string): void {
      setTimeout(() => this.$router.push({ path: `/rules/${route}` }), 200);
   }
}
</script>
