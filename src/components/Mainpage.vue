<template>
    <div>
      <Header/>
      <Slider/>
      <Upcoming v-if="loginstatus"/>
      <Investment/>
       <Research/>
      <Footer/>
    </div>
</template>

<script>

export default {
  name: 'Login_Reg',
  props: {
    msg: String
  },
  data(){
    return {
      loginstatus:false,
    }
  },
  created() {
    this.loginstatus = this.checkloginstatus();
  }, 
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Slider.vue"),
    Upcoming: () => import("./investment/upcoming/Upcoming_main.vue"),
    Investment: () => import("./investment/Investment_main.vue"),
   
    Research: () => import("./research/Research_main.vue"),
    Footer: () => import("./include/Footer.vue"),
    
}
}
</script>



