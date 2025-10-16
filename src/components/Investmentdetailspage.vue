<template>
    <div>
      <Header/>
      <Slider :name="name_props"/>
      <Investment/>
      <Footer/>
      <Loginmodal/>
    </div>
</template>

<script>

export default {
  name: 'Ivestement_details',
  data() {
        return {
          name_props: [{name:'Investment','route':'investment'},{name:'Investment Details','route':null}]
        }
      },

  props: {
    msg: String
  },
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Investment: () => import("./investment/Investment_details.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>