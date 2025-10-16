<template>
    <section class="archive-section investment-list-details-view">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="my-activity-details-box">
                        <div class="row">
                            <Subscriptionside v-if="!$route.params.type || $route.params.type == 2 || $route.params.type == 5 || $route.params.type == 7" :subscription_details_data="subscription_details_data" :subscription_type="1" />
                            <Subscriptionside v-if="$route.params.type == 6" :subscription_details_data="subscription_details_data" :subscription_type="6" />
                            <SubscriptionDetails v-if="!$route.params.type" :subscription_details_data="subscription_details_data" />
                            <SubscriptionInput v-else-if="$route.params.type == 2" :subscription_details_data="subscription_details_data"/>
                            <Allocationconfimation v-else-if="$route.params.type == 3" :subscription_details_data="subscription_details_data"/>
                            <Allocationconfimationsubmit v-else-if="$route.params.type == 4" :subscription_details_data="subscription_details_data"/>
                            <Completedsubscription v-else-if="$route.params.type == 5" :subscription_details_data="subscription_details_data"/>
                            <Submit_final_all v-else-if="$route.params.type == 6" :subscription_details_data="subscription_details_data"/>
                            <PendingSubscription v-else-if="$route.params.type == 7" :subscription_details_data="subscription_details_data"/>
                        </div>
                    </div><!-- end-->
                </div>
                
                  <!-- Header--->
            </div>

         <SubscriptionDescription v-if="!$route.params.type || $route.params.type == 4 || $route.params.type == 5 || $route.params.type == 6" :subscription_details_data="subscription_details_data" />
         <PendingSubscriptionDescription v-else-if="$route.params.type == 7" :subscription_details_data="subscription_details_data" />
        </div>
</section></template>    
<script>
export default {
    name: 'Subscription_details',
    components: { Subscriptionside: () => import("./subscription_heder.vue"),
    SubscriptionDescription: () => import("./Subscription_description.vue"),
    SubscriptionDetails: () => import("./subscription_details.vue"),
    Completedsubscription: () => import("./subscription_details_comp_other.vue"),
    Allocationconfimation: () => import("./allocation_confirmation.vue"),
    Allocationconfimationsubmit: () => import("./allocation_details.vue"),
    Submit_final_all: () => import("./submit_final_allocation.vue"),
    SubscriptionInput: () => import("./amend_post.vue"),
    PendingSubscription: () => import("../pendingsubscription/pendingsubscriptiondetails.vue"),
    PendingSubscriptionDescription: () => import("../pendingsubscription/pending_description.vue"),
},
    data() {
        return {
            subscription_details_type: null,
            subscription_details_data: [],
            
        }
    },
    created() {
       
        this.subscription_details_data = this.getlocalkey('subcriptionitems_tem');
        if(this.$route.params.id != this.subscription_details_data.investmentId){
			this.$router.push({ name: 'myactive'});
        }
        console.log(this.subscription_details_data);
        this.subscription_details_type = this.$route.params.type;
     
        console.log(this.subscription_details_type)

        //this.checkevent_id_exit()
    },
    methods: {
		investment_temp_store: function () {
			console.log(this.subscription_details_data);
			this.setvalueinlocalstroage('subcriptionitems_tem', this.subscription_details_data);
			this.$router.push({ name: 'subscriptiondetails', params: { id: this.subscription_details_data.investmentId,type:2} })
		}
    }
}
</script>
