import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI/';
import router from "@/router/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import directives from '@/directives'

library.add(fas);

const app = createApp(App)

    .component('fa', FontAwesomeIcon)

components.forEach(component => {
    app.component(component.name, component)
})
directives.forEach(directives => {
    app.directive(directives.name, directives)
});








import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()


app
  .use(store)
  .use(vuetify)
  .use(router)
  
  

app.mount('#app');