<template>

    <section class="event-details-page" v-if="event_unique_details !=null">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="event-details">
                        <div class="feature-image">
                            <img v-if="event_unique_details.images.length" :src="event_unique_details.images[0].imageUrl" alt="" class="img-fluid">
                        </div>
                        <div class="publish-date">{{event_unique_details.eventDate}}</div>
                        <div class="event-date-time">
                            <div class="date">
                                <p>Date</p>
                                <h5>{{event_unique_details.eventDate}}</h5>
                            </div>
                            <div class="date">
                                <p>Time</p>
                                <h5>{{event_unique_details.fromTime}} - {{event_unique_details.toTime}}</h5>
                            </div>
                        </div>
                        <div class="title">
                            <h2>{{event_unique_details.title}}</h2>
                        </div>
                        <div class="grid-button mt-5" v-if="event_unique_details.status =='Past'">
                                                   </div>
                        <div class="grid-button mt-5" v-else>
                            <div v-if="checkloginstatus()">
                            <span class="btn btn-secondary" v-if="checkloginstatus && is_u_inrested" type="button">I'm interested in this event!</span>
                            <span  @click="submit_requst" class="btn btn-warning" v-if="!is_u_inrested">Register
                                Interest</span>
                                <span class="btn btn-warning" @click="submit_requst_withdraw()" v-else>
                            Withdraw Interest</span></div>
                        </div>

                        <div class="events-description">
                            <p>{{event_unique_details.description}}</p>
                        </div>
                        <div class="share-icons">
                            <h5>Is it useful? Share now</h5>
                            <ul>
                                <li><a href=""><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href=""><i class="fab fa-twitter"></i></a></li>
                                <li><a href=""><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Upcoming_event v-if="event_unique_details.upcomingEvents != null" :allevent="event_unique_details.upcomingEvents"/>
    </section>
</template>    
<script>
export default {
    name: 'Event_main_details',
    data(){return{
        event_unique_details:null,
        is_u_inrested:false,
    }},
    components: {
    Upcoming_event: () => import("./Upcoming_event.vue"),
         
},
    created(){
        this.event_unique_details = this.getlocalkey('event_tem');
        this.$route.params.type
        if(this.$route.params.id == this.event_unique_details.eventId){
            this.checkevent_id_exit();
        }else{
            this.$router.push({ name: 'event'});
        }
        
    },
    methods:{
        submit_requst:function(){
            
            if(this.checkloginstatus()){
              
                var postdata = {"eventId":this.event_unique_details.eventId};
           // var useerdata = this.getlocalkey('userdata');
            this.globalputauth('event/registerInterest/1',postdata).then((result) =>{
            const responsedata = result.data;
                console.log(responsedata);
                const thanks_mgs = {
                    "title":"Thank you for your Interest",
                    "description": "We have received your interest and we will notify you when the date is closer. If required, we will contact you for further information.",
                    "other": "If you require any clarfications or information, please email us at enquiry@saccapital.com.sg",
                    "link":"myactive/interest/event",
                    'button_text':"View all interested events"
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
           

        },
        submit_requst_withdraw:function(){
            
            if(this.checkloginstatus()){
               
                var postdata = {"eventId":this.event_unique_details.eventId};
           // var useerdata = this.getlocalkey('userdata');
            this.globalputauth('event/registerInterest/2',postdata).then((result) =>{
            const responsedata = result.data;
                console.log(responsedata);
                const thanks_mgs = {
                    "title":"Thank you for your withdraw Interest",
                    "description": "We've received your withdraw Interest. If required, we will contact you for further information.",
                    "other": "If you require any clarfication or information please email us at enquiry@saccapital.com.sg",
                    "link":"myactive/interest/event",
                    'button_text':"View all interested events"
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
           

        },
        checkevent_id_exit:function(){
            this.globalGetreauth('event/interestedEvents').then((result) =>{
            const responsedata = result.data;
                
            for (let i = 0; i < responsedata.length; i++) {
                if(responsedata[i].eventId == this.event_unique_details.eventId){
                    this.is_u_inrested = true;
                    break;
                }
                    }
                
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