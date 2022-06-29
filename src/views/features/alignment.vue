<template>
   <div class="h1">Мировоззрение</div>
   <div class="text-start px-3">
      <div class="my-3">
         У каждого есть своя идеология, которая помогает в тяжёлые моменты и даёт смысл двигаться дальше. При создании персонажа выберите один из
         вариантов. Будьте внимательны, его нельзя будет поменять так просто.
      </div>
      <div class="row g-3">
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Рационализм</div>
               <div class="card-body">
                  <b>Описание</b>: персонаж стремится объяснить любые сверхъестественные явления научными теориями <br />
                  <b>Требование</b>: образование 60 или больше <br />
                  <b>Преимущество</b>: рассудок восстанавливается во время чтения книг
               </div>
               <div class="card-footer">
                  <i class="text-muted">«Если вы понимаете, как функционирует Вселенная, то, в известном смысле, можете ею управлять»</i>
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Гуманизм</div>
               <div class="card-body">
                  <b>Описание</b>: персонаж стремится помогать близким и любимым <br />
                  <b>Требование</b>: привязанность к конкретному человеку или группе: семье, друзьям, коллегам <br />
                  <b>Преимущество</b>: рассудок восстанавливается во время общения
               </div>
               <div class="card-footer">
                  <i class="text-muted">«Счастлив тот, кто думает о других»</i>
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Оккультизм</div>
               <div class="card-body">
                  <b>Описание</b>: персонаж верит, что абсолютные боги существуют и имеют власть над этим миром <br />
                  <b>Требование</b>: теряются очки рассудка, равные текущему значению знания мифов <br />
                  <b>Преимущество</b>: возможность использовать заклинания
               </div>
               <div class="card-footer">
                  <i class="text-muted">«Из холодных глаз в меня лезет, душу леденя, бездна черная, но я лишь улыбаюсь»</i>
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Религия</div>
               <div class="card-body">
                  <b>Описание</b>: персонаж не верит в абсолютных богов, но верит в более ортодоксальных <br />
                  <b>Требование</b>: выбор одной из известных конфессий и следование её правилам <br />
                  <b>Преимущество</b>: рассудок восстанавливается во время религиозных обрядов и чтения книг
               </div>
               <div class="card-footer">
                  <i class="text-muted">«Вникай в себя и в учение; занимайся сим постоянно: ибо, так поступая, и себя спасешь и слушающих тебя»</i>
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Гедонизм</div>
               <div class="card-body">
                  <b>Описание</b>: персонаж не задумывается о вере как таковой и стремится просто получать удовольствие от жизни <br />
                  <b>Требование</b>: нет <br />
                  <b>Преимущество</b>: персонаж восстанавливает рассудок от употребления алкоголя и табака
               </div>
               <div class="card-footer">
                  <i class="text-muted">«Вино и сигареты – это всё, что нам осталось»</i>
               </div>
            </div>
         </div>
         <div class="col-lg-6 col-12">
            <div class="card h-100">
               <div class="card-header bg-primary text-white">Нигилизм</div>
               <div class="card-body">
                  <b>Описание</b>: персонаж отрицает любые сверхъестественные явления <br />
                  <b>Требование</b>: знание мифов не выше 20% <br />
                  <b>Преимущество</b>:рассудок восстанавливается во время работы
               </div>
               <div class="card-footer">
                  <i class="text-muted">«Природа не храм, а мастерская, и человек в ней работник»</i>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Progress extends Vue {}
</script>
