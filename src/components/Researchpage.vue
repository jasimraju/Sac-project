<template>
    <div>
      <Header/>
      <Slider name="Equity Research"/>
      <Research/>
      <Footer/>
      <Loginmodal/>
    </div>
</template>

<script>

export default {
  name: 'Ivestement_details',
  props: {
    msg: String
  },
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Research: () => import("./research/Research_main_page.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>