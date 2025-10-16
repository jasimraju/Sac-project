<template>
      <div class="col-lg-7 col-md-7 ">
     
        <div class="right-sidebar">
            <RegHeader />
            <div class="right-sidebar-register-conten">
                    <div >
                        <div class="change-email text-center">
                            <h4><b>Re-send Email</b></h4>
                            <p>Wrong email? Re-enter your email address below: </p>

                            <form class="row g-3 needs-validation mt-3" novalidate="" @submit.prevent="handleregistration"
                                @keydown.enter="$event.preventDefault()">
                                <div class="col-md-6 offset-md-3 mb-3" :id="'parent-' + inputdata.email.keyname">
                                    <input class="form-control" type="email" v-model="inputdata.email.name"
                                        placeholder="New Email Address">
                                </div>
                                <div class="error-box" v-if="errors.length">
                                    <p v-for="error in errors" v-bind:key="error"><a href="#"><i
                                                class="fas fa-times-circle"></i></a>{{ error }}</p>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-warning" type="submit">Send Confirmation</button>
                                </div>
                                <div class="note">
                                    <p>Have account already? <a href="">Sign In</a> here.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Android />
                </div>
                </div>
            </div>
        
</template>  
//setsessionkeydatak
<script>
import Validation from '../../Validation'
export default {
    name: 'Investor_view',
    mixins: [Validation],
    components: {
        Android: () => import("../AndroidLink.vue"),
        RegHeader: () => import("../RegHeader.vue"),
    
    },
    data() {
        return {
            request_email: null,
            request_user_details: null,
            errors:[],
            validation:[],
            inputdata: {
                email: {
                    name: null,
                    key: ['requiredFunction', 'validEmail'],
                    msg: ['This field are required', 'Please type valid email'],
                    keyname: "email",

                }
            }


        }
    },
    created() {
        this.request_user_details = this.getsessionkey('userdata');
       if(this.request_user_details != null){
        console.log(this.request_user_details.email);
       }else{
        this.$router.push({ name: 'login'});
       }
 

    },
    methods: {
        handleregistration: function () {

            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);
            //globalpostauth
            var checkvalidtion = this.checkvalidationarray(this.validation);
            console.log(this.errors);
            if (checkvalidtion) {
                var postdata = {
                    email: this.inputdata.email.name
                };
                this.globalfileupload_oneregistration('user/edit/email', postdata).then((result) => {
                    console.log(result);
                    var rdata = result.data;
                    if (rdata.status) {
                        
                        this.$router.push({ name: 'investor_personinfo_confirm'});
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

