<template>
    <div>
      <Header/>
      <Slider name="Withdrawal of consent"/>
      <Trems/>
      <Footer/>
    </div>
</template>

<script>

export default {
  name: 'With_t',
  props: {
    msg: String
  },
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Trems: () => import("./otherpage/Withdrawal_of_consent.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>