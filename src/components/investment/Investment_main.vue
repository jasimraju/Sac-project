<template>
	<section class="investments-section">
		<div class="container">
			<div class="section-title">
				<h2>Recent Investments</h2>
			
			</div>

			<div class="recent-investments">
				<div class="row">
					<div class="col-lg-4 col-md-4" v-for='(investment,index) in compltedInvesment' :key="investment.investmentId">
						<div class="recent-investments-card" :class="showclass(index)" :data-index="index">
							<div class="img-box">
								<a href=""><img :src="m_baseUrl+m_version+'file/get/'+investment.thumbnailId" ></a>
							</div>
							<h4><span style="cursor: pointer;" @click="investment_temp_store(investment)">{{investment.title}}</span></h4>
							<div class="card-text">
								<div class="type">
									<p>Type of Offering</p>
									<h5>{{investment.listingDate}}</h5>
								</div>
								<div class="amount">
									<p>Amount Raised</p>
									<h5 v-if="investment.amountRaised != null">{{convert_number_other(investment.amountRaised)}}</h5>
							<h5 v-else>N/A</h5>
								</div>
							</div>

						</div>
					</div>
				
					<div class="more-btn" v-if="compltedInvesment.length > 4">
						<router-link :to="{name:'investment'}" class="btn btn-secondary" >View All offerings</router-link>
					</div>
				</div>
			</div>


		</div>
	</section>
</template>   
  
<script>
export default {
	name: 'Investment_main',
	data() { return{
		compltedInvesment: []
	}
	},
	computed: {
    showclass_one: function(colums_number) {
		
		var display = (colums_number > 5 ?' d-none':'');
		
        return display;
    }
},
	created() {
		console.log('test');
		this.globalGetreversion('home/get/recent/completed').then((result) => {
			const responsedata = result.data;
			this.compltedInvesment = responsedata;
			
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
	methods:{
		investment_temp_store: function (investment_details) {

this.setvalueinlocalstroage('investment_tem', investment_details);
this.$router.push({ name: 'investment_details', params: { id: investment_details.investmentId } })
},
		convert_number_other:function(value){
			console.log(value);
			var co_dat = this.convertToInternationalCurrencySystem(value);
			
			co_dat = co_dat.replace(/\.00([^\d])/g,'$1');
			return co_dat;
		},
		showclass: function(colums_number) {
		
		var display = (colums_number > 2 ?' d-none':'');
		
        return display;
    },
	remove_display(e){
		var morebutton = e.currentTarget;
		
		var data_class = morebutton.getAttribute("data-class"); 
		var data_remvoe_class = morebutton.getAttribute("data-remove-class"); 
		var event_class = document.querySelectorAll('.'+data_class);
		morebutton.classList.add(data_remvoe_class);
		for (var i = 0; i < event_class.length; ++i) {
			var item = event_class[i]; 
			item.classList.remove(data_remvoe_class);
		}
	
		
	}
	}

}
</script>