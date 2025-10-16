<template>
    <div>
      <Header/>
      <Slider name="Event/Details"/>
      <Event/>
      <Footer/>
      <Loginmodal/>
    </div>
</template>

<script>

export default {
  name: 'Event_details_page',
  props: {
    msg: String
  },
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Event: () => import("./event/Event_main_details.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"),

    
}
}
</script>