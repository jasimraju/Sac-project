<template>
	<section class="archive-section investment-list-details-view">
		<div class="container">
			<div class="row">
				<div class="col-md-8 offset-md-2">
					<div class="investment-details-box completed">
						<div class="row">
							<div class="col-lg-5 text-center">
								<div class="event-logo">
									<a href="../"><img
											:src="m_baseUrl + m_version + 'file/get/' + investment_unique_details.thumbnailId"></a>
								</div>
								<div class="event-name">
									<span>{{ investment_unique_details.status }}</span>
									<h4>{{ investment_unique_details.title }}</h4>
								</div>
							</div>
							<div class="col-lg-7">
								<div class="event-data">
									<table class="table table-striped">
										<tbody>
											<tr>
												<td>
													<p>Book Building Open Date
													</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.openDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Book Building Close Date
													</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.closeDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Allocation Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.allocationDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Application and Payment Start Date
													</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.applicationDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Application and Payment Due Date and Time
													</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.paymentDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Listing Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.listingDate }}</h5>
												</td>
											</tr>
										</tbody>
									</table>
									<div v-if="investment_unique_details.status != 'Completed' && investment_unique_details.openDate != 'TBD' && investment_unique_details.closeDate != 'TBD'">
										<div class="close-note">
											<p>Booking Building is progressing and closed on {{investment_unique_details.closeDate}}!</p>
										</div>
										<div class="event-button">
											<span v-if="!investment_unique_details.userApplied" @click="investtment_temp_apply" class="btn btn-warning" >APPLY</span>
											<span class="btn btn-warning nav-link"  v-else >APPLIED</span>
										</div>
									</div>
									<div v-else-if="investment_unique_details.status != 'Completed' && investment_unique_details.openDate == 'TBD' && investment_unique_details.closeDate == 'TBD'">
										<div class="close-note">
											<p>Book Building Commencement Date will be determined soon!</p>
										</div>
										<div class="event-button">
											<span v-if="is_in_array(investment_unique_details.investmentId)" class="btn btn-warning"  >INTERESTED</span>
											<span v-else class="btn btn-warning" @click="investment_interest">INDICATE INTERST</span>
												
										</div>
									</div>
								</div>
							</div>
						</div>
					</div><!-- end-->
				</div>
			</div>
			<div class="row">
				<div class="col-md-10 offset-md-1">
					<div class="investment-list-details">
						<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
							<li class="nav-item" role="presentation">
								<button class="nav-link active" id="pills-overview-tab" data-bs-toggle="pill"
									data-bs-target="#overview" type="button" role="tab" aria-controls="pills-overview"
									aria-selected="true">Overview</button>
							</li>
							<li class="nav-item" role="presentation">
								<button class="nav-link" id="pills-timeline-tab" data-bs-toggle="pill"
									data-bs-target="#timeline" type="button" role="tab" aria-controls="pills-timeline"
									aria-selected="false">Timeline</button>
							</li>
							<li class="nav-item" role="presentation">
								<button class="nav-link" id="pills-statistics-tab" data-bs-toggle="pill"
									data-bs-target="#statistics" type="button" role="tab" aria-controls="pills-statistics"
									aria-selected="false">Statistics</button>
							</li>
						</ul>

						<div class="tab-content" id="pills-tabContent">
							<div class="tab-pane fade show active" id="overview" role="tabpanel"
								aria-labelledby="pills-overview-tab">
								<div class="overview">
									<h3>Company</h3>
									<p v-html="investment_unique_details.viewDetails.overview">

									</p>

									<div class="download-buttons">
										<a :href="m_baseUrl + m_version + 'file/' + investment_unique_details.viewDetails.preliminaryOfferDocument" class="btn btn-secondary">Download Preliminary Offer Document</a>
										<a :href="m_baseUrl + m_version + 'file/' + investment_unique_details.viewDetails.productHighlightSheet" class="btn btn-secondary">Download Product Highlight Sheet</a>
									</div>
									
								</div>
							</div>
							<!-- end all investment--->
							<div class="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="pills-timeline-tab">
								<div class="timeline">
									<h3>Indicative Key Dates</h3>
									<table class="table table-striped">
										<tbody>
											<tr>
												<td>
													<p>Book Building Open Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.viewDetails.timeline.openDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Book Building Close Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.viewDetails.timeline.closeDate }}</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Allocation Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.viewDetails.timeline.allocationDate }}
													</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Application and Payment Start Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.viewDetails.timeline.applicationDate }}
													</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Application and Payment Due Date and Time</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.viewDetails.timeline.paymentDate }}
													</h5>
												</td>
											</tr>
											<tr>
												<td>
													<p>Listing Date</p>
												</td>
												<td>
													<h5>{{ investment_unique_details.viewDetails.timeline.listingDate }}
													</h5>
												</td>
											</tr>
										</tbody>
									</table>
									<div class="download-buttons">
										<a :href="m_baseUrl + m_version + 'file/' + investment_unique_details.viewDetails.preliminaryOfferDocument" class="btn btn-secondary">Download Preliminary Offer Document</a>
										<a :href="m_baseUrl + m_version + 'file/' + investment_unique_details.viewDetails.productHighlightSheet" class="btn btn-secondary">Download Product Highlight Sheet</a>
									</div>
									
								</div>
							</div>
							<!-- end upcomint investment--->
							<div class="tab-pane fade" id="statistics" role="tabpanel"
								aria-labelledby="pills-statistics-tab">
								<div class="statistics">
									<h3>Indicative Invitation Statistics</h3>
									<ul class="upper-roman">
										<li v-html="investment_unique_details.viewDetails.statistics.statistics"></li>

									</ul>
									
				
								</div>
							</div>
							<!-- end complete investment--->
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>    
<script>
export default {
	name: 'Investment_details',
	data() {
		return {
			investment_unique_details: [],
			exit_interested:false,
			interest_invesment:null,
			show_details:null
		}
	},
	created() {
		this.get_intereset_investment();
		this.investment_unique_details = this.getlocalkey('investment_tem');
		if(this.$route.params.id != this.investment_unique_details.investmentId){
			this.$router.push({ name: 'investment'});
        }
		this.globalGetreauth('investment/userInterest/sort').then((result) =>{
            const responsedata = result.data;
        var upcoming_invesments = responsedata;	
			var upcoming_invesment;
		for( upcoming_invesment in upcoming_invesments ){
			console.log(upcoming_invesment.investmentId);
			if(upcoming_invesment.investmentId == this.investment_unique_details.investmentId){
				this.exit_interested=true;
			}
		}
       
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
		
		//this.checkevent_id_exit()
	},
	
	methods:{
		investment_interest:function (){
			if(this.checkloginstatus()){
                var postdata = {"investmentId":this.investment_unique_details.investmentId};
           // var useerdata = this.getlocalkey('userdata');
            this.globalpostauth('investment/registerInterest/1',postdata).then((result) =>{
            const responsedata = result.data;
			console.log(responsedata);
                const thanks_mgs = {
                    "title":"Thank you for your interest",
                    "description": "We have received your interest and we will notify you when the date is closer. If required, we will contact you for further information.",
                    "other": "If you require any clarfications or information, please email us at enquiry@saccapital.com.sg",
                    "link":"/myactive/interest/investment",
                    'button_text':"View all interested investment"
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
		is_in_array:function(value){
			
			console.log(this.interest_invesment);
		return this.interest_invesment.includes(value);
	},
	get_intereset_investment:function(){
		
		this.globalGetreauth('investment/userInterest/sort').then((result) =>{
            const responsedata = result.data;
        this.interest_invesment = responsedata;	
		var data_ar =  new Array();
		for (var i = 0; i < responsedata.length; i++) {
			
			data_ar.push(responsedata[i].investmentId);
			//data_ar.push(responsedata[i].investmentId);
		}
		
		this.interest_invesment = data_ar;
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
				
				console.log(this.interest_invesment);
	},
	investtment_temp_apply:function (){
			//check apply status
			this.setvalueinlocalstroage('investment_tem', this.investment_unique_details);
			this.$router.push({ name: 'investment_apply', params: { id: this.investment_unique_details.investmentId } })
		},
		show_details_data:function(e){
			var morebutton = e.currentTarget;
		
		var data_class = morebutton.getAttribute("data-id"); 
		var data_id_class = morebutton.getAttribute("data-show-details"); 
		var data_id = document.querySelector('#'+data_class);
		var data_id_cl_id = document.querySelector('#'+data_id_class);
		data_id.classList.add('d-none');
		data_id_cl_id.classList.remove('d-none');
		}
	}

}
</script>
