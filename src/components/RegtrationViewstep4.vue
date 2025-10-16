<template>

    <section class="login-section">
        <div class="container-fluid">
          <div class="row">
    <leftside/>
            
    <Rightside v-if="$route.name == 'investor_personinfo_confirm'"/>
    <Resendemailagain v-else-if="$route.name == 'resendemail'"/>
    <Resendemail v-else/>
          </div>
        </div>
      </section>
    </template>
    
    
    <script>
    
        export default {
          name: 'RegtrationView4',
          props: {
            msg: String
          },
          components: {
            Leftside: () => import("./LeftsideSlider.vue"),
            Rightside: () => import("./registration/Investor_email_confirm.vue"),
            Resendemail: () => import("./registration/Renter_email_address.vue"),
            Resendemailagain: () => import("./registration/reemail_send_successfully.vue"),
        //    Reenter_email: () => import("./registration/Investor_email_confirm.vue"),
          //  Resend_email: () => import("./registration/Investor_email_confirm.vue"),
            
        }
        }
        </script>