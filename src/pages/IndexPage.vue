<template>
  <q-page>
      <div class="cidade" >
        <p class="city">{{ city.name }}</p>
        <span> lat: {{ city.lat }} - lon: {{ city.lon }}  </span>
      </div>
    <!-- <br>
    <q-card class="temp-atual transparent">
      <q-card-section >
        <q-img :src="urlIcon[0]" style="height: 100px ; max-width: 100px"/>
             {{ atual.temp }} °K
        <p class="descricao-t"> {{ atual.descricao }}</p>
      </q-card-section>
    </q-card>
    <br>
    <q-card>
       <q-item clickable>
          <q-item-section avatar>
            <q-img :src="urlIcon[0]"/>
          </q-item-section>

          <q-item-section>
            <q-item-label> Today • {{ atual.descricao}}</q-item-label>
          </q-item-section>
          <q-item-section side> ↑{{atual.max}}°K / ↓{{ atual.min }}°K </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-img :src="urlIcon[1]"/>
          </q-item-section>

          <q-item-section>
            <q-item-label> Tomorrow • {{ dataWeather.description[1]}}</q-item-label>
          </q-item-section>
          <q-item-section side> ↑{{allTemps.max[1]}}°K / ↓{{ allTemps.min[1]}}°K </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-img :src="urlIcon[2]"/>
          </q-item-section>

          <q-item-section>
            <q-item-label> After Tomorrow • {{ dataWeather.description[2]}}</q-item-label>
          </q-item-section>
          <q-item-section side> ↑{{allTemps.max[2]}}°K / ↓{{ allTemps.min[2]}}°K </q-item-section>
        </q-item>
    </q-card>
    <br>
    <div>
      <table-scroll-virtual/>
      <card-datas-main/>
    </div> -->
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
// import CardDatasMain from './CardDatasMain.vue'

// import TableScrollVirtual from './TableScrollVirtual.vue'

export default defineComponent({
  name: 'IndexPage',

  data () {
    return {
      lista: [],
      city: {
        name: '',
        lat: '',
        lon: ''

      }

    }
  },
  components: {
    // TableScrollVirtual,
    // CardDatasMain
  },
  mounted () {
    this.getApi()
  },
  methods: {
    getApi () {
      this.$api.get()
        .then((res) => {
          this.lista = res.data
          this.city.name = this.lista.city.name
          this.city.lat = this.lista.city.coord.lat
          this.city.lon = this.lista.city.coord.lon
        })
        .catch((err) => { console.log(err) })
    }
  }

})
</script>
<style>
  .section{
    background: white;
    border-radius: 10px;
    padding: 15px;
    width: 500px;
    margin: auto;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.400);
  }
  .temp-atual {
    color: white;
    text-align: center;
    font-size: 50px;
    margin: auto;
    width: 90%;
  }
  .temp-atual .descricao-t{
    font-size: 1rem;
  }

  .cidade {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    padding-top: 5%;
    line-height: 50%;
    text-align: center;
    color: white;
  }
  .cidade .city{
    font-size: 1.4rem;
  }

  .q-page {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height: 100vh;
}

@keyframes gradient {
  0% { background-position: 0% 50%;}
  50% { background-position: 100% 50%;}
  100% { background-position: 0% 50%; }
}
</style>
