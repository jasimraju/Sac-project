<template>
    <div class="tab-pane fade show active" id="v-pills-nric" role="tabpanel" aria-labelledby="v-pills-nric-tab">
        <div class="document-header-section subscription-title">
            <h4 class="text-center pb-2 pt-2 w-100">Subscription Form</h4>
        </div>
 
        <div class="document-content-section">
            <div class="user-profile-info row">
                            <div class="col-lg-12 col-md-12">
                              
                                <div>
                                    <h4 >{{ subseqfrom.investmentTitle }}</h4>
                                 
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 question-sub-form"  v-for="(subseqfromquestion,index) in subseqfrom.questionnaires" :key="index">
                                <div>0{{index+1}}/0{{ subseqfrom.questionnaires.length }}</div>
                                <div>
                                    <h4 >{{ from_details.questionnaires[index].title  }}</h4>
                                    <div class="col-lg-12 col-md-12 question-child-sub-form" v-for="(subseqfromquestionchild,childindex) in subseqfromquestion.childDetails" :key="childindex">
                                        
                                        <div>Your answer</div>
                                        <div>
                                            <h5 >{{ get_qustion_result(from_details.questionnaires[index].childDetails,subseqfromquestionchild.title)  }}</h5>
                                    
                                </div>
                                <!--start subchild-->
                                <div class="row" v-if="subseqfromquestionchild.subChildDetails.length != 0">
                                <div  class="col-lg-6 col-md-6 question-child-sub-form" v-for="(subseqfromquestionsubchild,subchildindex) in subseqfromquestionchild.subChildDetails" :key="subchildindex">
                                    <h6>{{ from_details.questionnaires[index].childDetails[childindex].subChildDetails[subchildindex].title  }}</h6> 
                                    <div>Your answer</div>
                                    <h6>{{ subseqfromquestionsubchild.title }}</h6>
                                </div> 
                                </div>
                                 <!--end subchild-->
                                    </div>
                                    <!--end child-->
                                </div>
                               
                            </div>
                          
                        </div>
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'Manage_document_subceription',
    data(){
        return {
            subseqfrom: null,
            from_details:null,
             
        }
    },
    created() {
        this.subseqfrom = this.getlocalkey('subcriptionitems_qustion');
       console.log( this.subseqfrom)
        this.globalGetreauth('investment/questions/details/'+this.subseqfrom.formId).then((result) => {
                const responsedata = result.data;
              this.from_details = responsedata;
                console.log(responsedata);
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
    methods: {
        get_qustion_result:function(questiondetailschild,value_id){
            var status = this.isNumeric(value_id);
            if(status){
                value_id = parseInt(value_id);
                console.log(value_id);
                console.log(questiondetailschild);
            for (let i = 0; i < questiondetailschild.length; i++) {

                if(value_id == questiondetailschild[i].childId){
                    return questiondetailschild[i].title;
                }
                
            }
        }
          
        },
      isNumeric:function(num){
        return !isNaN(num)
        }
    }

}
</script>
    