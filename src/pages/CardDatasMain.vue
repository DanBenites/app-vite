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
          <q-item-label>Title</q-item-label>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
        press: '',
        humidity: ''
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
        })
        .catch((err) => { console.log(err) })
    }

  }
}
</script>

<style>

</style>
