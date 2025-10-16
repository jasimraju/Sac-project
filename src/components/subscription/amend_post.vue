<template>
  <div class="col-lg-7">

<form class="row g-3 needs-validation" enctype="multipart/form-data"
							@submit.prevent="handlebasicinfosetp" @keydown.enter="$event.preventDefault()">
    <div class="subcription-single-data-card">
        <div class="subcription-single-data">
            <div class="row">
                <div class="col-md-12">	
                    <div class="subcription-data">
                        <h6>Type of pricing</h6>
                        <h5>Tender price</h5>
                    </div>
                </div>
            </div>
        </div><!-- end-->

        <div class="subcription-single-data">
            <div class="row">
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>Min Price</h6>
                        <input class="form-control" :id="'parent-'+inputdata_tender.min.keyname" type="text" v-model="inputdata_tender.min.name" required>
                    </div>
                </div>
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>Max Price</h6>
                        <input class="form-control" :id="'parent-'+inputdata_tender.max.keyname" type="text"  v-model="inputdata_tender.max.name" required>
                    </div>
                </div>
                <div class="error-box mt-2" v-if="check_min_amount">
                    <p ><a href="#"><i class="fas fa-times-circle"></i></a>Enter minimum tender price S${{ subscription_details_data.minPrice }}</p>
                </div>
            </div>
        </div><!-- end-->

        <div class="subcription-single-data">
            <div class="row">
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>No. of Shares</h6>
                        <input class="form-control" type="text" @keyup="calulate_data" @keydown="calulate_data" v-model="inputdata_tender.number_share.name" required>
                    </div>
                </div>
            </div>
        </div><!-- end-->

        <div class="subcription-single-data">
            <div class="row">
                <h6>Payable by Investment Amount</h6>
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>Min</h6>
                        <h5 v-if="min_amont !== null">S${{ convertlocla_string(min_amont) }}</h5>
                    </div>
                </div>
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>Max </h6>
                        <h5 v-if="max_amont !== null">S${{ convertlocla_string(max_amont) }}</h5>
                        
                    </div>
                </div>
            </div>
        </div><!-- end-->

        <div class="subcription-single-data">
            <div class="row">
                <h6>Service Fees</h6>
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>Min</h6>
                        <h5 v-if="min_amont_service !== null">S${{ convertlocla_string(min_amont_service) }}</h5>
                    </div>
                </div>
                <div class="col-md-6">	
                    <div class="subcription-data">
                        <h6>Max </h6>
                        <h5 v-if="max_amont_service !== null">S${{ convertlocla_string(max_amont_service) }}</h5>
                    </div>
                </div>
            </div>
        </div><!-- end-->

        <div class="grid-button mt-4">
            <router-link :to="{name:'myactive'}"  class="btn btn-secondary">Cancel</router-link>
            <a href="#confirm" class="d-none" id="show-confirm-modal" type="submit" data-bs-toggle="modal">Confirm</a>
             <button  @click="handelvalidation" class="btn btn-warning" type="button" >Confirm</button>
        </div>
         <!-- Modal Start visit -->
          <div class="modal fade" id="confirm"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
               <div class="modal-header add-note-title">
                </div> 
                <div class="modal-body">
                    <div class="text text-center">
                        <h3>Confirm Amend?</h3>
                        <p>Please click on the "Confirm" button if you wish to proceed with the amendment request.</p>
                    </div>

                <div class="modal-footer">
                    
                    <button type="button" id="close_modal" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" @click="handelfromsubmit" class="btn btn-warning">Confirm</button>
                </div>

                </div>
              </div>
            </div>
          </div><!--- end --->

    </div>
</form>
</div>
    </template>    
<script>
import Validation from '../../Validation';
export default {
    name: 'Subscription_details',
    mixins: [Validation],
    props: {
		subscription_details_data: Object
	},
    data(){
       return {
          check_min_amount:false,
          min_amont:null,
          max_amont:null,
          min_amont_service:null,
          max_amont_service:null,
          inputdata_tender: {
				min: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Min are required'],
					keyname: "min",
				},
				max: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Max field are required'],
					keyname: "max",

				},
				number_share: {
					name: null,
					key: ['requiredFunction'],
					msg: ['Application for No. of Shares field are required'],
					keyname: "number_share",

				}
			},
            errors: [],
			validation: [],
            fin_price_cal:null,
			gst_amount_whole:1.09,
            Placement_free_amount: 0.01,
            placement_amount:null,
            grossAmount:null
        }
    },
    created() {
        //console.log(this.subscription_details_data);
        this.globalGetreauth('investment/gst/details').then((result_other) => {
this.gst_amount_whole = result_other.data.gst;

console.log(result_other);
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
       var subcription_data = this.getlocalkey('subcriptionitems_tem');
       this.inputdata_tender.min.name = subcription_data.minPrice;
       this.inputdata_tender.max.name = subcription_data.maxPrice;
       this.inputdata_tender.number_share.name = subcription_data.noOfShares;
       this.min_amont = subcription_data.minPayableInvestmentAmount;
       this.max_amont = subcription_data.maxPayableInvestmentAmount;
       this.min_amont_service = subcription_data.minServiceFee;
       this.max_amont_service = subcription_data.maxServiceFee;
       document.getElementById("max_total").innerHTML = '';
    },
    methods:{
        handelvalidation:function(){
            this.validation = [];
			this.errors = [];
            this.validationallform(this.inputdata_tender);
            var checkvalidtion = this.checkvalidationarray(this.validation);
            if(checkvalidtion){
                var get_optel = document.querySelector("#show-confirm-modal"); 
					get_optel.click();
            }
        },
        handelfromsubmit:function(){
            console.log(this.subscription_details_data);
            if(this.inputdata_tender.min.name >= this.subscription_details_data.minPrice ){
            this.validation = [];
			this.errors = [];
            this.validationallform(this.inputdata_tender);
            var checkvalidtion = this.checkvalidationarray(this.validation);
            if(checkvalidtion){
                console.log('post');
                var postdata = {
                    type:1,
                    investmentId:this.subscription_details_data.investmentId,
                    minPrice: this.inputdata_tender.min.name,
                    maxPrice: this.inputdata_tender.max.name,
                    noOfShares: this.inputdata_tender.number_share.name,
                }
                this.globalpostauth('investment/amend',postdata).then((result) =>{
                    var get_optel = document.querySelector("#close_modal"); 
                    get_optel.click();
                    console.log(result);
                const thanks_mgs = {
                    "title":"Your Amendment is Successful",
                    "description": "We have received your request. You will not be able to withdraw or amend your application after the closing date, unless a supplementary offer document is subsequently issued",
                    "link":"myactive",
                    'button_text':"View Subscription"
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'});
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
        }else{
            this.check_min_amount = true;
            var get_optel = document.querySelector("#close_modal"); 
                    get_optel.click();
        }
        },
        calulate_data:function(){
       
            this.min_amont = this.inputdata_tender.min.name*this.inputdata_tender.number_share.name;
            this.max_amont = this.inputdata_tender.max.name*this.inputdata_tender.number_share.name;

            this.min_amont_service = parseFloat((this.min_amont*this.Placement_free_amount)*this.gst_amount_whole).toFixed(2);
            this.max_amont_service = parseFloat((this.max_amont*this.Placement_free_amount)*this.gst_amount_whole).toFixed(2);
           var vau_min = parseFloat(this.min_amont)+parseFloat(this.min_amont_service);
           var vau_max = parseFloat(this.max_amont)+parseFloat(this.max_amont_service);
            var show_min_max =  'S$'+this.convertlocla_string(vau_min)+'~S$'+this.convertlocla_string(vau_max);
            document.getElementById("max_total").textContent = show_min_max;
        }
    }    
}
</script>