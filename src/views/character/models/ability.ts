import AbilityInterface from '@/data-layer/abilities/ability.interface';

export default class Ability {
   id: number;
   value = 0;

   constructor(parent: AbilityInterface) {
      this.id = parent.id;
   }
}
