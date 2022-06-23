import { SkillType } from '@/data-layer/skills/skill-type.enum';
import Character from './character';
import { SkillProficiencyType } from './skill-proficiency-type.enum';

export default class SkillPointsManager {
   public available: number[] = [];
   public spent: number[] = [];

   constructor() {
      this.available[SkillProficiencyType.Hobby] = 0;
      this.available[SkillProficiencyType.Adept] = 3;
      this.available[SkillProficiencyType.Expert] = 2;
      this.reset();
   }

   left(type: SkillProficiencyType): number {
      return this.available[type] - this.spent[type];
   }

   addBonus(character: Character) {
      this.available[SkillProficiencyType.Hobby] = character.hobbies;

      const spentImportant = character.skills
         .filter((x) => x.type == SkillType.Important)
         .map((x) => x.value)
         .reduce((a, b) => a + b, 0);

      this.available[this.getBonusType(spentImportant)]++;
   }

   add = (type: SkillProficiencyType) => this.spent[type]++;
   remove = (type: SkillProficiencyType) => this.spent[type]--;

   canReset = () => Object.values(this.spent).filter((x) => x > 0).length > 0;
   isDone = () => Object.keys(this.available).filter((x) => this.left(+x) > 0).length === 0;

   reset() {
      this.spent[SkillProficiencyType.Hobby] = 0;
      this.spent[SkillProficiencyType.Adept] = 0;
      this.spent[SkillProficiencyType.Expert] = 0;
   }

   getBonusType(spentPoints: number): SkillProficiencyType {
      if (spentPoints > 40) return SkillProficiencyType.Hobby;
      if (spentPoints > 20) return SkillProficiencyType.Adept;
      return SkillProficiencyType.Expert;
   }
}
