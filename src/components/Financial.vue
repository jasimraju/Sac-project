<template>

    <section class="login-section">
        <div class="container-fluid">
          <div class="row">
    <leftside/>
            
    <Rightside v-if="usertype==1"/>
    <Individual v-else/>      
          </div>
        </div>
      </section>
    </template>
    
    
    <script>    
        export default {
          name: 'Financial_infor',
          data(){
            return {
               usertype:this.globalgetsessionkeyvalue('role_id')     
            }
          },
          props: {
            msg: String
          },
          components: {
            Leftside: () => import("./LeftsideSlider.vue"),
            Rightside: () => import("./unblocking/Financial_information.vue"),
            Individual: () => import("./unblocking/Individual_accredited_investor.vue"),
            
        }
        }
        </script>