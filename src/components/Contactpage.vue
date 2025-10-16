<template>
    <div>
      <Header/>
      <Slider name="Contacts"/>
      <Contact/>
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
    Contact: () => import("./otherpage/Contact_view.vue"),
    Footer: () => import("./include/Footer.vue"), 
}
}
</script>