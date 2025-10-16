<template>
    <section class="explore-app-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="user-profile-section">
                        <div class="change-email text-center">
                            <h4><b>Change Email</b></h4>
                            <p>Donec ligula sapien, pulvinar non nisi at, auctor pellent nare gravida</p>

                            <form class="row g-3 needs-validation mt-3" @submit.prevent="handleregistration" @keydown.enter="$event.preventDefault()">
                                <div class="col-md-6 offset-md-3 mb-3">
                                    <input class="form-control" type="email"  v-model="inputdata.email.name"
                                        placeholder="New Email Address">
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-warning" type="submit">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>   
   
<script>
import Validation from '../../Validation';

export default {
    name: 'change_email_setting',
    mixins: [Validation],
    data() {
        return {
            inputdata: {
                email: {
                    name: null,
                    key: ['requiredFunction', 'validEmail'],
                    msg: ['Email field is required', 'Please type a valid email'],
                    keyname: "email",

                }
            },
            errors: [],
            validation: [],
            userlogin: false,
            rules: []
        }
    },
    created() {

    },
    methods: {
        handleregistration: function () {


            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {

                var postdata = {
                    email: this.inputdata.email.name,

                };
                this.globalpostauth('userProfile/update/email/mobile', postdata).then((result) => {

                    console.log(result);

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