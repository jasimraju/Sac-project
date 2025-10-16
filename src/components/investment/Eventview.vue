<template>
	<div v-if="investment_details" class="events-box"
		:class="showclass"  :data-index="loop_number" >
		<div class="event-head">
			<div class="event-logo">
				<a href=""><img :src="m_baseUrl+m_version+'file/get/'+investment_details.thumbnailId" ></a>
			</div>
			<div class="event-name">
				<span>{{investment_details.status}}</span>
				<h4>{{investment_details.title}}</h4>
			</div>
		</div>
		<div class="event-data"  v-if="investment_details.status == 'Completed'">
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="2">
							<p>Listing Date</p>
							<h5>{{investment_details.listingDate}}</h5>
						</td>
						<td>
							<p>Type of Offering</p>
							<h5>{{investment_details.typeOfOffering}}</h5>
						</td>
						
					</tr>
					<tr>
						<td colspan="2">
							<p>Issue Size</p>
							<h5 v-if="investment_details.issueSize != null || investment_details.issueSize == undefined">{{convert_number_other(investment_details.issueSize)}}</h5>
							<h5 v-else>{{convert_number_other(investment_details.appliedShares)}}</h5>
						</td>
						<td>
							<p>Issue price</p>
							<h5 v-if="/\d/.test(investment_details.issuePrice)">S${{investment_details.issuePrice}} </h5>
							<h5 v-else>{{investment_details.issuePrice}} </h5>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<p>Amount Raised</p>
							<h5 v-if="investment_details.amountRaised != null">{{convert_number_other(investment_details.amountRaised)}}</h5>
							<h5 v-else>N/A</h5>
						</td>
						
						<td>
							<p>Market Cap at Listing</p>
							<h5 v-if="convert_number_other(investment_details.marketCapAtListing) != 'TBD' ">S${{convert_number_other(investment_details.marketCapAtListing)}}</h5>
							<h5 v-else>{{convert_number_other(investment_details.marketCapAtListing)}}</h5>

						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="event-data"  v-else>
			<table class="table table-striped">
				<tbody>
					<tr>
						<td>
							<p>Book Building Open Date
							</p>
							<h5>{{investment_details.openDate}}</h5>
						</td>
						<td>
							<p>Book Building Close Date
							</p>
							<h5>{{investment_details.closeDate}}</h5>
						</td>
						<td>
							<p>Allocation Date</p>
							<h5>{{investment_details.allocationDate}}</h5>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<p>Application and Payment Start Date</p>
							<h5>{{investment_details.applicationDate}}</h5>
						</td>
						<td>
							<p>Listing Date</p>
							<h5>{{investment_details.listingDate}}</h5>
						</td>
					</tr>
					<tr>
						<td>
							<p>lssue Size</p>
							<h5 v-if="/\d/.test(investment_details.issueSize)">{{convert_number_other(investment_details.issueSize)}} </h5>
							<h5 v-else>{{investment_details.issueSize}} </h5>
						</td>
						<td>
							<p>Issue Price </p>

							<h5 v-if="/\d/.test(investment_details.issuePrice)">S${{convert_number_other(investment_details.issuePrice)}} </h5>
							<h5 v-else>{{investment_details.issuePrice}} </h5>
						</td>
						<td>
							<p>Allocation Date</p>
							<h5>{{investment_details.allocationDate}}</h5>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="investment_details.status == 'Completed'" class="event-button" :class="(investment_details.status == 'Completed')?'completed':''">
			<span class="btn btn-secondary nav-link" @click="investment_temp_store">VIEW DETAILS</span>
			</div>
			<div v-else-if="investment_details.openDate == 'TBD' && investment_details.closeDate == 'TBD'" class="event-button">
			<span class="btn btn-secondary nav-link" @click="investment_temp_store">VIEW DETAILS</span>
			<span  v-if="$parent.is_in_array(investment_details.investmentId)" class="btn btn-warning nav-link">INTERESTED</span>
			<span  v-else class="btn btn-warning nav-link" @click="investment_interest">INDICATE INTEREST</span>
		</div>
		<div v-else class="event-button">
			<span class="btn btn-secondary nav-link" @click="investment_temp_store">VIEW DETAILS</span>
			
			<span class="btn btn-warning nav-link"  v-if="!investment_details.userApplied" @click="investtment_temp_apply">APPLY</span>
			<span class="btn btn-warning nav-link"  v-else >APPLIED</span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Investemnt_short_view',
	props: {
		investment_details: Object,
		loop_number:Number
	},
	data(){
		return {
			img_url: this.secret_key,
		}
	},
	computed: {
    showclass: function() {
		var status = (this.investment_details.status == 'Completed'?'completed':'');
		var display = (this.loop_number > 8 ?' d-none':'');
		console.log(display);
        return status+display;
    }
},
	methods: {
		investment_temp_store: function () {

			this.setvalueinlocalstroage('investment_tem', this.investment_details);
			this.$router.push({ name: 'investment_details', params: { id: this.investment_details.investmentId } })
		},
		investtment_temp_apply:function (){
			//check apply status
			this.setvalueinlocalstroage('investment_tem', this.investment_details);
			this.$router.push({ name: 'investment_apply', params: { id: this.investment_details.investmentId } })
		},
		investment_interest:function (){
			if(this.checkloginstatus()){
                var postdata = {"investmentId":this.investment_details.investmentId};
           // var useerdata = this.getlocalkey('userdata');
            this.globalpostauth('investment/registerInterest/1',postdata).then((result) =>{
            const responsedata = result.data;
			console.log(responsedata);
                const thanks_mgs = {
                    "title":"Thanks you for interest",
                    "description": "We've received your interest and we will notify you when the date closer. If required, we will contact you for further information.",
                    "other": "If you require any clarfication or information please email us at enquiry@saccapital.com.sg",
                    "link":"myactive/interest/investment",
                    'button_text':"View all interested investments"
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
        }
		},
	

	}
}
</script>