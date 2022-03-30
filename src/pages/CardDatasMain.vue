<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> Nebulosidade </q-item-label>
          <q-item-label caption>
            {{main.cloudsName}}: {{main.clouds}}%
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label> Condição</q-item-label>
          <q-item-label caption>
            {{ main.description }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>

          <q-item-section>
            <q-item-label>Pressão Atms.</q-item-label>
              <q-item-label caption>
                {{main.press}}mbar
              </q-item-label>
            </q-item-section>

            <br>

            <q-item-section>
            <q-item-label>Humidade </q-item-label>
              <q-item-label caption>
                {{main.humidity}}%
              </q-item-label>
            </q-item-section>

        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">

          <q-item-section>
            <q-item-label>Sensação</q-item-label>
              <q-item-label caption>
                {{main.feels}}°C
              </q-item-label>
          </q-item-section>
          <br>
          <q-item-section>
            <q-item-label>Vel. do Vento</q-item-label>
              <q-item-label caption>
                {{main.vent}}m/s
              </q-item-label>
          </q-item-section>

        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      main: {
        clouds: 0,
        cloudsName: '',
        press: '',
        humidity: '',
        feels: 0,
        vent: 0,
        weather: '',
        description: ''
      }
    }
  },
  mounted () {
    this.getAllDatas()
  },
  methods: {
    getAllDatas () {
      this.$api.get('https://api.openweathermap.org/data/2.5/weather?q=Dourados&units=metric&lang=pt_br&appid=a4c7ce7d14ee7e65f0c6fc1e3a53b703')
        .then((res) => {
          const lista = res.data

          this.main.press = lista.main.pressure
          this.main.humidity = lista.main.humidity
          this.main.vent = lista.wind.speed
          this.main.feels = lista.main.feels_like
          this.main.weather = lista.weather[0].main
          this.main.description = lista.weather[0].description
          // const t = lista.main.temp
          // const v = lista.wind.speed * 3.6
          // const i = (33 + (10 * (Math.sqrt(v)) + 10.45 - v) * (t - 33) / 22)
          // this.main.Feels = Math.ceil(i)

          this.main.clouds = lista.clouds.all
          if (this.main.clouds >= 90) { this.main.cloudsName = 'Visão Obstruida' } else if (this.main.clouds >= 80) { this.main.cloudsName = 'Céu Nublado' } else if (this.main.clouds >= 60) { this.main.cloudsName = 'Céu Quase Nublado' } else if (this.main.clouds >= 40) { this.main.cloudsName = 'Parcialmente Nublado' } else if (this.main.clouds >= 20) { this.main.cloudsName = 'Poucas Nuvens' } else if (this.main.clouds >= 10) { this.main.cloudsName = 'Céu Quase Limpo' } else { this.main.cloudsName = 'Céu Limpo' }
        })
        .catch((err) => { console.log(err) })
    }

  }
}
</script>

<style>

</style>
