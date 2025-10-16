<template>
    <div class="col-lg-7 col-md-7 ">
        <div class="right-sidebar">
            <RegHeader />
            <div class="right-sidebar-register-conten">
                <div class="user-view-register text-center">
                    <img src="../../assets/image/icons/retail-investor.svg" class="img-fluid" alt="">
                    <h3>Confirm Your Email</h3>
                    <p>A confirmation email has been sent to: </p>
                    <strong>{{request_email}}</strong>
                    <p class="mt-3">Wrong Email? <a href=""  v-on:click="globalHelper" data-id="hello-bangla">Edit</a></p>
                    <p class="mt-3">Didn’t receive an email?<a href=""> Resend Confirmation </a></p>
                </div>
                <div class="note-bg">
                    <h4>Can't find the email?</h4>
                    <ul>
                        <li><i class="fas fa-circle"></i>Ensure you have entered your email address correctly.</li>
                        <li><i class="fas fa-circle"></i>You might need to check your spam, junk or promo folder of your
                            email inbox.</li>
                    </ul>
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
    },
    data() {
        return {
            request_email:null,
            request_user_details: null

        }
    },
    created() {
        this.request_user_details = this.getlocalkey('reg_details_without_verify');
        this.request_email =  this.request_user_details.email;
        console.log(this.request_user_details);
    }

}
</script>