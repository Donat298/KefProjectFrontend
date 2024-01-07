<template>
    <div :style="{ 'margin-bottom': isWideScreen ? '80px' : '20px' }">
  
      
          <div class="title-all" >

          <div style="font-size: 40px; text-align: center;     margin: 5% auto;   word-break: break-word;
  
  
   border-radius: 20px; background: linear-gradient(140deg, #1d2f3f, #15212c);
  box-shadow:  0px 0px 50px rgba(0, 0, 0, 0.30);transform: rotate(2deg);
      white-space: pre-wrap;
        " class="casino-title">Activation!</div>
  
         
 
          </div>
      

  



        <div class="progressbar" style="display: flex;
    
      align-items: center;  /* Add this line */
      flex-wrap: wrap;
      max-width: 90%;
      width: 1020px; 
      margin: 0 auto;"> 

               <div class="progress-labels" style="display: flex; justify-content: space-between; width: 100%;
                 font-size: 20px; text-align: center; ">
    <div  style="text-align: left;">Progress</div>
    <div  style="text-align: right;">{{ deposit }}%</div>

  </div>  
 <div class="progressbar" style="display: flex;
    align-items: center;  /* Add this line */
    border: 1px solid #2e4659;
    border-radius: 25px;
    position: relative;
    height: 25px;
    width: 100%;
    ">
    <div class="progress-bar" :style="{ width: deposit + '%' }">

    </div>
    </div>
              <div class="progress-labels" style="display: flex; justify-content: space-between; width: 100%;">
    <div class="not-activated" style="text-align: left;">Disabled</div>
    <div class="activated" style="text-align: right;">Activated</div>
  </div>  

  <div style="color: gray; text-align: center; width: 100%; margin-top: 20px;">
<h2>Make your first Deposit!</h2>
<p >{{ remainingProgress }}% left</p>
<p>Current status: {{ status }}</p>


</div>
        </div>





 

      </div>
  
  
  
  
  
  
  
  
    
  
    <bottom-info></bottom-info>
  </template>
  
  <script>
  

    import titleMixin from "@/components/UI/Other/document.title";
    export default {
      mixins: [titleMixin],
      title: "Kef: Crypto Casino",
 
      data() {
        return {
          isWideScreen: false,
       
        };
      },
      methods: {
        checkScreenWidth() {
          this.isWideScreen = window.innerWidth > 800;
        },
   
      },
      computed: {
        deposit() {
            return this.$store.getters.userDetail.deposit;
        },
        remainingProgress() {
            return 100 - this.deposit;
        },
        status() {
            return this.deposit >= 100 ? 'activated' : 'not activated';
        }
      },
    
      mounted() {
        this.checkScreenWidth();
        window.addEventListener('resize', this.checkScreenWidth);
      },

      beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenWidth);
      },
    }
  </script>
  
  <style>

.not-activated {
    font-size: 20px;
  color: #2e4659;
    
}


.imginlist{
  display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin: 15px;
      user-select: none; 

}
.activated {
    font-size: 20px;
  color: rgb(99, 254, 202);
}
    .progress-bar {
  background-color: rgb(99, 254, 202);
  height: 25px;
  border-radius: 25px;

  position: absolute;
}

.progress-text {


  text-align: center;
  color: #ffffff;
}
  
  
    .casino-title {
      color: #ffffff;
      margin: 10% auto;
      display: flex;
      align-items: center;
      padding: 20px;
      max-width: 90%;
  
    }
  
    .description {
      color: #ffffff;
      font-size: 25px;
      width: 400px;
      margin: 10% auto;
      padding: 20px;
  
      max-width: 85%;
    }
  
    .game-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1200px;
      margin: 0 auto;
    }
  .title-all{
  margin: auto;
  
    max-width: 1200px;
              display: flex;
      justify-content: space-between;
    
  }
    @media (max-width: 800px) {
      .title-all {
        flex-direction: column;
      }
    }
  
  </style>