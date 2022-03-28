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
          <q-item-label>{{main.cloudsName}}</q-item-label>
          <q-item-label caption>
            {{main.clouds}}%
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>Snows</q-item-label>
          <q-item-label caption>
            Subhead
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>

          <q-item-section>
            <q-item-label>Pressure</q-item-label>
              <q-item-label caption>
                {{main.press}}mbar
              </q-item-label>
            </q-item-section>

            <br>

            <q-item-section>
            <q-item-label>Humidity </q-item-label>
              <q-item-label caption>
                {{main.humidity}}%
              </q-item-label>
            </q-item-section>

        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">

          <q-item-section>
            <q-item-label>Feels Like</q-item-label>
              <q-item-label caption>
                {{main.Feels}}°K
              </q-item-label>
          </q-item-section>
          <br>
          <q-item-section>
            <q-item-label>Wind Speed </q-item-label>
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
        Feels: 0,
        vent: 0
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$api.get('/list.json')
        .then((res) => {
          const lista = res.data

          this.main.press = lista[0].main.pressure
          this.main.humidity = lista[0].main.humidity
          this.main.vent = lista[0].wind.speed

          const t = lista[0].main.temp - 273
          const v = lista[0].wind.speed * 3.6
          const i = (33 + (10 * (Math.sqrt(v)) + 10.45 - v) * (t - 33) / 22) + 273
          this.main.Feels = Math.ceil(i)

          this.main.clouds = lista[0].clouds.all
          if (this.main.clouds >= 90) { this.main.cloudsName = 'Obstructed Vision' } else if (this.main.clouds >= 80) { this.main.cloudsName = 'Cloundy' } else if (this.main.clouds >= 60) { this.main.cloudsName = 'Almost Cloudy' } else if (this.main.clouds >= 40) { this.main.cloudsName = 'Partly Cloudy' } else if (this.main.clouds >= 10) { this.main.cloudsName = 'almost Clean' } else { this.main.cloudsName = 'Clean' }
        })
        .catch((err) => { console.log(err) })
    }

  }
}
</script>

<style>

</style>
