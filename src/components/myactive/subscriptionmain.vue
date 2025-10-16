<template>
    <div class="col-lg-9 col-md-9">
        <div class="my-activity-right-side">
            <div class="investment-filter">
                <div class="row">
                    <div class="col-lg-3 col-md-5 col-sm-12 col-12">
                        <div class="search-filter">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" @keyup="search_title" @keydown="search_title"
                                    placeholder="Search Items......." aria-label="serch">
                                <span class="input-group-text"><i class="bi bi-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-2 col-sm-12 col-12"></div>
                    <div class="col-lg-3 col-md-5 col-sm-12 col-12">
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

            <div class="my-activity-list-grid">

                <ul class="nav nav-pills mb-3 my-activity-subscribtions" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" data-type="1" id="pills-all-tab" data-bs-toggle="pill"
                            data-bs-target="#all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">In
                            Process</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" data-type="2" id="pills-complete-tab" data-bs-toggle="pill"
                            data-bs-target="#complete-offering" type="button" role="tab" aria-controls="pills-complete"
                            aria-selected="false">Completed</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="pills-all-tab">
                        <div class="row" v-if="this.loginstatus && subscription_invesment_in_process.length">
                      
                            <div class="col-lg-6 col-md-6" v-for="(investment, index) in subscription_invesment_in_process"
                                :key="investment.investmentId">

                                <subscriptionitems
                                    v-if="investment.status == 'Pending Allocation'"
                                    :subcriptionitems="investment" :loop_number="index" />
                                <finalallaction
                                    v-else-if="investment.status == 'Final Allocation' && !checkcompletedinvesemnt(investment.allocationDate)"
                                    :subcriptionitems="investment" :loop_number="index" />
                                <completedinvesment
                                    v-else-if="investment.status == 'Pending Subscription' && !checkcompletedinvesemnt(investment.allocationDate)"
                                    :subcriptionitems="investment" :loop_number="index" />
                                <completedinvesment
                                    v-else-if="investment.status == 'Pending Payment' && !checkcompletedinvesemnt(investment.allocationDate)"
                                    :subcriptionitems="investment" :loop_number="index" />
                                    <completedinvesment
                                    v-else-if="!checkcompletedinvesemnt(investment.allocationDate)"
                                    :subcriptionitems="investment" :loop_number="index" />
                                    <completedinvesment
                                    v-else
                                    :subcriptionitems="investment" :loop_number="index" />

                            </div>
                            <div class="more-btn">
                                <button class="btn btn-secondary">View More</button>
                            </div>
                        </div><!-- end row-->
                        <Otherdata v-else :title="'Oops! We do not have Subscription currently.'"
                            :description="'We will keep you informed on further update via notification'"
                            :button_one="'Home'" :button_one_url="'home'" :button_two="'View all investments'"
                            :button_two_url="'investment'" />
                    </div>
                    <div class="tab-pane fade" id="complete-offering" role="tabpanel" aria-labelledby="pills-complete-tab">
                        <div class="row" v-if="this.loginstatus && subscription_invesment_completed.length">
                            <div class="col-lg-6 col-md-6" v-for="(investment, index) in subscription_invesment_completed"
                                :key="investment.investmentId">


                                <completedinvesment v-if="checkcompletedinvesemnt(investment.allocationDate)"
                                    :subcriptionitems="investment" :loop_number="index" />
                            </div>
                            <div class="more-btn">
                                <button class="btn btn-secondary">View More</button>
                            </div>
                        </div><!-- end row-->
                        <Otherdata v-else :title="'Oops! We do not have Completed Subscription currently.'"
                            :description="'We will keep you informed on further update via notification'"
                            :button_one="'Home'" :button_one_url="'home'" :button_two="'View all investments'"
                            :button_two_url="'investment'" />
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'subcriptionmain_view',
    props: {
        msg: String
    },
    components: {
        subscriptionitems: () => import("./subseription_pending_allocation.vue"),
        finalallaction: () => import("./subseription_final_allocation.vue"),
        completedinvesment: () => import("./subscription_compted.vue"),
        Otherdata: () => import("./Profilefound.vue"),

    },
    data() {
        return {
            loginstatus: false,
            subscription_invesment_in_process: [],
            subscription_invesment_completed: [],
            subscription_invesment_in_process_filter: [],
            subscription_invesment_completed_filter: []
        }

    }
    ,
    created() {
        this.loginstatus = this.checkloginstatus();
        if (this.loginstatus) {

            this.globalGetreauth('investment/subscription/1').then((result) => {
                const responsedata = result.data;
                this.subscription_invesment_in_process = responsedata;
                this.subscription_invesment_in_process_filter = responsedata;

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
            this.globalGetreauth('investment/subscription/2').then((result) => {
                const responsedata = result.data;
                this.subscription_invesment_completed = responsedata;
                this.subscription_invesment_completed_filter = responsedata;
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
        checkcompletedinvesemnt: function (dat) {
            const date1 = new Date(dat);
            const currentDate = new Date();
            if (date1 > currentDate) {
                return false;

            } else if (date1 < currentDate) {
                return true;

            } else {
                return false;

            }
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
                    this.subscription_invesment_in_process = this.subscription_invesment_in_process_filter.filter((item) => {
                        return item.title.toLowerCase().startsWith(value);
                        //return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
                    })
                } else {
                    this.subscription_invesment_in_process = this.subscription_invesment_in_process_filter;
                }
            }
            else if (filter_id == 2) {

                if (value) {
                    this.subscription_invesment_completed = this.subscription_invesment_completed_filter.filter((item) => {
                        return item.title.toLowerCase().startsWith(value);
                        //return this.all_invesment.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
                    })
                } else {
                    this.subscription_invesment_completed = this.subscription_invesment_completed_filter;
                }
            }

        },
        investment_fillter: function (e) {
            //error
            var type = e.currentTarget.value;
            var cusid_ele = document.getElementsByClassName('nav-link');
            var filter_id;
            for (var i = 0; i < cusid_ele.length; ++i) {
                var item = cusid_ele[i];

                if (item.classList.contains("active")) {
                    filter_id = item.getAttribute("data-type");

                }
            }

            if (filter_id == 1) {
                //all
                this.globalGetreauth('investment/subscription/1?sort=' + type).then((result) => {
                    const responsedata = result.data;
                    this.subscription_invesment_in_process = responsedata;
                    this.subscription_invesment_in_process_filter = responsedata;
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
            else if (filter_id == 2) {
                //upcoming
                this.globalGetreauth('investment/subscription/2?sort=' + type).then((result) => {
                    const responsedata = result.data;
                    this.subscription_invesment_completed = responsedata;
                    this.subscription_invesment_completed_filter = responsedata;
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
    }
}
</script>