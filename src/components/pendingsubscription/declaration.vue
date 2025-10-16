<template>
    <section class="archive-section investment-list-details-view">
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="my-activity-details-box">
                        <div class="row">
                            <div class="col-md-8 mb-3">
                                <div>

                                </div>
                            </div>

                            <div class="col-md-8 mb-3 mt-4">
                                <h5>Acceptance</h5>
                                <label class="form-label">Create / Upload your digital signature</label>
                                <div class="digital-signature">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                data-bs-target="#draw" type="button" role="tab" aria-controls="home"
                                                aria-selected="true">Draw</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#upload" type="button" role="tab" aria-controls="profile"
                                                aria-selected="false">Upload</button>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="draw" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <div class="signature-draw-container text-center">
                                                            <VueSignaturePad id="" width="350px" height="200px" ref="signaturePad" />
                                                            <div class="grid-button mt-4">
                                                            <button @click="save" class="btn btn-warning" data-type="front">Submit</button>
                                                            <button @click="undo" class="btn btn-secondary">Undo</button>
                                                            </div>
                                                                                                                
                                                        </div>
                                        </div>
                                        <div class="tab-pane fade" id="upload" role="tabpanel"
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
                                            <div class="file-info" v-if="upload_singure_name != null">
                                                <p>{{ upload_singure_name }} <a href="#"></a></p>
                                            </div>
                                            <div class="grid-button mt-5">
                                            <span @click="final_submitfrom" class="btn btn-warning"
                                                type="submit">Submit</span>
                                        </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- end-->
                </div>

                <!-- Header--->
            </div>


        </div>
    </section>
</template>    

<script>
  import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);
export default {
    name: 'Subscription_description',
    props: {
        subscription_details_data: Object
    },
    data() {
        return {
            digitalsign:null,
            upload_singure: null,
            upload_singure_name: null,
            file_signatureId:null
        }
    },
    methods: {
        undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      
     
      if(isEmpty == false){
        this.final_sin_submitfrom(data);
       
    }
    },
    final_sin_submitfrom: function (basestring) {
           
            var type = 'image/png';
            basestring = basestring.split(",");
            var text = basestring[1];
            var postdata = {
                contentType:type,
                encodedText:text
            };
            this.globalpostauth('file/image/upload', postdata).then((result) => {
                
                var sin_id = result.data.response.fileId;
            
                this.final_post_sin(sin_id);
                                   
                    
            }).catch((error) => {
                console.log(error);
            });
        },
        uploadhandler: function (e) {
            var file_value = e.currentTarget;
            var formData = new FormData();

            formData.append("multipartFile", file_value.files[0]);
            const path = file_value.value
            const fileName = path.split(/(\\|\/)/g).pop();
            var type_value = e.currentTarget.getAttribute('data-type');
            if (type_value == 'front') {
                this.upload_singure_name = fileName;
                this.upload_singure = formData;

            }

        },
        final_submitfrom: function () {
            if( this.upload_singure != null){
            this.globalfileupload('file/secure/upload', this.upload_singure).then((result) => {
               
                this.file_signatureId = result.data.response.id;
                this.final_post_sin(this.file_signatureId);
             

            }).catch((error) => {
                console.log(error);
            });
        }
        },
        final_post_sin:function(sin_id){
            var investment_details = this.getlocalkey('subcriptionitems_tem');
            var post_data = {
    investmentId: investment_details.investmentId,
    signatureId: sin_id
            };
               this.globalpostauth('investment/subscription/userSignature',post_data).then((result) =>{
                const responsedata = result.data;
			console.log(responsedata);
            this.$router.push({ name: 'Payment' })
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

    }


}
</script>