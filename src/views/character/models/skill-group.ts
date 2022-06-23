import SkillGroupInterface from '@/data-layer/skills/skill-group.interface';
import SkillInterface from '@/data-layer/skills/skill.interface';

export default class SkillGroup {
   public id: number;
   public name: string;
   public skills: SkillInterface[] = [];

   public constructor(parent: SkillGroupInterface) {
      this.id = parent.id;
      this.name = parent.name;
   }
}
