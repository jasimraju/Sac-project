<template>
	<section class="archive-section">
		<div class="container">

			<div class="investment-filter">
				<div class="row">
					<div class="col-lg-4 col-md-4 col-sm-12 col-12">
						<div class="search-filter">
							<div class="input-group mb-3">
								<input type="text" class="form-control" @keyup="search_title"  @keydown="search_title"
									placeholder="Search Items......." aria-label="serch">
								<button class="btn btn-secondary"><i class="bi bi-search"></i></button>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-12 col-12"></div>

					<div class="col-lg-4 col-md-4 col-sm-12 col-12">
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

			<div class="investment-list-grid">

				<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-if="loginstatus">
					<li class="nav-item" role="presentation">
						<button class="nav-link active" data-type="1" id="pills-all-tab" data-bs-toggle="pill"
							data-bs-target="#all" type="button" role="tab" aria-controls="pills-all"
							aria-selected="true">All</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="pills-ongoing-tab" data-type="2" data-bs-toggle="pill"
							@click="getongoingevent_loginuser" data-bs-target="#ongoing" type="button" role="tab"
							aria-controls="pills-ongoing" aria-selected="false">Ongoing</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="pills-past-tab" data-type="3" data-bs-toggle="pill"
							@click="getpastevent_loginuser" data-bs-target="#past" type="button" role="tab"
							aria-controls="pills-past" aria-selected="false">Past</button>
					</li>
				</ul>

				<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-else>
					<li class="nav-item" role="presentation">
						<button class="nav-link active" data-type="3" id="pills-all-tab" data-bs-toggle="pill"
							data-bs-target="#all" type="button" role="tab" aria-controls="pills-all"
							aria-selected="true">Past</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="pills-ongoing-tab" data-bs-toggle="pill" data-bs-target="#ongoing"
							type="button" role="tab" aria-controls="pills-ongoing" aria-selected="false"
							@click="showregmodal">Upcoming</button>
					</li>

				</ul>

				<div class="tab-content" id="pills-tabContent">
					<div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="pills-all-tab">
						<div class="row" v-if="!this.loginstatus && past_event.length">
							<div class="col-md-4" v-for='(event, index) in past_event' :key="event.id">
								<Event_loop :event_details="event" :loop_number="index" />
							</div>

							<div class="more-btn">
							
								<button class="btn btn-secondary" v-if="all_event.length > 6" @click="remove_display"
									data-class="events-crad" data-remove-class="d-none">View More</button>
							</div>

						</div>
						<div class="row" v-else-if="this.loginstatus && all_event.length">
							<div class="col-md-4" v-for='(event, index) in all_event' :key="event.id">
								<Event_loop :event_details="event" :loop_number="index" />
							</div>

							<div class="more-btn">
								<button class="btn btn-secondary" v-if="all_event.length > 6" @click="remove_display"
									data-class="events-crad" data-remove-class="d-none">View More</button>
							</div>

						</div>
						<Event_no_data v-else />
					</div>
					<!-- end all investment--->

					<div class="tab-pane fade" id="ongoing" role="tabpanel" aria-labelledby="pills-ongoing-tab">
						<div class="row" v-if="this.loginstatus && ongoing_event.length">
							<div class="col-md-4" v-for='(event, index) in ongoing_event' :key="event.id">
								<Event_loop :event_details="event" :loop_number="index" />
							</div>

							<div class="more-btn">
								<button class="btn btn-secondary" v-if="ongoing_event.length > 6" @click="remove_display"
									data-class="events-crad" data-remove-class="d-none">View More</button>
							</div>

						</div>
						<Event_no_data v-else />
					</div>
					<!-- end upcomint investment--->
					<div class="tab-pane fade" id="past" role="tabpanel" aria-labelledby="pills-past-tab">
						<div class="row" v-if="this.loginstatus && past_event.length">
							<div class="col-md-4" v-for='(event, index) in past_event' :key="event.id">
								<Event_loop :event_details="event" :loop_number="index" />
							</div>

							<div class="more-btn">
								<button class="btn btn-secondary" v-if="past_event.length > 6" @click="remove_display"
									data-class="events-crad" data-remove-class="d-none">View More</button>
							</div>

						</div>
						<Event_no_data v-else />
					</div>
					<!-- end complete investment--->
				</div>
			</div>
		</div>
	</section>
</template>    
<script>
export default {
	name: 'Event_main_page',
	components: {
		Event_loop: () => import("./Event_loop_view.vue"),
		Event_no_data: () => import("./Event_no_data_view.vue"),

	},
	data() {
		return {
			loginstatus: false,
			past_event: [],
			all_event: [],
			upcoming_event: [],
			ongoing_event: [],
			all_event_filter: [],
			upcoming_event_filter: [],
			ongoing_event_filter: [],
			past_event_filter: []
		}
	},
	created() {
		this.loginstatus = this.checkloginstatus();
		if (this.loginstatus) {
			/*login*/
			console.log('test');
			this.globalGetreauth('event').then((result) => {
				const responsedata = result.data;
				this.all_event = responsedata;
				this.all_event_filter = responsedata;
				console.log(this.all_event);
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
		else {
			/*without login*/
			this.globalgetdata('event/past').then((result) => {
				const responsedata = result.data;
				this.past_event = responsedata;
				this.past_event_filter = responsedata;

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
	methods: {
		getpastevent_loginuser: function () {
			if (this.loginstatus) {
				this.globalgetdata('event/sort/3').then((result) => {
					const responsedata = result.data;
					this.past_event = responsedata;
					this.past_event_filter = responsedata;

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
		getongoingevent_loginuser: function () {
			if (this.loginstatus) {
				this.globalGetreauth('event/sort/2').then((result) => {
					const responsedata = result.data;
					this.ongoing_event = responsedata;
					this.ongoing_event_filter = responsedata;

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
		getupcoming_investment_loginuser: function () {
			if (this.loginstatus) {
				this.globalGetreauth('event/upcoming').then((result) => {
					const responsedata = result.data;
					this.upcoming_event = responsedata;
					this.upcoming_event_filter = responsedata;

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
		event_fillter:function(e){
		//error
		var type = e.currentTarget.value;
		var cusid_ele = document.getElementsByClassName('nav-link');
		var filter_id;
for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];  
    
	if(item.classList.contains("active")){
		filter_id = item.getAttribute("data-type"); 
		
	}
}

	if(filter_id == 1){
		//all
		this.globalGetreauth('event/sort/1?sort='+type).then((result) => {
				const responsedata = result.data;
				this.all_event = responsedata;
				
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
	else if(filter_id == 2){
		//upcoming
		this.globalGetreauth('event/sort/2?sort='+type).then((result) => {
				const responsedata = result.data;
				this.ongoing_event = responsedata;
				
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
	else if(filter_id == 3){
		//completed
		this.globalGetreauth('event/sort/3?sort='+type).then((result) => {
				const responsedata = result.data;
				this.past_event = responsedata;
				
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
		remove_display(e) {
			var morebutton = e.currentTarget;
			var data_class = morebutton.getAttribute("data-class");
			var data_remvoe_class = morebutton.getAttribute("data-remove-class");
			var event_class = document.querySelectorAll('.' + data_class);
			for (var i = 0; i < event_class.length; ++i) {
				var item = event_class[i];
				item.classList.remove(data_remvoe_class);
			}
			morebutton.classList.add(data_remvoe_class);
		},
		search_title: function (e) {
			console.log('uyooio');
			var value = e.currentTarget.value;
			var cusid_ele = document.getElementsByClassName('nav-link');
			var filter_id;
			for (var i = 0; i < cusid_ele.length; ++i) {
				var item = cusid_ele[i];

				if (item.classList.contains("active")) {
					filter_id = item.getAttribute("data-type");

				}
			}
			if (filter_id == 1) {
				console.log(value);
				if (value) {
					this.all_event = this.all_event_filter.filter((item) => {
						return item.title.toLowerCase().startsWith(value);
						//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
					})
				} else {
					this.all_event = this.all_event_filter;
				}
			}
			else if (filter_id == 2) {

				if (value) {
					this.ongoing_event = this.ongoing_event_filter.filter((item) => {
						return item.title.toLowerCase().startsWith(value);
						//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
					})
				} else {
					this.ongoing_event = this.ongoing_event_filter;
				}
			}
			else if (filter_id == 3) {
				if (value) {
					this.past_event = this.past_event_filter.filter((item) => {
						return item.title.toLowerCase().startsWith(value);
						//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
					})
				} else {
					this.past_event = this.past_event_filter;
				}
			}

		},
	}
}
</script>