import AbilityService from '../services/ability.service';
import AbilityInterface from '@/data-layer/abilities/ability.interface';
import Ability from './ability';
import { AbilitiesEnum } from '@/data-layer/abilities/abilities.enum';

export default class Character {
   abilities: Ability[] = [];
   abilityTypes = AbilitiesEnum;

   constructor() {
      const service = new AbilityService();
      const list = service.getAll();
      Object.values(list).forEach((x: AbilityInterface) => {
         this.abilities[x.id] = new Ability(x);
      });
   }

   get abilityPoints(): number {
      return 430 - this.abilities.map((x) => x.value).reduce((a, b) => a + +b);
   }

   get maxHealth(): number {
      return Math.floor((this.abilities[this.abilityTypes.Siz].value + this.abilities[this.abilityTypes.End].value) / 10);
   }

   get maxMana(): number {
      return Math.floor(this.abilities[this.abilityTypes.Pow].value / 5);
   }

   get build(): number {
      const sum = this.abilities[this.abilityTypes.Siz].value + this.abilities[this.abilityTypes.Str].value;
      return sum < 65 ? -2 : sum < 85 ? -1 : sum < 125 ? 0 : sum < 165 ? 1 : 2;
   }

   get speed(): number {
      let speed = 9;
      if (this.abilities[this.abilityTypes.Siz].value <= this.abilities[this.abilityTypes.Str].value) speed--;
      if (this.abilities[this.abilityTypes.Siz].value <= this.abilities[this.abilityTypes.Agi].value) speed--;
      return speed;
   }
}
