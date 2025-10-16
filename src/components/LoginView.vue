<template>
      
    <section class="login-section">
    <div class="container-fluid">
      <div class="row">
<leftside/>
        
<Rightside/>
        
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'LoginView',
  props: {
    msg: String
  },
  components: {
    Leftside: () => import("./LeftsideSlider.vue"),
    Rightside: () => import("./Login_innerview.vue"),
    
}
}
</script>



