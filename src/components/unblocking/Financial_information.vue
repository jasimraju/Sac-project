<template>
    <div class="col-lg-7 col-md-7">
        <div class="row">
            <div class="right-sidebar">
                <RegHeader />
                <div class="right-sidebar-register-conten">
                    <h3>Investment Experience</h3>
                    <p>Please select your risk appetite</p>

                    <div class="investment-grid">
                        <div class="row">
                            <input class="form-check-input" id="checktype_val" type="hidden" value="2"
                                        v-model="inputdata.investmentexperienceid.name">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="investment-grid-box investtype" @click="checktype" data-value="1">
                                 
                                    <a href="javascript:void(0)">
                                        <img src="../../assets/image/icons/beginner.svg" alt="">
                                        <h4>Beginner</h4>
                                        <p>No experience and want to get started</p>
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-6"> 
                                <div class="investment-grid-box investtype active" @click="checktype" data-value="2">
                                  
                                    <a href="javascript:void(0)">
                                        <img src="../../assets/image/icons/intermediate.svg" alt="">
                                        <h4>Intermediate</h4>
                                        <p>Some experience, have invested in public stocks, bonds, and/or ETFs</p>
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="investment-grid-box investtype" @click="checktype" data-value="3">
                                    
                                    <a href="javascript:void(0)">
                                        <img src="../../assets/image/icons/advanced.svg" alt="">
                                        <h4>Advanced</h4>
                                        <p>Highly experienced, have invested in public stocks, bonds, ETFs, private
                                            markets and/or alternative investments.</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="financial-information-form">
                        <h3>Financial Assessment Questionnaires</h3>
                        <form class="row g-3 needs-validation" novalidate>
                            <div class="employment-info">
                                <div class="row">
                                    <h5>Part A: Employment information</h5>
                                    <div class="col-md-6 mb-3">
                                        <select class="form-select" v-model="inputdata.employeestatus.name"
                                            id="parent-employeestatus">
                                            <option :value="null" disabled selected>Select Your Employee Status</option>
                                            <option v-for="item in employeestatus" :key="item.id" :value="item.value">
                                                {{ item.name }}</option>
                                        </select>
                                        <div class="error d-none" id="error-employeestatus"></div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <select class="form-select" v-model="inputdata.industryname.name"
                                            id="parent-industryname">
                                            <option :value="null" disabled selected>Select Your Industry</option>
                                            <option v-for="item in industryname" :key="item.id" :value="item.value">
                                                {{ item.name }}</option>
                                        </select>
                                        <div class="error d-none" id="error-industryname"></div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <select class="form-select" v-model="inputdata.positionname.name"
                                            id="parent-positionname">
                                            <option :value="null" disabled selected>Select Your Position Level</option>
                                            <option v-for="item in positionname" :key="item.id" :value="item.value">
                                                {{ item.name }}</option>
                                        </select>
                                        <div class="error d-none" id="error-positionname"></div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <input type="text" name="" class="form-control"
                                            placeholder="Enter Your Employer’s Name (optional)">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 mb-3">
                                <h5>Part B: What is the source of the funds that you plan to invest? </h5>
                                <div class="form-check" v-for="item in plantoinvest" :key="item.id">
                                    <input class="form-check-input plan_invest" type="checkbox" @change="checkallcheck"
                                        :value="inputdata[item.inputname].keyname"
                                        v-model="inputdata[item.inputname].name">
                                    <label class="form-check-label" for="all">{{ item.name }}</label>
                                </div>

                            </div>
                            <div class="col-md-6">
                                <h5>Part C: Is what you plan to invest with SAC a substantial portion of your assets?
                                </h5>

                                <div class="form-check" v-for="item in whatyouplan" :key="item.id">
                                    <input class="form-check-input" type="radio" :value="item.value"
                                        v-model="inputdata.whatyourplan.name">
                                    <label class="form-check-label" for="yes">{{ item.name }}</label>
                                </div>

                            </div>

                            <div class="income">
                                <h5>Part D: Income and expenses (Optional)</h5>
                                <div class="row ">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Total monthly income </label>
                                        <input type="text" class="form-control" v-model="inputdata.monthlyincome.name"
                                            placeholder="eg. $100,000">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>Total monthly expenses </label>
                                        <input type="text" class="form-control" v-model="inputdata.monthlyexpance.name"
                                            placeholder="eg. $100,000">
                                    </div>
                                </div>
                            </div>

                            <div class="income">
                                <h5>Part E: Assets and Liabilities (Optional)</h5>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Assets</label>
                                        <input type="text" class="form-control" v-model="inputdata.assests.name"
                                            placeholder="eg. $100,000,000">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>Liabilities</label>
                                        <input type="text" class="form-control" v-model="inputdata.liabilities.name"
                                            placeholder="eg. $100,000,000">
                                    </div>
                                </div>
                            </div>


                            <div class="col-12">
                                <a href="javascript:void(0)" @click="handlebasicinfosetp" class="btn btn-warning"
                                    type="submit">Done</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>   
<script>

import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import Validation from '../../Validation';
export default {
    name: 'Basic_info',
    mixins: [Validation],
    data() {
        return {
            output:{
                investmentExperienceId:null,
                superQuestions:[]
            },
            inputdata: {
                investmentexperienceid: {
                    name: 2,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "investmentexperienceid",
                    input_type: "hidden",



                },
                employeestatus: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Your employee status is required'],
                    keyname: "employeestatus",
                    superQuestionId: 1,
                    usersFinancialInformationFieldIds: 1,
                    input_type: "dropdown"


                },
                industryname: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Your industry is required'],
                    keyname: "industryname",
                    superQuestionId: 1,
                    usersFinancialInformationFieldIds: 2,
                    input_type: "dropdown"

                },
                positionname: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Your position level is required'],
                    keyname: "positionname",
                    superQuestionId: 1,
                    usersFinancialInformationFieldIds: 3,
                    input_type: "dropdown"

                },
                emploername: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "emploername",
                    superQuestionId: 1,
                    usersFinancialInformationFieldIds: 4,
                    input_type: "text",
                    key_id: 18

                },
                salary: {
                    name: false,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "Salary",
                    superQuestionId: 2,
                    usersFinancialInformationFieldIds: 5,
                    input_type: "checkbox",
                    key_id: 19

                },
                rentalincome: {
                    name: false,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "Rentalincome",
                    superQuestionId: 2,
                    usersFinancialInformationFieldIds: 6,
                    input_type: "checkbox",
                    key_id: 20

                },
                otherinvestment: {
                    name: false,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "Otherinvestment",
                    superQuestionId: 2,
                    usersFinancialInformationFieldIds: 7,
                    input_type: "checkbox",
                    key_id: 21

                },
                giftineritance: {
                    name: false,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "Gift Ineritance",
                    superQuestionId: 2,
                    usersFinancialInformationFieldIds: 8,
                    input_type: "checkbox",
                    key_id: 22

                },
                checkall: {
                    name: false,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "checkall",
                    input_type: null,
                },
                whatyourplan: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "whatyourplan",
                    input_type: "radio",
                    superQuestionId: 3,
                    usersFinancialInformationFieldIds: 9,

                },
                monthlyincome: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "monthlyincome",
                    input_type: "text",
                    superQuestionId: 4,
                    usersFinancialInformationFieldIds: 11,
                    key_id: 25

                },
                monthlyexpance: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "monthlyexpance",
                    input_type: "text",
                    superQuestionId: 4,
                    usersFinancialInformationFieldIds: 12,
                    key_id: 26

                },
                assests: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "assests",
                    input_type: "text",
                    superQuestionId: 5,
                    usersFinancialInformationFieldIds: 13,
                    key_id: 27

                },
                liabilities: {
                    name: null,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "assests",
                    input_type: "text",
                    superQuestionId: 5,
                    usersFinancialInformationFieldIds: 14,
                    key_id: 28

                },
            },
            errors: [],
            validation: [],
            upload: 1,
            upload_file: [],
            upload_filename: [],
            proofOfResidence: 1,
            usersProofOfResidency: [],
            employeestatus: [
                {
                    name: "Employee",
                    value: "1_Employee"
                },
                {
                    name: "Self-Employed",
                    value: "2_Self-Employed"
                },
                {
                    name: "Retired",
                    value: "3_Retired"
                },
                {
                    name: "Student",
                    value: "4_Student"
                },
                {
                    name: "Not Employed",
                    value: "5_Not Employed"
                }],
            industryname: [
                
                {
                    name: "Agriculture",
                    value: "6_Agriculture"
                },
                {
                    name: "Animal Production and Fisheries Building",
                    value: "7_Animal Production and Fisheries Building"
                },
                {
                    name: "Animal Production",
                    value: "50_Animal Production and Fisheries Building"
                },
                {
                    name: "Building ",
                    value: "52_Building "
                },
                {
                    name: "Real Estate",
                    value: "53_Real Estate"
                },
                {
                    name: "Construction and Housing",
                    value: "7_Construction and Housing"
                },
                {
                    name: "Corporate Sector",
                    value: "54_Corporate Sector"
                },
                {
                    name: "Engineering",
                    value: "9_Energy and Utilities"
                },
                {
                    name: "Education",
                    value: "10_Energy and Utilities"
                },
                {
                    name: "Energy and Utilities",
                    value: "8_Energy and Utilities"
                },
                {
                    name: "F&B",
                    value: "39_F&B"
                },
                {
                    name: "Finance and Insurance",
                    value: "55_Finance and Insurance"
                },
                {
                    name: "Fisheries",
                    value: "51_Finance and Insurance"
                },
                {
                    name: "Financial and Professional Services",
                    value: "40_Financial and Professional Services"
                },
                {
                    name: "Formation and Cessation of Business Entities",
                    value: "56_Formation and Cessation of Business Entities"
                },
                {
                    name: "Food Establishments",
                    value: "57_Food Establishments"
                },
                {
                    name: "Healthcare",
                    value: "42_Healthcare"
                },
                {
                    name: "Hospitality and Tourism",
                    value: "42_Hospitality and Tourism"
                },
                {
                    name: "InfoComm and Media",
                    value: "58_InfoComm and Media"
                },
                {
                    name: "Logisticsa",
                    value: "43_InfoComm and Media"
                },
                {
                    name: "Manufacturing",
                    value: "59_Manufacturing"
                },
                {
                    name: "Media",
                    value: "49_Manufacturing"
                },
                {
                    name: "Research and Development",
                    value: "60_Research and Development"
                },
                {
                    name: "Precision Engineering",
                    value: "46_Research and Development"
                },
                {
                    name: "Public Service ",
                    value: "45_Research and Development"
                },
                {
                    name: "Retail",
                    value: "47_Research and Development"
                },
                {
                    name: "Services",
                    value: "61_Services"
                },
                {
                    name: "Tourism",
                    value: "62_Tourism"
                },
                {
                    name: "Telecommunications",
                    value: "63_Transport"
                },
                {
                    name: "Telecommunications",
                    value: "48_Transport"
                },
                {
                    name: "Other",
                    value: "49_ others"
                }
            ],
            positionname: [
                {
                    name: "Entry-level",
                    value: "11_Entry-level"
                },
                {
                    name: "Mid-Level",
                    value: "12_Mid-Level"
                },
                {
                    name: "Management",
                    value: "13_Management"
                },
                {
                    name: "Upper Management",
                    value: "14_Upper Management"
                },
                {
                    name: "Executive",
                    value: "15_Executive"
                },
                {
                    name: "Business Owner",
                    value: "16_Business Owner"
                },
                {
                    name: "Not Applicable",
                    value: "17_Not Applicable"
                },
            ],
            plantoinvest: [
                {
                    name: "Check all that apply",
                    value: "all",
                    inputname: 'checkall',
                    chec_value: false
                },
                {
                    name: "Salary",
                    value: "19",
                    inputname: 'salary',
                    chec_value: false
                },
                {
                    name: "Rental Income",
                    value: "20",
                    inputname: 'rentalincome',
                    chec_value: false
                },
                {
                    name: "Other Investment",
                    value: "21",
                    inputname: 'otherinvestment',
                    chec_value: false
                },
                {
                    name: "Gift/Inheritance",
                    value: "22",
                    inputname: 'giftineritance',
                    chec_value: false
                }

            ],
            whatyouplan: [
                {
                    name: "Yes",
                    value: "23_Yes"
                },
                {
                    name: "No",
                    value: "24_No"
                },]


        }
    },
    components: {
        RegHeader: () => import("../RegHeader.vue"),
    },
    mounted() {
        console.log(this.$refs);
        $(this.$refs.select).select2();
        $(this.$refs.select).on('change', (event) => {
      this.$emit('input', event.target.value);
    });
    },
    created() {
        var userdataonelogin = this.getsessionkey('userdata');
	
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
        var financial = this.getsessionkey('financial_infomation');
        if(financial != null){
            console.log(financial.firstName);
          
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
                this.output.superQuestions = [];
                this.readyfinddata(this.inputdata);
                // return false;
                this.final_submitfrom();
                console.log(this.output)

            }
            else {
                /*fail*/

            }
        },

        final_submitfrom: function () {
           var postdata = this.output;
           console.log(JSON.stringify(postdata));
            this.globalfileupload_oneregistration('user/financialInfoDetails', postdata).then((result) => {
                
                console.log(result);
              
             
           //financial_infomation
           this.setvalueinsessiosstroage('financial_infomation',postdata);
                
          
                this.$router.push({ name: 'unblocking' })

            }).catch((error) => {
                console.log(error);
            });

        },
          checktype: function (e) {
           
            var allclsss = document.querySelectorAll('.investtype');
            allclsss.forEach(function (el) {
                el.classList.remove("active");
            
            });
            e.currentTarget.classList.add("active");
            var a_value = e.currentTarget.getAttribute('data-value')
            document.getElementById('checktype_val').value = a_value;
            this.inputdata.investmentexperienceid.name = a_value;
        },
        checkallcheck: function (e) {
            var allclsss;
            if (e.currentTarget.checked && e.currentTarget.value == 'checkall') {

                allclsss = document.querySelectorAll('.plan_invest');
                allclsss.forEach(function (el) {
                    el.checked = true;
                });
            }
            else {
                if (e.currentTarget.value == 'checkall') {
                    allclsss = document.querySelectorAll('.plan_invest');
                    allclsss.forEach(function (el) {
                        el.checked = false;
                    });
                }
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
                        console.log(inputelement[allinput[i]].name);
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
            var get_key = this.namesplit(inputdata.name,'_');
             usermapping = {
                key:get_key[0],
                userFinancialInformationFieldValue:get_key[1]
            }
        }
        else{
            if(type == 'checkbox'){
                usermapping = {
                key:inputdata.key_id,
                userFinancialInformationFieldValue:""
            }
            }else{
            usermapping = {
                key:inputdata.key_id,
                userFinancialInformationFieldValue:inputdata.name
            }}
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
        }
    }


}
</script>