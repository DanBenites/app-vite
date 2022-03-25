<template>
  <div class="busca">
    <p class="h4-text">Gerenciar Cidades</p>
    <q-input outlined color="black" bg-color="grey-8" v-model="text" label="Inserir Cidade">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .h4-text {
    font-size: 1.4rem;
    color: gray;
  }
</style>
