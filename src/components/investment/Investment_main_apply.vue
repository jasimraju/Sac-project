<template>
	<section class="archive-section investment-list-details-view" >
		<div class="main-div" v-if="investment_unique_details && !show_success" >
		<div class="container chack_main">
			<div class="row">
				<div class="col-md-10 offset-md-1">
					<div class="investment-apply-box">
						<div class="row">
							<div class="col-lg-6">
								<div class="securities-box">
									<div class="event-logo">
										<a href="../"><img
												:src="m_baseUrl + m_version + 'file/get/' + investment_unique_details.thumbnailId"></a>
									</div>
									<div class="securities-text">
										
										<h4>{{ investment_unique_details.title }}</h4>
									</div>
								</div>
								<div class="event-data">
									<table class="table table-striped">
										<tbody>
											<tr>
												<td>
													<p>Type of Pricing</p>
													<h5><strong v-if="investment_unique_details.minPrice">Tender</strong>
														<strong v-else>Fixed</strong>
													</h5>
												</td>
												<td>
													<p>Application Closing Date</p>
													<h5><strong>{{ investment_unique_details.closeDate }}</strong></h5>
												</td>
											</tr>
											<tr>
												<td colspan="2" v-if="investment_unique_details.minPrice">
													<p>Tender Price</p>
													<h5><strong>Minimum Price S${{ investment_unique_details.minPrice
													}}</strong></h5>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="supporting-box">
									<h3>Supporting Documents</h3>
									<ul>
										<li><a
												:href="m_baseUrl + m_version + 'file/' + investment_unique_details.viewDetails.preliminaryOfferDocument"><img
													src="../../assets/image/icons/document.svg">Preliminary Offer
												Document</a></li>
										<li><a
												:href="m_baseUrl + m_version + 'file/' + investment_unique_details.viewDetails.productHighlightSheet"><img
													src="../../assets/image/icons/document.svg">Offer Document</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div><!-- end-->
				</div>
			</div>

			<div class="row">
				<div class="col-md-10 offset-md-1">
					<div class="apply-form">
						<div class="title"><span>Apply Form</span></div>

						<form class="row g-3 needs-validation" enctype="multipart/form-data"
							@submit.prevent="handlebasicinfosetp" @keydown.enter="$event.preventDefault()">
							<div class="info">
								<div class="row">
									<div class="col-md-6 mb-3">
										<label class="form-label">Name</label>
										<input type="text" class="form-control" id="parent-name"
											v-model="inputdata.name.name"  placeholder="Enter Name">
										
									</div>
									<div class="col-md-6 mb-3">
										<label class="form-label">NRIC/ Passport No.</label>
										<input type="text" class="form-control" id="parent-nric"
											v-model="inputdata.nric.name" placeholder="eg. 123R">
											<div class="error d-none" id="error-nric"></div>
									</div>
									<div class="col-md-6 mb-3">
										<label class="form-label">CDP Securities Account No.</label>
										<input type="text" class="form-control" id="parent-account"
											v-model="inputdata.account.name" placeholder="eg. $100,000">
											
									</div>
								</div>
							</div>

							<div class="select-country">
								<p><strong>Please select Country of Residence and Residency Status from the dropdown list
										and tap "Next".</strong></p>
								<div class="row mt-2">
									<div class="col-md-6 mb-3">
										<label class="form-label">Country of Residence</label>
										<select class="form-select" id="parent-country" v-model="inputdata.country.name">
											<option  :value="null" D selected>{{ inputdata.country.name }}</option>
											
											<option v-for="country in getAllcountry_list_na()" :key="country.name" :value="country.name">{{country.name}}</option>
										
										</select>
										<div class="error d-none" id="error-country"></div>
									</div>
									<div class="col-md-6 mb-3">
										<label class="form-label">Residency Status</label>
										<select class="form-select" id="parent-res_status"
											v-model="inputdata.res_status.name">
											<option :value="null" disabled selected>Residency Status</option>
											<option  value="Singapore Citizen">Singapore Citizen</option>
											<option  value="Permanent Resident">Permanent Resident</option>
											<option  value="Foreigner">Foreigner</option>
										</select>
										<div class="error d-none" id="error-res_status"></div>
									</div>
								</div>
							</div>

							<div class="select-country">
								<div class="row">
									<p><strong>Type of pricing</strong></p>
									<div class="col-md-12 mb-3">
										<label class="form-label">Choose one type of pricing</label>
										<select class="form-select" id="parent-price_type"
											v-model="inputdata.price_type.name">
											<option :value="null" disabled selected>Select Type of pricing</option>
											<option value="2" v-if="!investment_unique_details.minPrice" :selected="!investment_unique_details.minPrice">Fixed Price
											</option>
											<option value="1" :selected="investment_unique_details.minPrice">Tender Price
											</option>
										</select>
										<div class="error d-none" id="error-price_type"></div>
									</div>
								</div>
							</div>

							<div class="tender-price" v-if="investment_unique_details.minPrice">
								<div class="row">
									<div class="col-md-6 mb-3">
										<p><strong>Tender Price</strong></p>
										<label class="form-label">Enter how much you are willing to pay tender price.
											Minimum tender price S${{ investment_unique_details.minPrice }}. We will notify
											you the final fixed price on the Allocation Date.</label>
										<div class="max-min">
											<div class="row">
												<div class="col-sm-6 col-md-6">
													<label class="form-label">Min</label>
													<input type="number" :min="investment_unique_details.minPrice" step="0.005" class="form-control" id="parent-min"
														v-model="inputdata_tender.min.name" placeholder="Min Price">
														<div class="error d-none" id="error-min"></div>
												</div>
												<div class="col-sm-6 col-md-6">
													<label class="form-label">Max</label>
													<input type="number"  class="form-control" id="parent-max"
														v-model="inputdata_tender.max.name" step="0.005" placeholder="Max Price">
														<div class="error d-none" id="error-max"></div>
												</div>
											</div>
										</div>
										<div class="error-box mt-2">
											<p>Enter minimum tender price S${{ investment_unique_details.minPrice }}</p>
										</div>
									</div>
									<div class="col-md-6 mb-3">
										<p><strong>Application for No. of Shares</strong></p>
										<label class="form-label">Enter how much you want for Application for No of Shares.
											Minimum 1,000 shares and in multiples of 1,000 shares.</label>
										<input type="text" class="form-control mt-5" id="parent-number_share"
											v-model="inputdata_tender.number_share.name" placeholder="ex 1000">
											<div class="error d-none" id="error-number_share"></div>

									</div>
								</div>
							</div>


							<div class="tender-price" v-else>
								<div class="row">
									<div class="col-md-6 mb-3">
										<p><strong>Fixed Price</strong></p>
										<label class="form-label">Enter how much you are willing to pay tender price.
											Minimum tender price S$0.20. We will notify you the final fixed price on the
											Allocation Date.</label>
										<input type="text" class="form-control" id="parent-fix_price"
											v-model="inputdata_fixit.fix_price.name" placeholder="Fixed Price">
									</div>
									<div class="col-md-6 mb-3">
										<p><strong>Application for No. of Shares</strong></p>
										<label class="form-label">Enter how much you want for Application for No of Shares.
											Minimum 1,000 shares and in multiples of 1,000 shares.</label>
										<input type="text" class="form-control mt-4" id="parent-fix_number_share"
											v-model="inputdata_fixit.fix_number_share.name" placeholder="Min Price">
											<div class="error d-none" id="error-fix_number_share"></div>

									</div>
								</div>
							</div>

							<div class="col-12">
								<button class="btn btn-warning" type="submit">Done</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="container review_show d-none">
			<div class="row">
				<div class="page-title text-center">
					<h2>Review and Confirm</h2>
				</div>
				<div class="col-md-10 offset-md-1">
					<div class="review-and-confirm">
						<div class="row">
							<div class="col-md-6">
								<div class="review-card">
									<div class="review-content">
										<div class="row">
											<div class="col-md-12">
												<div class="text gross" v-if="inputdata.price_type.name == 1">
													<p>Total Gross Subscription Amount</p>
													<h4 v-if="min_cal">S${{ convertlocla_string(min_cal) }} </h4>
													<h4 v-if="max_cal">~ S$ {{ convertlocla_string(max_cal) }}</h4>
												</div>
												<div v-else>
													<p>Total Gross Subscription Amount</p>
													<h4 v-if="fixit_amount">S${{ convertlocla_string(fixit_amount) }} </h4>
													
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="review-card overview">
									<div class="review-title">
										<h3>Overview</h3>
									</div>
									<div class="review-content">
										<div class="row">
											<div class="col-md-6">
												<div class="text">
													
													<h5>{{ investment_unique_details.title }}</h5>
												</div>
											</div>
											<div class="col-md-6">
												<div class="text">
													<p>Type of pricing</p>
													<h5 v-if="inputdata.price_type.name == 1">Tender price</h5>
													<h5 v-else>Fixed Price</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content">
										<div class="row">
											<div class="col-md-6">
												<div class="text">
													<p>Min Price</p>
													<h5>S${{ inputdata_tender.min.name }} </h5>
												</div>
											</div>
											<div class="col-md-6">
												<div class="text">
													<p>Max Price</p>
													<h5>S${{ inputdata_tender.max.name }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
								</div><!-- end --->

								<div class="review-card">
									<div class="review-title">
										<h3>Placement Fee</h3>
									</div>
									<div class="review-content">
										<div class="row">
											<div class="col-md-12">
												<div class="text">
													<h6>An IPO Placement commission of 1% on the value of allocations and
														applicable GST will be charged for all successful IPO applications
													</h6>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content">
										<div class="row">
											<div class="col-md-6">
												<div class="text">
													<p>Min </p>
													<h5>S${{ convertlocla_string(parseFloat(pla_min_cal).toFixed(2)) }} </h5>
												</div>
											</div>
											<div class="col-md-6">
												<div class="text">
													<p>Max </p>
													<h5>S${{ convertlocla_string(parseFloat(pla_max_cal).toFixed(2)) }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
								</div>
							</div><!-- end-->

							<div class="col-md-6">
								<div class="review-card">
									<div v-if="min_cal" class="review-content">
										<div class="row">
											<div class="col-md-12">
												<div class="text">
													<p>Investment Amount</p>
													<h5>S${{ convertlocla_string(inputdata_tender.number_share.name*inputdata_tender.min.name) }} ~ S${{ convertlocla_string(inputdata_tender.number_share.name*inputdata_tender.max.name) }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content">
										<div class="row">
											<div class="col-md-12">
												<div class="text">
													<p>No. of Shares</p>
													<h5>{{ convertlocla_string(inputdata_tender.number_share.name) }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content">
										<div class="row">
											<div class="col-md-6">
												<div class="text">
													<p>Min </p>
													<h5>S${{ convertlocla_string(inputdata_tender.number_share.name*inputdata_tender.min.name) }}</h5>
												</div>
											</div>
											<div class="col-md-6">
												<div class="text">
													<p>Max </p>
													<h5>S${{ convertlocla_string(inputdata_tender.number_share.name*inputdata_tender.max.name) }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
								</div>

								<div class="review-card">
									<div class="review-title">
										<h3>Personal Details</h3>
									</div>
									<div class="review-content">
										<div class="row">
											<div class="col-md-12">
												<div class="text">
													<p>Name</p>
													<h5>{{ inputdata.name.name }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content">
										<div class="row">
											<div class="col-md-6">
												<div class="text">
													<p>NRIC/ Passport No. </p>
													<h5>{{ inputdata.nric.name }}</h5>
												</div>
											</div>
											<div class="col-md-6">
												<div class="text">
													<p>CDP Securities Account No.</p>
													<h5>{{ inputdata.account.name }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content">
										<div class="row">
											<div class="col-md-6">
												<div class="text">
													<p>Country of Residence</p>
													<h5>{{ inputdata.country.name }}</h5>
												</div>
											</div>
											<div class="col-md-6">
												<div class="text">
													<p>Residency Status</p>
													<h5>{{ inputdata.res_status.name }}</h5>
												</div>
											</div>
										</div>
									</div><!-- end -->
									<div class="review-content conditions mt-2">
										<p>By clicking “Confirm”, you agree to the <router-link :to="{name:'Trems'}">Terms and Conditions.</router-link></p>
										<ul>
											<li>This service is currently available for selected Securities only. For those
												not found here, apply for them at SAC Capital. </li>
											<li>You will not be able to withdraw or amend your application after the closing
												date, unless a supplementary prospectus is subsequently issue by the
												Securities issuer.</li>
										</ul>
									</div>
								</div>
							</div><!-- end-->
							<div class="col-md-6 offset-md-6">
								<a href="javascript:void(0)" @click="apply_investemnt_confirm" class="btn btn-warning" type="button"
									data-bs-toggle="modal">CONFIRM</a>
							</div>
							<!-- Modal Start visit -->
				

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</section>
</template>
<script>
import Validation from '../../Validation';
export default {
	name: 'Investment_main_apply',
	mixins: [Validation],
	data() {
		return {
			investment_unique_details: [],
			userdetails: [],
			inputdata: {
				name: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Name field is required'],
					keyname: "name",
				},
				nric: {
					name: null,
					key: ['requiredFunction'],
					msg: ['NRIC/ Passport No is required'],
					keyname: "nric",

				},
				account: {
					name: null,
					key: ['requiredFunction'],
					msg: ['CDP Securities Account No is required'],
					keyname: "account",

				},
				country: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Country is required'],
					keyname: "country",

				},
				res_status: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Residency status is required'],
					keyname: "res_status",

				},
				price_type: {
					name: this.checking_investment_data('minPrice'),
					key: ['requiredFunction'],
					msg: ['Type of pricing is required'],
					keyname: "price_type",

				}
			},
			inputdata_tender: {
				min: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Min. Price is required'],
					keyname: "min",
				},
				max: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Max. Price is required'],
					keyname: "max",

				},
				number_share: {
					name: null,
					key: ['requiredFunction','validnumbre'],
					msg: ['Application for No. of Shares field are required','Please type only number'],
					min:1000,
					keyname: "number_share",

				}
			},
			inputdata_fixit: {
				fix_number_share: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Fixed Price are required'],
					keyname: "fix_number_share",
				},
				fix_price: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Application for No. of Shares field are required'],
					keyname: "fix_price",

				},

			},
			errors: [],
			validation: [],
			min_cal:null,
			max_cal:null,
			min_t_p_cal:null,
			max_t_p_cal:null,
			fixit_amount:null,
			pla_min_cal:null,
			pla_max_cal:null,
			pla_fixit_amount:null,
			final_data:null,
			show_success:false,
			gst_amount_whole: 1.09,
            gstPercentage: '9%',
			Placement_free_amount: 0.01,
		}
	},
	created() {

		this.loginstatus = this.checkloginstatus();
		if (this.loginstatus) {
			this.investment_unique_details = this.getlocalkey('investment_tem');
			console.log(this.investment_unique_details);
			console.log(this.userprfile);
			if(this.$route.params.id != this.investment_unique_details.investmentId){
			this.$router.push({ name: 'investment'});
        }
			this.userauth = this.getlocalkey('userdata');
			this.globalGetreauth('userProfile/details/' + this.userauth.id).then((result) => {
				const responsedata = result.data;
				this.userdetails = responsedata;
				this.inputdata.name.name = this.userdetails.usersDetailsBasicInformation.firstName + ' ' + this.userdetails.usersDetailsBasicInformation.lastName;
				this.inputdata.account.name = this.userdetails.usersDetailsBasicInformation.securityAccountNumber;
				this.inputdata.nric.name = this.userdetails.usersDetailsBasicInformation.nricOrPassportNumber;
				this.inputdata.country.name = this.userdetails.usersResidentialAddress.residenceCountry;
				this.inputdata.res_status.name = this.userdetails.usersResidentialAddress.residenceCountry;
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
		} else {
			//go investment page
			this.$router.push('/login');

		}


	},
	computed: {
    showselected_t: function(value) {
		if(value == this.inputdata.res_status.name){
			return 'selected';
		}
		else{
			return null;
		}
    }
},
	methods: {
		showselected: function(value) {
		if(value == this.inputdata.res_status.name){
			return 'selected';
		}
		else{
			return null;
		}
    },
		handlebasicinfosetp: function () {
			this.validation = [];
			this.errors = [];

			this.validationallform(this.inputdata);

			var checkvalidtion = this.checkvalidationarray(this.validation);
			var otherv = false;
			if (this.inputdata.price_type.name == 1 && checkvalidtion) {
				//check number share min//number_share
		
				var all_share_number = parseInt(this.inputdata_tender.number_share.name);
				var share_e = all_share_number%1000;
				console.log(share_e);
				if(share_e == 0){

				
				//tender
				this.validation = [];
				this.errors = [];
				this.validationallform(this.inputdata_tender);
				otherv = this.checkvalidationarray(this.validation);}
				else{
					this.errormessageadd('number_share',"Please type correct number");
				}
			} else {
				if (checkvalidtion) {
					this.validation = [];
					this.errors = [];
					this.validationallform(this.inputdata_fixit);
					otherv = this.checkvalidationarray(this.validation);

				}
			}

			if (checkvalidtion && otherv) {
				/*success*/
				var element = document.querySelector(".chack_main");
				var review_show = document.querySelector(".review_show");
				element.className += " d-none";
				review_show.classList.remove('d-none');
				if(this.inputdata.price_type.name == 1){
					this.min_t_p_cal = this.inputdata_tender.number_share.name*this.inputdata_tender.min.name;
					this.max_t_p_cal = this.inputdata_tender.number_share.name*this.inputdata_tender.max.name;
				this.min_cal = this.get_total_amount_with_proceed(this.inputdata_tender.number_share.name,this.inputdata_tender.min.name,this.gst_amount_whole);
				this.pla_min_cal = this.get_total_amount_place_amount(this.inputdata_tender.number_share.name,this.inputdata_tender.min.name,this.Placement_free_amount,this.gst_amount_whole);
		
				//this.min_cal = this.min_cal+pleacementfree;
				this.max_cal = this.get_total_amount_with_proceed(this.inputdata_tender.number_share.name,this.inputdata_tender.max.name,this.gst_amount_whole);
				this.pla_max_cal = this.get_total_amount_place_amount(this.inputdata_tender.number_share.name,this.inputdata_tender.max.name,this.Placement_free_amount,this.gst_amount_whole);
				
			//	this.max_cal = this.max_cal+pleacementfree_m;
			}else{
				this.fixit_amount = this.get_total_amount_with_proceed(this.investment_unique_details.number_share.name,this.investment_unique_details.minPrice.name,this.gst_amount_whole);
				this.pla_fixit_amount = this.get_total_amount_place_amount(this.inputdata_tender.number_share.name,this.inputdata_tender.minPrice.name,this.Placement_free_amount,this.gst_amount_whole);

				//this.min_cal = this.fixit_amount+pleacementfree_f;
			}
			//prepare submit data
			this.final_data = {
							pricingId:this.inputdata.price_type.name,
							investmentId:this.investment_unique_details.investmentId,
							minTenderPrice:this.inputdata_tender.min.name,
							maxTenderPrice:this.inputdata_tender.max.name,
							noOfShares:this.inputdata_tender.number_share.name,
							residenceCountry: this.inputdata.country.name,
							securityAccountNumber:this.inputdata.account.name,
							nricOrPassportNo: this.inputdata.nric.name,
							residencyStatus:this.inputdata.res_status.name
						};
				console.log(this.final_data);
				
			}
			else {
				/*fail*/
				console.log('faid');
				console.log(this.inputdata);
				console.log(this.inputdata_fixit);
				console.log(this.inputdata_tender);
			}
		},
		apply_investemnt_confirm:function(){
			var postdata = this.final_data; 
			this.globalpostauth('investment/process',postdata).then((result) =>{
            const responsedata = result.data;
			console.log(responsedata);
                const thanks_mgs = {
                    "title":"Submission Successful",
                    "description": "We have received your request. SAC Capital has the sole right to allocate shares on any basis or to change its method of allocating shares at any time.",
					"other": "You will be informed on the final allocation of the IPO Placement Shares through email. To receive notification on this site, you can amend your Notification setting under your Profile.",
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
		}

	}
}
</script>