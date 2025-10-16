<template>
    <div class="col-lg-7 col-md-7 ">
        <div class="right-sidebar">
            <RegHeader />

            <div class="right-sidebar-register-conten">
                <div class="user-register-form">
                    <div class="user-view-register text-left">
                        <h3>Forget password</h3>
                        <p>Enter your email address below: </p>
                    </div>
                    <form class="row mt-4" @submit.prevent="handleregistration" @keydown.enter="$event.preventDefault()">
                        <div class="mb-3">
                            <input type="email" class="form-control" id="parent-email" v-model="inputdata.email.name"
                                placeholder="Enter Your Email Address">
                        </div>
                        <div class="error-box" v-if="errors.length">
									<p v-for="error in errors" v-bind:key="error"><a href="#"><i class="fas fa-times-circle"></i></a>{{ error }}</p>
								</div>
                        <div class="mt-4 mb-3">
                            <button class="btn btn-warning bt-ms">SUBMIT</button>
                            <a href="#authentication" id="opt_id" class="btn btn-warning bt-ms d-none" data-bs-toggle="modal"></a>
                        </div>
                       
                        <div class="note">
                            <p>Have account already? <a href="">Sign In</a> here.</p>

                        </div>
                    </form>
                </div>
                <AuthenticationModal v-bind:user_id="user_id" v-bind:user_email = "inputdata.email.name"/>
								<AuthenticationModal />
                <Android />
            </div>

        </div><!-- right-sidebar --->
    </div>
</template>   

<script>
import Validation from '../../Validation'
export default {
    name: 'Forgetpassword_view',
    mixins: [Validation],
    components: {
        Android: () => import("../AndroidLink.vue"),
        RegHeader: () => import("../RegHeader.vue"),
        AuthenticationModal: () => import("../modal/Forgetotpmodal.vue"),
    },
    data() {
        return {
            inputdata: {
                email: {
                    name: null,
                    key: ['requiredFunction', 'validEmail'],
                    msg: ['Email field are required', 'Please type valid email'],
                    keyname: "email",

                }
            },
            user_id:null,
            errors: [],
        }
    },
    methods: {
        handleregistration: function () {
            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {

                var post_email = this.inputdata.email.name;
                //globalGet
                this.globalgetdata('user/forgot/password?email=' + post_email).then((result) => {
                    console.log(result);
                    var response = result.data;
                    this.user_id = response.response;
                    console.log(this.user_id);
                    var get_optel = document.querySelector("#opt_id");
                    get_optel.click();
                }).catch((error) => {
                    console.log(error);
                    this.errors.push('Email address does not exists');
                });

            }
        }
    }
}
</script>
