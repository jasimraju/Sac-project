<template>
    <div class="col-lg-7 ">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
    <div class="user-view-register text-center" v-if="success === 1">
        <img src="../../assets/image/icons/success.svg" class="img-fluid" alt="">
        <h3>Your Authentication is <br/> Successful</h3>
        <p>Please wait while we redirect you back to your account. </p>
    </div>
<Treams_registration v-else />
</div>
</div>
</div>
</template>   
<script>
export default {
    name: 'Phoneverify_success',
    data(){
        return {
            success:1,
        }
    },
    components: {
        RegHeader: () => import("../RegHeader.vue"),
        Treams_registration: () => import("./Treams_registration.vue")
    },
    created() {
        var userdataonelogin = this.getsessionkey('userdata');
	
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
        var self = this;
        setTimeout(function(){self.success = 2},1000)
    }

}
</script>