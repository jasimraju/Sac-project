<template>
    <section class="explore-app-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="user-profile-section">
                        <form class="row g-3 needs-validation mt-3 text-center" @submit.prevent="handleregistration"
                            @keydown.enter="$event.preventDefault()">
                            <h5><b>Change Passsword</b></h5>
                            <span class="form-label">Donec ligula sapien, pulvinar non nisi at, auctor pellent nare
                                gravida</span>
                            <div class="col-md-6  mb-3">
                                <input class="form-control" id="parent-password" :type="fieldType" v-model="inputdata.password.name"
                                    placeholder="Enter password">
                            </div>
                            <div class="col-md-6 mb-3">
                                <input class="form-control" :type="fieldType_confirm"
                                    v-model="inputdata.confirm_password.name" id="parent-confirm_password" placeholder="Re-Enter Password">
                            </div>
                            <div class="error-box" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error"><a href="#"><i
                                            class="fas fa-times-circle"></i></a>{{ error }}</p>
                            </div>
                            <div class="mt-4 mb-3">
                                <button class="btn btn-warning bt-ms">Verifiy</button>
                            </div>
                        </form>
                        <a href="#authentication" id="opt_id" class="btn btn-warning bt-ms d-none" data-bs-toggle="modal"></a>
                        <PasswordverfiyModal v-bind:password="inputdata.password.name" v-bind:successmessage = "successmsg"/>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>   
   
<script>
import Validation from '../../Validation'
export default {
    name: 'Manage_password',
    mixins: [Validation],
    components: {
		PasswordverfiyModal: () => import("../modal/PasswordverfiyModal.vue"),
	},
    data() {
        return {
            inputdata: {
                password: {
                    name: null,
                    key: ['requiredFunction', 'passwordvalidation'],
                    msg: ['Password field are required', 'Invalid password'],
                    keyname: "password",
                    pattern: null,
                    key_ser: 1

                },
                confirm_password: {
                    name: null,
                    key: ['requiredFunction', 'checkConfirmpassword'],
                    msg: ['Confirm Password field are required', 'Password not match'],
                    keyname: "confirm_password",
                    pattern: "password",

                }
            },
            errors: [],
            validation: [],
            fieldType: "password",
            fieldType_confirm: "password",
            userlogin: false,
            response_value: null,
            rules: [],
            successmsg:null
        }
    },
    created() {
        var pattern = [{ description: "Minimum 8 characters", id: 1, regex: "^.{8,}$", title: "Password should contain" },
        { description: "At least 1 Upper Case & 1 Lower Case", id: 2, regex: "^(?=.*[a-z])(?=.*[A-Z]).+$", title: "Password should contain" },
        { description: "At least 1 Number", id: 3, regex: "^(?=.*[0-9]).*$", title: "Password should contain" },
        { description: "At least 1 Symbol", id: 4, regex: "?=.*[@#$*!%^&+.=]).*$", title: "Password should contain" }
        ];
        this.inputdata.password.pattern = pattern;

    },
    methods: {
        changepassword: function (type) {
            if (type == 1) {
                this.fieldType = this.showpassword(this.fieldType);
            }
            else {
                this.fieldType_confirm = this.showpassword(this.fieldType_confirm);
            }
        },
        handleregistration: function () {
            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);
            //globalpostauth
            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {
                var postdata = {
                    password: this.inputdata.password.name,
                    confirmPassword: this.inputdata.confirm_password.name,
                };
                this.globalpostauth('userProfile/update/password?password='+postdata.password+'&confirmPassword='+postdata.confirmPassword,postdata).then((result) =>{
         const rolesdata = result.data;
         this.successmsg = rolesdata.statusMessage;
         var get_optel = document.querySelector("#opt_id"); 
					get_optel.click();
       /*if(rolesdata.status == true){
         const thanks_mgs = {
                    "title":"Password updated successfully",
                    "description": "Password updated successfully",
                    "other": "Password updated successfully",
                    "link":"",
                    'button_text':null
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'});
            }*/

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
                console.log(postdata);

            }
        },
        
    }
}
</script>