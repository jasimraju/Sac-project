<template>
     <div class="col-lg-5 text-center">
                                <div class="logo">
                                    <a href="../"><img :src="m_baseUrl+m_version+'file/get/'+subscription_details_data.thumbnailId"></a>
                                </div>
                                <div class="name">
                                    <span class="pending-allocation">{{ subscription_details_data.status }}</span>
                                    
                                    <h4 id="min_total">{{ subscription_details_data.title }}</h4>
                                </div>
                     
                                <div class="total-gross" v-if=" subscription_type != 6 && $route.params.type != 7 ">
                                    <p>Total Gross Proceeds</p>
                                    <h4 id="max_total">S${{ convertlocla_string(min_cal) }} ~ S$ {{ convertlocla_string(max_cal) }}</h4>
                                    
                                </div>
                               
                        
                                <div class="total-gross" v-if=" $route.params.type == 7  ">
                                    <p>Total Gross Proceeds</p>
                                    <!--UPDATE NEXT-->
                                    <h4 id="max_total">S${{convertlocla_string(fin_price_cal)}}</h4>
                                    
                                </div>
                                
                            </div>
</template>

<script>
export default {
    name: 'Subscription_header',
    props: {
		subscription_details_data: Object,
        subscription_type: Number
	},	data(){
		return {
			img_url: this.secret_key,
			min_cal:null,
			max_cal:null,
            fin_price_cal:null,
			gst_amount_whole:1.09
		}
	}, created() {
		//maxPrice
		//minPrice
		//noOfShares
        this.globalGetreauth('investment/gst/details').then((result_other) => {       
      this.gst_amount_whole  = result_other.data.gst;
      this.fin_price_cal = this.get_total_amount_with_proceed(this.subscription_details_data.noOfShares,this.subscription_details_data.issuePrice,this.gst_amount_whole);
		this.min_cal = this.get_total_amount_with_proceed(this.subscription_details_data.noOfShares,this.subscription_details_data.minPrice,this.gst_amount_whole);
		this.max_cal = this.get_total_amount_with_proceed(this.subscription_details_data.noOfShares,this.subscription_details_data.maxPrice,this.gst_amount_whole);
      console.log(this.subscription_type);
     }).catch((error) => {
if (error.response) {
 //do something
 this.errors.push(error.response.data.message);
}
else if (error.request) {
 //do something else
 
} else if (error.message) {
 //do something other than the other two
}
});
       

	}
   

}
</script>
