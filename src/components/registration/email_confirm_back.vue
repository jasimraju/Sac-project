<template>
    <div class="col-lg-7 col-md-7 ">
        <div class="right-sidebar">
            <RegHeader />
            <div class="right-sidebar-register-conten">
                <div v-if="view_status === 1">
                    <div class="user-view-register text-center">
                        <img src="../../assets/image/icons/retail-investor.svg" class="img-fluid" alt="">
                        <h3>Confirm Your Email</h3>
                        <p>A confirmation email has been sent to: </p>
                        <strong>{{ request_email }}</strong>
                        <p class="mt-3">Wrong Email? <a href="" @click="reg_email_edit"
                                data-id="hello-bangla">Edit</a></p>
                        <p class="mt-3">Didn’t receive an email?<a href=""> Resend Confirmation </a></p>
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
                <div v-else-if="edit_status ===2">
                    <Email_edit/>
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
        Email_edit: () => import("./Renter_email_address.vue"),
    },
    data() {
        return {
            request_email: null,
            request_user_details: null,
            view_status: 1,
            edit_status:1,
            call_settime:null

        }
    },
    created() {
        this.request_user_details = this.getsessionkey('email');

        this.request_email = this.request_user_details.email;
        var self = this;
        this.call_settime = setTimeout(function(){self.checkemailvarfication()},30000);
  

    },
    methods: {
        reg_email_edit: function(){
            clearTimeout(this.call_settime);
            this.view_status = 3;
        },
        checkemailvarfication: function () {
            //check email varfication 

            //check login 
            var postdata = {
                email: this.request_user_details.email,
                password: this.decryptData(this.request_user_details.secrect_key)
            };
            console.log(postdata);
            this.globalPost('/v1/auth/user/login', postdata).then((result) => {
                console.log(result);
                console.log(result.data.response.emailVerified);
                if (result.data.response.emailVerified) {
                    //verifiy success
                    //request for jwt #change after api updated
                    this.globalotp('/v1/auth/user/validate/otp?email=' + result.data.response.email + '&otp=123456').then((result_j) => {
                        if (result_j.data.status == true) {
                            this.successfulllogin_tem(result_j);
                            //go two step authtication
                            this.view_status = 2; 
                            console.log(this.view_status);  
                            var self = this;
                            self.$router.push({ name: 'twosetpauth'});
                           // setTimeout(function(){self.$router.push({ name: 'twosetpauth'})},1000);

                        }
                        else {
                            console.log('Something wrong');
                            this.view_status = 3;
                            console.log(this.view_status); 
                            sessionStorage.clear();
                        }
                    }).catch((error) => {
                        if (error.response) {
                            //do something
                            this.view_status = 3;
                        }
                        else if (error.request) {
                            //do something else
                            this.view_status = 3;

                        } else if (error.message) {
                            //do something other than the other two
                            this.view_status = 3;
                        }
                    });
                    //end  jwt authentication

                }
                else {
                    //verifiy unsuccess
                    this.view_status = 3;

                }

            }).catch((error) => {
                if (error.response) {
                    //do something
                    this.view_status = 3;
                }
                else if (error.request) {
                    //do something else
                    this.view_status = 3;

                } else if (error.message) {
                    //do something other than the other two
                    this.view_status = 3;
                }
            });
            //success

            //unsuccess

        }
    }


}
</script>