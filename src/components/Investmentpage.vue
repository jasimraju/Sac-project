<template>
    <div>
      <Header/>
      <Slider name="Investments"/>
      <Investment/>
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
    Investment: () => import("./investment/Investment_main_view.vue"),
  
    Footer: () => import("./include/Footer.vue"),

    
}
}
</script>