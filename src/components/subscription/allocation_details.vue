<template>

    <div class="row">
        <div class="col-lg-5 text-center">
              <div class="logo">
                  <a href="../"><img src="../../assets/image/oiltek.png"></a>
              </div>
              <div class="name">
                  <span class="pending-allocation">Pending Allocation</span>
                
                  <h4>Oiltek International Limited IPO</h4>
              </div>
        </div>
        <div class="col-lg-7">
            <div class="subcription-single-data-card final-allocation-details">
                <h4><strong>IPO Allocation</strong></h4>
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
                                <h5>450,000</h5>
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
                                <h5>S$0.230</h5>
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
                                <h5>S$103,500.00</h5>
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
                                <h5>S$1,035.00</h5>
                            </div>
                        </div>
                    </div>
                </div><!-- end-->

                <div class="subcription-single-data">
                    <div class="row">
                        <div class="col-md-6">	
                            <div class="subcription-data">
                                <h6>GST – 9%</h6>
                            </div>
                        </div>
                        <div class="col-md-6">	
                            <div class="subcription-data">
                                <h5>S$72.45</h5>
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
                                <h5>S$1,107.45</h5>
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
                                <h5>S$104,607.45</h5>
                            </div>
                        </div>
                    </div>
                </div><!-- end-->

                <div class="grid-button mt-4">
                    <a href="#success" class="btn btn-warning" type="button" data-bs-toggle="modal">Accept</a>
                </div>
                
                 <!-- Modal Start visit -->
                  <div class="modal fade" id="success"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                       <div class="modal-header add-note-title">
                        </div> 
                        <div class="modal-body">
                            <div class="text text-center">
                                <img src="../../assets/image/icons/success.svg">
                                <h3>Thank you</h3>
                                <p>Thank you for your Acceptance of the Final Allocation of Oiltek International Limited IPO.</p>

                                <div class="note"><p>We will notify you once the application and payment process commence.
                                    If you require any clarfications or information, please email us at <a href="mailto:enquiry@saccapital.com.sg">enquiry@saccapital.com.sg</a>If you require any clarifications or information, please email us at </p></div>
                            </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Back to Home</button>
                            <a href="#success" type="button" class="btn btn-warning" data-bs-dismiss="modal" data-bs-toggle="modal">ubscription
                            </a>
                        </div>

                        </div>
                      </div>
                    </div>
                  </div><!--- end --->

            </div>
        </div>
    </div>
 
</template>
<script>
export default {
    name: 'Subscription_details',
    components: {
		//Confirmationmodal: () => import("../modal/Show_confirmation.vue"),
	},
    props: {
		subscription_details_data: Object
	},
    data(){
        return {
            comfrmation:{
                title:"Confirm withdraw?",
                description:"Pellent habitant morbi tristique senectus et netus et fames acturpis egestas...",
                modal_action:"request_for_data",
                close_id:"withdraw_close"
            }
        }
    },
    methods: {
		investment_temp_store: function () {
		
			this.setvalueinlocalstroage('subcriptionitems_tem', this.subscription_details_data);
			this.$router.push({ name: 'subscriptiondetails', params: { id: this.subscription_details_data.investmentId,type:2} })
		},
        request_for_data_withdrow:function() {
            var present_user_data = this.getlocalkey('userdata');

            var postdata = {
                investmentId:this.subscription_details_data.investmentId,
                userId: present_user_data.id
            }
            this.globalputauth('investment/withdraw',postdata).then((result) =>{
                const responsedata = result.data;
			console.log(responsedata);
            var get_optel = document.querySelector("#withdraw_close");
			get_optel.click();
            const thanks_mgs = {
                    "title":"Submission Successful",
                    "description": "We have received your request. SAC Capital  has the sole right to allocate shares on any basis of th change its method of allocating shares any time.you will by informed on the final allocation of the IPO Placement Shares through email. To receive notification on this site. you can amend your Notification setting under you Profile",
                    "link":"investment",
                    'button_text':"View investment"
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'})
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
