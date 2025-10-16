<template>
    <div class="final-allocation-thanks">
        <img src="../../assets/image/icons/thanks.svg">
        <h4>Thank you for your indication of interest in <span>{{ subscription_details_data.title }}</span>
        </h4>
        <p>We are pleased to notify that you have been allocated a total of
            <strong>{{ subscription_details_data.noOfShares }}</strong> placement shares and the Issue Price has been set. Please note that an IPO Placement Transaction Fee of 1% + GST on the Subscription Amount will be levied on successful IPO applications. Please click "Next" for further details.
        </p>
        <div class="grid-button mt-4">
            <a href="#" class="btn btn-secondary" type="button">Cancel</a>
            <a href="#" class="btn btn-warning" type="button" @click="investment_temp_store">Next</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'allocation_confirmation',
    props: {
        subscription_details_data: Object
    },
    methods: {
		investment_temp_store: function () {
			
			this.setvalueinlocalstroage('subcriptionitems_tem', this.subscription_details_data);
			this.$router.push({ name: 'subscriptiondetails', params: { id: this.subscription_details_data.investmentId,type:6 } })
		}
    }
}
</script>