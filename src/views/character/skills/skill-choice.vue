<template>
   <div class="text-center mt-2">
      <div class="d-flex justify-content-between mt-2">
         <div class="w-50px"></div>
         <div class="fs-2 mb-5">Навыки</div>
         <div class="w-50px">
            <button class="btn btn-warning py-1" v-on:click="reset()" v-if="canReset">
               <i class="fas fa-sync fa-fw"></i>
            </button>
         </div>
      </div>

      <div class="col-lg-5 col-md-7 col-12 px-3 mx-auto" v-if="character.status === creationStep.ImportantSkills">
         <div class="mb-3">1) Выберите уровень вашего достатка</div>
         <div v-for="skill in service.getImportant()" v-bind:key="skill.id">
            <label for="range{{skill.id}}" class="form-label fs-4">
               {{ skill.name }} <span class="badge bg-dark ms-3"> {{ character.skills[skill.id].value }}</span>
            </label>
            <input
               type="range"
               class="form-range"
               id="range{{skill.id}}"
               min="10"
               max="60"
               step="5"
               v-model="character.skills[skill.id].value"
               @change="isDone = true"
            />
         </div>
         <wealth :character="character" />
         <button class="btn btn-success mt-3" v-if="isDone" v-on:click="done">
            <i class="fas fa-check px-4"></i>
         </button>
      </div>

      <div :class="'mx-auto ' + (character.status === creationStep.CommonSkills ? '' : 'd-none')">
         <div class="mb-3">
            <div class="mb-2">2) Распределите очки улучшений между навыками</div>
            <div class="d-inline-block text-start">
               <div class="d-inline-flex w-100">
                  <div class="me-auto">
                     Э - экспертиза увеличивает параметр на <b>{{ prof.Expert }}</b> очков.
                  </div>
                  <div class="badge bg-dark w-25px ms-2 px-0">{{ skillPointsManager.left(prof.Expert) }}</div>
               </div>
               <br />
               <div class="d-inline-flex w-100 my-1">
                  <div class="me-auto">
                     С - специализация увеличивает параметр на <b>{{ prof.Adept }}</b> очков.
                  </div>
                  <div class="badge bg-dark w-25px ms-2 px-0">{{ skillPointsManager.left(prof.Adept) }}</div>
               </div>
               <br />
               <div class="d-inline-flex w-100">
                  <div class="me-auto">
                     Х - хобби увеличивает параметр на <b>{{ prof.Hobby }}</b> очков.
                  </div>
                  <div class="badge bg-dark w-25px ms-2 px-0">{{ skillPointsManager.left(prof.Hobby) }}</div>
               </div>
            </div>
         </div>
         <div class="d-inline-block">
            <template v-for="group in service.getGroupped()" v-bind:key="group.id">
               <div class="h5 mb-2">{{ group.name }}</div>
               <template v-for="skill in group.skills" v-bind:key="skill.id">
                  <div class="d-inline-flex w-100 p-1">
                     <button class="btn btn-primary btn-sm py-0 px-1 my-auto" data-bs-toggle="popover" :data-bs-content="skill.description">
                        <i class="fas fa-info fa-fw"></i>
                     </button>
                     <div class="ms-2 me-auto">
                        <span v-if="skill.type !== skillType.Extra">{{ skill.name }}</span>
                        <input class="form-control py-0 px-1 form-control-left" v-else v-model="character.skills[skill.id].name" />
                     </div>
                     <div class="ms-3 badge bg-dark my-auto w-35px">{{ character.skills[skill.id].total }}</div>
                     <div class="btn-group ms-3">
                        <button
                           v-for="level in proficiencies()"
                           v-bind:key="level"
                           :class="'btn btn-outline-primary w-25px p-0 ' + (character.skills[skill.id].bonus == level ? 'active' : '')"
                           v-on:click="mark(skill.id, level)"
                           :disabled="character.skills[skill.id].bonus != level && skillPointsManager.left(level) === 0"
                        >
                           {{ abbreviations[level] }}
                        </button>
                     </div>
                  </div>
                  <br />
               </template>
               <br />
            </template>
         </div>
         <br />
         <button class="btn btn-success mt-3" v-if="isDone" v-on:click="done">
            <i class="fas fa-check px-4"></i>
         </button>
      </div>
   </div>
</template>

<script lang="ts">
import SaveService from '@/data-layer/saving/saving.service';
import { SkillType } from '@/data-layer/skills/skill-type.enum';
import BootstrapHelper from '@/helpers/bootstrap-helper';
import { Modal } from 'bootstrap';
import { prop, Options, Vue } from 'vue-class-component';
import Character from '../models/character';
import { CreationStep } from '../models/creation-step';
import SkillPointsManager from '../models/skill-points-manager';
import { SkillProficiencyType } from '../models/skill-proficiency-type.enum';
import SkillService from '../services/skill.service';
import Wealth from './wealth.vue';

class Props {
   character: Character = prop({ required: true });
   saveService: SaveService<Character> = prop({ required: true });
}

@Options({
   components: { Modal, Wealth },
})
export default class Skills extends Vue.with(Props) {
   service = new SkillService();
   creationStep = CreationStep;
   prof = SkillProficiencyType;
   skillType = SkillType;
   isDone = false;
   skillPointsManager = new SkillPointsManager();
   canReset = false;
   abbreviations: string[] = [];

   created() {
      this.abbreviations[SkillProficiencyType.Hobby] = 'Х';
      this.abbreviations[SkillProficiencyType.Adept] = 'С';
      this.abbreviations[SkillProficiencyType.Expert] = 'Э';
   }

   mounted() {
      new BootstrapHelper().init();
      if (this.character.status === CreationStep.CommonSkills) {
         this.skillPointsManager.addBonus(this.character);
      }
   }

   done(): void {
      this.character.status++;
      if (this.character.status < CreationStep.Done) {
         this.skillPointsManager.addBonus(this.character);
      } else {
         this.character.applyBonuses();
      }
      this.isDone = false;
      this.saveService.setData(this.character);
   }

   mark(id: number, type: SkillProficiencyType) {
      const existed = this.character.skills[id].bonus;
      const sameAsExisted = existed == type;
      if (existed > 0) this.skillPointsManager.remove(existed);
      if (!sameAsExisted) this.skillPointsManager.add(type);
      this.character.skills[id].bonus = sameAsExisted ? 0 : +type;
      this.canReset = this.skillPointsManager.canReset();
      this.isDone = this.skillPointsManager.isDone();
   }

   proficiencies() {
      return Object.keys(this.prof)
         .filter((x) => !isNaN(+x))
         .sort((a, b) => +b - +a);
   }

   reset() {
      this.character.skills.forEach((x) => x.clearBonus());
      this.skillPointsManager.reset();
   }
}
</script>
