<template>
    <div>
      <Header/>
      <Slider name="Managed Portfolios"/>
      <Manageintro/>
      <Manageprotfolio/>
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
    Manageintro: () => import("./manage_protfolio/Manage_intro.vue"),
    Manageprotfolio: () => import("./manage_protfolio/Manage_protfolio.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"),

    
}
}
</script>