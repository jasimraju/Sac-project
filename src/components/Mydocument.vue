<template>
    <div>
      <Header/>
      <Slider name="My Document"/>
      <User_doc/>
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
    User_doc: () => import("./manage_profile/user_document.vue"),
    Footer: () => import("./include/Footer.vue"),
},
created() {
 var loginstatus = this.checkloginstatus();
 if(!loginstatus){
  this.$router.push({ name: 'login'});
 }
}
}
</script>