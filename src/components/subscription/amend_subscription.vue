<template>
	<section class="my-activity-list-details-view bg-image">
		<div class="container">
			<div class="row">
				<div class="col-md-10 offset-md-1">
                    <div class="my-activity-details-box">
                        <div class="row">
                            <div class="col-lg-5 text-center">
                                <div class="logo">
                                    <a href="../"><img :src="subscription_details_data.thumbnailUrl"></a>
                                </div>
                                <div class="name">
                                    <span class="pending-allocation">{{ subscription_details_data.status }}</span>
                                    
                                    <h4>{{ subscription_details_data.title }}</h4>
                                </div>
                                <div class="total-gross">
                                    <p>Total Gross Proceeds</p>
                                    <h4>{{ subscription_details_data.totalGrossProceeds }}</h4>
                                    
                                </div>
                            </div>
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
                                                    <h6>Min Price</h6>
                                                    <h5>S${{ subscription_details_data.minPrice }} </h5>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="subcription-data">
                                                    <h6>Max Price</h6>
                                                    <h5>S${{ subscription_details_data.maxPrice }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end-->

                                    <div class="subcription-single-data">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="subcription-data">
                                                    <h6>No. of Shares</h6>
                                                    <h5>{{ convertlocla_string(subscription_details_data.noOfShares,true) }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end-->

                                    <div class="subcription-single-data">
                                        <div class="row">
                                            <h6>Payable by Investment Amount</h6>
                                            <div class="col-md-6">
                                                <div class="subcription-data">
                                                    <h6>Min</h6>
                                                    <h5>S${{ convertlocla_string(subscription_details_data.minPayableInvestmentAmount) }}</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="subcription-data">
                                                    <h6>Max </h6>
                                                    <h5>S${{ convertlocla_string(subscription_details_data.maxPayableInvestmentAmount) }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end-->

                                    <div class="subcription-single-data">
                                        <div class="row">
                                            <h6>Service Fees</h6>
                                            <div class="col-md-6">
                                                <div class="subcription-data">
                                                    <h6>Min</h6>
                                                    <h5>S${{ convertlocla_string(subscription_details_data.minServiceFee) }}</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="subcription-data">
                                                    <h6>Max </h6>
                                                    <h5>S${{ convertlocla_string(subscription_details_data.maxServiceFee) }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end-->

                                    <div class="grid-button mt-4">
                                        <a href="#withdraw" class="btn btn-secondary" type="button"
                                            data-bs-toggle="modal">Withdraw</a>
                                        <a href="#" class="btn btn-warning" type="button">Amend</a>
                                    </div>

                                    <!-- Modal Start visit -->
                                    <div class="modal fade" id="withdraw" tabindex="-1" aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header add-note-title">
                                                </div>
                                                <div class="modal-body">
                                                    <div class="text text-center">
                                                        <h3>Confirm withdraw?</h3>
                                                        <p>Please click on the "Request Now" button if you wish to proceed with the withdrawal request.</p>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Cancel</button>
                                                        <a href="#" type="button" class="btn btn-warning">Request now</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div><!--- end --->

                                </div>
                            </div>
                        </div>
                    </div><!-- end-->
				</div>
			</div>
			
		</div>	
	</section>
</template>
<script>
export default {
    name: 'Amend_Subscription_details',
    data() {
        return {
            subscription_details_data: []
        }
    },
    created() {
        this.subscription_details_data = this.getlocalkey('subcriptionitems_tem');
        console.log(this.subscription_details_data);

        //this.checkevent_id_exit()
    }
}
</script>