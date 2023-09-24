import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI/';
import router from "@/router/router";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS for styling (optional)
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
library.add(fas); // Add all solid icons to the library


import directives from '@/directives'


const app = createApp(App)


app.component('font-awesome-icon', FontAwesomeIcon);


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