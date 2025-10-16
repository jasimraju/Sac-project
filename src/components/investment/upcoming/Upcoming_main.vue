<template>
  <section class="upcoming-event-section" v-if="upcominginvestment.length">
		<div class="container">
			<div class="section-title">
				<h2>Upcoming Investments  </h2>
				<p>Aliquam dapibus orci quis nunc viverra, eget vehicula lectus pulvina</p>
			</div>
			<div class="upcoming-events">
				<VueSlickCarousel v-bind="settings"  >
		

		<div class="events-box-parent" v-for='(investment) in upcominginvestment' :key="investment.investmentId">
			
			<Upcoming_loop :investment_details="investment" />
		
		</div><!-- end-->
				
		</VueSlickCarousel>
	</div>	
	</div>	
	</section>
 </template>   

         <script>

import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'

  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

             export default {
             name: 'Upcoming_main',
            components: {VueSlickCarousel,
				Upcoming_loop: () => import("./Upcoming_loop.vue") },
				data() {
					return {settings:{
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 300,
        infinite: true,
        autoplay: false,
        responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]					
	},

	upcominginvestment:[],
	loginstatus: false,
				}
				},
				created() {
					
					this.loginstatus = this.checkloginstatus();
					console.log(this.loginstatus);
				if(this.loginstatus){
					console.log();
            this.globalGetreauth('home/get/upcoming/investments').then((result) =>{
            const responsedata = result;
			console.log(responsedata);
        this.upcominginvestment = responsedata;
		//this.upcoming_invesment_filter = responsedata;
		
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