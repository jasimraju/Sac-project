<template>
    <div>
      <Header/>
      <Slider name="My Activity"/>
      <Myactive/>
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
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Myactive: () => import("./myactive/myactivemain.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"),

    
},
created() {
 var loginstatus = this.checkloginstatus();
 if(!loginstatus){
  this.$router.push({ name: 'login'});
 }
}
}
</script>