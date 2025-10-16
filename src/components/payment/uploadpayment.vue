<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="my-activity-details-box">
                <div class="successful text-center">
                    <h4><strong>Upload Proof of Payment</strong></h4>
                    <p>Kindly upload a copy of Cashier's Order/Cheque/TT payment slip/Screenshot of the PayNow transfer (or any other documentary proof).</p>
                    <div class="upload-files-container">
                        <input type="file" @change="uploadhandler" accept=".pdf, .doc, .jpg, .png" id="file-upload"
                            required="">
                        <label for="file-upload" required="">
                            <img src="">
                            <h5>Upload proof of payment document</h5>
                            <p>Required format: pdf / doc / jpg / png</p>
                        </label>
                    </div>
                    <div class="file-info" v-if="upload_front_name != null">
                        <p>{{ upload_front_name }} <a href="#"></a></p>
                    </div>
                    <div class="grid-button mt-4">
                        <span @click="final_submit" class="btn btn-warning">UPLOAD NOW</span>
                        <router-link :to="{name:'Payment', params: {type:2,paymenttype:1 }}"  class="btn btn-secondary" type="button">BACK</router-link>
                    </div>
                </div>
            </div><!-- end-->
        </div>
    </div>
</template>    

<script>
export default {
    name: 'Subscription_description',
    props: {
        subscription_details_data: Object
    },
    data() {
        return {
            upload_front: null,
            upload_front_name: null
        }
    },
    methods: {
        uploadhandler: function (e) {
            var file_value = e.currentTarget;
            var formData = new FormData();

            formData.append("multipartFile", file_value.files[0]);
            const path = file_value.value
            const fileName = path.split(/(\\|\/)/g).pop();

            this.upload_front_name = fileName;
            this.upload_front = formData;



        },

        final_submit: function () {
            if (this.upload_front != null) {
                this.globalfileupload('file/secure/upload', this.upload_front).then((result) => {

                    var uploadfile_id = result.data.response.id;

                    this.final_dat_submit(uploadfile_id);

                }).catch((error) => {
                    console.log(error);
                });

            }
        },
        final_dat_submit: function (file_id) {
            console.log(file_id);
            var subcriptionitems_tem = this.getlocalkey('subcriptionitems_tem');
            var payment_details = this.getlocalkey('process_payment');
            var pay_type  = parseInt(this.$route.params.paymenttype);
            var post_value = {
                investmentId: subcriptionitems_tem.investmentId,
                proofOfPayment: file_id,
                paymentInfoId: pay_type,
                comments: ""
            }
       
        
            var endpoint;
            if(payment_details.status == 'issuer'){
                endpoint = 'investment/subscription/proofOfPayment';
            }else{
                endpoint = 'investment/subscription/proofOfPayment/brokerage';
            }

            this.globalpostauth(endpoint, post_value).then((result_other) => {
                const responsedata = result_other.data;
                console.log(result_other);
                if(responsedata.status){
                const thanks_mgs = {
                    "title":"Upload Successful",
                    "description": "We have received your proof of payment. You will recive the notification after we received the payment within 3-5 business days. Please do not hesitate to contact us at +6232 3200 or enquiry@saccapital.com.sg if you have any questions.",
                    "link":"myactive",
                    'button_text':"View Subscription"
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'});
            }
            }).catch((error) => {
                if (error.response) {
                    //do something
                    this.errors.push(error.response.data.message);
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
</script>