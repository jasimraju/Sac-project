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
          name: 'RegtrationView',
          props: {
            msg: String
          },
          components: {
            Leftside: () => import("./LeftsideSlider.vue"),
            Rightside: () => import("./registration/Investor_email.vue"),
            
        }
        }
        </script>