<template>
  <div>

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
          {{col.value}}°C
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
          <q-td v-for="number in listCount" :key="number">{{ wind[number-1]}}m/s</q-td>
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
      dados: [],
      pagination: ref({
        rowsPerPage: 0
      })
    }
  },
  mounted () {
    this.getAllDatas()
  },
  methods: {
    getAllDatas () {
      this.$api.get()
        .then((res) => {
          this.dados = res.data
          // Recolhe todos os dados de icones
          for (const i in this.dados.list) {
            const iconTemp = this.dados.list[i].weather[0].icon
            this.urlIcon[i] = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${iconTemp}.png`
            this.listCount++
          }
          // Envia todos os dados da velocidade do vento
          for (const i in this.dados.list) {
            this.wind[i] = this.dados.list[i].wind.speed
          }
          // Envia todos os dados da coluna, esta deve vir antes das linhas
          for (const i in this.dados.list) {
            this.columns.push({
              name: i,
              label: this.dados.list[i].dt_txt,
              field: i,
              align: 'center'

            })
          }
          // Envia todos os dados da primeira linha da tabela
          this.rows.push(
            {
              0: this.dados.list[0].main.temp,
              1: this.dados.list[1].main.temp,
              2: this.dados.list[2].main.temp,
              3: this.dados.list[3].main.temp,
              4: this.dados.list[4].main.temp,
              5: this.dados.list[5].main.temp,
              6: this.dados.list[6].main.temp,
              7: this.dados.list[7].main.temp,
              8: this.dados.list[8].main.temp,
              9: this.dados.list[9].main.temp,
              10: this.dados.list[10].main.temp,
              11: this.dados.list[11].main.temp,
              12: this.dados.list[12].main.temp,
              13: this.dados.list[13].main.temp,
              14: this.dados.list[14].main.temp,
              15: this.dados.list[15].main.temp,
              16: this.dados.list[16].main.temp,
              17: this.dados.list[17].main.temp,
              18: this.dados.list[18].main.temp,
              19: this.dados.list[19].main.temp,
              20: this.dados.list[20].main.temp,
              21: this.dados.list[21].main.temp,
              22: this.dados.list[22].main.temp,
              23: this.dados.list[23].main.temp,
              24: this.dados.list[24].main.temp,
              25: this.dados.list[25].main.temp,
              26: this.dados.list[26].main.temp,
              27: this.dados.list[27].main.temp,
              28: this.dados.list[28].main.temp,
              29: this.dados.list[29].main.temp,
              30: this.dados.list[30].main.temp,
              31: this.dados.list[31].main.temp,
              32: this.dados.list[32].main.temp,
              33: this.dados.list[33].main.temp,
              34: this.dados.list[34].main.temp,
              35: this.dados.list[35].main.temp,
              36: this.dados.list[36].main.temp,
              37: this.dados.list[37].main.temp,
              38: this.dados.list[38].main.temp,
              39: this.dados.list[39].main.temp
            })
        })
    }
  }
}

</script>
<style>

</style>
