<template>
	<section class="slider-section">
		<div class="container">
			<div class="row">
				<div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
						<button v-for="(button_slider,index) in all_active_slider" :key="button_slider.id"  type="button" data-bs-target="#carouselExampleDark" :data-bs-slide-to="index" :class="getClass(index)" aria-current="true" :aria-label="getatClass(index)"></button>
								
					
					</div>
					<div class="carousel-inner">
						<div   v-for="(slider,index) in all_active_slider" :key="slider.id"  :data-index="index" class="carousel-item" :class="getClass(index)" data-bs-interval="10000">
							<div class="carousel-widget">
								<div class="carousel-img">
									<img :src="m_baseUrl+m_version+'file/get/'+slider.thumbnailId" class="img-fluid" alt="...">
								</div>
								<div class="carousel-content ">
									<h1>{{ slider.title }}</h1>
									<p>{{ slider.description }}</p>

								</div>
							</div>
						</div><!-- end-->
					
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Slider_main',
	data() {
		return {
			all_active_slider: [],
		}
	},
	created() {
		this.globalGetreversion('onboard').then((result) => {
			const responsedata = result.data;
			this.all_active_slider = responsedata;
			console.log(this.all_active_slider);
			
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
		getClass(index){
			if(index == 0){
				return 'active';
			}else{
				return '';
			}
		},
		getatClass(index){
	
			var myindex = parseInt(index)+1;
	return  'Slide '+myindex;
	}
	},
	
	
}
</script>