<template>
      <div class="tab-pane fade show active" id="v-pills-signature" role="tabpanel"
                            aria-labelledby="v-pills-settings-tab">

                            <div class="document-header-section">
                                <h4>Your Current Digital Signature</h4>
                                <a href="#signature" class="btn btn-warning" data-bs-toggle="modal"><i
                                        class="fas fa-plus-circle"></i> Replace Signature </a>
                            </div>

                            <div class="signature-draw-container text-center" v-if="digitalsign.signatureId != null" >
                            
                                
                                <img :src="m_baseUrl+m_version+'file/get/'+digitalsign.signatureId" alt=""
                        class="img-fluid">
      
                            </div>
                            <!-- Modal Start visit -->
                            <div class="modal fade" id="signature" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header add-note-title"> <button type="button"
                                                class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h5>Digital Signature</h5>
                                            <label class="form-label">Create / Upload your digital signature</label>
                                            <div class="digital-signature">
                                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="home-tab"
                                                            data-bs-toggle="tab" @click="change_canvushight" data-bs-target="#draw" type="button"
                                                            role="tab" aria-controls="home"
                                                            aria-selected="true">Draw</button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active" id="profile-tab" data-bs-toggle="tab"
                                                            data-bs-target="#upload" type="button" role="tab"
                                                            aria-controls="profile"
                                                            aria-selected="false">Upload</button>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade" id="draw" role="tabpanel"
                                                        aria-labelledby="home-tab">
                                                        <div class="signature-draw-container text-center">
                                                            <VueSignaturePad id="" width="350px" height="200px" ref="signaturePad" />
                                                            <div>
                                                            <button @click="save" class="btn btn-warning mt-4" data-type="front">Submit</button>
                                                            <button @click="undo" class="btn btn-secondary">Undo</button>
                                                            </div>
                                                                                                                
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade  active show" id="upload" role="tabpanel"
                                                        aria-labelledby="profile-tab">
                                                        <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="front"
                                        accept=".pdf, .doc, .jpg, .png" id="file-front">
                                    <label for="file-front" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload Signature</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_front_name != null">
                                    <p>{{ upload_front_name }} <a href="#"><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                                <a v-if="upload_front_name != null" href="javascript:void(0)" class="btn btn-warning mt-4" data-type="front" data-next="back" @click="show_hide_next">Submit</a>        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--- end --->
                        </div>
    </template>
    
    <script>
  import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);
   export default {
    
        name: 'Manage_document_digitalsin',
             data(){
            return{
                digitalsign:null,
                residencyProof_address:null,
                upload_front: null,
                upload_front_name: null,
            }
        },
     created() {
        this.user_id = this.getuserid();
       
        this.globalGetreauth("userProfile/signature").then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                        this.digitalsign = userdata;
   
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
               console.log( this.isEmpty)
           
             
    },
    mounted: function () {
        
        this.$nextTick(function () {
    // Code that will run only after the
    console.log(this.$refs);
   //console.log(this.signaturePad);
    
    // entire view has been rendered
  })
    },
    methods:{
        change_canvushight:function(){
                var get_optel = document.querySelector("canvas"); 
                get_optel.setAttribute("width", "350");
                get_optel.setAttribute("height", "200");
        },
        undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      
     
      if(isEmpty == false){
     
      console.log(data);
      this.final_sin_submitfrom(data);
       
    }
    },
    final_sin_submitfrom: function (basestring, key) {
            var end_point;
            var end_type;
            var end_postdata;
            var type = 'image/png';
            basestring = basestring.split(",");
            var text = basestring[1];
            var postdata = {
                contentType:type,
                encodedText:text
            };
            this.globalpostauth('file/image/upload', postdata).then((result) => {
                console.log(result);
                this[key] = result.data.response.fileId;
               console.log(this[key]);
                
                    end_point = 'userProfile/update/signature?saccapitalFileId='+this[key];
                    end_type='post';
                    end_postdata=null;
                    this.data_submit(end_point,end_type,end_postdata);
                
                    var get_optel = document.querySelector("#close"); 
					get_optel.click();
                    this.$router.go();
            }).catch((error) => {
                console.log(error);
            });
        },
    uploadhandler: function (e) {
            var file_value = e.currentTarget;
            var formData = new FormData();

            formData.append("multipartFile", file_value.files[0]);
            console.log(formData);
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
                    end_point = 'userProfile/update/signature?saccapitalFileId='+this[key];
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
                    this.$router.go()
            }

            
           
        },

    }
      
    }
    </script>
    