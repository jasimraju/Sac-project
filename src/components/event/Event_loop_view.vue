<template>
 <div class="events-crad" :class="showclass" v-if="event_details !== undefined" :data-index="loop_number">
    <div class="image-box" @click="event_temp_store">
                                    <a href=""> <img v-if="event_details.images.length"  :src="m_baseUrl+m_version+'file/get/'+event_details.images[0].imageId" class="img-fluid"></a>
                                </div>
                                    <div class="status"><span>{{event_details.status}}</span></div>
                                    <div class="event-content">
                                        <h3>
                                            <span @click="event_temp_store" class="nav-link">{{event_details.title}}</span>
                                            </h3>
                                        <div class="event-time">
                                            <div class="date">
                                                <p>Date</p>
                                                <h5>{{event_details.eventDate}}</h5>
                                            </div>
                                            <div class="time">
                                                <p>Time</p>
                                                <h5>{{event_details.fromTime}} - {{event_details.toTime}}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div><!-- end-->
</template>    
<script>
export default {
    name: 'Event_loop_view',
    props: {
        event_details: Object,
        loop_number:Number
          },
          created() {
		console.log(this.event_details);
    },
          methods:{
          event_temp_store:function(){

            this.setvalueinlocalstroage('event_tem',this.event_details);
            this.$router.push({ name: 'event_details',params: {id:this.event_details.eventId } })
          }
        },
        computed: {
    showclass: function() {
		
		var display = (this.loop_number > 5 ?' d-none':'');
		
        return display;
    }
},
}
</script>