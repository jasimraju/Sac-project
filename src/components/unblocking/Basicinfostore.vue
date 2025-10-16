<template>
    <div class="col-lg-7 col-md-7">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
                <div class="right-sidebar-register-conten" v-if="setp == 1">

                    <div class="user-view-register">
                        <h3>Basic Information</h3>

                        <form class="row g-3 needs-validation" enctype="multipart/form-data"
                            @submit.prevent="handlebasicinfosetp" @keydown.enter="$event.preventDefault()">
                            <div class="col-md-6 mb-3">
                                <select class="form-select" id="parent-type" v-model="inputdata.type.name">
                                    <option :value="null" disabled selected> Select Salutation</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Dr">Dr</option>
                                </select>
                                <div class="error d-none" id="error-type"></div>
                            </div>

                            <div class="col-md-6 mb-3">
                                <input type="text" class="form-control" id="parent-firstname"
                                    v-model="inputdata.firstname.name" placeholder="First Name" value="">
                                    <div class="error d-none" id="error-firstname"></div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <input type="text" class="form-control" id="parent-middlename"
                                    v-model="inputdata.middlename.name" placeholder="Middle Name">
                                    <div class="error d-none" id="error-middlename"></div>
                            </div>

                            <div class="col-md-6 mb-3">
                                <input type="text" class="form-control" id="parent-lastname"
                                    v-model="inputdata.lastname.name" placeholder="Last Name" required>
                                    <div class="error d-none" id="error-lastname"></div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <datepicker calendar-button-icon="fa fa-calendar" format="dd/MM/yyyy"
                                    input-class="form-control" v-model="inputdata.birth.name" id="parent-birth"
                                    placeholder="Date of Birth"></datepicker>
                                    <div class="error d-none" id="error-birth"></div>

                            </div>
                            <div class="col-md-6 mb-3">
                                <input type="text" class="form-control" id="parent-nricOrPassportNumber"
                                    placeholder="NRIC / PASSPORT NUMBER" v-model="inputdata.nricOrPassportNumber.name">
                                    <div class="error d-none" id="error-nricOrPassportNumber"></div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <input type="text" class="form-control" id="parent-country"
                                    placeholder="Country of Birth" v-model="inputdata.country.name">
                                    <div class="error d-none" id="error-country"></div>
                            </div>

                            <div class="col-md-6 mb-3">
                                <select class="form-select" @change="handelchange" v-model="inputdata.idtype.name"
                                    id="parent-idtype">
                                    <option :value="null" disabled selected> ID Type</option>
                                    <option value="1">NRIC (Singaporean or SPR)</option>
                                    <option value="2">Passport (Foreigner)</option>
                                </select>
                                <div class="error d-none" id="error-idtype"></div>
                            </div>
                            <div class="col-md-6 mb-3" v-if="upload == 2">
                                <label for="upload" class="form-label">Upload Your NRIC(front side):</label>

                                <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="front"
                                        accept=".pdf, .doc, .jpg, .png" id="file-front">
                                    <label for="file-front" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload Front side of NRIC</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                        <p>Maximum size: 1MB</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_front_name != null">
                                    <p>{{ upload_front_name }} </p>
                                </div>

                            </div>
                            <div class="col-md-6 mb-3" v-if="upload == 2">
                                <label for="upload" class="form-label">Upload Your NRIC(Back side):</label>

                                <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="back"
                                        accept=".pdf, .doc, .jpg, .png" id="file-back">
                                    <label for="file-back" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload Back side of NRIC</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                        <p>Maximum size: 1MB</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_back_name != null">
                                    <p>{{ upload_back_name }} </p>
                                </div>

                            </div>
                            <div class="col-md-6 mb-3" v-if="upload == 3">
                                <label for="upload" class="form-label">Upload Your Passport:</label>

                                <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="passport"
                                        accept=".pdf, .doc, .jpg, .png" id="file-upload">
                                    <label for="file-upload" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload passport</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                        <p>Maximum size: 1MB</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_passport_name != null">
                                    <p>{{ upload_passport_name }} </p>
                                </div>

                            </div>


                            <div class="col-md-12 mb-3 security-a-c">
                                <h4>Securities Account Number</h4>
                                <p class="text-justify">The Central Depository Account, or commonly known as CDP, is an
                                    account to safe keep all the shares you bought through the open market. Operated by
                                    the Singapore Stock Exchange (SGX), a CDP acts as a safe for all your stocks. Stocks
                                    and bonds that one buys on the SGX are deposited into his/her personal CDP account.
                                    You may also enter your securities account held by the banks.</p>
                                <input type="text" v-model="inputdata.accountnumber.name" id="parent-accountnumber"
                                    class="form-control mt-4" placeholder="xxxx xxxx xxxx" value="" required>
                                    <div class="error d-none" id="error-accountnumber"></div>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-warning" @click="handlebasicinfosetp" type="button">Done</button>
                            </div>
                        </form>
                    </div>
                </div><!-- end-->
                <div class="right-sidebar-register-conten" v-else>

                    <div class="user-view-register">
                        <h3>Basic Information</h3>


                        <div class="col-md-8 mb-3 col-offset-md-6">
                            <h5>U.S Declaration</h5>
                            <label for="upload" class="form-label">Are you a U.S. citizen, or do you hold a green
                                card?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="1"
                                    v-model="inputdata_two.usDeclaration.name" id="parent-usDeclaration">
                                <label class="form-check-label" for="yes">Yes
                                </label>
                                
                            </div>


                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="2"
                                    v-model="inputdata_two.usDeclaration.name" id="parent-usDeclaration" checked>
                                <label class="form-check-label" for="no">No
                                </label>
                            </div>
                            
                        </div>

                        <div class="tax-information">
                            <h5>Are you a U.S. citizen, or do you hold a green card?</h5>
                            <p>Which country or countries fo you pay taxes in?</p>
                            <div class="tex-information-box" v-for="(item) in usersTaxInformations" :key="item.id">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="upload" class="form-label">Country {{ item }} </label>
                                        <select class="form-select select2" :data-input-id="'taxCountry_' + item" ref="select" v-model="inputdata_two['taxCountry_' + item].name"
                                            :id="'parent-taxCountry_' + item">
                                            <option :value="null" disabled selected>Country of Tax Residency</option>
                                            <option v-for="item_country in countries" :key="item_country.id" :value="item_country.name">{{item_country.name}}</option>
                                        </select>
                                        <div class="error d-none" :id="'error-taxCountry_' + item"></div>
                                    </div>
                                    <div class="col-md-6 mb-3 mt-2">
                                        <label for="upload" class="form-label"></label>
                                        <input type="text" class="form-control"
                                            v-model="inputdata_two['taxId_' + item].name" :id="'parent-taxId_' + item"
                                            placeholder="Tax Identification Number" required="">
                                            <div class="error d-none" :id="'error-taxId_' + item"></div>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" @change="checkenable"
                                            :data-id="'parent-taxId_' + item"
                                            v-model="inputdata_two['noTaxId_' + item].name" :id="'parent-noTaxId_' + item"
                                            value="1">
                                        <label class="form-check-label" for="number">I don't have a Tax
                                            Identification Number</label>
                                    </div>
                                </div>
                            </div>


                        </div>


                        <div class="col-md-12 mb-3">
                            <div class="add-new-country">
                                <span @click="addanothercountry"><i class="fas fa-plus"></i> Add another country</span>
                            </div>
                        </div>

                        <div class="error-box" v-if="errors.length">
                            <p><a href="#"><i class="fas fa-times-circle"></i></a>The highlighted input are
                                required.</p>
                        </div>

                        <div class="col-12">
                            <span class="btn btn-warning" @click="handlebasicinfosetptwo">Done</span>
                            
                            <span class="btn btn-warning" @click="handelbacksetp">Back</span>
                        </div>

                    </div>
                </div><!-- end-->
            </div>
        </div>
    </div>
</template>   
<script>
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import Datepicker from 'vuejs-datepicker';
import Validation from '../../Validation'
export default {
    name: 'Basic_info',
    mixins: [Validation],
    data() {
        return {
            inputdata: {
                type: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Salutation is required'],
                    keyname: "type",

                },
                firstname: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['First name field is required'],
                    keyname: "firstname",
                },
                middlename: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Middle name  is required'],
                    keyname: "middlename",

                },
                lastname: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Last name is required'],
                    keyname: "lastname",

                },
                nricOrPassportNumber: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Last name is required'],
                    keyname: "nricOrPassportNumber",

                },
                birth: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Birth date is required'],
                    keyname: "birth",

                },
                country: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Country is required'],
                    keyname: "country",

                },
                idtype: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Id type is required'],
                    keyname: "idtype",

                },
                accountnumber: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Account is required'],
                    keyname: "accountnumber",

                }
            },
            inputdata_two: {
                usDeclaration: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['U.S Declaration is required'],
                    keyname: "usDeclaration",

                },
                taxCountry_one: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Tax Country is required'],
                    keyname: "taxCountry_one",
                },
                taxId_one: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Tax Id is required'],
                    keyname: "taxId_one",

                },
                noTaxId_one: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Last name field are required'],
                    keyname: "noTaxId_one",

                }
            },
            errors: [],
            validation: [],
            setp: 1,
            upload: 1,
            upload_front: null,
            upload_back: null,
            upload_passport: null,
            upload_front_name: null,
            upload_back_name: null,
            upload_passport_name: null,
            usersTaxInformations: ['one'],
            upload_front_id: null,
            upload_back_id: null,
            upload_passport_id: null,
            myinfo_data:null,
            countries:[],

        }
       
    },
    components: {
        RegHeader: () => import("../RegHeader.vue"),
        Datepicker
    },
    created() {
        this.countries = this.getAllcountry_list_na();
        var userdataonelogin = this.getsessionkey('userdata');
        this.myinfo_data = this.checkkeyexistlocalstrore('temp_myinfo');
        if(this.myinfo_data != null){
           var nric_number = this.checkkeyexistlocalstrorewithjson('temp_nric');
           if(nric_number != null){
            this.inputdata.nricOrPassportNumber.name = nric_number;
           }
            //name
            var name = this.get_myinfo_name(this.myinfo_data,'name');
            console.log(name);
            var n_key = 'firstname';
            var name_ob_first_name = (name, n_key) => Object.keys(name).includes(n_key);
            if(name_ob_first_name){
                this.inputdata.firstname.name = name.firstname;
            }
            n_key = 'middlename';
            var name_ob_middlename = (name, n_key) => Object.keys(name).includes(n_key);
            if(name_ob_middlename){
                console.log(n_key);
                this.inputdata.middlename.name = name.middlename;
            }
            n_key = 'lastname';
           name_ob_middlename = (name, n_key) => Object.keys(name).includes(n_key);
            if(name_ob_middlename){
               
                this.inputdata.lastname.name = name.lastname;
            }
            //dob
          var dob = this.get_myinfo_dob(this.myinfo_data,'dob');
          console.log(dob);
          this.inputdata.birth.name = dob;
          //birthcountry
          var birthcountry = this.get_myinfo_birthcountry(this.myinfo_data,'birthcountry');
          this.inputdata.country.name = birthcountry;
          //email

            //employmentsector

            //marital

            //mobileno

            //nationality
            var nationality = this.get_myinfo_nationality(this.myinfo_data,'nationality');

                this.inputdata.idtype.name = nationality;
                this.upload = nationality+1
            //occupation

            //passexpirydate

            //passstatus

            //passtype

            //race

            //regadd

            //residentialstatus

            //sex
            var sex = this.get_myinfo_sex(this.myinfo_data,'sex');
            console.log(sex);
            this.inputdata.type.name = sex;
        }
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
        var basic_enifo = this.getsessionkey('basicinfo');
        if(basic_enifo != null){
            console.log(basic_enifo.firstName);
          
        }
    },
    mounted() {
       
       $(this.$refs.select).select2();
       $('.select2').on('change', (event) => {
        console.log('hello');
        this.$emit('input', event.target.value);
            }) 
   },
    methods: {
        handelbacksetp: function(){
            this.setp = 1;
        },
        handlebasicinfosetp: function () {
            
            this.validation = [];
            this.errors = [];
            
            this.validationallform(this.inputdata);
            var checkvalidtion = this.checkvalidationarray(this.validation);
         
                if(this.upload == 2){
                    if(this.upload_front_name == null || this.upload_back == null){
                        checkvalidtion = false;
                       
                    }
                }else{
                    if(this.upload_passport == null){
                        checkvalidtion = false;
                      
                    }
                }
            
            if (checkvalidtion) {
                /*success*/

                this.setp = 2;
                console.log(this.setp);
               let self = this;
                setTimeout(function(){ 
                    $('.select2').select2();
                 $('.select2').on('change', function(event){
               
                   console.log(self.inputdata_two);
                   self.inputdata_two.taxCountry_one.name = event.target.value;
                   
                });
}, 1000);
             
        }
            else {
                /*fail*/
               
            }
        },
        handlebasicinfosetptwo: function () {
            this.validation = [];
            this.errors = [];

            this.validationallform(this.inputdata_two);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {
                /*success*/
                console.log(this.inputdata_two);


                if (this.inputdata.idtype.name == 1) {
                    /*nrice*/
                    //upload_front: null,
                    // upload_back: null,
                    //upload_front_id: null,
                    //upload_back_id: null,

                    this.final_submitfrom(this.upload_front, 'upload_front_id');
                    this.final_submitfrom(this.upload_back, 'upload_back_id');
                   

                }
                else {
                    /*password*/
                    //upload_passport: null,
                    //upload_passport_id: null,
                    this.final_submitfrom(this.upload_passport, 'upload_passport_id');

                   

                }



            }
            else {
                /*fail*/
                console.log(this.errors);

            }

        },
        handelchange: function (e) {
            var drop_value = e.currentTarget.value;
            if (drop_value == 1) {
                this.upload = 2;
            }
            else if (drop_value == 2) {
                this.upload = 3;
            }
            else {
                this.upload = 1;
            }
        },
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
            if (type_value == 'back') {
                this.upload_back_name = fileName;
                this.upload_back = formData;
                this.upload_passport_name = null;
                this.upload_passport = null;

            }
            if (type_value == 'passport') {
                this.upload_passport_name = fileName;
                this.upload_passport = formData;
                this.upload_back_name = null;
                this.upload_front_name = null;
                this.upload_front = null;
                this.upload_back = null;

            }
        },
        final_submitfrom: function (formData, key) {
            this.globalfileupload_oneregistration('file/secure/upload', formData).then((result) => {
               
                this[key] = result.data.response.id;
               
                if (key != "upload_front_id") {
                    this.basicdata_final_submit();
                }

            }).catch((error) => {
                console.log(error);
            });
        },
        checkenable: function (e) {
            var e_id = e.currentTarget.getAttribute('data-id');
            var element = document.getElementById(e_id);
            if (e.currentTarget.checked == true) {
                element.setAttribute("disabled", "disabled");
            }
        },
        addanothercountry: function () {
            var numberadd = this.usersTaxInformations.length;
            var numberName = this.inWord(numberadd + 1);
            this.usersTaxInformations.push(numberName);
            var data_value_countrt = {
                ['taxCountry_' + numberName]: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['First name field are required'],
                    keyname: "taxCountry_" + numberName
                }
            };
            var data_value_taxId = {
                ['taxId_' + numberName]: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Middle name field are required'],
                    keyname: "taxId_" + numberName,

                }
            };
            var data_value_noTaxId = {
                ['noTaxId_' + numberName]: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Last name field are required'],
                    keyname: "noTaxId_" + numberName,

                }
            };
            Object.assign(this.inputdata_two, data_value_countrt);
            Object.assign(this.inputdata_two, data_value_taxId);
            Object.assign(this.inputdata_two, data_value_noTaxId);

            setTimeout(function(){ 
                $('.select2').select2();
                $('.select2').on('change', function(event){
               
                   
                    data_value_countrt['taxCountry_' + numberName].name = event.target.value;
                    Object.assign(this.inputdata_two, data_value_countrt);
                });
}, 500);

        },
        basicdata_final_submit: function () {
            var date_birth = new Date(this.inputdata.birth.name).toLocaleDateString('nl-NL');
            var taxdata = [];
            //usersTaxInformations
            var notaxval = '';
            for (let x in this.usersTaxInformations) {
                if (this.inputdata_two['noTaxId_' + this.usersTaxInformations[x]].name == null) {
                    notaxval = true;
                }
                else {
                    notaxval = false;
                }
                var taxjson = {
                    taxCountry: this.inputdata_two['taxCountry_' + this.usersTaxInformations[x]].name,
                    taxId: this.inputdata_two['taxId_' + this.usersTaxInformations[x]].name,
                    noTaxId: notaxval,
                }
                taxdata.push(taxjson);
            }
            //var userRoleId_apply = JSON.parse(this.globalgetsessionkeyvalue('userdata'));
            var role_id = this.checkkeyexistlocalstrorewithjson('temp_role_id');
            var nric_id = this.inputdata.nricOrPassportNumber.name;
            console.log(role_id);
var postdata = {
                userRoleId: role_id,
                userInfoId: 1,
                salutation: this.inputdata.type.name,
                firstName: this.inputdata.firstname.name,
                middleName: this.inputdata.middlename.name,
                lastName: this.inputdata.lastname.name,
                dateOfBirth: date_birth,
                countryOfBirth: this.inputdata.country.name,
                nricOrPassportNumber: nric_id,
                idType: this.inputdata.idtype.name,
                uploadPassport: this.upload_passport_id,
                nricFrontView: this.upload_front_id,
                nricBackView: this.upload_back_id,
                securityAccountNumber: this.inputdata.accountnumber.name,
                usDeclaration: this.inputdata_two.usDeclaration.name,
                usersTaxInformations: taxdata

            }
            this.globalfileupload_oneregistration('user/basicInfo', postdata).then((result) => {
               //checkregcompted
              
               console.log(result);
               
                //exit
             

                //set session data
                this.setvalueinsessiosstroage('basicinfo',postdata);
                         

                this.$router.push({ name: 'unblocking' })

            }).catch((error) => {
                console.log(error);
            });
        }
    }


}
</script>