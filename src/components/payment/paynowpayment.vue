<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="subcription-form">
                <div class="share-payment-details">

                   
                        <div class="subcription-card">
                            <div class="head">
                                <div class="logo">
                                    <a href="../../"><img class="img-fluid" v-if="payment_details.thumbnailId !=null"
                                                :src="m_baseUrl+m_version+'file/get/'+payment_details.thumbnailId">
                                                <img class="img-fluid" v-else
                                                src="../../assets/image/logo/logo.png"></a>
                                </div>
                                <div class="name">
                                    <small></small>
                                    <h4>{{ payment_details.title }}</h4>
                                </div>
                            </div>

                            <div class="event-data" >
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p v-if="payment_details.status == 'issuer'">Investment Amount Payable</p>
                                                <p v-else>Placement Fee Payable</p>
                                                <h5>S${{ parseFloat(payment_details.amount).toFixed(2) }}</h5>
                                            </td>
                                            <td>
                                                <p>Status</p>
                                                <h5 v-if="payment_details.proofOfPaymentId == null">Pending Payment</h5>
                                                        <h5 v-else>Completed</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" class="due">
                                                <p>Due Date</p>
                                                <h5>{{ subscription_details_data.paymentDate  }}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div><!-- end-->

                        <div class="share-payment-details" v-if="account_details != null">
                            <h6>For payment by PayNow UEN Transfer, kindly transfer the payment with the details as follows:
                            </h6>
                            <div class="qr-code text-center">
                                <img class="img-fluid" :src="m_baseUrl+m_version+'file/get/'+account_details.qrCode" alt="">
                                <div class="">
                                    <button href="" class="btn btn-secondary" type="button">Save QR Code</button>
                                </div>
                            </div>
                            <div class="event-data mt-4">
                                <table class="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>Account Name</p>
                                                <h5>{{ account_details.accountName }}</h5>
                                            </td>
                                            <td>
                                                <p>Unique Entity Number (UEN)</p>
                                                <h5>{{ account_details.uniqueEntityNumber }}</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Bank</p>
                                                <h5>{{ account_details.bank }}</h5>
                                            </td>
                                            <td>
                                                <p>Payment comments / remarks / details</p>
                                                <h5>Please indicate “NAME”</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="note">
                                <p></p>
                            </div>
                        </div>
                        <div class="share-payment-details note">
                                <p>For payment instruction, you'll be contacted later with required details</p>
                            </div>
                        <div class="grid-button mt-2" v-if="account_details != null">
                            <router-link v-if="payment_details.status == 'Brokerage'" class="btn btn-secondary" :to="{ name: 'Payment', params: { type:2,paymenttype: 1 }}">Back</router-link>
                            <router-link v-else class="btn btn-secondary" :to="{ name: 'Payment', params: { type:2,paymenttype: 2 }}">Back</router-link>
                            <span @click="go_upload_payment_slip" class="btn btn-warning" >Next</span>
                        </div>
                        <div class="grid-button mt-2" v-else>
                            <router-link  class="btn btn-secondary" :to="{ name: 'myactive'}">Back</router-link>

                        </div>

                </div>

            </div>
        </div>
    </div>
</template>    

<script>
export default {
    name: 'Subscription_description',
    props: {
        subscription_details_data_data: Object
    },
    data(){
        return{
            payment_details:null,
            account_details:null,
            subscription_details_data:null
        }
    },  
    created(){
       this.payment_details = this.getlocalkey('process_payment');
       this.subscription_details_data = this.getlocalkey('subcriptionitems_tem');
       var investmentId = this.subscription_details_data.investmentId;
       this.globalGetreauth('investment/payment/issuer/brokerage/details/'+investmentId).then((result) => {
			const responsedata = result.data;
			if(this.payment_details.status == 'issuer'){
                this.account_details = responsedata.issuerDetails; 
            }else{
                this.account_details = responsedata.brokerageDetails;
            }
			console.log(responsedata);
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
    },
    methods:{
        go_upload_payment_slip:function(){
            var v_type = this.$route.params.paymenttype
            this.$router.push({ name: 'Payment', params:{type:6,paymenttype:v_type} })
        }
    }


}
</script>