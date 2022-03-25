<template>
  <q-page>
    <div>
    </div>
    <div class="row">
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="name"
      class="col"
    />
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      posts: [],
      columns: [
        {
          name: 'dt',
          label: 'DT',
          field: 'dt',
          align: 'left',
          sortable: true
        },
        {
          name: 'dt_txt',
          label: 'DT_TXT',
          field: 'dt_txt',
          align: 'left',
          sortable: true
        }
      ]

    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    getPost () {
      this.$api.get('/list.json')
        .then((res) => {
          this.posts = res.data
          console.log(res.data)
        })
        .catch((err) => { console.log(err) })
    }

  }
})
</script>
