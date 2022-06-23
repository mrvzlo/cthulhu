<template>
   <div class="h1">Архетипы</div>
   <i class="px-3 text-muted text-center">
      Одно из самых захватывающих зрелищ на свете — смотреть, как работает Мастер, и не суть важно, чем именно он занимается. Пишет картину, рубит
      мясо, чистит ботинки — не имеет значения. Когда человек выполняет дело, ради которого родился на свет, он великолепен.
   </i>
   <div class="text-start px-3">
      <div class="py-3">
         Каждому персонажу необходимо выбрать свой вид деятельность, способ заработка и связи. Нижеприведённые примеры могут послужить в качестве
         примера, но не стоит ограничиваться только ими.
      </div>
      <div class="row g-3">
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Антиквар</div>
               <div class="card-body">
                  <b>Навыки:</b> история, оценка, работа с документами, убеждение, язык (любой), ремесло (любое)
                  <br />
                  <b>Снаряжение:</b> Пистолет, патроны, сумка с порохом, старый медальон
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Доктор</div>
               <div class="card-body">
                  <b>Навыки:</b> внимание, медицина, первая помощь, психология, наука (биология), язык (латынь)
                  <br />
                  <b>Снаряжение:</b> нож, блокнот, карандаши, чернила, аптечка, сумка с исследовательским набором
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Инженер</div>
               <div class="card-body">
                  <b>Навыки:</b> вождение, ремонт, внимание, слух, ближний бой, взлом
                  <br />
                  <b>Снаряжение:</b> швейцарский нож, сумка, отвёртка, заколки, книга
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Полицейский</div>
               <div class="card-body">
                  <b>Навыки:</b> вождение, внимание, винтовки, запугивание, закон, атлетика
                  <br />
                  <b>Снаряжение:</b> ружьё, документы, значок, рация
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Художник</div>
               <div class="card-body">
                  <b>Навыки:</b> искусство (любое), оккультизм, история, красноречие, язык (любой), работа с документами
                  <br />
                  <b>Снаряжение:</b> книга, чернила и перо, карандаши, тубус с бумагами
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Фермер</div>
               <div class="card-body">
                  <b>Навыки:</b> выживание, ремесло (фермерство), красноречие, ремонт, вождение, внимание
                  <br />
                  <b>Снаряжение:</b> верёвка, топор, рюкзак, лампа
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Archetypes extends Vue {}
</script>
