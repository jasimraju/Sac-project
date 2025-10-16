<template>
    <div>
      <Header/>
      <Slider name="Apply"/>
      <Investment/>
      <Footer/>
      <Loginmodal/>
    </div>
</template>

<script>

export default {
  name: 'Ivestment_page',
  props: {
    msg: String
  },
  data(){
    return {
      loginstatus: false
    }
  },
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Investment: () => import("./investment/Investment_main_apply.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"),

    
},created() {
 var loginstatus = this.checkloginstatus();
 if(!loginstatus){
  this.$router.push({ name: 'login'});
 }
}
}
</script>