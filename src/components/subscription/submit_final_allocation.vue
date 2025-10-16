<template>
    <div class="col-lg-7">
        <div class="subcription-single-data-card final-allocation-details">
            <h4><strong>{{ subscription_details_data.title }}</strong></h4>
            <p>Here is the breakdown of your subscription:</p>
            <div class="subcription-single-data mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Quantity of Shares Subscribed</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>{{ convertlocla_string(subscription_details_data.noOfShares,true) }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->


            <div class="subcription-single-data">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Issue Price</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>S${{ subscription_details_data.issuePrice }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data bg-gray">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Gross Subscription Amount</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>S${{
                convertlocla_string(calulationfinalshare(subscription_details_data.noOfShares,
                    subscription_details_data.issuePrice))
            }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Placement fee – 1%</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>S${{
                    convertlocla_string(placement_fee)
                }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>GST – {{ gstPercentage }}</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>S${{ convertlocla_string(placement_gst) }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data bg-gray">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Placement Transaction Fees</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>S${{ convertlocla_string(placementTransactionFees) }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="subcription-single-data bg-yellow">
                <div class="row">
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h6>Total Subscription Amount Payable</h6>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subcription-data">
                            <h5>S${{
                convertlocla_string(fin_price_cal)
                                }}</h5>
                        </div>
                    </div>
                </div>
            </div><!-- end-->

            <div class="grid-button mt-4">
                <a href="#success" class="btn btn-warning" @click="submit_final_allocation" type="button"
                    data-bs-toggle="modal">Accept</a>
            </div>


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
            gst_amount: 9,
            gstPercentage: '9%',
            gst_amount_whole:1.09,
            grossAmount:null,
            Placement_free_amount: 0.01,
            fin_price_cal:null,
            placement_fee:null,
            placement_gst:null,
            placementTransactionFees:0,
        }   
    },
    created() {

        this.globalGetreauth('investment/gst/details').then((result_other) => {

            this.gst_amount = result_other.data.gst * 100 - 100;
            this.gstPercentage = result_other.data.gstPercentage;
            this.gst_amount_whole = result_other.data.gst;

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
        this.placement_fee = this.get_total_placement_free_proceed(this.subscription_details_data.noOfShares,this.subscription_details_data.issuePrice);
       
        this.placement_gst = this.placement_fee*(this.gst_amount_whole-1);
        this.placementTransactionFees =  this.placement_fee+this.placement_gst;
        console.log(this.placement_gst );
        this.fin_price_cal = (this.subscription_details_data.noOfShares*this.subscription_details_data.issuePrice)+this.placement_gst+this.placement_fee;

    },
    methods: {

        investment_temp_store: function () {

            this.setvalueinlocalstroage('subcriptionitems_tem', this.subscription_details_data);
            this.$router.push({ name: 'subscriptiondetails', params: { id: this.subscription_details_data.investmentId, type: 2 } })
        },

        submit_final_allocation: function () {
            if (this.checkloginstatus()) {
                var total = this.calulationtotal_submit_investment(this.calulationfinalshare(this.subscription_details_data.noOfShares, this.subscription_details_data.issuePrice), this.calulationparct(this.calulationfinalshare(this.subscription_details_data.noOfShares, this.subscription_details_data.issuePrice), 1), this.calulationparct(this.calulationfinalshare(this.subscription_details_data.noOfShares, this.subscription_details_data.issuePrice), 7), this.subscription_details_data.pendingSubscription.serviceFee);
                var postdata = { "investmentId": this.subscription_details_data.investmentId, "totalSubscriptionAmountPayable": total };
                // var useerdata = this.getlocalkey('userdata');
                this.globalpostauth('investment/finalAllocation', postdata).then((result) => {
                    const responsedata = result.data;
                    console.log(responsedata);
                    const thanks_mgs = {
                        "title": "Thank you for your Acceptance!",
                        "description": "We have received your acceptance to the allocation. We will notify you once the application and payment process commence.",
                        "other": "If you require any clarfications or information, please email us at enquiry@saccapital.com.sg",
                        "link": "myactive",
                        'button_text': "View all Subscriptions"
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
            }
        }

    }

}
</script>
