<template>
	<div class="col-lg-7 col-md-7 ">
		<div class="right-sidebar">
			<RegHeader />
			<div class="right-sidebar-register-conten">
				<div class="user-register-form">
					<div class="user-view-register text-left">
						<h3>Two-step Authentication</h3>
						<p>To keep your account secure, please enter your phone number for the two-step verification.
						</p>
					</div>
					<form class="row mt-4" @submit.prevent="handlephonenumber" @keydown.enter="$event.preventDefault()">
						<div class="mb-3">
							<input type="number" class="form-control" v-model="inputdata.phonenumber.name" 
									id="parent-phonenumber" placeholder="Enter Your Phone Number">
						</div>

						<div class="error-box" v-if="errors.length">
									<p v-for="error in errors" v-bind:key="error"><a href="#"><i class="fas fa-times-circle"></i></a>{{ error }}</p>
								</div>

						<div class="mt-4 mb-3">
						<button class="btn btn-warning bt-ms">Continue</button>
									<a href="#authentication" id="opt_id" class="btn btn-warning bt-ms d-none" data-bs-toggle="modal"></a>
						</div>
						<RegAuthenticationModal v-bind:phone_number="inputdata.phonenumber.name" v-bind:user_email = "user_email"/>

						<div class="note">
							<p>Have account already? <router-link :to="{name:'login'}">Sign In</router-link> here.</p>
						</div>
					</form>
				</div>
				<Android />
			</div><!-- end-->

		</div><!-- right-sidebar --->
	</div>

</template>   

<script>
import Validation from '../../Validation'
export default {
	name: 'Investor_view',
	mixins: [Validation],
	components: {
		Android: () => import("../AndroidLink.vue"),
		RegHeader: () => import("../RegHeader.vue"),
		RegAuthenticationModal: () => import("../modal/RegAuthenticationModal.vue"),
	},
	data() {
		return {
			inputdata: {
				phonenumber: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Phone number are required'],
					keyname: "phonenumber",

				}
			},
			errors: [],
			validation: [],
			response_value: null,
			rules: [],
			user_email:'',
		}
	},
	created() {
		var userdataonelogin = this.getsessionkey('userdata');
	
		if(userdataonelogin == null){
			var token_json = localStorage.temp_token;
			if(token_json == null){
			this.$router.push('/login');
			}
		}
	else{
		var token = sessionStorage.token;
		var role_id = sessionStorage.role_id;
		console.log(token);
		this.setvalueinlocalstroage_all('temp_token',token);
		this.setvalueinlocalstroage('temp_userdata',userdataonelogin);
		this.setvalueinlocalstroage('temp_role_id',role_id);
	}
	},
	methods: {
		handlephonenumber() {
			this.validation = [];
			this.errors = [];
			var checkvalidtion = this.checkvalidationarray(this.validation);
			if (checkvalidtion) {
				var userdataonelogin = this.getsessionkey('userdata');
				if(userdataonelogin == null){
					userdataonelogin = this.getlocalkey('temp_userdata');
				}
				var number = this.inputdata.phonenumber.name;

				//save mobile browser
				this.saveregistration_data('phone_number',number);
			
				//generate and save moblile number
				this.globalPostreauth_onetime('user/generate/otp?mobileNo='+number,null).then((result_j) => {
					var is_success = result_j.data.status;
					if(is_success){
						var get_optel = document.querySelector("#opt_id"); 
					get_optel.click();
					}else{
						//error
						var message = result_j.data.statusMessage;
						this.errors.push(message);
					}
				}).catch((error) => {
                        if (error.response) {
                            //do something
                            this.view_status = 3;
							var message = error.response.data.statusMessage;
							this.errors.push(message);
                            
                        }
                        else if (error.request) {
                            //do something else
                          
                            this.view_status = 3;

                        } else if (error.message) {
                            //do something other than the other two
                           
                            this.view_status = 3;
                        }
                    });

				this.user_email = userdataonelogin.email;
				
			}
		},
	}

}
</script>
