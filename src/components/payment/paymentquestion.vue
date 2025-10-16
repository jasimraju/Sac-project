<template>
      <div class="row">
    <div class="col-md-8 offset-md-2">
        <div class="subcription-form">
            <div class="payment">

                <form class="row g-3 needs-validation" novalidate="">
                    <h3><strong>Share Payment</strong></h3>
                    <div class="follows-check">
                        <label class="form-label">{{ paymentquestion.paymentDescription }}</label>
                        <div class="form-check" v-for="(option) in paymentquestion.options" :key="option.id">
                            <input class="form-check-input" v-model="inputdata['option_1'].name" type="radio" name="flexRadioDefault" :value="option.investmentSubscriptionPaymentInfoId">
                            <label class="form-check-label" for="1">{{ option.paymentOptions }}
                            </label>
                        </div>
                    </div>
                    <div class="grid-button mt-5">
                        
                        <span class="btn btn-warning" @click="final_question_submit">Next</span>
                    </div>
                </form>

            </div>

        </div>
    </div>
</div>
</template>    

<script>
export default {
    name: 'Subscription_description',
    props: {
        subscription_details_data_data: Object
    },
    data(){
        return {
            subscription_details_data:null, 
            paymentquestion:null,
            payment_details:null,
            inputdata:{
                option_1: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "option_1",
                                       
                }
            }
        }
    },
    created() {
        this.subscription_details_data = this.getlocalkey('subcriptionitems_tem');
        this.payment_details = this.getlocalkey('process_payment');
        var investmentId = this.subscription_details_data.investmentId;
        this.globalGetreauth('investment/paymentDetails/'+investmentId).then((result) => {
           
                const responsedata = result.data;
                
                this.paymentquestion = responsedata;
                console.log(this.paymentquestion);
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
    methods:{
        final_question_submit:function(){
            if(this.inputdata.option_1.name){
                //submit payment question
                var v_type = this.inputdata.option_1.name;
               if(this.inputdata.option_1.name == 1){
                //checque
                
               this.$router.push({ name: 'Payment', params:{type:3,paymenttype:v_type} })
              
               }
               else if(this.inputdata.option_1.name == 2){
                
                this.$router.push({ name: 'Payment', params:{type:4,paymenttype:v_type} })
     
               }
               else if(this.inputdata.option_1.name == 3){
              
                this.$router.push({ name: 'Payment', params:{type:5,paymenttype:v_type} })
              
                }

            }
        }
    }



}
</script>