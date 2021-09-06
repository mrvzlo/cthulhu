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

   getNotRandom(): AbilityInterface[] {
      return this.getAll(this.notRandom);
   }

   getAll(filtered: AbilityInterface[] = list): AbilityInterface[] {
      return Object.assign({}, ...filtered.map((x: AbilityInterface) => ({ [x.id]: x })));
   }

   abilitiesCount(): number {
      return this.notRandom.length;
   }

   apply(toApply: number[]): void {
      toApply.filter((x) => x > 0).forEach((x) => this.choice.push(x));
   }

   remove(index: number): void {
      this.choice.splice(index, 1);
   }

   setRandomChoice(): void {
      this.choice = [];
      this.notRandom.forEach((x, i) => {
         this.choice[i] = this.randomValue(x.min);
      });
   }

   randomValue(min = 0): number {
      return 5 * (this.randomInt(6) + this.randomInt(6) + (min == 40 ? 6 : this.randomInt(6)));
   }

   randomInt(max: number): number {
      return Math.floor(Math.random() * max) + 1;
   }

   get notRandom(): AbilityInterface[] {
      return list.filter((x) => !x.pureRandom);
   }
}
