

<template>
  
    <div v-if="showChildComponent" class="sidebar" :style="{ width: sidebarWidth }">
    
    <h1 style="height: 150px; margin-top: -15px;">
      
      <span v-if="collapsed">       
        <v-img  :width="50" cover src="@/assets/Crip.png" style="margin-top: 47px;"></v-img>
      </span>
      
      


      <span class="nn"
      
      v-else><div class="register1"><my-button2 @click="$router.push('/')" style="
       background-color: #a04d3d00;
       max-width: 268px;
       margin-left: -13px;
       
        
      border: #4d3da000;"><v-img  class="kefsize" src="@/assets/kef.png" ></v-img></my-button2></div></span>
    
    </h1>
 
    <div style="font-size: 20px;">
      
    <SidebarLink to="/" icon="fa-solid fa-house" > Home </SidebarLink>
    <SidebarLink to="/games" icon="fa-solid fa-dice"> Games</SidebarLink>
    <SidebarLink to="/image" icon="fas fa-image"> Images</SidebarLink>
    <SidebarLink to="/SignUptest1" icon="fa-solid fa-arrow-right-to-bracket" > SignUptest1</SidebarLink>
    <SidebarLink to="/SignUptest2" icon="fa-solid fa-arrow-right-to-bracket"> SignUptest2</SidebarLink>
   
    

    </div>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"

      
    >
      <fa icon="fas fa-angle-double-left" />
    </span>

  </div>
</template>

<script>



import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'


export default {
  data() {
    return {
      showChildComponent: true,
      isResolutionBelowThreshold: window.innerWidth < 900,
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const screenWidth = window.innerWidth
      const isBelowThreshold = screenWidth < 900

      if (isBelowThreshold) {
        this.showChildComponent = false;
      } else {
        this.showChildComponent = true;
      }
    }
  },
   




  props: {
    show: {
            type: Boolean,
            default: false
    }
  },
  components: { SidebarLink },
  setup() { 
    return { collapsed, toggleSidebar, sidebarWidth }
  }
  
}
</script>



<style>

.kefsize{
  width: 200px;
 
}


.nn {
  display:flex;

  align-items: center;

}
.navbar {
    
    height: 70px;
    
    background-color: #384f62;
    
    margin-right: auto;
    flex:center;
   

}
:root {
  --sidebar-bg-color: #384f62;

  --sidebar-item-active: #253644;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.3em;
  
  transition: 0.2s ease;
  box-shadow: -4px 2px 12px  black;
    
  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 3em;
}

.collapse-icon {
  margin-left: 227px;
  position: absolute;
  background-color: #384f62;
  margin-top: 31px;
  color: rgba(255, 255, 255, 0.7);
  border: 2px solid #51c19a;
  border-radius: 40px;
  transition: 0.2s linear;
  padding: 10px 15px;
}
.collapse-icon:hover {
  border: 2px solid #efefef;

  
}

.rotate-180 {
  margin-left: 68px;
  transform: rotate(180deg);
  transition: 0.2s linear;
}


</style>

