<template>
	<section class="equity-research-section">
		<div class="container">
			<div class="section-title">
				<h2>Equity Research</h2>
				<p>
					We provide independent and objective equity research converage for sectors and companies listed on
					the SGX, with a</p>
				<p>niche in small and mid-cap companies. We believe in deep-dive analysis of a company's fundamental and
					the </p>
				<p>operating landscape, to help investors appraise its value and make sound investment decisions. Our
					aim is to enhance </p>
				<p>shareholder's value for the companies.
				</p>
			</div>
			<div class="equity-research">
				<div class="row">		
					<div class="col-lg-4 col-md-4" v-for='(research,index) in research_data' :key="research.equityResearchId">
						<div class="equity-research-card" :class="showclass(index)" :data-index="index">
							<div class="equity-img">
								<a href="">
									<img class=" img-fluid" :src="baseUrl+'file/get/'+research.thumbnailId" alt="" v-if="research.thumbnailId !=null">
									<img class=" img-fluid" :src="baseUrl+'file/get/13'" alt="" v-else>
								</a>
							</div>
							<div class="card-text">
								<h3><a href="">{{research.title}}</a></h3>
								<p v-html="research.description">
								</p>
							</div>
						</div>
					</div>
					<div class="more-btn">
						<a href="https://www.saccapital.com.sg/research/" class="btn btn-secondary"  data-class="equity-research-card">Discover More </a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>   

<script>
export default {
	name: 'Investment_main',
	data() {
		return {
			research_data: [],
			baseUrl:this.globalgetBaseurl(),
			
		}
	},
	created() {
	
		this.globalGetreversion('home/equityResearch').then((result) => {
			const responsedata = result.data;
			this.research_data = responsedata;
			console.log(this.research_data);
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