<template>
    <div>
      <Header/>
      <Slider name="Terms and conditions"/>
      <Trems/>
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
    Trems: () => import("./otherpage/Trems_condition_view.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>