<template>
    <div class="tab-pane fade show active" id="v-pills-nric" role="tabpanel"
    aria-labelledby="v-pills-nric-tab">
    <div class="document-header-section">
        <h4>Proof of Residence</h4>
        <a href="#add-new" class="btn btn-warning" data-bs-toggle="modal"><i
                class="fas fa-plus-circle"></i> New Add </a>
    </div>
    
    <!-- Modal Start visit -->
    <div class="modal fade" id="add-new" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header add-note-title"> <button type="button"
                        class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="uploader-container front">
                    <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="front"
                                        accept=".pdf, .doc, .jpg, .png" id="file-front">
                                    <label for="file-front" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload Address proof</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_front_name != null">
                                    <p>{{ upload_front_name }} <a href="#"><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                    <a href="javascript:void(0)" class="btn btn-warning mt-4" data-type="front" data-next="back" @click="show_hide_next">Submit</a>
                            </div>
                </div>
            </div>
        </div>
    </div>
    <!--- end --->
    
    <div class="document-content-section">
        <div class="row" v-if="residencyProof_address.length">
            <div class="col-lg-6" v-for="(residencyProof,index) in residencyProof_address"
								:key="residencyProof.id">
                <div class="document-card">
                    <div class="image">
                            <img :src="m_baseUrl+m_version+'file/get/'+residencyProof.residencyProof" alt=""
                        class="img-fluid">
                    </div>
                    <div class="content">
                        <div class="img-details">
                            <h5 class="image-name">proof-of-residence-00{{ index+1 }}.jpg</h5>
                            <p v-if="typeof residencyProof.dateAndTime !== 'undefined'">{{ change_date_format_time(residencyProof.dateAndTime) }}, {{ formatBytes(residencyProof.size) }}</p>
                        </div>
                        <div class="download">
                            <a :href="m_baseUrl+m_version+'file/'+residencyProof.residencyProof"><i class="fas fa-arrow-down"></i> Download</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <Otherdata :title="'Oops! We do not have Proof of Residence'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'View all investments'" :button_two_url="'investment'" />
            </div>
    </div>
    </div>
    </template>
    
    <script>
    export default {
        name: 'Manage_document_proof_of_residense',
        data(){
            return{
                residencyProof_address:null,
                upload_front: null,
                upload_front_name: null
            }
        },
        components: { 
	Otherdata: () => import("../investment/Otherfound.vue"),
    },
     created() {
        this.user_id = this.getuserid();
       
        this.globalGetreauth("userProfile/proof/of/residency").then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                        this.residencyProof_address = userdata;
   
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
    methods:{
        uploadhandler: function (e) {
            var file_value = e.currentTarget;
            var formData = new FormData();

            formData.append("multipartFile", file_value.files[0]);
            const path = file_value.value
            const fileName = path.split(/(\\|\/)/g).pop();
            var type_value = e.currentTarget.getAttribute('data-type');
            if (type_value == 'front') {
                this.upload_front_name = fileName;
                this.upload_front = formData;
                this.upload_passport_name = null;

            }
           
        },
        final_submitfrom: function (formData, key) {
            var end_point;
            var end_type;
            var end_postdata;
            this.globalfileupload('file/secure/upload', formData).then((result) => {
                
                this[key] = result.data.response.id;
               
                if (key == "upload_front_id") {
                    end_point = 'userProfile/save/proof/residency?saccapitalFileId='+this[key];
                    end_type='post';
                    end_postdata=null;
                    this.data_submit(end_point,end_type,end_postdata);
                }

            }).catch((error) => {
                console.log(error);
            });
        },
        show_hide_next:function (e){
           
            var type_value = e.currentTarget.getAttribute('data-type');
         
            if(type_value == 'front'){
                if(this.upload_front !=null){
                this.final_submitfrom(this.upload_front, 'upload_front_id');
            }
          
            var get_optel = document.querySelector("#close"); 
					get_optel.click();
                    //this.$router.go()
            }

            
           
        },

    }
      
    }
    </script>
    