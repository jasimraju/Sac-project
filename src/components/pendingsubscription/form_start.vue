<template>
	<div class="col-md-8 offset-md-2">
		<div class="subcription-form">
			<div class="title">
				<h3>Indicative IPO Timetable</h3>
			</div>

			<div class="event-data mt-4">
				<table class="table table-striped">
					<tbody>
						<tr>
							<td>
								<p>Allocation Date</p>
							</td>
							<td>
								<h5>{{ investment_details.timeline.allocationDate }}</h5>
							</td>
						</tr>
						<tr>
							<td>
								<p>Application Date</p>
							</td>
							<td>
								<h5>{{ investment_details.timeline.applicationDate }}</h5>
							</td>
						</tr>
						<tr>
							<td>
								<p>Payment Date</p>
							</td>
							<td>
								<h5>{{ investment_details.timeline.paymentDate }}</h5>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="form-check form-check-inline mt-5">
				<input class="form-check-input" type="radio" v-model="checkboxtrems"  value="option1">
				<label class="form-check-label" for="rember">I declare that I am an Accredited Investor as defined under
					Section 4A of the Securities and Futures Act, Chapter 289.</label>
			</div>

			<div class="grid-button mt-5">
				
				<span  class="btn btn-warning" @click="checktrams">Next</span>
				
			</div>

		</div>
	</div>
</template>    
<script>
export default {
	name: 'Subscription_details',
	data() {
        return {
			checkboxtrems:null,
			prevRoute: null,
			investment_details:null
		}
	},
	created() {
		var investment_details = this.getlocalkey('subcriptionitems_tem');
		this.investment_details = investment_details;
	},
	methods: {
		checktrams:function(){
			if(this.checkboxtrems !=null){
			this.$router.push({ name: 'subscriptionentry',params: { id: 1 }})
		}
		}
}



}
</script>
