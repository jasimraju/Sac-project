<template>
    <div class="col-lg-7">
        <div class="subcription-single-data-card">

            <div class="subcription-single-data">
                <div class="row">
                    <div class="col-md-12">
                        <div class="subcription-data">
                            <h6>Type of pricing</h6>
                            <h5>{{ subscription_details_data.typeOfPricing }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Price</h6>
                            <h5>S${{ convertlocla_string(subscription_details_data.issuePrice) }} </h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>No. of Shares</h6>
                            <h5>{{ convertlocla_string(subscription_details_data.noOfShares,true) }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data">
                <div class="row">
                    <h6>Investment Amount Payable</h6>
                    <div class="col-md-12">
                        <div class="subcription-data">
                            
                            <h5>S${{convertlocla_string(grossAmount) }}</h5>
                        </div>
                    </div>
                 
                </div>
            </div><!-- end-->

            <div class="subcription-single-data">
                <div class="row">
                    <h6> Placement Fee Payable</h6>
                    <div class="col-md-12">
                        <div class="subcription-data">
                            
                            <h5>S${{ convertlocla_string(placement_amount) }}</h5>
                        </div>
                    </div>
                   
                </div>
            </div><!-- end-->

            <div class="subcription-single-data">
                <div class="row">
                    
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Final allocation of shares</h6>
                            <h5>{{convertlocla_string(subscription_details_data.finalAllocation.quantityOfSharesSubscribed,true) }}/ {{ convertlocla_string(subscription_details_data.sharesAllocatedToUsers,true) }} </h5>
                        </div>
                    </div>
                </div>

                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" :style="finlallocationcal(subscription_details_data.sharesAllocatedToUsers,subscription_details_data.finalAllocation.quantityOfSharesSubscribed)" aria-valuenow="75"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                
            </div> 
            <div class="total-gross" v-if=" subscription_type == 7">
                                    <p>Total Gross Proceeds</p>
                                    <h4 id="max_total">{{ convertlocla_string(grossAmount)}}</h4>
                                    
                                </div>
            <div class="grid-button mt-4">

                <span v-if="subscription_details_data.status == 'Pending Payment'" ></span>
                <span v-else-if="subscription_details_data.status == 'Pending Admin Approval'"></span>	
                <span v-else-if="subscription_details_data.status == 'Payment Received'"></span>				
                <router-link v-else :to="{name:'subscriptionentry',params: { id: 1 }}" class="btn btn-warning">Subscribe Now</router-link>
            </div>
            
					<!--			<div class="grid-button mt-4">
									<a href="#Continue" class="btn btn-warning" type="button" data-bs-toggle="modal">Subscribe Now</a>
								</div>-->

            <!-- Modal Start visit -->
            <div class="modal fade" id="withdraw" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <Confirmationmodal v-bind:title="comfrmation.title" v-bind:description="comfrmation.description"
                    v-bind:on-click="comfrmation.modal_action" v-bind:close_id="comfrmation.close_id" />
            </div><!--- end --->

        </div>
    </div>
</template>    
<script>
export default {
    name: 'Subscription_details',
    components: {
        Confirmationmodal: () => import("../modal/Show_confirmation.vue"),
    },
    props: {
        subscription_details_data: Object
    },
    data() {
        return {
            comfrmation: {
                title: "Confirm withdraw?",
                description: "Pellent habitant morbi tristique senectus et netus et fames acturpis egestas...",
                modal_action: "request_for_data",
                close_id: "withdraw_close"
            },
            fin_price_cal:null,
			gst_amount_whole:1.09,
            Placement_free_amount: 0.01,
            placement_amount:null,
            grossAmount:null
        }
    }, created(){
        this.globalGetreauth('investment/gst/details').then((result_other) => {
this.gst_amount_whole = result_other.data.gst;
var grossAmount = this.subscription_details_data.noOfShares*this.subscription_details_data.issuePrice;
this.grossAmount = grossAmount;
        this.placement_amount = (grossAmount*this.Placement_free_amount)*this.gst_amount_whole;
        this.fin_price_cal = this.get_total_amount_with_proceed(this.subscription_details_data.noOfShares,this.subscription_details_data.issuePrice,this.gst_amount_whole);
console.log(this.gstPercentage);
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
    
       
    },
    methods: {
        investment_temp_store: function () {

            this.setvalueinlocalstroage('subcriptionitems_tem', this.subscription_details_data);
            this.$router.push({ name: 'subscriptiondetails', params: { id: this.subscription_details_data.investmentId, type: 2 } })
        },
        request_for_data_withdrow: function () {
            var present_user_data = this.getlocalkey('userdata');

            var postdata = {
                investmentId: this.subscription_details_data.investmentId,
                userId: present_user_data.id
            }
            this.globalputauth('investment/withdraw', postdata).then((result) => {
                const responsedata = result.data;
                console.log(responsedata);
                var get_optel = document.querySelector("#withdraw_close");
                get_optel.click();
                const thanks_mgs = {
                    "title": "Submission Successful",
                    "description": "We have received your request. SAC Capital has the sole right to allocate shares on any basis or to change its method of allocating shares at any time.",
                    "other": "You will be informed on the final allocation of the IPO Placement Shares through email. To receive notification on this site, you can amend your Notification setting under your Profile.",
                    "link": "myactive",
                    'button_text': "View Subcription"
                }
                this.setvalueinlocalstroage('thanks_tem', thanks_mgs);
                this.$router.push({ name: 'thanks' })
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

    }

}
</script>
