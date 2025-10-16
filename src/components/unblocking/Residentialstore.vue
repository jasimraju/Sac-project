<template>
    <div class="col-lg-7 col-md-7">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
                <div class="right-sidebar-register-conten">
                    <h3>Residential Address</h3>
                    <form class="row g-3 needs-validation" enctype="multipart/form-data"
                            @submit.prevent="handlebasicinfosetp" @keydown.enter="$event.preventDefault()">

                        <div class="col-md-12 mb-3">
                            <h5>Select your country</h5>
                            <label class="form-label">Please select your residence country</label>
                            <select class="form-control select2" ref="select" v-model="inputdata.residenceCountry.name" id="parent-residenceCountry">
                                <option :value="null" disabled selected>Select Country</option>
                                <option v-for="item in countries" :data-iso="item.iso" :key="item.id" :value="item.name">{{item.name}}</option>
                            </select>
                            <div class="error d-none" id="error-residenceCountry"></div>
                        </div>
                        <div class="address-zone">
                            <h5>Residential Address</h5>
                            <div class="row mt-4">
                                <div class="col-md-6 mb-3">
                                <input type="text" class="form-control" v-model="inputdata.pincode.name" id="parent-pincode" placeholder="Postal Code">
                                <div class="error d-none" id="error-pincode"></div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <span class="btn btn-warning btn-block" @click="get_address"><img
                                            src="../../assets/image/icons/location-zone.svg"> Find Address</span>

                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <input type="text" class="form-control" v-model="inputdata.street.name" id="parent-street" placeholder="Street">
                            <div class="error d-none" id="error-street"></div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <input type='text' class="form-control" v-model="inputdata.unitNo.name" id="parent-unitNo" placeholder="Floor No. , Unit No.">
                            <div class="error d-none" id="error-unitNo"></div>
                        </div>

                        <div class="col-md-12 mb-3">
                            <div class="">
                                <h5>Upload Proof of Residence</h5>
                                <p>Provide the latest copy (within last 3 months) of any of the items below:</p>
                                <p>- Local utility bill</p>
                                <p>- Local telecommunication bill</p>
                                <p>- Local bank statement/credit card statement</p>
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <h5>Select one upload method</h5>
                            <div class="form-check">
                                <input class="form-check-input" name="type" type="radio" @click="checkenable" value="1"
                                    checked="">
                                <label class="form-check-label" for="app">Upload via this app now
                                </label>
                            </div>

                            <div class="upload-files-container"   :class="(proofOfResidence == null)?'d-none':''">
                                <input type="file" ref="file" @change="uploadhandler" accept=".pdf, .doc, .jpg, .png" id="file-upload" required>
                                <label for="file-upload" required>
                                    <img src="../../assets/image/icons/file-upload.svg">
                                    <h5>Upload Proof of Residence</h5>
                                    <p>Required format: pdf / doc / jpg / png</p>
                                    <p>Maximum size: 1MB</p>
                                </label>
                            </div>
                            
                            <div class="file-info"  v-for="item in upload_filename" :key="item.id">
                                <p >{{item}} <a href="#"><i class="fas fa-trash-alt"></i></a></p>
                            </div>
                       
                        </div>

                        <div class="col-md-6 mb-3 mt-4">
                            <label class="form-label"></label>
                            <div class="form-check">
                                <input class="form-check-input" name="type" type="radio" @click="checkenable" value="2">
                                <label class="form-check-label" for="whatsApp">Upload via WhatsApp later
                                </label>
                            </div>
                            <div class="dashed-style-box" :class="(proofOfResidence == 1)?'d-none':''" >
                                <img src="../../assets/image/icons/whatsapp_icon.svg">
                                <p>Please send us the supporting documents via the following email</p>
                                <a href="mail:enquiry@saccapital.com.sg">enquiry@saccapital.com.sg</a>
                            </div>
                        </div>

                        <div class="col-12">
                            <button  class="btn btn-warning" @click="handlebasicinfosetp" type="button">Done</button>
                        </div>
                    </form>
                </div><!-- end-->
            </div>
        </div>
    </div>
</template>   
<script>
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import Validation from '../../Validation'
export default {
    name: 'Basic_info',
    mixins: [Validation],
    data() {
        return {
            inputdata: {
                residenceCountry: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Email field is required'],
                    keyname: "residenceCountry",

                },
                pincode: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['First name field is required'],
                    keyname: "pincode",
                },
                unitNo: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Middle name field is required'],
                    keyname: "unitNo",

                },
                street: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Last name field is required'],
                    keyname: "street",

                }
            },
            errors: [],
            validation: [],
            upload: 1,
            upload_file:[],
            upload_filename:[],
            proofOfResidence:1,
            usersProofOfResidency:[],
            countries:[],
          
        }
    },
    components: {
        RegHeader: () => import("../RegHeader.vue"),
    },
    mounted() {
       
        $(this.$refs.select).select2();
        $(this.$refs.select).on('change', (event) => {
      this.$emit('input', event.target.value);
      
      $(this.$refs.select).val(event.target.value);
      this.inputdata.residenceCountry.name = event.target.value
     
    });
    },
    created() {
        this.countries = this.getAllcountry_list_na();
      
        var userdataonelogin = this.getsessionkey('userdata');
        this.myinfo_data = this.checkkeyexistlocalstrore('temp_myinfo');
        if(this.myinfo_data != null){
            //regadd
            var regadd = this.get_myinfo_regadd(this.myinfo_data,'regadd');
            console.log(regadd);
            this.inputdata.pincode.name = regadd.postalcode;
            this.inputdata.unitNo.name = regadd.unit;
            this.inputdata.street.name = regadd.street;
            //residentialstatus
            var residentialstatus = this.get_myinfo_residentialstatus(this.myinfo_data,'residentialstatus');
            console.log(residentialstatus);
            this.inputdata.residenceCountry.name = residentialstatus;
        }
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
        var residentialstore = this.getsessionkey('residentialstore');
        if(residentialstore != null){
            console.log(residentialstore);
          
        }
    },
    methods: {
        get_address:function(){
            var e = document.getElementById("parent-residenceCountry");
            var option= e.options[e.selectedIndex];
            var datarc = option.getAttribute("data-iso");

           
           this.call_address_api( this.inputdata.pincode.name,datarc).then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                            var building_name = '';
                            if(userdata.items[0].address.building != undefined){
                                building_name = userdata.items[0].address.building+', ';
                            }
                            this.inputdata.street.name = building_name+userdata.items[0].address.houseNumber+', '+userdata.items[0].address.street;
                      
   
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
        handlebasicinfosetp: function () {
            console.log('hell');
            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {
                /*success*/
                console.log(this.inputdata);
                if(this.upload_filename.length && this.proofOfResidence == 1){
                this.final_submitfrom();
                return false;
            }
            else{
                this.basicdata_final_submit();
            }
            }
            else {
                /*fail*/

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
                this.upload_filename.push(fileName)
                this.upload_file.push(formData);
                console.log(this.upload_filename); 
        },
        final_submitfrom: function () {
            console.log(this.upload_filename.length);
            console.log(this.upload_file);
            var filevalue="";
            for (var i = 0; i < this.upload_filename.length; i++) {
                   this.globalfileupload_oneregistration('file/secure/upload', this.upload_file[i]).then((result) => {
                    filevalue =                        {
          residencyProof: result.data.response.id
        };
                this.usersProofOfResidency.push(filevalue);

                if (this.usersProofOfResidency.length == this.upload_filename.length) {
                    this.basicdata_final_submit();
                }

            }).catch((error) => {
                console.log(error);
            });
            }

        },
        checkenable: function (e) {
            var e_id = e.currentTarget.value;
          if(e.currentTarget.checked){
            if(e_id == 1){
                this.proofOfResidence = e_id
            }
            else{
                this.proofOfResidence = null
            }
          }
        },
        basicdata_final_submit: function () {
                /*
                     "userRoleId": 1,
      "userInfoId": 1,
      "idType": 1,
      "residenceCountry": "India",
      "pincode": 502300,
      "street": "DN Colony",
      "unitNo": "8-10",
      "proofOfResidence": null,
      "usersProofOfResidency": [
        {
          "residencyProof": null
        },
        {
          "residencyProof": null
        }
      ]
                */
           // var userRoleId_apply = this.getsessionkey('reg_details_without_verify');
            var role_id = this.globalgetsessionkeyvalue('role_id');
            var postdata = {
                userRoleId: role_id,
                userInfoId: 2,
                idType:1,
                residenceCountry: this.inputdata.residenceCountry.name,
                pincode: this.inputdata.pincode.name,
                street: this.inputdata.street.name,
                unitNo:this.inputdata.unitNo.name,
                proofOfResidence: this.proofOfResidence,
                usersProofOfResidency: this.usersProofOfResidency,

            }
            this.globalfileupload_oneregistration('user/address', postdata).then((result) => {
       
                console.log(result);
                      
                this.setvalueinsessiosstroage('residentialstore',postdata);
               
                this.$router.push({ name: 'unblocking' })

            }).catch((error) => {
                console.log(error);
            });
        }
    }


}
</script>