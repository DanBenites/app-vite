<template>

  <q-card>
       <q-item clickable>
          <q-item-section avatar>
            <q-img :src="atual.icon"/>
          </q-item-section>

          <q-item-section>
            <q-item-label> Hoje • {{ atual.descricao}}</q-item-label>
          </q-item-section >
          <q-item-section side><span v-if="TomorrowAndAfter[0]">  ↑ {{ TomorrowAndAfter[0].maior }}°C / {{TomorrowAndAfter[0].menor}}↓°C </span></q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar v-if="TomorrowAndAfter[1]">
            <q-img :src="TomorrowAndAfter[1].icon"/>
          </q-item-section>

          <q-item-section>
            <q-item-label> Amanhã • </q-item-label>
          </q-item-section>
          <q-item-section side><span v-if="TomorrowAndAfter[1]">  ↑{{ TomorrowAndAfter[1].maior}}°C / {{ TomorrowAndAfter[1].menor}}↓°C</span></q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar v-if="TomorrowAndAfter[2]">
            <q-img :src="TomorrowAndAfter[2].icon"/>
          </q-item-section>

          <q-item-section>
            <q-item-label> Depois de Amanhã • </q-item-label>
          </q-item-section>
          <q-item-section side><span v-if="TomorrowAndAfter[2]">  ↑{{ TomorrowAndAfter[2].maior}}°C / ↓{{ TomorrowAndAfter[2].menor}}°C </span></q-item-section>
        </q-item>
    </q-card>

</template>

<script>
import { toRaw } from 'vue'
import axios from 'axios'

export default {
  data () {
    return {
      TomorrowAndAfter: '',
      lista: [],
      dados: [],
      atual: {
        temp: '',
        temMax: '',
        tempMin: '',
        icon: '',
        descricao: ''
      },
      days: []
    }
  },
  mounted () {
    this.getApiRealTime()
    this.getApiFiveDays()
  },
  methods: {
    getApiRealTime () {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather?q=Dourados&units=metric&lang=pt_br&appid=a4c7ce7d14ee7e65f0c6fc1e3a53b703')
        .then((res) => {
          this.lista = res.data
          this.atual.temp = this.lista.main.temp
          this.atual.temMax = this.lista.main.temp_max
          this.atual.tempMin = this.lista.main.temp_min

          this.atual.icon = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${this.lista.weather[0].icon}.png`
          this.atual.descricao = this.lista.weather[0].description
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getApiFiveDays () {
      this.$api.get().then((res) => {
        this.dados = res.data
        let cont = 0
        let maior = this.dados.list[0].main.temp_max
        let menor = this.dados.list[0].main.temp_min
        // eslint-disable-next-line no-var
        // var vetor = []
        for (const i in this.dados.list) {
          maior = Math.max(maior, this.dados.list[i].main.temp_max)
          menor = Math.min(menor, this.dados.list[i].main.temp_min)

          if (this.dados.list[i].dt_txt.match(/00:00:00/)) {
            const j = Number(i) + 4
            const x = this.dados.list[j].weather[0].icon
            const icon = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${x}.png`
            this.days.push({
              maior,
              menor,
              icon
            })
            cont = cont + 1
            maior = -200
            menor = 600
          }
        }
      })
      this.TomorrowAndAfter = toRaw(this.days)
    }
  }
}
</script>

<style>

</style>
