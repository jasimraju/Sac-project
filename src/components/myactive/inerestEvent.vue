<template>
	<div class="col-lg-9 col-md-9">

<div class="my-activity-right-side">
    <div class="investment-filter">
        <div class="row">
            <div class="col-lg-3 col-md-5 col-sm-12 col-12">
                <div class="search-filter">
                    <div class="input-group mb-3">
                      <input type="text" @keyup="search_title" class="form-control" placeholder="Search Items......." aria-label="serch">
                      <span class="input-group-text"><i class="bi bi-search"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-2 col-sm-12 col-12"></div>
            <div class="col-lg-3 col-md-5 col-sm-12 col-12">
                <div class="sorting-filter">
                    <select class="form-select" @change="event_fillter" aria-label="Default select example">
								<option value="1">Newest (default)</option>
								<option value="2">Most Popular</option>
								<option value="3">Alphabetical</option>
							</select>
                </div>
            </div>
        </div>
    </div>

    <div class="my-activity-list-grid">
    
        <div class="row" v-if="this.loginstatus && interset_event.length">
            <div class="col-md-6" v-for='(event, index) in interset_event' :key="event.id">
                                <Event_loop :event_details="event" :loop_number="index"/>
                            </div>      
                            <button class="btn btn-secondary" v-if="interset_event.length > 6" @click="remove_display"
									data-class="events-crad" data-remove-class="d-none">View More</button>      
        </div>
        <Otherdata v-else :title="'Oops! We do not have Interested Events currently.'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'View all events'" :button_two_url="'event'" />
   
    </div>

</div><!-- end right side -->

</div>	
    </template>
    <script>
    
    export default {
        name: 'interest_event',
        data(){return {
		loginstatus:false,
        interset_event:[],
        interset_event_filter:[]
	}
},
components: {
    Event_loop: () => import("../event/Event_loop_view.vue"),
    Otherdata: () => import("./Profilefound.vue")     
},

        props: {
            msg: String
        },
        created() {
    this.loginstatus = this.checkloginstatus();
    if(this.loginstatus){
       
       this.globalGetreauth('event/sort/userInterestedEvents/3').then((result) =>{
            const responsedata = result.data;
        this.interset_event = responsedata;	
        this.interset_event_filter = responsedata;
        console.log(this.interset_event);
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
methods:{
    search_title: function (e) {
			
			var value = e.currentTarget.value;
				if (value) {
					this.interset_event = this.interset_event_filter.filter((item) => {
						return item.title.toLowerCase().startsWith(value);
						//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
					})
				} else {
					this.interset_event = this.interset_event_filter;
				}
			
		

		},
        event_fillter:function(e){
		//error
		var type = e.currentTarget.value;
	

		//all
		this.globalGetreauth('event/sort/userInterestedEvents/'+type).then((result) => {
				const responsedata = result.data;
				this.interset_event = responsedata;
				
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
}
    }
    </script>	