<template>
    <section class="explore-app-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="user-profile-section">
                        <div class="change-email text-center">
                            <h4><b>Change Phone Number</b></h4>
                            <p>Donec ligula sapien, pulvinar non nisi at, auctor pellent nare gravida</p>

                            <form class="row g-3 needs-validation mt-3" @submit.prevent="handleregistration" @keydown.enter="$event.preventDefault()">
                                <div class="col-md-6 offset-md-3 mb-3">
                                    <input type="number" class="form-control" v-model="inputdata.phonenumber.name"
                                        placeholder="New Phone Number">
                                </div>
                                <div class="error-box" v-if="errors.length">
									<p v-for="error in errors" v-bind:key="error"><a href="#"><i class="fas fa-times-circle"></i></a>{{ error }}</p>
								</div>
                                <div class="text-center">
                                    <button class="btn btn-warning" type="submit">Save Changes</button>
                                    <a href="#authentication" id="opt_id" class="btn btn-warning bt-ms d-none" data-bs-toggle="modal"></a>
                                </div>
                            </form>
                            <TwostepAuthModal v-bind:phone_number="inputdata.phonenumber.name" />
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
    name: 'Notification_setting',
    mixins: [Validation],
    components: {
		TwostepAuthModal: () => import("../modal/TwostepAuthModal.vue"),
	},
    data() {
        return {
            inputdata: {
                phonenumber: {
                    name: null,
                    key: ['requiredFunction'],
					msg: ['Phone number are required'],
					keyname: "phonenumber",

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
                    mobileNumber: this.inputdata.phonenumber.name,

                };
                this.globalpostauth('userProfile/update/mobile', postdata).then((result) => {

                    console.log(result);
                    if(result.data.status == true){
                    var get_optel = document.querySelector("#opt_id"); 
					get_optel.click();
                }else{
                    this.errors.push(result.data.statusMessage);
                }

                }).catch((error) => {
                    if (error.response) {
                        //do something
                        
                        this.errors.push(error.response.data.statusMessage);
                    }
                    else if (error.request) {
                        //do something else
                       
                        this.errors.push(error.response.data.statusMessage);

                    } else if (error.message) {
                        
                        //do something other than the other two
                        this.errors.push(error.response.data.statusMessage);
                    }
                });
            }
        }
    }

}
</script>