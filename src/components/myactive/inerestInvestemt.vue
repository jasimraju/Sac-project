<template>
<div class="col-lg-9 col-md-9">

    <div class="my-activity-right-side">
        <div class="investment-filter">
            <div class="row">
                <div class="col-lg-3 col-md-5 col-sm-12 col-12">
                    <div class="search-filter">
                        <div class="input-group mb-3">
                          <input type="text" class="form-control" @keyup="search_title" @keydown="search_title" placeholder="Search Items......." aria-label="serch">
                          <span class="input-group-text"><i class="bi bi-search"></i></span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-2 col-sm-12 col-12"></div>
                <div class="col-lg-3 col-md-5 col-sm-12 col-12">
                    <div class="sorting-filter">
                        <select class="form-select" @change="inerest_fillter" aria-label="Default select example">
                            <option value="1">Newest (default)</option>
								<option value="2">Most Popular</option>
								<option value="3">Alphabetical</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-activity-list-grid">
           
            <div class="row" v-if="this.loginstatus && upcoming_invesment.length">
                <div class="col-lg-6" v-for="(investment,index) in upcoming_invesment"
								:key="investment.investmentId">
								<Eventview :investment_details="investment" :loop_number="index" />
							</div>
            </div>
            <Otherdata v-else :title="'Oops! We do not have Interested Investments currently.'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'View all investments'" :button_two_url="'investment'" />

        
        
        </div>

    </div><!-- end right side -->

</div>
</template>
<script>

export default {
    name: 'interest_investment',
    components: { Eventview: () => import("../investment/Eventviewinterest.vue"), 
    Otherdata: () => import("./Profilefound.vue"),},
	data() {
		return {
			loginstatus: false,
			upcoming_invesment: [],
            upcoming_invesment_filter:[]
		}
	},
    created(){
        this.loginstatus = this.checkloginstatus();
    if(this.loginstatus){
       
       this.globalGetreauth('investment/userInterest/sort').then((result) =>{
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
    props: {
        msg: String
    },
    methods:{
        search_title: function (e) {
			
			var value = e.currentTarget.value;
				
			
				console.log(value);
				if (value) {
					this.upcoming_invesment = this.upcoming_invesment_filter.filter((item) => {
						return item.title.toLowerCase().startsWith(value);
						//return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
					})
				} else {
                   
					this.upcoming_invesment = this.upcoming_invesment_filter;
				}
			
		

		},    
        inerest_fillter:function(e){
		//error
		var type = e.currentTarget.value;
	

		//all
		this.globalGetreauth('investment/userInterest/sort?id='+type).then((result) => {
				const responsedata = result.data;
				this.upcoming_invesment = responsedata;
				
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