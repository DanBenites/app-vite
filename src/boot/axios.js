import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5/forecast?q=Dourados&units=metric&lang=pt_br&appid=a4c7ce7d14ee7e65f0c6fc1e3a53b703' })
// const api = axios.create({ baseURL: 'https://api.openweathermap.org/data/2.5/weather?q=Dourados&appid=a4c7ce7d14ee7e65f0c6fc1e3a53b703' })

// https://api.openweathermap.org/data/2.5/weather?q=Dourados&appid=a4c7ce7d14ee7e65f0c6fc1e3a53b703

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, api }
