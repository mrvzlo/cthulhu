import { SkillGroupType } from '@/data-layer/skills/skill-group-type.enum';
import { SkillType } from '@/data-layer/skills/skill-type.enum';
import SkillInterface from '@/data-layer/skills/skill.interface';

export default class Skill {
   id: number;
   value = 0;
   type: SkillType;
   group: SkillGroupType;
   name: string;
   bonus = 0;

   constructor(parent: SkillInterface) {
      this.id = parent.id;
      this.value = parent.min;
      this.type = parent.type;
      this.name = parent.name;
      this.group = parent.group;
   }

   get total() {
      return this.value + this.bonus;
   }

   acceptBonus() {
      this.value -= -this.bonus;
      this.clearBonus();
   }

   clearBonus() {
      this.bonus = 0;
   }
}
