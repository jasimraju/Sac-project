<template>
    <div class="col-lg-7 col-md-7 ">
        <div class="right-sidebar">
            <RegHeader />

            <div class="right-sidebar-register-conten">
                <form class="row g-3 needs-validation mt-3 text-center" @submit.prevent="handleregistration"
                            @keydown.enter="$event.preventDefault()">
                            <h5><b>Forget Passsword</b></h5>
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
                                <button class="btn btn-warning bt-ms">Submit</button>
                            </div>
                        </form>
              
                <Android />
            </div>

        </div><!-- right-sidebar --->
    </div>
</template>    
<script>
import Validation from '../../Validation'
export default {
    name: 'Manage_password',
    mixins: [Validation],
  
    components: {
        
        Android: () => import("../AndroidLink.vue"),
        RegHeader: () => import("../RegHeader.vue")
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
                    userId: this.getsessionkey('response_id'),
                };
                this.global_ver_Post('user/forgot/password/change?password='+postdata.password+'&confirmPassword='+postdata.confirmPassword+'&userId='+postdata.userId,postdata).then((result) =>{
         const rolesdata = result.data;
         this.successmsg = rolesdata.statusMessage;
     if(this.successmsg){
        const thanks_mgs = {
                    "title":"Password change Successful",
                    "description": "We have recived your proof payment. you will recive the notification after we received the payment within 3-5 business days. Please do not hesitate th contact us at 67004548 if you have quesions.",
                    "link":"login",
                    'button_text':"Go Login"
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'});
     }else{
        console.log('falid')
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
                console.log(postdata);

            }
        },
        
    }
}
</script>