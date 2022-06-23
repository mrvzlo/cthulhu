<template>
   <table class="table table-bordered text-start border-dark border-start border-end">
      <tr>
         <th class="col-6">Статус</th>
         <td class="col-4">{{ wealthTypes[getWealth()] }}</td>
      </tr>
      <tr>
         <th>Зарплата</th>
         <td>{{ getCach() }}$</td>
      </tr>
      <tr>
         <th>Сбережения</th>
         <td>{{ getAssets() }}$</td>
      </tr>
      <tr>
         <th>Ежедневные траты</th>
         <td>{{ getSpending() }}$</td>
      </tr>
      <tr>
         <th>Бонусный навык</th>
         <td>{{ getBonus() }}</td>
      </tr>
   </table>
</template>

<script lang="ts">
import { SkillEnum } from '@/data-layer/skills/skill.enum';
import { prop, Vue } from 'vue-class-component';
import Character from '../models/character';

class Props {
   character: Character = prop({ required: true });
}

export default class Wealth extends Vue.with(Props) {
   wealthTypes = ['Бедный', 'Средний класс', 'В достатке'];

   getBonus() {
      const wealth = this.getWealth();
      return wealth == 0 ? '+1 главный' : wealth == 1 ? '+1 второстепенный' : '+1 хобби';
   }

   getCach() {
      const value = this.character.skills[SkillEnum.Wealth].value;
      const wealth = this.getWealth();
      return wealth == 0 ? value / 2 : wealth == 1 ? value * 2 : value * 3;
   }

   getAssets() {
      const value = this.character.skills[SkillEnum.Wealth].value;
      const wealth = this.getWealth();
      return wealth == 0 ? value * 5 : wealth == 1 ? value * 50 : value * 150;
   }

   getSpending() {
      const wealth = this.getWealth();
      return wealth == 0 ? 2 : wealth == 1 ? 10 : 25;
   }

   getWealth(): number {
      const value = this.character.skills[SkillEnum.Wealth].value;
      return value <= 20 ? 0 : value <= 40 ? 1 : 2;
   }
}
</script>
