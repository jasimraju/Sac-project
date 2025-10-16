<template>
	<div class="col-lg-7 col-md-7 loginrightsidebar">
		<div class="row">
			<div class="right-sidebar">
				<RegHeader />
				<div class="right-sidebar-login-card">
					<div class="user-section-title">
						<h3>Sign In to SAC Capital</h3>
						<h6>Don't have an account? <router-link :to="{ name: 'registration' }">Create
								Account</router-link>
							here.</h6>
					</div>
					<div class="login-form">
						<form class="row mt-4" @submit.prevent="handleLogin" @keydown.enter="$event.preventDefault()">
							<div class="input-group mb-3">
								<input class="form-control" type="text" v-model="inputdata.email.name"
									placeholder="Email Address" id="parent-email" />
							</div>
							<div class="input-group mb-3">
								<input class="form-control" :type="fieldType" id="parent-password"
									v-model="inputdata.password.name" placeholder="password">
								<button class="btn btn-outline-secondary" type="button" id="button-addon2"
									data-id="parent-password" @click="showpassword"><i
										class="password-show fas fa-eye"></i></button>
							</div>
							<div class="">
								<div class="form-check form-check-inline">
									<input class="form-check-input" :checked="inputdata.selected===rember" type="radio" v-model="inputdata.selected"
										@click="uncheck('rember')" id="rember">
									<label class="form-check-label" for="rember">
										Remember Me
									</label>
								</div>
								<router-link class="forgot-password" :to="{ name: 'forgetpassword' }">Forgot
									password</router-link>

							</div>
							<div class="error-box" v-if="errors.length">
								<p v-for="error in errors" v-bind:key="error"><a href="#"><i
											class="fas fa-times-circle"></i></a>{{ error }}</p>
							</div>

							<div class="mt-4 mb-3">
								<button class="btn btn-warning bt-ms">Sign In</button>
								<span class="btn btn-warning bt-ms" @click="go_sinpass_reg"> <span
										style="padding-right:5px; margin-top:-2px"> Log in with singpass </span> </span>
								<a href="#authentication" id="opt_id" class="btn btn-warning bt-ms d-none"
									data-bs-toggle="modal"></a>
								<a href="#notification-modal" id="notice_show" class="btn btn-warning bt-ms d-none"
									data-bs-toggle="modal"></a>
							</div>
						</form>
						<AuthenticationModal v-bind:phone_number="phone_number" v-bind:user_email="user_email" />
						<AuthenticationsuccessModal />
						<Login_verfiy />
					</div>

					<Android />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Validation from '../Validation'
export default {
	name: 'Login_innerview',
	mixins: [Validation],
	props: {
		msg: String
	},
	data() {
		return {
			inputdata: {
				selected: 'two',
    previouslySelected: 'two',
				email: {
					name: null,
					key: ['requiredFunction', 'validEmail'],
					msg: ['Email address is required', 'Please type a valid email address'],
					keyname: "email"
				},
				password: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Password is required'],
					keyname: "password"
				},
				rember: {
					name: null,
					key: null,
					msg: null,
					value: 'rember',
					keyname: "rember"
				}
			},
			errors: [],
			response: [],
			fieldType: "password",
			isModal: true,
			phone_number: "123456",
			user_email: "123456",
			userlogin: false,
			token: null,
			code: null,
			nric: null

		}
	},
	components: {
		Android: () => import("./AndroidLink.vue"),
		RegHeader: () => import("./RegHeader.vue"),
		AuthenticationModal: () => import("./modal/AuthenticationModal.vue"),
		AuthenticationsuccessModal: () => import("./modal/AuthenticationsuccessModal.vue"),
		Login_verfiy: () => import("./modal/Login_verfiy.vue"),
	},
	created() {
		this.checkuserlogin();
		if (this.userlogin) {
			this.$router.push({ name: 'home' })
		}
		if (this.$route.query.number != undefined) {

			this.token = decodeURI(this.$route.query.data);
			this.code = decodeURI(this.$route.query.code);
			this.nric = decodeURI(this.$route.query.number);
			console.log(this.token);
			//call login api
			var postdata = {
				nric: this.nric,
				accessToken: this.token
			};
			//var get_optel = document.querySelector("#notice_show");
			this.globalPost('/v1/auth/user/singpass/login', postdata).then((result) => {
				console.log(result);

				this.successfulllogin(result);

				this.$router.push({ name: 'home' });
			}).catch((error) => {
				if (error.response) {
					//do something
					this.errors.push(error.response.data.message);
				}
				else if (error.request) {
					//do something else
					this.errors.push(error.response.data.message);

				} else if (error.message) {
					//do something other than the other two
					this.errors.push(error.response.data.message);
				}
			});
		}
	},
	methods: {
		uncheck: function (rember) {
			
			if (rember === this.inputdata.selected) {
				this.inputdata.selected = false;
				
			} else {
				this.inputdata.selected = rember;
				
			}

		},
		handleLogin() {
			this.validation = [];
			this.errors = [];
			this.validationallform(this.inputdata);

			var checkvalidtion = this.checkvalidationarray(this.validation);
			if (checkvalidtion) {
				var postdata = {
					email: this.inputdata.email.name,
					password: this.inputdata.password.name
				};
				this.globalPost('/v1/auth/user/login', postdata).then((result) => {
					console.log(result);
					console.log(this.phone_number);
					var get_optel = document.querySelector("#opt_id");
					get_optel.click();
					this.phone_number = result.data.response.mobileNumber;
					this.user_email = result.data.response.email;
				}).catch((error) => {
					if (error.response) {
						//do something
						this.errors.push(error.response.data.message);
					}
					else if (error.request) {
						//do something else

					} else if (error.message) {
						//do something other than the other two
					}
				});
			}
			else {
				console.log("submitting");
			}

		},
		showpassword: function () {
			if (this.fieldType == "password") {
				this.fieldType = "text";
			} else this.fieldType = "password";
		},
		go_sinpass_reg: function () {
			const route = this.$router.resolve({ name: 'login' });
			const absoluteURL = new URL(route.href, window.location.origin).href;
			const re_url = this.globalGet_singpass_url() + "?red_url=" + encodeURIComponent(absoluteURL);
			console.log(re_url);
			window.location.href = re_url;

		}

	}


}
</script>