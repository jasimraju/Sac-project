<template>
    <div class="col-md-8 offset-md-2">
        <div class="subcription-form">
            <div class="title">
                <h3>Subscription Form</h3>
            </div>

            <div class="subcription-review-card">
                <div class="subcription-person-content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text">
                                <p>Name</p>
                                <h5>{{ subcription_details.userDetails.name }}</h5>
                            </div>
                        </div>
                    </div>
                </div><!-- end -->
                <div class="subcription-person-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="text">
                                <p>NRIC/ Passport No. </p>
                                <h5>{{ subcription_details.userDetails.nricOrPassport }}</h5>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text">
                                <p>CDP Securities Account No.</p>
                                <h5>{{ subcription_details.userDetails.securityAccountNo }}</h5>
                            </div>
                        </div>
                    </div>
                </div><!-- end -->
                <div class="subcription-person-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="text">
                                <p>Country of Residence</p>
                                <h5>{{ subcription_details.userDetails.country }}</h5>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text">
                                <p>Residency Status</p>
                                <h5>{{ subcription_details.userDetails.residencyStatus }}</h5>
                            </div>
                        </div>
                    </div>
                </div><!-- end -->
            </div>

            <div class="grid-button mt-5">
                <router-link class="btn btn-warning" :to="{ name: 'subscriptionentry', params: { id: 2 }}">Start</router-link>
                <router-link class="btn btn-secondary" :to="{ name: 'subscriptiondetails', params: { id: subcription_details.investmentId,type:7 }}">Back</router-link>
            </div>

        </div>
    </div>
</template>    
<script>
export default {
    name: 'Subscription_details',
    data(){
        return{
            subcription_details:null
        }
    },

created(){
    var investment_details = this.getlocalkey('subcriptionitems_tem');
    this.subcription_details = investment_details;
},

}
</script>
