<template>
    <div class="col-lg-7 ">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
                <div class="right-sidebar-register-conten">
                    <div class="user-view-register text-center" v-for='(role) in response' :key="role.id">
                        <img :src="role.thumbnailUrl" class="img-fluid" alt="">
                        <h3 v-html="role.title">
								</h3>
                        <p v-html="role.description">
								</p>
                        

                  
                        <div class="grid-button mt-4">
                            <router-link :to="{name:'investor_personinfo',params: {id:role.id }}" class="btn btn-secondary" type="button">Register</router-link>
                           
                            <button   @click="go_sinpass_reg" class="btn btn-warning" type="button">
                                Register with Singpass</button>
                        </div>
                    </div>
                    <Android />
                </div>
            </div>
        </div>
    </div>
</template>   

<script>
export default {
    name: 'Investor_view',
    components: {
        Android: () => import("../AndroidLink.vue"),
        RegHeader: () => import("../RegHeader.vue"),
    },
    data () {
    return {
        isDisabled:false,
        response:null
    }
    },
     created() {
        this.setsessionkeydatak('role_id',this.$route.params.id);
        this.globalfatch('/v1/user/'+this.$route.params.id);
       this.globalGetre('/v1/user/'+this.$route.params.id).then((result) =>{
        console.log(result);
            const rolesdata = result.data;
        this.response = rolesdata;
        if(this.response[0]['termsAndConditions'] == 'N/A'){
            this.isDisabled = true;
        }else{
            this.isDisabled = false;
        }}).catch((error) => {
					if (error.response) {
						//do something					
					}
					else if (error.request) {
						//do something else						
					} else if (error.message) {
						//do something other than the other two
					}
				});
	},
    methods: {
        checktream:function(event){
            if (event.target.checked) {
       this.isDisabled = true;
    }
    else{
        this.isDisabled = false;
    }
    },
    go_sinpass_reg:function(){
        const route = this.$router.resolve({name:'investor_personinfo' });
const absoluteURL = new URL(route.href, window.location.origin).href;
const re_url = this.globalGet_singpass_url()+"?red_url=" + encodeURIComponent(absoluteURL);
console.log(re_url);
window.location.href = re_url;
        
    }
}

}
</script>
