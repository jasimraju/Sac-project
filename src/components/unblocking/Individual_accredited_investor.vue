<template>
    <div class="col-lg-7 col-md-7">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
                <div class="right-sidebar-register-conten">
                    <h3>Financial Knowledge Assessment</h3>
                    <form class="row g-3 needs-validation" novalidate>
                        <div class="financial-assessment">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Part A: Do you hold a degree in business or
                                        finance?</label>
                                    <div class="form-check">
                                        <input class="form-check-input" 
                                        v-model="inputdata.degree_business.name" value="yes" type="radio" name="degree_business" id="business1">
                                        <label class="form-check-label" for="business1">Yes</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="inputdata.degree_business.name" type="radio" value="no" name="degree_business" id="business2">
                                        <label class="form-check-label" for="business2">No</label>
                                    </div>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Part B: Do you have any experience working in a financial
                                        instuituion?</label>
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="inputdata.experience_business.name" type="radio" name="experience_business" value="yes">
                                        <label class="form-check-label" for="financial1">Yes</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="business" v-model="inputdata.experience_business.name" value="no">
                                        <label class="form-check-label" for="financial2">No</label>
                                    </div>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Part C: Have you ever invested in IPOs, Equity Offerings
                                        or Listed Equities?</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ipo_business" v-model="inputdata.ipo_business.name" value="yes">
                                        <label class="form-check-label" for="equities1">Yes</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="ipo_business" v-model="inputdata.ipo_business.name" value="no">
                                        <label class="form-check-label" for="equities2">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="financial-information">
                            <h5>Financial Information</h5>
                            <div class="row mt-4">
                                <div class="col-md-12 mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" id="income_exceed" v-model="inputdata.yearly_income.name" value="My yearly income exceeds SGD 300,000" name="yearly_income">
                                        <label class="form-check-label" for="sgd">My yearly income exceeds SGD
                                            300,000</label>
                                    </div>

                                    <div class="info-box-descriptions financial">
                                        <h6>This option requires one of these (from the last 3months:</h6>
                                        <ul>
                                            <li>Latest income tax assessment from IRAS;</li>
                                            <li> Payslips
                                                <p> a. 1-month payslip if fixed monthly income is at least S$25,000, or
                                                </p>
                                                <p> 12 months payslip if fixed monthly income is below S$25,000;</p>
                                            </li>
                                            <li>Bank statements showing salary;</li>
                                            <li>Letter from employer certifying employment and income in the preceding
                                                12 months; or</li>
                                            <li>Copy of listed company’s latest financial statements/annual report for
                                                directors of listed companies.</li>
                                        </ul>
                                    </div>

                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" v-model="inputdata.yearly_income.name" value="I have more than SGD 1 million in cash and liquid investments" name="yearly_income">
                                        <label class="form-check-label" for="million">I have more than SGD 1 million in
                                            cash and liquid investments</label>
                                    </div>

                                    <div class="info-box-descriptions financial">

                                        <h6>This option requires one of these (from the last 3months:</h6>
                                        <ul>
                                            <li> CPF statement dated within 3 months;</li>
                                            <li> Statement of consolidated holdings from CDP, brokerage firm, bank, or
                                                other distributors, dated within 3 months; and/or
                                            </li>
                                            <li> Letter of confirmation from Financial Institution stating that the
                                                individual qualify as AI, dated within 3 months.</li>
                                            <li>Letter from employer certifying employment and income in the preceding
                                                12 months; or</li>
                                            <li>Copy of listed company’s latest financial statements/annual report for
                                                directors of listed companies.</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="">
                                <h5>Upload Your Financial Information</h5>
                                <p>The primary source of funds and proof of AI status are required.</p>
                                <small>Select one upload method</small>
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="app"
                                    checked="">
                                <label class="form-check-label" for="app">Upload via this app now
                                </label>
                            </div>

                            <div class="upload-files-container">
                                <input type="file" name="" @change="uploadhandler" accept=".pdf, .doc, .jpg, .png" id="file-upload" required>
                                <label for="file-upload" required>
                                    <img src="../../assets/image/icons/file-upload.svg">
                                    <h5>Upload financial status document</h5>
                                    <p>Required format: pdf / doc / jpg / png</p>
                                    <p>Maximum size: 1MB</p>
                                </label>
                            </div>
                            <div class="file-info"  v-for="item in upload_filename" :key="item.id">
                                <p >{{item}} </p>
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="whatsApp">
                                <label class="form-check-label" for="whatsApp">Upload via WhatsApp later
                                </label>
                            </div>
                            <div class="dashed-style-box">
                                <img src="../../assets/image/icons/whatsapp_icon.svg">
                                <p>Please send us the supporting documents via the following email</p>
                                <a href="mail:enquiry@saccapital.com.sg">enquiry@saccapital.com.sg</a>
                            </div>
                        </div>

                        <div class="col-12">
                            <a href="javascript:void(0)" @click="handlebasicinfosetp" class="btn btn-warning"
                                    type="submit">Done</a>
                        </div>
                    </form>
                </div><!-- end-->
            </div>
        </div>
    </div>
</template>   
<script>
import Validation from '../../Validation'
export default {
    name: 'Basic_info',
    mixins: [Validation],
    data() {
        return {
            output:{
                superQuestions:[]
            },
            inputdata: {
                degree_business: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Part A is required'],
                    keyname: "degree_business",
                    input_type: "radio",
                    superQuestionId: 6,
                    usersFinancialInformationFieldIds: 15,
                    key_id: 29

                },
                experience_business: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Part B is required'],
                    keyname: "experience_business",
                    input_type: "radio",
                    superQuestionId: 7,
                    usersFinancialInformationFieldIds: 17,
                    key_id: 31

                },
                ipo_business: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Part C is required'],
                    keyname: "ipo_business",
                    input_type: "radio",
                    superQuestionId: 8,
                    usersFinancialInformationFieldIds: 19,
                    key_id: 33

                },
                yearly_income: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "yearly_income",
                    input_type: "radio",
                    superQuestionId: 10,
                    usersFinancialInformationFieldIds: 23,
                    key_id: 37

                }
            },
            errors: [],
            validation: [],
            upload: 1,
            upload_file: [],
            upload_filename: [],
            proofOfResidence: 1,
            file_id_lsit: [],
            myinfo_data:null,
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
    this.myinfo_data = this.checkkeyexistlocalstrore('temp_myinfo');
    if(this.myinfo_data != null){
       var my_status =  this.get_myinfo_noa(this.myinfo_data,'noahistory-basic',10000);
       if(my_status){
        var element_value = document.getElementById("income_exceed").value;
        document.getElementById('income_exceed').checked = true;
       this.inputdata.yearly_income.name = element_value;
       }
    }
    },
    methods: {
        handlebasicinfosetp: function () {

            this.validation = [];
            this.errors = [];
            this.validationallform(this.inputdata);

            var checkvalidtion = this.checkvalidationarray(this.validation);
            if (checkvalidtion) {
                /*success*/
               this.readyfinddata(this.inputdata);
               this.final_submitfrom();
               console.log(this.file_id_lsit);
               //this.output.uploadDocuments[0].documentIds = this.file_id_lsit;
               console.log(this.output); 
               this.globalfileupload_oneregistration('user/financialInfoDetails', this.output).then((result) => {
               
                console.log(result);
             
              
           //financial_infomation
           this.setvalueinsessiosstroage('financial_infomation',this.output);
             
              
                this.$router.push({ name: 'unblocking' })

            }).catch((error) => {
                console.log(error);
            });

            }
            else {
                /*fail*/

            }
        },
        readyfinddata: function (inputelement) {
            var allinput = Object.keys(inputelement);
            for (let i = 0; i < allinput.length; i++) {
                //check input_type
               
                if (inputelement[allinput[i]].input_type == 'hidden') {
        
                    this.output.investmentExperienceId = inputelement[allinput[i]].name; 
                }
                else if (inputelement[allinput[i]].input_type == 'dropdown') {
                    if(inputelement[allinput[i]].name != null){
                    this.checkdropdow(inputelement[allinput[i]],'dropdoown');

                    }
                }
                else if (inputelement[allinput[i]].input_type == 'text') {
                    if(inputelement[allinput[i]].name != null){
                    this.checkdropdow(inputelement[allinput[i]],'text');
                    }
                }
                else if (inputelement[allinput[i]].input_type == 'checkbox') {
                    if(inputelement[allinput[i]].name != false){
                   
                    this.checkdropdow(inputelement[allinput[i]],'checkbox');
                    }
                }
                else if (inputelement[allinput[i]].input_type == 'radio') {
                    if(inputelement[allinput[i]].name != null){
                  
                    this.checkdropdow(inputelement[allinput[i]],'radio');
                    }
                }


            }
            

        },

        checkdropdow:function(inputdata,type){
            var usermapping;
            if(type == 'radio' || type == 'dropdoown' ){
           // var get_key = this.namesplit(inputdata.name,'_');
             usermapping = {
                key:inputdata.key_id,
                userFinancialInformationFieldValue:inputdata.name
            }
        }
        else{
            usermapping = {
                key:inputdata.key_id,
                userFinancialInformationFieldValue:inputdata.name
            }
        }
            var user_fiinformation = {
					userFinancialInformationFieldId: inputdata.usersFinancialInformationFieldIds,
					usersFinancialInformationFieldMappings: [
                    usermapping
					]
				};
            var inp_el = { superQuestionId: inputdata.superQuestionId,
			usersFinancialInformationFields: [
            user_fiinformation
            ]
            };
            var check_inpuqestion_idmu = 1;
           if(this.output.superQuestions.length != 0 ){
            for (let i = 0; i < this.output.superQuestions.length; i++) {
                if(this.output.superQuestions[i].superQuestionId == inputdata.superQuestionId){
                    //superquestion exist
                    //create custom value
                    check_inpuqestion_idmu  = 2;
                    if(this.output.superQuestions[i].usersFinancialInformationFields.length !=0){
                        for(let y = 0; y < this.output.superQuestions[i].usersFinancialInformationFields.length; y++){
                            if(this.output.superQuestions[i].usersFinancialInformationFields[y].userFinancialInformationFieldId == inputdata.usersFinancialInformationFieldIds ){
                             this.output.superQuestions[i].usersFinancialInformationFields[y].usersFinancialInformationFieldMappings.push(usermapping);
                             break;
                            }
                            else{
                                this.output.superQuestions[i].usersFinancialInformationFields.push(user_fiinformation);
                                break;
                            }
                        }
                    }
                    break; 
                }
              
            }
           }
           else{
            //first time 
            this.output.superQuestions.push(inp_el);
            check_inpuqestion_idmu  = 2;
           }
           if(check_inpuqestion_idmu == 1){
            //new question created
            this.output.superQuestions.push(inp_el);
           }
          
           
        },

        namesplit:function(text,spertor){
            var split_array = text.split(spertor);
            return split_array;
        },

        uploadhandler: function (e) {
            //used
            var file_value = e.currentTarget;
            var formData = new FormData();

            console.log('tst0');
            formData.append("multipartFile", file_value.files[0]);
            const path = file_value.value

            const fileName = path.split(/(\\|\/)/g).pop();
            console.log(fileName);
            this.upload_filename.push(fileName)
            this.upload_file.push(formData);
            console.log(this.upload_file);
        },
        final_submitfrom: function () {
            console.log(this.upload_filename.length);
            console.log(this.upload_file);
            var filevalue = "";
            for (var i = 0; i < this.upload_filename.length; i++) {
                this.globalfileupload_oneregistration('file/secure/upload', this.upload_file[i]).then((result) => {
                    filevalue = result.data.response.id;
             
                    this.file_id_lsit.push(filevalue);
                

                }).catch((error) => {
                    console.log(error);
                });
            }

        },
        checkenable: function (e) {
            var e_id = e.currentTarget.value;
            if (e.currentTarget.checked) {
                if (e_id == 1) {
                    this.proofOfResidence = e_id
                }
                else {
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
            var userRoleId_apply = this.getsessionkey('reg_details_without_verify');
            var postdata = {
                userRoleId: userRoleId_apply.role_id,
                userInfoId: 2,
                idType: 1,
                residenceCountry: this.inputdata.residenceCountry.name,
                pincode: this.inputdata.pincode.name,
                street: this.inputdata.street.name,
                unitNo: this.inputdata.unitNo.name,
                proofOfResidence: this.proofOfResidence,
                usersProofOfResidency: this.usersProofOfResidency,

            }
            this.globalfileupload('user/address', postdata).then((result) => {
                console.log(result);
                this.$router.push({ name: 'unblocking' })

            }).catch((error) => {
                console.log(error);
            });
        }
    }


}
</script>