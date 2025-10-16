<template>
    <section class="latest-event-section">
        <div class="container">
                <div class="section-title">
                    <h2>Upcoming Events </h2>
                    </div>
                <div class="latest-events">
                    <VueSlickCarousel v-bind="settings" v-if="upcoming_loop.length" >
                <div class="events-crad" v-for='(event) in upcoming_loop' :key="event.id">
                  <div class="image-box">
                <a href=""><img :src="(event.images.length) ? event.images[0].imageUrl:''"  class="img-fluid">
                </a></div>
            <div class="event-content">
            <span class="category"><a href="">{{event.status}}</a></span>
            <h3><span @click="event_temp_store(event)" class="nav-link">{{event.title}}</span></h3>
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
        upcoming_loop:null
                    }
                    },
                    props: {
            allevent: Array
          },
          created(){
            this.globalGetreauth('event/upcoming').then((result) => {
				const responsedata = result.data;
              this.upcoming_loop = responsedata;
				console.log(responsedata);
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
          event_temp_store:function(event){
            console.log(event)
            for (let i = 0; i < this.upcoming_loop.length; i++) {
                if(this.upcoming_loop[i].eventId == event.eventId){
                  this.setvalueinlocalstroage('event_tem',this.upcoming_loop[i]);
                  this.$router.push({ name: 'event_details',params: {id:this.upcoming_loop[i].eventId } });
                  this.$router.go();
                    break;
                }
                    }
            
            
          }
        },
                 }
               </script>