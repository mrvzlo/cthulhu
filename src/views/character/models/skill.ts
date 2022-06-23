import { SkillType } from '@/data-layer/skills/skill-type.enum';
import SkillInterface from '@/data-layer/skills/skill.interface';

export default class Skill {
   id: number;
   value = 0;
   type: SkillType;
   name: string;

   constructor(parent: SkillInterface) {
      this.id = parent.id;
      this.value = parent.min;
      this.type = parent.type;
      this.name = parent.name;
   }
}
