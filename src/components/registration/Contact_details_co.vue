<template>
    <div>
                <div class="user-view-register" v-if="view_success ==1">
                    <h3>Please provide your contact details</h3>
                    <p>Your contact details will be used for all further communication from SAC Capital. We are
                        committed to keeping your contact details confidential. We will not provide your personal
                        information to any third party individual or company.</p>
                    <div class="login-form">
                        <form class="row mt-4" @submit.prevent="handleregistration" @keydown.enter="$event.preventDefault()">
                            <div class="mb-3">
                                <input type="text" class="form-control" id="parent-companyName"  v-model="inputdata.companyName.name"
                                    placeholder="Enter Your Company Name">
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" id="parent-fullName" placeholder="Enter Your Full Name" v-model="inputdata.fullName.name">
                            </div>
                            <div class="mb-3">
                                <input type="number" class="form-control" id="parent-phoneNumber"  v-model="inputdata.phoneNumber.name"
                                    placeholder="Enter Your Phone Number">
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control" id="parent-email"  v-model="inputdata.email.name"
                                    placeholder="Enter Your Email Address">
                            </div>
                            <div class="error-box" v-if="errors.length">
									<p v-for="error in errors" v-bind:key="error"><a href="#"><i class="fas fa-times-circle"></i></a>{{ error }}</p>
								</div>
                            <div class="mt-4 mb-3">
                                <button  class="btn btn-warning bt-ms">SUBMIT</button>
                            </div>
                            <p>By clicking ‘Submit’ you agree for us to contact you.</p>
                        </form>
                    </div>
                </div>
                <div class="user-view-register text-center" v-else>
                    <Submission_success/>
                </div>
            </div>

</template>   

<script>
import Validation from '../../Validation'
export default {
    name: 'Investor_view',
    mixins: [Validation],
    components: {
        Submission_success: () => import("./Submission_success.vue"),
    },
    data() {
        return {
            inputdata: {
                email: {
                    name: null,
                    key: ['requiredFunction', 'validEmail'],
                    msg: ['Email field are required', 'Please type valid email'],
                    keyname: "email",

                },
                companyName: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Company Name field are required'],
                    keyname: "companyName",

                },
                fullName: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Full Name field are required'],
                    keyname: "fullName",

                },
                phoneNumber: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Phone Number field are required'],
                    keyname: "phoneNumber",

                }
           
            },
            errors: [],
            validation: [],
            userlogin: false,
            response_value: null,
            rules: [],
            view_success:1
        }
    },
    created() {

    },
    methods: {
        handleregistration: function () {
            
            var user_role_id = this.$route.params.id;
            this.validation = [];
			this.errors = [];
			this.validationallform(this.inputdata);

			var checkvalidtion = this.checkvalidationarray(this.validation);
			if (checkvalidtion) {
               
                var postdata = {
                    userRoleId:user_role_id,
					email: this.inputdata.email.name,
					companyName: this.inputdata.companyName.name,
                    fullName: this.inputdata.fullName.name,
                    phoneNumber: this.inputdata.phoneNumber.name,
				};
				this.global_ver_Post('user/contactDetails', postdata).then((result) => {
					
                    if(result.data.status == true){
                        this.view_success = 2;
                    }
                    else{
                        this.errors.push(result.response.data.message);
                    }
				
				}).catch((error) => {
					if (error.response) {
						//do something
                     this.errors.push(error.response.data.statusMessage);
					}
					else if (error.request) {
						//do something else
						
					} else if (error.message) {
						//do something other than the other two
					}
				});
            }
        }
    }

}
</script>
