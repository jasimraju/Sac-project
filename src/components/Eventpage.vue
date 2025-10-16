<template>
    <div>
      <Header/>
      <Slider name="Event"/>
      <Event/>
      <Footer/>
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
    Event: () => import("./event/Event_main_page.vue"),
    Footer: () => import("./include/Footer.vue"),

    
}
}
</script>