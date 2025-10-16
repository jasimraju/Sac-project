<template>
    <div>
      <Header/>
      <Slider name="Disclosure"/>
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
    Trems: () => import("./otherpage/Discloseurepage.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>