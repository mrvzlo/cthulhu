<template>
   <div class="text-center mt-2">
      <div class="fs-2 mb-5">Навыки</div>

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
         <div v-if="isDone">
            <button class="btn btn-success mt-3" v-on:click="done">
               <i class="fas fa-check px-4"></i>
            </button>
         </div>
      </div>

      <div :class="'mx-auto ' + (character.status === creationStep.CommonSkills ? '' : 'd-none')">
         <div class="mb-3">
            <div class="mb-2">2) Распределите очки навыков</div>
            <div class="d-inline-block text-start">
               <div class="d-inline-flex w-100">
                  <div class="me-auto">Э - экспертиза увеличивает параметр на 60 очков.</div>
                  <div class="badge bg-secondary border-dark border text-dark w-25px ms-2">{{ skillPoints.primary }}</div>
               </div>
               <br />
               <div class="d-inline-flex w-100 my-1">
                  <div class="me-auto">С - специализация увеличивает параметр на 40 очков.</div>
                  <div class="badge bg-secondary border-dark border text-dark w-25px ms-2">{{ skillPoints.secondary }}</div>
               </div>
               <br />
               <div class="d-inline-flex w-100">
                  <div class="me-auto">Х - хобби увеличивает параметр на 20 очков.</div>
                  <div class="badge bg-secondary border-dark border text-dark w-25px ms-2">{{ skillPoints.hobby }}</div>
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
                     <div class="ms-2 me-auto">{{ skill.name }}</div>
                     <div class="ms-3 badge bg-dark my-auto w-35px">{{ character.skills[skill.id].value }}</div>
                     <button class="ms-3 btn btn-outline-primary w-25px p-0">Э</button>
                     <button class="ms-1 btn btn-outline-primary w-25px p-0">С</button>
                     <button class="ms-1 btn btn-outline-primary w-25px p-0">Х</button>
                  </div>
                  <br />
               </template>
               <br />
            </template>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import BootstrapHelper from '@/helpers/bootstrap-helper';
import { Modal } from 'bootstrap';
import { prop, Options, Vue } from 'vue-class-component';
import Character from '../models/character';
import { CreationStep } from '../models/creation-step';
import SkillPoints from '../models/skill-points';
import SkillService from '../services/skill.service';
import Wealth from './wealth.vue';

class Props {
   character: Character = prop({ required: true });
}

@Options({
   components: { Modal, Wealth },
})
export default class Skills extends Vue.with(Props) {
   service = new SkillService();
   creationStep = CreationStep;
   isDone = false;
   skillPoints!: SkillPoints;

   created() {
      this.resetPoints();
   }

   mounted() {
      this.done();
      new BootstrapHelper().init();
   }

   done(): void {
      this.character.status++;
      if (this.character.status > this.creationStep.ImportantSkills) {
         this.skillPoints = new SkillPoints(this.character);
      }
   }

   resetPoints() {
      this.skillPoints = new SkillPoints(this.character);
   }
}
</script>
