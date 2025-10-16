<template>
    <div class="col-lg-7 col-md-7">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
                <div class="right-sidebar-register-conten">
                    <h3>Declaration</h3>
                    <form class="row g-3 needs-validation" enctype="multipart/form-data"
                            @submit.prevent="handlebasicinfosetp" @keydown.enter="$event.preventDefault()">
                        <div class="financial-assessment">
                            <div class="row">
                                <div class="col-md-8 mb-3">
                                    <label class="form-label">Are you related to any employee of SAC Capital?</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" value="true" v-model="inputdata.relationToSacCapital.name"
                                            id="parent-relationToSacCapital">
                                        <label class="form-check-label" for="employee1">Yes</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" value="false" v-model="inputdata.relationToSacCapital.name">
                                        <label class="form-check-label" for="employee2">No</label>
                                    </div>
                                </div>

                                <div class="col-md-8 mb-3 mt-4">
                                    <h5>Digital Signature</h5>
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
                                                    data-bs-target="#upload" type="button" role="tab"
                                                    aria-controls="profile" aria-selected="false">Upload</button>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade show active" id="draw" role="tabpanel"
                                                aria-labelledby="home-tab">
                                                <div class="signature-draw-container">
                                                  
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
                                                    <input type="file" @change="uploadhandler" accept=".jpg, .png"
                                                        id="file-upload" required>
                                                    <label for="file-upload" required>
                                                        <img src="../../assets/image/icons/file-upload.svg">
                                                        <h5>Digital Signature</h5>
                                                        <p>Required format:  jpg / png</p>
                                                    </label>
                                                </div>
                                                <div class="file-info" v-if="upload_sin_name != null">
                                    <p>{{ upload_sin_name }} </p>
                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="financial-information">
                            <h5>User Agreement</h5>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="1" v-model="inputdata.terms.name"
                                            id="parent-terms">
                                <label class="form-check-label" for="contract">I understand and agree to contract <router-link :to="{name:'Trems'}">Terms and Conditions</router-link> of SAC Capital.</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="2" v-model="inputdata.acknowledge.name"
                                            id="parent-acknowledge">
                                <label class="form-check-label" for="acknowledge">I acknowledge that I have read the <router-link :to="{name:'Disclosure'}">Risk Disclosure Statement</router-link> and understand its contents</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="3" v-model="inputdata.electronicsignature.name"
                                            id="parent-electronicsignature">
                                <label class="form-check-label" for="signing">By signing this document with an
                                    electronic signature, I agree that such signature will be as valid as handwritten
                                    signatures to the extent allowed by local law. </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="4" v-model="inputdata.declare.name"
                                            id="parent-declare">
                                <label class="form-check-label" for="declare">I declare that all information provided by
                                    me in connection with this application is accurate, complete and true.</label>
                            </div>
                        </div>

                        <div class="col-12">
                            <a href="javascript:void(0)" class="btn btn-warning" @click="handlebasicinfosetp" >Done</a>
                        </div>
                    </form>
                </div><!-- end-->
            </div>
        </div>
    </div>
</template>   
<script>
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);
import Validation from '../../Validation'
  


export default {
    name: 'Basic_info',
    mixins: [Validation],
    data() {
        return {
            digitalsign:null,
            inputdata: {
              
                relationToSacCapital: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Are you related to any employee of SAC Capital is required'],
                    keyname: "relationToSacCapital",

                },
                terms: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Teams are required'],
                    keyname: "terms",

                },
                acknowledge: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Acknowledge is required'],
                    keyname: "acknowledge",

                },
                electronicsignature: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Signature is required'],
                    keyname: "electronicsignature",

                },
                declare: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Declare is required'],
                    keyname: "declare",

                }
                
            },
             errors: [],
            validation: [],
            upload: 1,
            upload_sin: null,
            upload_sin_name: null,
            upload_sin_id: null,
            options: {
      penColor: "#c0f",
    },

        }
    },
    components: {
        RegHeader: () => import("../RegHeader.vue"),
        
    },
    created() {
        var userdataonelogin = this.getsessionkey('userdata');
	
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
        var declartion_aggreement = this.getsessionkey('declartion_aggreement');
        if(declartion_aggreement != null){
            console.log(declartion_aggreement);
          
        }
    },
    methods: {
        undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      
     
      if(isEmpty == false){
        this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {
      
      this.final_sin_submitfrom(data);
            }else {
                /*fail*/
               
                var messages = document.querySelectorAll(".is-invalid");
                for (var i = 0; i < messages.length; i++) {
                    messages[i].classList.remove("is-invalid");
                    
                }
            }

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
           
           this.globalfileupload_oneregistration('file/image/upload', postdata).then((result) => {
               
               var sin_id = result.data.response.fileId;
           console.log(sin_id);
               this.basicdata_final_submit(sin_id);
                                  
                   
           }).catch((error) => {
               console.log(error);
           });
       },
        handlebasicinfosetp: function () {

            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {
                /*success*/
                             
               
                if( this.inputdata.acknowledge.name != null && this.inputdata.electronicsignature.name !=null && this.inputdata.terms.name!=null &&  this.inputdata.declare.name !=null){
                    this.final_submitfrom(this.upload_sin, 'upload_sin_id');
                }
                
            }
            else {
                /*fail*/
               
                var messages = document.querySelectorAll(".is-invalid");
                for (var i = 0; i < messages.length; i++) {
                    messages[i].classList.remove("is-invalid");
                    
                }

            }
        },
        uploadhandler: function (e) {
            //used
            var file_value = e.currentTarget;
            var formData = new FormData();


            formData.append("multipartFile", file_value.files[0]);
            const path = file_value.value

            const fileName = path.split(/(\\|\/)/g).pop();
            console.log(fileName);
            this.upload_sin_name = fileName;
            this.upload_sin = formData;
    
        },
        final_submitfrom: function (formData, key) {
            this.globalfileupload_oneregistration('file/secure/upload', formData).then((result) => {
               
                this[key] = result.data.response.id;
               
                if (key == "upload_sin_id" && this[key] != null ) {
                    this.basicdata_final_submit(this[key]);
                }

            }).catch((error) => {
                console.log(error);
            });
        },

        basicdata_final_submit: function (id) {
            var postdata = {
                relationToSacCapital:this.inputdata.relationToSacCapital.name,
                signatureId:id
            };
            this.globalfileupload_oneregistration('user/declarationAndAgreement', postdata).then((result) => {
               
                console.log(result);
                             
                this.setvalueinsessiosstroage('declartion_aggreement',postdata);
             
           
                this.$router.push({ name: 'unblocking' })

            }).catch((error) => {
                console.log(error);
            });
        },
        onBegin() {
      console.log('=== Begin ===');
    },
    onEnd() {
      console.log('=== End ===');
    } 
    }


}
</script>