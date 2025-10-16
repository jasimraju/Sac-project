<template>
    <div class="subcription-card pending-subscription" :class="showclass" >
        <div class="head">
            <div class="logo">
                <a href="#"><img :src="m_baseUrl+m_version+'file/get/'+subcriptionitems.thumbnailId" ></a>
            </div>
            <div class="name">
                <span>{{ subcriptionitems.status }}</span>
                <h4>{{subcriptionitems.title}}</h4>
            </div>
        </div>

        <div class="share-progress" v-if="subcriptionitems.status != 'Pending Allocation'">
            <div class="text">
                <h6>Final allocation of shares <span>  {{subcriptionitems.finalAllocation.quantityOfSharesSubscribed }} /{{ subcriptionitems.sharesAllocatedToUsers }}</span></h6>
            </div>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" :style="finlallocationcal(subcriptionitems.sharesAllocatedToUsers,subcriptionitems.finalAllocation.quantityOfSharesSubscribed)" aria-valuenow="75"
                    aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div class="event-data" v-if="subcriptionitems.status == 'Pending Allocation'">
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="3">
							<p>Allocation Date</p>
							<h5>{{ subcriptionitems.allocationDate }}</h5>
						</td>

						<td>
							<p>Application & Payment Date</p>
							<h5>{{ get_number_of_string(subcriptionitems.applicationDate) }}-{{
		subcriptionitems.paymentDate }}</h5>
						</td>


					</tr>
					<tr>
						<td colspan="2">
							<p>Issue Size</p>
							
							<h5 v-if="subcriptionitems.issueSize != null">{{ convert_number_other(subcriptionitems.issueSize) }}</h5>
							<h5 v-else>{{ convert_number_other(subcriptionitems.appliedShares) }}</h5>
						</td>
						<td>
							<p>Issue price</p>
							<h5 v-if="/\d/.test(subcriptionitems.issuePrice)">S${{ subcriptionitems.issuePrice }} </h5>
							<h5 v-else><span
									v-if="subcriptionitems.issuePrice">{{ subcriptionitems.issuePrice }}</span><span>TBD</span>
							</h5>
						</td>
						<td>
							<p>Total Gross Proceeds</p>
							<h5>S${{ subcriptionitems.totalGrossProceeds }} </h5>
						</td>
					</tr>

				</tbody>
			</table>
		</div>

        <div class="event-data" v-else >
            <table class="table table-striped" v-if="subcriptionitems.finalAllocation.issuePrice != null">
                <tbody>
                    <tr>
                        <td>
                            <p>lssue Size</p>
                            <h5 v-if="subcriptionitems.issueSize != null">{{  convertToInternationalCurrencySystem(subcriptionitems.issueSize) }} </h5>
                            <h5 v-else-if="subcriptionitems.finalAllocation.noOfShares != null">{{  convertToInternationalCurrencySystem(subcriptionitems.finalAllocation.noOfShares) }} </h5>
                            <h5 v-else>{{  convertToInternationalCurrencySystem(subcriptionitems.finalAllocation.appliedShares) }} </h5>
                        </td>
                        <td>
                            <p>Issue Price </p>
                            <h5 v-if="subcriptionitems.finalAllocation.issuePrice != null">S${{ subcriptionitems.finalAllocation.issuePrice }} </h5>
                            <h5 v-else>N/A </h5>
                        </td>
                        <td>
                            <p>Total Gross Proceeds </p>
                             <h5>S${{  convertToInternationalCurrencySystem( subcriptionitems.finalAllocation.grossAmount) }}</h5>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped" v-else>
                <tbody>
                    <tr>
                        <td>
                            <p>lssue Size</p>
                            <h5 v-if="subcriptionitems.issueSize != null">{{  convertToInternationalCurrencySystem(subcriptionitems.issueSize) }} </h5>
                            <h5 v-else-if="subcriptionitems.finalAllocation.noOfShares != null">{{  convertToInternationalCurrencySystem(subcriptionitems.finalAllocation.noOfShares) }} </h5>
                            <h5 v-else>{{  convertToInternationalCurrencySystem(subcriptionitems.finalAllocation.appliedShares) }} </h5>
                        </td>
                        <td>
                            <p>Issue Price </p>
                            <h5 v-if="subcriptionitems.finalAllocation.issuePrice != null">S${{ subcriptionitems.finalAllocation.issuePrice }} </h5>
                            <h5 v-else>N/A </h5>
                        </td>
                        <td>
                            <p>Total Gross Proceeds</p>
                             <h5>S${{  subcriptionitems.totalGrossProceeds}}</h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="subcription-s-button">
            <span class="btn btn-secondary nav-link" @click="investtment_temp_apply">VIEW DETAILS</span>
        </div>
    </div><!-- end-->
</template>
<script>
export default {
    name: 'Investemnt_short_view',
    props: {
        subcriptionitems: Object
    },
    data() {
        return {
            img_url: this.secret_key,
            investment_status: null
        }
    },     
    computed: {
    showclass: function() {
		
		var display = (this.loop_number > 5 ?' d-none':'');
		
        return display;
    }
},
    created() {
            
        const date1 = new Date(this.subcriptionitems.allocationDate);
    const currentDate = new Date();
    if(date1 > currentDate){
        this.investment_status = this.subcriptionitems.status;
        if(this.subcriptionitems.payments){
            for(let i = 0; i < this.subcriptionitems.payments.length; i++) {
                if(this.subcriptionitems.payments[i].proofOfPaymentId != null ){
                    this.investment_status = 'Pending Payment Verification';
                }
                

            }
        }
        
    } else if(date1 < currentDate){
        this.investment_status = this.subcriptionitems.status;
        
    } else{
        this.investment_status = this.subcriptionitems.status;
        
    }
    },
    methods: {
        investtment_temp_apply: function () {
            //check apply status
            this.setvalueinlocalstroage('subcriptionitems_tem', this.subcriptionitems);
            if(this.investment_status == 'Completed'){
            this.$router.push({ name: 'subscriptiondetails', params: { id: this.subcriptionitems.investmentId, type: 5 } })
        }else{
            this.$router.push({ name: 'subscriptiondetails', params: { id: this.subcriptionitems.investmentId, type: 7 } })
        }
        },
        investment_interest: function () {
            if (this.checkloginstatus()) {
                var postdata = { "investmentId": this.investment_details.investmentId };
                // var useerdata = this.getlocalkey('userdata');
                this.globalpostauth('investment/registerInterest/1', postdata).then((result) => {
                    const responsedata = result.data;
                    console.log(responsedata);
                    const thanks_mgs = {
                        "title": "Thank you for your interest",
                        "description": "We've received your interest and we will notify you when the date is closer. If required, we will contact you for further information.",
                        "other": "If you require any clarfications or information, please email us at enquiry@saccapital.com.sg",
                        "link": "interest",
                        'button_text': "View all interested investments"
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
        },


    }
}
</script>