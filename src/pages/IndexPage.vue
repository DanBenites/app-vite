<template>
  <q-page>
      <div class="cidade" >
        <p class="city">{{ atual.name }}</p>
        <span> lat: {{ atual.lat }} - lon: {{ atual.lon }}  </span>
      </div>
    <br>
    <q-card class="temp-atual transparent">
      <q-card-section >
        <q-img :src="atual.icon" style="height: 100px ; max-width: 100px"/>
             {{ atual.temp }} °C
        <p class="descricao-t"> {{ atual.descricao }}</p>
      </q-card-section>
    </q-card>
    <br>
    <card-tree-days/>
    <br>
    <table-scroll-virtual/>
    <br>
    <card-datas-main/>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import axios from 'axios'
import CardTreeDays from './CardTreeDays.vue'
import CardDatasMain from './CardDatasMain.vue'

import TableScrollVirtual from './TableScrollVirtual.vue'

export default defineComponent({
  name: 'IndexPage',

  data () {
    return {
      lista: [],
      atual: {
        name: '',
        lat: '',
        lon: '',
        temp: '',
        descricao: '',
        icon: ''

      }

    }
  },
  components: {
    CardTreeDays,
    TableScrollVirtual,
    CardDatasMain
  },
  mounted () {
    this.getApiRealTime()
  },
  methods: {
    getApiRealTime () {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather?q=Dourados&units=metric&lang=pt_br&appid=a4c7ce7d14ee7e65f0c6fc1e3a53b703')
        .then((res) => {
          this.lista = res.data
          this.atual.name = this.lista.name
          this.atual.lat = this.lista.coord.lat
          this.atual.lon = this.lista.coord.lon
          this.atual.temp = this.lista.main.temp
          this.atual.icon = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${this.lista.weather[0].icon}.png`
          this.atual.descricao = this.lista.weather[0].description.toUpperCase()
        })
        .catch((error) => {
          console.log(error)
        })
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
