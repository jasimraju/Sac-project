<template>
    <div class="col-lg-7 ">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
  
        <div class="right-sidebar-register-conten" v-if="success === 1">
<div class="user-view-register">
    <img src="../../assets/image/icons/singpass-logo.svg" class="img-fluid" alt="">
    <h3>Sign up faster with Singpass</h3>
    <p>This shortens your sign-up to 10 minutes. Note that if you exit midway,</p><p> your details will not be saved.</p>
    <p></p>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input" type="radio" name="rember" id="notice" value="option1">
      <label class="form-check-label" for="notice">Retrieve my Notice of Assessment to verify my accredited investor status using my declared income</label>
    </div>
    <div class="grid-button mt-4">
        <router-link :to="{name:'unblocking'}" class="btn btn-secondary" > Don’t use Singpass </router-link>
        <span @click="go_myinfosinpass_reg" class="btn btn-warning" type="button"> Retrieve myinfo with singpass </span>
    </div>
</div>
</div><!-- end--> 
</div>
</div>
</div>
</template>   
<script>
export default {
    name: 'Go_sinpass',
    data(){
        return {
            success:1,
        }
    },
    components: {
        RegHeader: () => import("../RegHeader.vue"),
    },
    created() {
        var userdataonelogin = this.getsessionkey('userdata');
	
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
     
    },
    methods: {
        go_myinfosinpass_reg:function(){
        const route = this.$router.resolve({name:'unblocking' });
const absoluteURL = new URL(route.href, window.location.origin).href;
const re_url = this.globalGet_myingosingpass_url()+"?red_url=" + encodeURIComponent(absoluteURL);
console.log(re_url);
window.location.href = re_url;
        
    }
    }

}
</script>