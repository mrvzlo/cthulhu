<template>
   <div>
      Теперь придумайте имя персонажа, его <a class="text-decoration-none" href="#/archetypes">историю</a>,
      <a class="text-decoration-none" href="#/alignment">принципы</a>, окружение, <a class="text-decoration-none" href="#/aging">жизненный путь</a> и
      снаряжение. А потом перенесите это на <a href="/character-sheet.pdf" class="text-decoration-none" target="_blank">лист</a>.
   </div>
   <div>
      <i class="fas fa-exclamation-triangle"></i>
      Сайт не сохраняет информацию о созданных персонажах
      <i class="fas fa-exclamation-triangle"></i>
   </div>
   <div class="row mt-5 mx-3">
      <div class="col-lg-4 col-12 text-start">
         <div class="d-flex mb-3">
            <span class="align-middle me-2 fs-5 flex-grow-1">Очки здоровья</span>
            <span class="me-1 my-auto badge fs-6 bg-dark w-35px">{{ character.maxHealth }} / {{ character.maxHealth }}</span>
         </div>
         <div class="d-flex mb-3">
            <span class="align-middle me-2 fs-5 flex-grow-1">Очки рассудка</span>
            <span class="me-1 my-auto badge fs-6 bg-dark w-35px"
               >{{ character.abilities[abilityTypes.Pow].value }} / {{ character.abilities[abilityTypes.Pow].value }}</span
            >
         </div>
         <div class="d-flex mb-3">
            <span class="align-middle me-2 fs-5 flex-grow-1">Очки магии</span>
            <span class="me-1 my-auto badge fs-6 bg-dark w-35px">{{ character.maxMana }} / {{ character.maxMana }}</span>
         </div>

         <div class="d-flex mb-3">
            <span class="align-middle me-2 fs-5 flex-grow-1">Скорость</span>
            <span class="me-1 my-auto badge fs-6 bg-dark w-35px">{{ character.speed }}</span>
         </div>
         <div class="d-flex mb-3">
            <span class="align-middle me-2 fs-5 flex-grow-1">Комплекция</span>
            <span class="me-1 my-auto badge fs-6 bg-dark w-35px">{{ character.build }}</span>
         </div>
         <div class="d-block" v-for="ability in abilities" v-bind:key="ability.id">
            <div class="d-inline-flex w-100 mb-3">
               <div class="me-auto my-auto fs-5 pe-2">{{ ability.name }}</div>
               <three-level-check :value="character.abilities[ability.id].value" />
            </div>
         </div>
      </div>

      <div class="col-lg-4 col-12">
         <div class="d-block" v-for="skill in getUncommonSkills()" v-bind:key="skill.id">
            <div class="d-inline-flex w-100 mb-1">
               <div class="me-auto my-auto fs-5 pe-2" v-if="skill.name.length > 0">{{ skill.name }}</div>
               <div v-else class="me-3 border-bottom border-dark flex-grow-1 mb-1"></div>
               <three-level-check :value="skill.value" />
            </div>
         </div>
         <template v-for="group in firstCol" v-bind:key="group">
            <div class="h5 my-3">{{ groups[group].name }}</div>
            <div class="d-block" v-for="skill in getSkills(group)" v-bind:key="skill.id">
               <div class="d-inline-flex w-100 mb-1">
                  <div class="me-auto my-auto fs-5 pe-2" v-if="skill.name.length > 0">{{ skill.name }}</div>
                  <div v-else class="me-3 border-bottom border-dark flex-grow-1 mb-1"></div>
                  <three-level-check :value="skill.value" />
               </div>
            </div>
         </template>
      </div>
      <div class="col-lg-4 col-12">
         <template v-for="group in secondCol" v-bind:key="group">
            <div class="h5 my-3">{{ groups[group].name }}</div>
            <div class="d-block" v-for="skill in getSkills(group)" v-bind:key="skill.id">
               <div class="d-inline-flex w-100 mb-1">
                  <div class="me-auto my-auto fs-5 pe-2" v-if="skill.name.length > 0">{{ skill.name }}</div>
                  <div v-else class="me-3 border-bottom border-dark flex-grow-1 mb-1"></div>
                  <three-level-check :value="skill.value" />
               </div>
            </div>
         </template>
      </div>
   </div>
</template>

<script lang="ts">
import { AbilitiesEnum } from '@/data-layer/abilities/abilities.enum';
import { SkillGroupType } from '@/data-layer/skills/skill-group-type.enum';
import { SkillType } from '@/data-layer/skills/skill-type.enum';
import { Options, prop, Vue } from 'vue-class-component';
import ThreeLevelCheck from '../shared/three-level-check.vue';
import Character from './models/character';
import AbilityService from './services/ability.service';
import SkillService from './services/skill.service';

class Props {
   character: Character = prop({ required: true });
}
@Options({ components: { ThreeLevelCheck } })
export default class BuildSummary extends Vue.with(Props) {
   abilities = new AbilityService().getAll();
   abilityTypes = AbilitiesEnum;
   groupTypes = SkillGroupType;
   groups = new SkillService().getGroups();
   firstCol = [SkillGroupType.Melee, SkillGroupType.Shooting, SkillGroupType.Craft, SkillGroupType.Sport];
   secondCol = [SkillGroupType.Science, SkillGroupType.Social, SkillGroupType.Search, SkillGroupType.Language];

   getUncommonSkills() {
      return Object.values(this.character.skills).filter((x) => x.type === SkillType.Important || x.type === SkillType.Unobtainable);
   }

   getSkills(group: number) {
      return Object.values(this.character.skills).filter((x) => x.group == group);
   }
}
</script>
