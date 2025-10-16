<template>
    <div>
        <section class="contact-us-section">
            <div class="container">
                <div class="row">

                    <div class="col-lg-4 col-md-4">
                        <div class="contact-card-inner">
                            <div class="contact-card">
                                <img src="../../assets/image/icons/contact-phone.png" alt="">
                                <h4>Phone</h4>
                                <p v-if="contact_details != null">{{ contact_details.contactNo}}</p>
                                <p v-else>+65 6232 3200</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4">
                        <div class="contact-card-inner">
                            <div class="contact-card">
                                <img src="../../assets/image/icons/contact-email.png" alt="">
                                <h4>E-mail</h4>
                                <p v-if="contact_details != null">{{ contact_details.email}}</p>
                                <p v-else>enquiry@saccapital.com.sg</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4">
                        <div class="contact-card-inner">
                            <div class="contact-card">
                                <img src="../../assets/image/icons/contact-address.png" alt="">
                                <h4>Address</h4>
                                <p v-if="contact_details != null">{{ contact_details.unitNo}}, {{ contact_details.street }},
                                    {{ contact_details.country }}, {{ contact_details.pincode }}</p>
                                <p v-else>1 Robinson Road, #21-00 AIA Tower, Singapore 048542</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="contact-us-section bg-image" v-if="userlogin">
            <div class="container">
                <div class="contact-form-section">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="contact-form-support">
                                <h5>Support Us</h5>
                                <h3>Where can we improve</h3>
                                <p>We always working to improve the SAC Capital experience, we’d love to hear what’s
                                    working and how we can be do better.</p>

                                <h4>What would you like to do?</h4>
                                <ul>
                                    <li><img src="../../assets/image/icons/like-do.svg" alt=""> SAC services</li>
                                    <li><img src="../../assets/image/icons/like-do.svg" alt=""> App Experience </li>
                                    <li><img src="../../assets/image/icons/like-do.svg" alt=""> Investment Experience</li>
                                    <li><img src="../../assets/image/icons/like-do.svg" alt=""> Others</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="contact-form">
                                <h3>Contact Form</h3>
                                <form @submit.prevent="handleregistration"
                            @keydown.enter="$event.preventDefault()">
                                    <div class="mb-3" :id="'parent-'+inputdata.email.keyname">
                                        <input type="email"  v-model="inputdata.email.name" class="form-control" id="" placeholder="Enter Email Address">
                                    </div>
                                    <div class="mb-3" :id="'parent-'+inputdata.feedbackId.keyname">
                                        <select class="form-select" v-model="inputdata.feedbackId.name">
                                            <option value="" Selected>What would you like to do?</option>
                                            <option value="1">SAC services</option>
                                            <option value="2">App Experience</option>
                                            <option value="3">Investment Experience</option>
                                            <option value="4">Others</option>
                                        </select>
                                    </div>

                                    <div class="mb-3" :id="'parent-'+inputdata.feedback.keyname">
                                        <textarea class="form-control"  v-model="inputdata.feedback.name" rows="4"
                                            placeholder="Share Your Feedback"></textarea>
                                    </div>
                                    <div class="error-box" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error"><a href="#"><i
                                            class="fas fa-times-circle"></i></a>{{ error }}</p>
                            </div>
                                    <button type="submit" class="btn btn-warning">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>   

<script>
import Validation from '../../Validation'
export default {
    name: 'Contact_view',
    mixins: [Validation],
    data() {
        return {
            contact_details: null,
            inputdata: {
                email: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['This field are required'],
                    keyname: "email",
                    pattern: null,
                    key_ser: 1

                },
                feedbackId: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['This field are required'],
                    keyname: "feedbackId",
                    pattern: null,

                },  
                feedback: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['This field are required'],
                    keyname: "feedback",
                    pattern: null,

                }
            },
            errors: [],
            validation: []
        }
    },
    created() {
        this.checkuserlogin();
        if (this.userlogin) {
            this.globalGetreauth('userProfile/contact/us').then((result) => {
                const responsedata = result.data;
                this.contact_details = responsedata;


            }).catch((error) => {
                if (error.response) {
                    //do something					
                }
                else if (error.request) {
                    //do something else						
                } else if (error.message) {
                    //do something other than the other two
                }
            });
        }
    },
    methods:{
        handleregistration:function(){
            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);
            //globalpostauth
            var checkvalidtion = this.checkvalidationarray(this.validation);
            console.log(this.errors);
            if (checkvalidtion) {
                var postdata = {
                    email: this.inputdata.email.name,
                    feedbackId: this.inputdata.feedbackId.name,
                    feedback: this.inputdata.feedbackId.name,
                };
                this.globalpostauth('userProfile/save/feedback/services',postdata).then((result) =>{
                    console.log(result);
                    var rdata = result.data;
                    if(rdata.status){
                    const thanks_mgs = {
                    "title":"Thanks you for feedback",
                    "description": "We've received your feed and we will notify. If required, we will contact you for further information.",
                    "other": "If you require any clarfication or information please email us at enquiry@saccapital.com.sg",
                    "link":"contact",
                    'button_text':"View Contact"
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'})
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