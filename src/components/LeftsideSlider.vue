<template>
      <div class="col-lg-5 col-md-5 left-sidebar-bg">
          <div class="row">
            <div class="left-sidebar">
              <div class="logo">
                <router-link :to="{name:'home'}"><img class="img-fluid" src="../assets/image/logo/logo.png" alt="N/A"></router-link>
              </div>

              <div class="left-side-slider">
                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button v-for="(button_slider,index) in all_active_slider" :key="button_slider.id"  type="button" data-bs-target="#carouselExampleDark" :data-bs-slide-to="index" :class="getClass(index)" aria-current="true" :aria-label="getatClass(index)"></button>
                  </div>
                  <div class="carousel-inner">

                    <div v-for="(slider,index) in all_active_slider" :key="slider.id"  :data-index="index" class="carousel-item" :class="getClass(index)" data-bs-interval="10000">
                      <div class="content">
                        <h2>{{ slider.title }} <span> </span></h2>
                        <h4>{{ slider.description }}</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
</template>

<script>
export default {
  name: 'LeftsideSlider',
  props: {
    msg: String
  },
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



