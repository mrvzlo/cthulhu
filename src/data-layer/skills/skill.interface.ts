import { SkillGroupType } from './skill-group-type.enum';
import { SkillType } from './skill-type.enum';

export default interface SkillInterface {
   id: number;
   fromAbility: number;
   abilityPart: number;
   description: string;
   name: string;
   min: number;
   group: SkillGroupType;
   type: SkillType;
}
