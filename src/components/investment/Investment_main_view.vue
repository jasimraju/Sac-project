<template>
	<section class="archive-section">
		<div class="container">
			<div class="investment-filter">
				<div class="row">
					<div class="col-lg-4 col-md-4 col-sm-12 col-12">
						<div class="search-filter">
							<div class="input-group mb-3">
								<input type="text" class="form-control" @keyup="search_title"  @keydown="search_title" placeholder="Search Items......."
									aria-label="serch">
								<span class="input-group-text"><i class="bi bi-search"></i></span>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-12 col-12"></div>

					<div class="col-lg-4 col-md-4 col-sm-12 col-12">
						<div class="sorting-filter">
							<select class="form-select" @change="investment_fillter" aria-label="Default select example">
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
						<button class="nav-link active" data-type="1" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#all"
							type="button" role="tab" aria-controls="pills-all" aria-selected="true">All Offerings</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-type="4" id="pills-ongoing-tab" data-bs-toggle="pill"
							data-bs-target="#ongoing" type="button" role="tab" aria-controls="pills-ongoing"
							aria-selected="false" @click="getonging_investment_loginuser" >Ongoing</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-type="2" id="pills-upcoming-tab" data-bs-toggle="pill"
							data-bs-target="#upcoming-offering" type="button" role="tab" @click="getupcoming_investment_loginuser" aria-controls="pills-upcoming"
							aria-selected="false">Upcoming Offerings</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-type="3" id="pills-completed-tab" data-bs-toggle="pill"
							data-bs-target="#completed" type="button" role="tab" aria-controls="pills-completed"
							aria-selected="false" @click="getcomplted_investment_loginuser" >Completed</button>
					</li>
				</ul>
				<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" v-else>
					<li class="nav-item" role="presentation">
						<button class="nav-link active" data-type="3" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#all"
							type="button" role="tab" aria-controls="pills-all" aria-selected="true">Completed</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" data-type="2" id="pills-upcoming-tab" data-bs-toggle="pill"
							data-bs-target="#upcoming-offering" type="button" role="tab" @click="showregmodal"
							aria-controls="pills-upcoming" aria-selected="false">Upcoming Offerings</button>
					</li>

				</ul>

				<div class="tab-content" id="pills-tabContent">
					<div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="pills-all-tab">
						<div class="row" v-if="!this.loginstatus && completed_invesment.length">
							<div class="col-lg-4 col-md-6" v-for="(investment,index) in completed_invesment"
								:key="investment.investmentId">
								<Eventview :investment_details="investment" :loop_number="index" />
							</div>

							<div class="more-btn" v-if=" completed_invesment.length > 8">
								<button class="btn btn-secondary" @click="remove_display" data-remove-class="d-none" data-class="events-box">View More</button>
							</div>

						</div>
						<div class="row" v-else-if="this.loginstatus && all_invesment.length">
							<div class="col-lg-4 col-md-6" v-for="(investment,index) in all_invesment"
								:key="investment.investmentId">
								<Eventview :investment_details="investment"  :loop_number="index"/>
							</div>

							<div class="more-btn" v-if=" all_invesment.length > 8">
								<button class="btn btn-secondary" @click="remove_display" data-remove-class="d-none" data-class="events-box">View More</button>
							</div>

						</div>
						<Otherdata v-else :title="'Oops! We do not have Investment currently.'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'Notification Setting'" :button_two_url="'user_profile'" />
					</div>
					<!-- end all investment--->
					<div class="tab-pane fade" id="ongoing" role="tabpanel"
						aria-labelledby="pills-ongoing-tab">
						<div class="row" v-if="this.loginstatus && ongoing_invesment.length">
							<div class="col-lg-4 col-md-6" v-for="(investment,index) in ongoing_invesment"
								:key="investment.investmentId">
								<Eventview :investment_details="investment" :loop_number="index"/>
							</div>

							<div class="more-btn" v-if=" ongoing_invesment.length > 8"> 
								<button class="btn btn-secondary" @click="remove_display" data-remove-class="d-none" data-class="events-box">View More</button>
							</div>

						</div>
						<Otherdata v-else :title="'Oops! We do not have ongoing Investment currently.'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'Notification Setting'" :button_two_url="'user_profile'" />
					</div>
					<!-- end onging investment--->
					<div class="tab-pane fade" id="upcoming-offering" role="tabpanel"
						aria-labelledby="pills-upcoming-tab">
						<div class="row" v-if="this.loginstatus && upcoming_invesment.length">
							<div class="col-lg-4 col-md-6" v-for="(investment,index) in upcoming_invesment"
								:key="investment.investmentId">
								<Eventview :investment_details="investment" :loop_number="index"/>
							</div>

							<div class="more-btn" v-if=" upcoming_invesment.length > 8"> 
								<button class="btn btn-secondary" @click="remove_display" data-remove-class="d-none" data-class="events-box">View More</button>
							</div>

						</div>
						<Otherdata v-else :title="'Oops! We do not have upcoming Investment currently.'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'User details'" :button_two_url="'user_profile'" />
					</div>
					<!-- end upcomint investment--->
					<div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="pills-completed-tab">
						<div class="row" v-if="this.loginstatus && completed_invesment.length">
							<div class="col-lg-4 col-md-6" v-for="(investment,index) in completed_invesment"
								:key="investment.investmentId">
								<Eventview :investment_details="investment" :loop_number="index"/>
							</div>

							<div class="more-btn" v-if=" upcoming_invesment.length > 8">
								<button class="btn btn-secondary" @click="remove_display" data-remove-class="d-none" data-class="events-box">View More</button>
							</div>

						</div>
						
						<Otherdata v-else :title="'Oops! We do not have Completed Investemnt currently.'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'Notification Setting'" :button_two_url="'user_profile'" />
						
						
					</div>
					<!-- end complete investment--->
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'Investment_main_view',
	components: { Eventview: () => import("./Eventview.vue"),
	Otherdata: () => import("./Otherfound.vue"),
},
	data() {
		return {
			loginstatus: false,
			completed_invesment: [],
			completed_invesment_filter: [],
			all_invesment: [],
			all_invesment_filter: [],
			upcoming_invesment: [],
			upcoming_invesment_filter: [],
			ongoing_invesment: [],
			ongoing_invesment_filter: [],
			interest_invesment:[],
			view_more: 9

		}
	},
	created() {
		this.loginstatus = this.checkloginstatus();
		if (this.loginstatus) {
			/*login*/
			this.get_intereset_investment()
			this.globalGetreauth('investment/sort/1').then((result) => {
				const responsedata = result.data;
				this.all_invesment = responsedata;
				this.all_invesment_filter = responsedata;
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
			
			this.getupcoming_investment_loginuser();
			this.getcomplted_investment_loginuser();
			this.getonging_investment_loginuser();
		}
		else {
			/*without login*/
			this.globalgetdata('investment/sort/3').then((result) => {
				const responsedata = result.data;
				this.completed_invesment = responsedata;
				this.completed_invesment_filter = responsedata;
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
    getcomplted_investment_loginuser:function(){
              if(this.loginstatus){
            this.globalgetdata('investment/get/3').then((result) =>{
            const responsedata = result.data;
        this.completed_invesment = responsedata;
        this.completed_invesment_filter = responsedata;
		
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
    getupcoming_investment_loginuser:function(){
              if(this.loginstatus){
            this.globalGetreauth('investment/get/2').then((result) =>{
            const responsedata = result.data;
        this.upcoming_invesment = responsedata;
		this.upcoming_invesment_filter = responsedata;
		
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
	getonging_investment_loginuser:function(){
              if(this.loginstatus){
            this.globalGetreauth('investment/sort/4').then((result) =>{
            const responsedata = result.data;
        this.ongoing_invesment = responsedata;
		this.ongoing_invesment_filter = responsedata;
		
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
	get_intereset_investment:function(){
		
		this.globalGetreauth('investment/userInterest/sort').then((result) =>{
            const responsedata = result.data;
        this.interest_invesment = responsedata;	
		var data_ar =  new Array();
		for (var i = 0; i < responsedata.length; i++) {
			
			data_ar.push(responsedata[i].investmentId);
			//data_ar.push(responsedata[i].investmentId);
		}
		
		this.interest_invesment = data_ar;
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
				
				console.log(this.interest_invesment);
	},
	is_in_array:function(value){
		return this.interest_invesment.includes(value);
	},
	investment_fillter:function(e){
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
		this.globalGetreauth('investment/sort/1?sort='+type).then((result) => {
				const responsedata = result.data;
				this.all_invesment = responsedata;
				
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
		this.globalGetreauth('investment/sort/2?sort='+type).then((result) => {
				const responsedata = result.data;
				this.upcoming_invesment = responsedata;
				this.upcoming_invesment_filter = responsedata;
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
		this.globalGetreauth('investment/sort/3?sort='+type).then((result) => {
				const responsedata = result.data;
				this.completed_invesment = responsedata;
				this.completed_invesment_filter = responsedata;
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
	search_title:function(e){
		console.log('uyooio');
		var value = e.currentTarget.value;
		var cusid_ele = document.getElementsByClassName('nav-link');
		var filter_id;
		for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];  
    
		if(item.classList.contains("active")){
			filter_id = item.getAttribute("data-type"); 
		
			}
		}
		if(filter_id == 1){
			console.log(value);
			if(value){
				this.all_invesment = this.all_invesment_filter.filter((item)=>{
        return item.title.toLowerCase().startsWith(value);
		//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        this.all_invesment = this.all_invesment_filter;
      }
			}
		else if(filter_id == 2){
			
			if(value){
				this.upcoming_invesment = this.upcoming_invesment_filter.filter((item)=>{
        return item.title.toLowerCase().startsWith(value);
		//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        this.upcoming_invesment = this.upcoming_invesment_filter;
      }
			}
		else if(filter_id == 3){
			if(value){
				this.completed_invesment = this.completed_invesment_filter.filter((item)=>{
        return item.title.toLowerCase().startsWith(value);
		//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        this.completed_invesment = this.completed_invesment_filter;
      }
			}

	},
	remove_display(e){
		var morebutton = e.currentTarget;
		var data_class = morebutton.getAttribute("data-class"); 
		var data_remvoe_class = morebutton.getAttribute("data-remove-class"); 
		var event_class = document.querySelectorAll('.'+data_class);
		for (var i = 0; i < event_class.length; ++i) {
			var item = event_class[i]; 
			item.classList.remove(data_remvoe_class);
		}
		morebutton.classList.add(data_remvoe_class);
	
		
	}
  }
}
</script>