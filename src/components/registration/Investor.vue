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
                        

                        <div class="form-check form-check-inline mt-3 text-start" v-if="role.termsAndConditions !== 'N/A'">
                            <input class="form-check-input" type="checkbox" v-modal="isDisabled" @click="checktream">
                            <label class="form-check-label" for="rember"><p v-if=" role.id != 2" v-html="role.termsAndConditions">
								</p>
                                <p v-if=" role.id == 2">
                                    I understand <router-link :to="{name:'Consent_view'}" class="special-text-color" type="button">what it means </router-link> to be an accredited investor and consent to be treated as one on SAC.
Read the <router-link :to="{name:'Withdrawal_of_consent'}" class="special-text-color" type="button">withdrawal of consent </router-link> here
								</p>
                            </label>
                        </div>

                        <div class="grid-button mt-4">
                            <router-link :to="{name:'registration'}" class="btn btn-secondary" type="button">No, go back</router-link>
                            <span v-if="!isDisabled"  class="btn btn-warning" type="button"> Yes,
                                Continue</span>
                            <router-link v-else-if="role.id == 1 || role.id == 2"  :to="{name:'checkregistration_reg',params: {id:role.id }}" class="btn btn-warning" type="button">
                            Yes,
                                Continue</router-link>
                                <router-link v-else  :to="{name:'investor_personinfo',params: {id:role.id }}" class="btn btn-warning" type="button">
                            Yes,
                                Continue</router-link>
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
    }
}

}
</script>
