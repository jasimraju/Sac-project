<template>
    <div>
      <Header/>
      <Slider name="Privacy policy"/>
      <Privacy/>
      <Footer/>
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
    Privacy: () => import("./otherpage/Privacy_policy_view.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>