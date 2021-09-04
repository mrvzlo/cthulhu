import AbilityInterface from '@/data-layer/abilities/ability.interface';
import list from '@/data-layer/abilities/abilities.json';

export default class AbilityService {
   choice: number[] = [];

   constructor() {
      this.setDefaultChoice();
   }

   setDefaultChoice(): void {
      this.choice = [80, 70, 60, 60, 50, 50, 50, 40];
   }

   getById(id: number): AbilityInterface {
      return this.getAll()[id];
   }

   getAll(): AbilityInterface[] {
      return Object.assign({}, ...list.map((x: AbilityInterface) => ({ [x.id]: x })));
   }

   abilitiesCount(): number {
      return Object.keys(this.getAll()).length;
   }

   apply(toApply: number[]): void {
      toApply.filter((x) => x > 0).forEach((x) => this.choice.push(x));
   }

   remove(index: number): void {
      this.choice.splice(index, 1);
   }

   setRandomChoice(): void {
      this.choice = [];
      list.forEach((x, i) => {
         this.choice[i] = this.randomValue(x.min) * 5;
      });
   }

   randomValue(min: number): number {
      return this.randomInt(6) + this.randomInt(6) + (min == 40 ? 6 : this.randomInt(6));
   }

   randomInt(max: number): number {
      return Math.floor(Math.random() * max) + 1;
   }
}
