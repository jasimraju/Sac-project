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
      data(){
        return {
          userlogin:false
        }
      },
      components: {
        Leftside: () => import("./LeftsideSlider.vue"),
        Rightside: () => import("./Regtrationinnerview.vue"),
        
    },
    created() {
		this.checkuserlogin();
		if (this.userlogin) {
			this.$router.push({ name: 'home' })
		}
  }
    }
    </script>