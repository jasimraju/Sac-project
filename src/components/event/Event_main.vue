<template>
<section class="latest-event-section">
	<div class="container">
			<div class="section-title">
				<h2>Latest Events </h2>
				
			</div>
			<div class="latest-events">
				<VueSlickCarousel v-bind="settings" v-if="allevent.length" >
			<div class="events-crad" v-for='(event) in allevent' :key="event.id">
				<div class="image-box" @click="event_temp_store(event)">
					
			<a href=""><img :src="(event.images.length) ? m_baseUrl+m_version+'file/get/'+event.images[0].imageId:''"  class="img-fluid">
            </a></div>
		<div class="event-content">
		<span class="category"><a href="">{{event.status}}</a></span>
		<h3><router-link :to="{name:'event_details'}" class="nav-link">{{event.title}}</router-link></h3>
		<div class="event-time">
		<div class="date">
		<p>Date</p>
		<h5>{{event.eventDate}}</h5>
		</div>
		<div class="time">
		<p>Time</p>
		<h5>{{event.fromTime}}-{{event.toTime}}</h5>
		</div>
		</div>
		</div>
		</div><!-- end-->
		
	</VueSlickCarousel>
		</div>
		</div>	
	</section>
</template>   

       <script>

import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
		export default {
             name: 'Event_main',
            components: { VueSlickCarousel },
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
	allevent:[]
				}
				},
				created() {
					console.log('test');
					this.globalGetreauth('home/get/latest/events').then((result) =>{
						
            const responsedata = result.data;
			//console.log(responsedata);
			this.allevent = responsedata;
      
	
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
					event_temp_store:function(event_unique_details,){

this.setvalueinlocalstroage('event_tem',event_unique_details);
this.$router.push({ name: 'event_details',params: {id:event_unique_details.eventId } })
},
				}

             }
           </script>