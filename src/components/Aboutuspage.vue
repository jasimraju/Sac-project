<template>
    <div>
      <Header/>
      <Slider name="About us"/>
      <Aboutus/>
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
    Aboutus: () => import("./otherpage/Aboutus.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>