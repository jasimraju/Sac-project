<template>
	<div v-if="subcriptionitems" class="events-box" :class="showclass">

		<div class="event-head">
			<div class="event-logo">
				<a href=""><img :src="m_baseUrl + m_version + 'file/get/' + subcriptionitems.thumbnailId"></a>
			</div>
			<div class="event-name">
				<span>{{ subcriptionitems.status }}</span>
				<h4>{{ subcriptionitems.title }}</h4>
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
							<h5>S${{ convertlocla_string(min_cal) }} ~ S$ {{ convertlocla_string(max_cal) }} </h5>
						</td>
					</tr>

				</tbody>
			</table>
		</div>

		<div v-if="subcriptionitems.status == 'Completed'" class="event-button"
			:class="(subcriptionitems.status == 'Completed') ? 'completed' : ''">
			<span class="btn btn-secondary nav-link" @click="investment_temp_store">VIEW DETAILS</span>
		</div>

		<div v-else class="event-button">
			<span class="btn btn-secondary nav-link" @click="investment_temp_store">VIEW DETAILS</span>

			<span v-if="!subcriptionitems.amendedInvestment" class="btn btn-warning nav-link"
				@click="investtment_temp_apply">AMEND</span>
			<span v-else class="btn btn-warning nav-link">AMENDED</span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Investemnt_short_view',
	props: {
		subcriptionitems: Object,
		loop_number: Number
	},
	data() {
		return {
			img_url: this.secret_key,
			min_cal: null,
			max_cal: null,
			gst_amount_whole: 1.09
		}
	}, created() {
		//maxPrice
		//minPrice
		//noOfShares
		this.globalGetreauth('investment/gst/details').then((result_other) => {


			this.gst_amount_whole = result_other.data.gst;
			this.min_cal = this.get_total_amount_with_proceed(this.subcriptionitems.noOfShares, this.subcriptionitems.minPrice, this.gst_amount_whole);
			this.max_cal = this.get_total_amount_with_proceed(this.subcriptionitems.noOfShares, this.subcriptionitems.maxPrice, this.gst_amount_whole);
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
	computed: {
		showclass: function () {
			var status = (this.subcriptionitems.status == 'Completed' ? 'completed' : '');
			var display = (this.loop_number > 8 ? ' d-none' : '');
			console.log(display);
			return status + display;
		}
	},
	methods: {
		investment_temp_store: function () {

			this.setvalueinlocalstroage('subcriptionitems_tem', this.subcriptionitems);
			this.$router.push({ name: 'subscriptiondetails', params: { id: this.subcriptionitems.investmentId } })
		},
		investtment_temp_apply: function () {
			//check apply status
			this.setvalueinlocalstroage('subcriptionitems_tem', this.subcriptionitems);
			this.$router.push({ name: 'subscriptiondetails', params: { id: this.subcriptionitems.investmentId, type: 2 } })
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
						"description": "We have received your interest and we will notify you when the date is closer. If required, we will contact you for further information.",
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