<template>
    <div>
      <Header/>
      <Slider name="My Subcriptions"/>
      <Investment/>
      <Footer/>
    </div>
</template>

<script>

export default {
  name: 'Subscription_details',
  props: {
    msg: String
  },
  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Investment: () => import("./payment/paymentmain.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>