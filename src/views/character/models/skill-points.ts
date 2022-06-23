import { SkillType } from '@/data-layer/skills/skill-type.enum';
import Character from './character';

export default class SkillPoints {
   public primary = 2;
   public secondary = 3;
   public hobby = 0;

   constructor(character: Character) {
      this.hobby = character.hobbies;
      const spentImportant = character.skills
         .filter((x) => x.type == SkillType.Important)
         .map((x) => x.value)
         .reduce((a, b) => a + b, 0);
      if (spentImportant > 40) {
         this.hobby++;
         return;
      }
      if (spentImportant > 20) {
         this.secondary++;
         return;
      }
      this.primary++;
   }
}
