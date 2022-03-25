<template>
  <div class="teste2">

    <q-table
      style="height: 270px; text-align: center"

      :rows="rows"
      :columns="columns"
      row-key="name"
      virtual-scroll

      :rows-per-page-options="[0]"
    >
    <template v-slot:body="props" >

        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"

          >
          {{col.value}}°K
          </q-td>
        </q-tr>

        <q-tr>
          <q-td v-for="number in listCount" :key="number">
            <q-avatar >
              <q-img :src="urlIcon[number-1]"/>
            </q-avatar>
          </q-td>
        </q-tr>

        <q-tr>
          <q-td v-for="number in listCount" :key="number">
            {{ wind[number-1]}}m/s

          </q-td>
        </q-tr>

      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data () {
    return {
      // Linha: Ex: 30C | 28C | 22C
      columns: [],
      rows: [],
      urlIcon: [],
      listCount: 0,
      wind: [],
      pagination: ref({
        rowsPerPage: 0
      })
    }
  },
  mounted () {
    this.getIcons()
    this.getColumns()
    this.getRowTemp()
    this.getWind()
  },
  methods: {
    getIcons () {
      this.$api.get('/list.json')
        .then((res) => {
          const lista = res.data
          for (const list in lista) {
            const iconTemp = lista[list].weather[0].icon
            this.urlIcon[list] = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${iconTemp}.png`
            this.listCount++
          }
        })
    },
    getWind () {
      this.$api.get('/list.json')
        .then((res) => {
          const lista = res.data
          for (const list in lista) {
            this.wind[list] = lista[list].wind.speed
          }
        })
    },
    getColumns () {
      this.$api.get('/list.json')
        .then((res) => {
          const lista = res.data
          for (const list in lista) {
            this.columns.push({
              name: list,
              label: lista[list].dt_txt,
              field: list,
              align: 'center'

            })
          }
        })
    },
    getRowTemp () {
      this.$api.get('/list.json')
        .then((res) => {
          const lista = res.data

          this.rows.push(
            {
              0: lista[0].main.temp,
              1: lista[1].main.temp,
              2: lista[2].main.temp,
              3: lista[3].main.temp,
              4: lista[4].main.temp,
              5: lista[5].main.temp,
              6: lista[6].main.temp,
              7: lista[7].main.temp,
              8: lista[8].main.temp,
              9: lista[9].main.temp,
              10: lista[10].main.temp,
              11: lista[11].main.temp,
              12: lista[12].main.temp,
              13: lista[13].main.temp,
              14: lista[14].main.temp,
              15: lista[15].main.temp,
              16: lista[16].main.temp,
              17: lista[17].main.temp,
              18: lista[18].main.temp,
              19: lista[19].main.temp,
              20: lista[20].main.temp,
              21: lista[21].main.temp,
              22: lista[22].main.temp,
              23: lista[23].main.temp,
              24: lista[24].main.temp,
              25: lista[25].main.temp,
              26: lista[26].main.temp,
              27: lista[27].main.temp,
              28: lista[28].main.temp,
              29: lista[29].main.temp,
              30: lista[30].main.temp,
              31: lista[31].main.temp,
              32: lista[32].main.temp,
              33: lista[33].main.temp,
              34: lista[34].main.temp,
              35: lista[35].main.temp,
              36: lista[36].main.temp,
              37: lista[37].main.temp,
              38: lista[38].main.temp,
              39: lista[39].main.temp
            }
          )
        })
    }
  }
}

</script>
<style>

</style>
