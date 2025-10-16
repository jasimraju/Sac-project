<template>

    <section class="login-section">
      <div class="container-fluid">
        <div class="row">
          <leftside />
  
          <Rightside />
  
        </div>
      </div>
    </section>
  </template>
      
      
  <script>
  
  export default {
    name: 'RegtrationView_phone_success',
    props: {
      msg: String
    },
    components: {
      Leftside: () => import("./LeftsideSlider.vue"),
      Rightside: () => import("./registration/Phone_verification_success.vue"),
  
    }
  }
  </script>