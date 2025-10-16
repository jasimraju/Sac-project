<template>
    <div class="tab-pane fade show active" id="v-pills-nric" role="tabpanel"
    aria-labelledby="v-pills-nric-tab">
    <div class="document-header-section">
        <h4>Proof of Payment</h4>
     
    </div>
    
    <!-- Modal Start visit -->
    <div class="modal fade" id="add-new" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header add-note-title"> <button type="button"
                        class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="upload-files-container">
                            <input type="file" name="" accept=".pdf, .doc, .jpg, .png"
                                id="file-upload" required="">
                            <label for="file-upload" required="">
                                <img src="../../assets/image/icons/file-upload.svg">
                                <h5>Upload passport</h5>
                                <p>Required format: pdf / doc / jpg / png</p>
                            </label>
                        </div>
                        <a href="" class="btn btn-warning mt-4" type="submit">Next</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--- end --->
    
    <div class="document-content-section">
        <div class="row" v-if="payment_data.length">
            <div class="col-lg-6" v-for="(residencyProof,index) in payment_data"
								:key="residencyProof.id">
                <div class="document-card">
                    <div class="image">
                        <img :src="m_baseUrl+m_version+'file/get/'+residencyProof.imageId" alt=""
                        class="img-fluid">
                    </div>
                    <div class="content">
                        <div class="img-details">
                            <h5 class="image-name">proof-of-payment-00{{ index+1 }}.jpg</h5>
                            <p>{{ change_date_format_time(residencyProof.dateAndTime) }}, {{ formatBytes(residencyProof.size) }}</p>
                        </div>
                        <div class="download">
                            <a :href="m_baseUrl+m_version+'file/'+residencyProof.imageId"><i class="fas fa-arrow-down"></i> Download</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <Otherdata :title="'Oops! We do not have Proof of Payment'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'View all investments'" :button_two_url="'investment'" />
            </div>
    </div>
    </div>
    </template>
    
    <script>
    export default {
        name: 'Manage_document_proof_of_payment',
        data(){
            return{
                payment_data:null
            }
        },
        components: { 
	Otherdata: () => import("../investment/Otherfound.vue"),
    },
     created() {
        this.user_id = this.getuserid();
       console.log('tsdfsf');
        this.globalGetreauth("userProfile/proof/of/payment").then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                            
                        this.payment_data = userdata;
                        console.log(this.payment_data);
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
    },
      
    }
    </script>
    