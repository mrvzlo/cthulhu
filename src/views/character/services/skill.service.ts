import { SkillType } from '@/data-layer/skills/skill-type.enum';
import SkillInterface from '@/data-layer/skills/skill.interface';
import SKILLS from '@/data-layer/skills/skills.json';
import GROUPS from '@/data-layer/skills/skill-groups.json';
import SkillGroup from '../models/skill-group';
import SkillGroupInterface from '@/data-layer/skills/skill-group.interface';
import { SkillGroupType } from '@/data-layer/skills/skill-group-type.enum';

export default class SkillService {
   getById(id: number): SkillInterface {
      return this.getAll()[id];
   }

   getImportant = (): SkillInterface[] => this.getAll(SKILLS.filter((x) => x.type == SkillType.Important));

   getGroupped(): SkillGroup[] {
      const common = SKILLS.filter((x) => x.type === SkillType.Common || x.type == SkillType.Extra);
      const commonGroups = GROUPS.filter((x) => x.id !== SkillGroupType.Special);
      const result: SkillGroup[] = Object.assign({}, ...commonGroups.map((x: SkillGroupInterface) => ({ [x.id]: new SkillGroup(x) })));
      common.forEach((x) => result[x.group].skills.push(x));
      return result;
   }

   getAll(filtered: SkillInterface[] = SKILLS): SkillInterface[] {
      return Object.assign({}, ...filtered.map((x: SkillInterface) => ({ [x.id]: x })));
   }
}
