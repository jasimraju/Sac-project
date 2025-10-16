<template>
    <div>
    <div class="row justify-content-center">
        <div class="col-lg-4 col-md-4" v-for="(payment) in subscription_details_data.payments" :key="payment.investmentId">
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
                                                        <h5>S${{ parseFloat(payment.amount).toFixed(2) }}</h5>
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
                                        <span v-if="payment.proofOfPaymentId == null && payment.status == 'issuer'" @click="created_payment_data(payment,2)"  class="btn btn-warning">Payment Instructions</span>
                                        <span v-else-if="payment.proofOfPaymentId == null" @click="created_payment_data(payment,1)"   class="btn btn-warning">Payment Instructions</span>
                                        <span   v-else class="btn btn-warning">VIEW DETAILS</span>
                                    </div>
                                </div><!-- end-->
                            </div>
  


</div>
<div class="grid-button mt-4 text-center">
<router-link :to="{name:'home'}" class="btn btn-secondary">Back to home</router-link>
<router-link :to="{name:'home'}" class="btn btn-secondary">Pay later</router-link>

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
        return {
            subscription_details_data:null, 
        }
    },
    created() {
        this.subscription_details_data = this.getlocalkey('subcriptionitems_tem');
       
        //this.checkevent_id_exit()
    },
    methods:{
        created_payment_data:function(payment,ptype){
            
            this.setvalueinlocalstroage('process_payment',payment);
            if(ptype == 1){
                this.setvalueinlocalstroage('process_payment_end','/brokerage');
            }else{
                this.removeLocakey('process_payment_end');
            }

           
            this.$router.push({ name:'Payment',params: { type: 2,paymenttype:ptype } })
        }
    }



}
</script>