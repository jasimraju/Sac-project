<template>
    <div class="col-lg-7 col-md-7 ">
        <div class="right-sidebar">
            <RegHeader />
            <div class="right-sidebar-register-conten">
                <div v-if="view_status === 1">
                    <div class="user-view-register text-center">
                        <img src="../../assets/image/icons/retail-investor.svg" class="img-fluid" alt="">
                        <h3>Resend to Your Email</h3>
                        <p>A confirmation email has been resent to: </p>
                        <strong>{{ request_email }}</strong>
                          <p class="mt-3">Wrong Email? <router-link :to="{name:'email_renter'}">Edit</router-link></p>
                        <p class="mt-3">Didn’t receive an email?<router-link :to="{name:'resendemail'}"> Resend Confirmation </router-link></p>
                    </div>
                    <div class="note-bg">
                        <h4>Can't find the email?</h4>
                        <ul>
                            <li><i class="fas fa-circle"></i>Ensure you have entered your email address correctly.</li>
                            <li><i class="fas fa-circle"></i>You might need to check your spam, junk or promo folder of
                                your
                                email inbox.</li>
                        </ul>
                    </div>
                </div>
                <div v-else-if="view_status === 2">
                    <Email_verification/>
                </div>
                <div v-else>
                      <Not_email_verification/>
                </div>

                <Android />
            </div><!-- end-->

        </div><!-- right-sidebar --->
    </div>

</template>   

<script>
export default {
    name: 'Investor_view',
    components: {
        Android: () => import("../AndroidLink.vue"),
        RegHeader: () => import("../RegHeader.vue"),
        Email_verification: () => import("./Email_verification.vue"),
        Not_email_verification: () => import("./Email_not_verification.vue"),
    },
    data() {
        return {
            request_email: null,
            request_user_details: null,
            view_status: 1

        }
    },
    created() {
        this.request_user_details = this.getsessionkey('userdata');

        this.request_email = this.request_user_details.email;
        var self = this;
        this.globalGetreauth_onetime('user/resendEmail?email='+this.request_email).then((result_j) => {
                   var is_success = result_j.data.status;
                    if(is_success){
                        //success
                        this.view_status = 1;
                       
                          
                          
                    }else{
                        //faild
                        this.view_status = 3;
                    }
                }
                ).catch((error) => {
                        if (error.response) {
                            //do something
                            this.view_status = 3;
                            console.log(error.response)
                        }
                        else if (error.request) {
                            //do something else
                            console.log(error.response)
                            this.view_status = 3;

                        } else if (error.message) {
                            //do something other than the other two
                            console.log(error.response)
                            this.view_status = 3;
                        }
                    });
        setTimeout(function(){self.checkemailvarfication()},30000);


    },
    methods: {
        checkemailvarfication: function () {
            //check email varfication 
                console.log('hello');
                this.globalGetreauth_onetime('user/verify/user').then((result_j) => {
                   var is_success = result_j.data.status;
                    if(is_success){
                        //success
                        this.view_status = 2;
                        var self = this;
                          
                            setTimeout(function(){self.$router.push({ name: 'twosetpauth'})},1000);
                    }else{
                        //faild
                        this.view_status = 3;
                    }
                }
                ).catch((error) => {
                        if (error.response) {
                            //do something
                            this.view_status = 3;
                            console.log(error.response)
                        }
                        else if (error.request) {
                            //do something else
                            console.log(error.response)
                            this.view_status = 3;

                        } else if (error.message) {
                            //do something other than the other two
                            console.log(error.response)
                            this.view_status = 3;
                        }
                    });
            //check login 
           
            //success

            //unsuccess

        }
    }


}
</script>