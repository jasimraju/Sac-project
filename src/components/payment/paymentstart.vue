<template>
    <div><div class="row" v-if="showpaymentoption == 1">
    <div class="col-md-8 offset-md-2">
        <div class="subcription-form">
            <div class="payment text-center">
                <img src="../../assets/image/icons/payment.svg" alt="" class="img-fluid">
                <div class="mt-3">
                    <h3><strong>The Subscription Form has been Successfully Submitted. Please proceed to payment to complete the application</strong></h3>
                    <h5 class="">Deadline by {{ this.paymentDate  }}</h5>
                    <p> Please click on "Pay Now" for the payment instructions</p>
                </div>

                <div class="grid-button mt-4">
                    <router-link class="btn btn-secondary" :to="{ name: 'home'}">Back to home</router-link>
                    <button @click="activepaynowbutton" class="btn btn-warning" type="button" >Pay now</button>
                    <a href="#" class="btn btn-secondary" type="button">Pay later</a>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="row" v-if="showpaymentoption == 2 && (subscription_details_data.status == 'Pending Payment' || subscription_details_data.status == 'Pending Admin Approval')">
                            <div class="col-lg-6 col-md-6" v-for="(payment) in subscription_details_data.payments" :key="payment.investmentId">
                                <div class="subcription-card">
                                    <div class="head">
                                        <div class="logo">
                                            <a href="../../"><img class="img-fluid" v-if="payment.thumbnailId !=null"
                                                :src="m_baseUrl+m_version+'file/get/'+payment.thumbnailId">
                                                <img class="img-fluid" v-else
                                                src="../../assets/image/logo/logo.png"></a>
                                        </div>
                                        <div class="name">
                                            <small></small>
                                            <h4>{{ payment.title }}</h4>
                                        </div>
                                    </div>

                                    <div class="event-data">
                                        <table class="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p v-if="payment.status == 'issuer'">Investment Amount Payable</p>
                                                        <p v-else>Placement Fee Payable</p>
                                                        <h5>S${{ payment.amount }}</h5>
                                                    </td>
                                                    <td>
                                                        <p>Status</p>
                                                        <h5 v-if="payment.proofOfPaymentId == null">Pending Payment</h5>
                                                        <h5 v-else>Completed</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class="submit">
                                                        <p>Payment Due Date & Time</p>
                                                        <h5>{{ subscription_details_data.paymentDate }} {{ tConvert(payment.paymentDueTime+':00') }}</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="subcription-s-button">
                                        <span v-if="payment.proofOfPaymentId == null && payment.status == 'issuer'" @click="created_payment_data(payment,2)"  class="btn btn-warning">Make payment</span>
                                        <span v-else-if="payment.proofOfPaymentId == null" @click="created_payment_data(payment,1)"   class="btn btn-warning">Make payment</span>
                                        <router-link :to="{name:'Payment', params: { type: 1 }}"  v-else class="btn btn-warning">VIEW DETAILS</router-link>
                                    </div>
                                </div><!-- end-->
                            </div>
                          

                        </div></div>
</template>    

<script>
export default {
    name: 'Subscription_description',
     data() {
        return {
			paymentDate:null,
            subscription_details_data:null,
            showpaymentoption:1
		}
	},
	created() {
        var subcription_data = this.getlocalkey('subcriptionitems_tem');
        this.subscription_details_data = subcription_data;
        this.paymentDate = subcription_data.timeline.paymentDate
	},
    methods:{
        activepaynowbutton:function(){
            //this.showpaymentoption = 2;
            this.$router.push({ name:'Payment',params: { type: 1 } })
        },
        created_payment_data:function(payment,ptype){
            payment.amount = parseFloat(payment.amount).toFixed(2)  
            this.setvalueinlocalstroage('process_payment',payment);
            this.$router.push({ name:'Payment',params: { type: 2,paymenttype:ptype } })
        }
    }


}
</script>