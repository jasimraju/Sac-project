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
          name: 'Declaration_info',
          props: {
            msg: String
          },
          components: {
            Leftside: () => import("./LeftsideSlider.vue"),
            Rightside: () => import("./unblocking/Declaration_agreement.vue"),
            
        }
        }
        </script>