import { AbilitiesEnum } from '@/data-layer/abilities/abilities.enum';
import AbilityInterface from '@/data-layer/abilities/ability.interface';
import SkillInterface from '@/data-layer/skills/skill.interface';
import AbilityService from '../services/ability.service';
import SkillService from '../services/skill.service';
import Ability from './ability';
import { CreationStep } from './creation-step';
import Skill from './skill';

export default class Character {
   abilities: Ability[] = [];
   skills: Skill[] = [];
   abilityTypes = AbilitiesEnum;
   status = CreationStep.Abilities;
   private readonly abilitiesSum = 430;

   constructor() {
      const abilities = new AbilityService().getAll();
      Object.values(abilities).forEach((x: AbilityInterface) => {
         this.abilities[x.id] = new Ability(x);
      });
      const skills = new SkillService().getAll();
      Object.values(skills).forEach((x: SkillInterface) => {
         this.skills[x.id] = new Skill(x);
      });
   }

   updateDerivatives() {
      const skills = new SkillService().getAll();
      Object.values(skills).forEach((x: SkillInterface) => {
         if (x.fromAbility === 0) return;
         this.skills[x.id].value = this.abilities[x.fromAbility].value * x.abilityPart;
      });
   }

   applyBonuses = () => {
      Object.values(this.skills).forEach((x) => x.acceptBonus());
   };

   get abilityPoints(): number {
      return (
         this.abilitiesSum -
         this.abilities
            .filter((x) => x.id !== this.abilityTypes.Lck)
            .map((x) => x.value)
            .reduce((a, b) => a + +b)
      );
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

   get hobbies(): number {
      return Math.max(0, Math.round(this.abilities[this.abilityTypes.Int].value / 10 - 1));
   }
}
