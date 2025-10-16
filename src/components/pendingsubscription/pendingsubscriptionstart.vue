<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="subcription-form">
                <div class="title">
                    <h3>Subscription Form</h3>
                </div>
                <form class="row g-3 needs-validation" novalidate="">
                
                        <div  v-for="(investmentQuestionnaire, index) in allsubscription_question.questionnaires"
                        :key="investmentQuestionnaire.id" :id="'question_main_' + (index + 1)" class="question_main" :class="showclass(index)">
                            <div class="step">
                                <h5>0{{ index + 1 }} / <span>{{ allsubscription_question.questionnaires.length }}</span>
                                </h5>
                            </div>
                            <!-- Parent -->
                            <div class="parent">
                                <div v-if="get_input_type(investmentQuestionnaire.fieldTypeId) == 'radio'"
                                    :data-type="get_input_typy(investmentQuestionnaire)" :class="'radio'">
                                    <input class="form-check-input d-none" @change="input_change_value"
                                        :value="investmentQuestionnaire.id"
                                        v-model="investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].name"
                                        type="radio"
                                        :data-id="investmentQuestionnaire.id + '_' + investmentQuestionnaire.formId + '_' + index"
                                        data-type="parent"  checked>
                                    <label for="name" class="form-label">{{ investmentQuestionnaire.title }}</label>
                                </div>
                                <div v-else-if="get_input_type(investmentQuestionnaire.fieldTypeId) == 'checkbox'" :class="'checkbox'"
                                    :data-type="get_input_typy(investmentQuestionnaire)">
                                    <input class="form-check-input d-none" @change="input_change_value"
                                        :value="investmentQuestionnaire.id" name="parent_checkbox" type="checkbox"
                                        v-model="investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].name"
                                        :data-id="investmentQuestionnaire.id + '_' + investmentQuestionnaire.formId + '_' + index"
                                        data-type="parent" checked>

                                    <label class="form-check-label" for="1">{{ investmentQuestionnaire.title }}</label>

                                </div>

                                <!-- child-->
                                <div class="child-parent"
                                    v-for="(investmentQuestionnairechildDetails, child_indes) in investmentQuestionnaire.childDetails"
                                    :key="investmentQuestionnairechildDetails.id"
                                    :class="investmentQuestionnaire.id + '_' + investmentQuestionnaire.formId + '_' + index"
                                    :id="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId">
                                    <div
                                        v-if="get_input_type(investmentQuestionnairechildDetails.fieldTypeId) == 'radio'" :class="'radio'">

                                        <input class="form-check-input" type="radio" :data-index="child_indes"
                                            :data-key="investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id"
                                            :name="'child_radio' + investmentQuestionnaire.id"
                                            :value="investmentQuestionnairechildDetails.childId"
                                            @change="input_change_value"
                                            v-model="investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].childDetails[child_indes].name"
                                            :data-id="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId"
                                            data-type="child">

                                        <label for="name" class="form-label">{{
                        investmentQuestionnairechildDetails.title }}</label>

                                    </div>
                                    <div 
                                        v-if="get_input_type(investmentQuestionnairechildDetails.fieldTypeId) == 'checkbox'" :class="'checkbox'">
                                        <input class="form-check-input" :data-index="child_indes"
                                            :data-key="investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id"
                                            :value="investmentQuestionnairechildDetails.childId"
                                            :name="'child_checkbox' + investmentQuestionnaire.id" type="checkbox"
                                            @change="input_change_value"
                                            v-model="investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].childDetails[child_indes].name"
                                            :data-id="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId"
                                            data-type="child">

                                        <label for="name" class="form-label">{{
                        investmentQuestionnairechildDetails.title }}</label>

                                    </div>
                                    <div
                                        v-if="get_input_type(investmentQuestionnairechildDetails.fieldTypeId) == 'text'" :class="'text'">
                                        <label for="name" class="form-label">{{
                        investmentQuestionnairechildDetails.title }}</label>
                                        <input class="form-check-input" :data-index="child_indes"
                                            :data-key="investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id"
                                            type="text" @change="input_change_value"
                                            v-model="investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].childDetails[child_indes].name"
                                            :data-id="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId"
                                            data-type="child">



                                    </div>
                                    <div
                                        v-if="get_input_type(investmentQuestionnairechildDetails.fieldTypeId) == 'dropdown'" :class="'dropdown'">
                                        {{ investmentQuestionnairechildDetails.title }}

                                    </div>
                                    <!--nested chid-->
                                    <div class="row"
                                        v-if="investmentQuestionnairechildDetails.subChildDetails.length != 0">
                                        <div class="col-md-6 subchild-input-rap d-none"
                                            v-for="(investmentQuestionnairechildDetailssubChildDetails, subchild_index) in investmentQuestionnairechildDetails.subChildDetails"
                                            :key="investmentQuestionnairechildDetailssubChildDetails.id"
                                            :class="investmentQuestionnaire.id + ' ' + investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId"
                                            :id="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId + '_' + investmentQuestionnairechildDetailssubChildDetails.subChildId">

                                            <div class="subchild-input-box"
                                                v-if="get_input_type(investmentQuestionnairechildDetailssubChildDetails.fieldTypeId) == 'radio'" :class="'checkbox'">
                                                <input class="form-check-input"
                                                    :class="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId + '_' + investmentQuestionnairechildDetailssubChildDetails.subChildId"
                                                    type="radio" @change="input_change_value" data-type="sub-child">

                                                <label for="name" class="form-label">{{
                        investmentQuestionnairechildDetailssubChildDetails.title }}</label>

                                            </div>
                                            <div class="subchild-input-box"
                                                v-if="get_input_type(investmentQuestionnairechildDetailssubChildDetails.fieldTypeId) == 'checkbox'" :class="'checkbox'">

                                                <input class="form-check-input"
                                                    :class="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId + '_' + investmentQuestionnairechildDetailssubChildDetails.subChildId"
                                                    type="checkbox" @change="input_change_value" data-type="sub-child">

                                                <label for="name" class="form-label">{{
                        investmentQuestionnairechildDetailssubChildDetails.title }}</label>

                                            </div>
                                            <div class="subchild-input-box"
                                                v-if="get_input_type(investmentQuestionnairechildDetailssubChildDetails.fieldTypeId) == 'text'" :class="'text'">
                                                <label for="name" class="form-label">{{
                        investmentQuestionnairechildDetailssubChildDetails.title }}</label>
                                                <span>{{
                        investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].childDetails[child_indes].subchild_details[subchild_index].name
                    }}</span>
                                                <input class="form-control"
                                                    :class="investmentQuestionnaire.id + '_' + investmentQuestionnairechildDetails.childId + '_' + investmentQuestionnairechildDetailssubChildDetails.subChildId"
                                                    v-model="investmentQuestion[investmentQuestionnaire.formId + '_' + investmentQuestionnaire.id].childDetails[child_indes].subchild_details[subchild_index].name"
                                                    type="text" @change="input_change_value" data-type="sub-child">



                                            </div>
                                            <div class="subchild-input-box"
                                                v-if="get_input_type(investmentQuestionnairechildDetailssubChildDetails.fieldTypeId) == 'dropdown'" :class="'dropdown'">
                                                {{ investmentQuestionnairechildDetailssubChildDetails.title }}

                                            </div>
                                        </div>
                                    </div>
                                    <!--Nested end chid-->
                                </div>
                                <!--end chid-->
                            </div>
                            <!-- End -->
                            <div class="grid-button mt-5">
                                <span v-if="index != 0" @click="quesion_back_show" class="btn btn-secondary"
                                    :data-index="index"
                                    :data-key-id="investmentQuestionnaire.formId + '_' +investmentQuestionnaire.id">Back</span>
                                <span v-if=" index+1 != allsubscription_question.questionnaires.length"
                                    class="btn btn-warning" @click="quesion_next_show" :data-index="index"
                                    :data-key-id="investmentQuestionnaire.formId+'_'+investmentQuestionnaire.id">Next</span>

                                <span v-else class="btn btn-warning" @click="quesion_submit_next_question"
                                    :data-index="index"
                                    :data-key-id="investmentQuestionnaire.formId+'_'+investmentQuestionnaire.id">Submit</span>
                            </div>

                        </div>

                   




                </form>




            </div>
        </div>
    </div>
</template>
<script>
const containsKey = (obj, key) => Object.keys(obj).includes(key);
export default {

    name: 'Penddingsubscription_end',
    props: {
        msg: String
    },
    data() {
        return {
            loginstatus: false,
            subscription_questions: [],
            allsubscription_question: [],
            input_type: [],
            subscription_result: [],
            investmentQuestion: {},
            errorinput: {},
            finalresult: {
                formId: null,
                investmentId: null,
                questionnaires: []
            },
            inputdata: {
                quesention_1: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_1",
                    substatus: 1,
                    sublast: 2,
                    notdetails: 5,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }


                },
                quesention_2: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_2",
                    substatus: 1,
                    sublast: 2,
                    notdetails: 7,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }

                },
                quesention_3: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_3",
                    notdetails: 9,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }

                },
                quesention_4: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_4",
                    substatus: 1,
                    sublast: 2,
                    notdetails: 11,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }

                },
                quesention_5: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_5",
                    substatus: 1,
                    sublast: 2,
                    notdetails: 13,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }

                },
                quesention_6: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_6",
                    substatus: 1,
                    sublast: 2,
                    notdetails: 15,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }

                },
                quesention_7: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_7",
                    substatus: 1,
                    sublast: 2,
                    notdetails: 17,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        },
                        userQuestions_4: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_4",
                        }
                    }

                },
                quesention_8: {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: "quesention_8",
                    substatus: 1,
                    sublast: 1,
                    notdetails: 19,
                    userQuestions: {
                        userQuestions_1: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_1",
                        },
                        userQuestions_2: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_2",
                        },
                        userQuestions_3: {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            keyname: "userQuestions_3",
                        }
                    }

                }
            }



        }

    },
    created() {
        this.loginstatus = this.checkloginstatus();
        var investment_details = this.getlocalkey('subcriptionitems_tem');
        var get_question_id = investment_details.formId;
   
        if (this.loginstatus) {
            this.globalGetreauth('investment/field/types').then((result) => {
                const responsedata = result.data;

                this.input_type = responsedata;
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
            this.globalGetreauth('investment/questions/details/'+get_question_id).then((result) => {
                const responsedata = result.data;
                this.allsubscription_question = responsedata;
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

            this.globalGetreauth('investment/questions').then((result) => {
                const responsedata = result.data;
                this.subscription_questions = responsedata;

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
    },
    methods: {
        quesion_submit_next_question: function (e) {
            var key_name = e.currentTarget.getAttribute("data-key-id");
            var submit_staus;
            if (this.investmentQuestion[key_name].name != null) {
                var child_error = false;
                var subchild_error = false;
                for (let i = 0; i < this.investmentQuestion[key_name].childDetails.length; i++) {
                    if (this.investmentQuestion[key_name].childDetails[i].name != null) {
                        child_error = true;
                        if (child_error) {
                            if (this.investmentQuestion[key_name].childDetails[i].subchild_details.length != 0) {
                                for (let y = 0; y < this.investmentQuestion[key_name].childDetails[i].subchild_details.length; y++) {

                                    if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].fieldTypeId == 9) {
                                        if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name != null) {

                                            subchild_error = true;
                                            break;
                                        }
                                    } else {
                                        subchild_error = true;
                                        if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name == null || !this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name) {
                                            subchild_error = false;
                                        }
                                    }
                                }
                            } else {
                                subchild_error = true;
                            }
                        }
                    }
                }

                if (!child_error || !subchild_error) {

                    //error 
                    this.errorinput[key_name].error = 'please select questions';
                    submit_staus = false;
                } else {
                    //success 
                    //    this.errorinput[key_name].error = null;
                    submit_staus = true;
                }
            } else {
                this.errorinput[key_name].error = 'please select questions';
                submit_staus = false;
            }

            if (submit_staus) {
                this.pre_final_input();
            }
        },
        pre_final_input: function () {
           
            var question_main = [];
            var quesention = {};
            var child_quesention;
            var investment_details = this.getlocalkey('subcriptionitems_tem');
            var sub_chlid_quesention;
            var key_array;
            for (var key in this.investmentQuestion) {
                console.log(this.investmentQuestion[key])
                key_array = key.split("_");
                quesention = {};
                quesention.id = this.investmentQuestion[key].id;
                quesention.formId = this.investmentQuestion[key].formId;
                quesention.fieldTypeId = this.investmentQuestion[key].fieldTypeId;
                quesention.title = key_array[1];
                quesention.childDetails = [];

                for (let i = 0; i < this.investmentQuestion[key].childDetails.length; i++) {
                    child_quesention = {};

                    if (this.investmentQuestion[key].childDetails[i].name != null) {
                        child_quesention.childId = this.investmentQuestion[key].childDetails[i].id;
                        child_quesention.title = this.investmentQuestion[key].childDetails[i].name;
                        child_quesention.fieldTypeId = this.investmentQuestion[key].childDetails[i].fieldTypeId;
                        child_quesention.subChildDetails = [];
                        if (this.investmentQuestion[key].childDetails[i].subchild_details.length != 0) {
                            for (let y = 0; y < this.investmentQuestion[key].childDetails[i].subchild_details.length; y++) {
                                sub_chlid_quesention = {};
                                if (this.investmentQuestion[key].childDetails[i].name != null || this.investmentQuestion[key].childDetails[i].subchild_details[y].name != '') {
                                    sub_chlid_quesention.subChildId = this.investmentQuestion[key].childDetails[i].subchild_details[y].id;
                                    sub_chlid_quesention.fieldTypeId = this.investmentQuestion[key].childDetails[i].subchild_details[y].fieldTypeId;
                                    sub_chlid_quesention.title = this.investmentQuestion[key].childDetails[i].subchild_details[y].name;
                                    sub_chlid_quesention.fields = [];
                                    child_quesention.subChildDetails.push(sub_chlid_quesention);
                                }
                            }
                        } else {
                            child_quesention.subChildDetails = [];
                        }
                        quesention.childDetails.push(child_quesention);
                    }
                }
                question_main.push(quesention);
            }
            this.finalresult.questionnaires = question_main;
            this.finalresult.formId = investment_details.formId;
            this.finalresult.investmentId = investment_details.investmentId;

            console.log(this.finalresult)
            this.final_submit_data_form();
        },
        final_submit_data_form: function () {
            var final_post = this.finalresult;
            this.globalpostauth('investment/save/user/questions/details', final_post).then((result) => {
                const responsedata = result.data;
                console.log(responsedata);
                this.$router.push({ name: 'subcriptiondelartion' })
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
        quesion_back_show: function (e) {
            var data_index = e.currentTarget.getAttribute("data-index");
            //  var key_name = e.currentTarget.getAttribute("data-key-id");
            var question_class_name = document.getElementsByClassName('question_main');

            for (let i = 0; i < question_class_name.length; i++) {

                question_class_name[i].classList.add('d-none');
            }
            var next_number_index = parseInt(data_index);
            document.getElementById("question_main_" + next_number_index).classList.remove('d-none');

        },
        final_question_validateion: function (e) {
            // var data_index = e.currentTarget.getAttribute("data-index");
            var key_name = e.currentTarget.getAttribute("data-key-id");

            if (this.investmentQuestion[key_name].name != null) {
                var child_error = false;
                var subchild_error = false;
                for (let i = 0; i < this.investmentQuestion[key_name].childDetails.length; i++) {
                    if (this.investmentQuestion[key_name].childDetails[i].name != null) {
                        child_error = true;
                        if (child_error) {
                            if (this.investmentQuestion[key_name].childDetails[i].subchild_details.length != 0) {
                                for (let y = 0; y < this.investmentQuestion[key_name].childDetails[i].subchild_details.length; y++) {

                                    if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].fieldTypeId == 9) {
                                        if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name != null) {

                                            subchild_error = true;
                                            break;
                                        }
                                    } else {
                                        subchild_error = true;
                                        if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name == null || !this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name) {
                                            subchild_error = false;
                                        }
                                    }
                                }
                            } else {
                                subchild_error = true;
                            }
                        }
                    }
                }

                if (!child_error || !subchild_error) {

                    //error 
                    this.errorinput[key_name].error = 'please select questions';
                    return false;
                } else {
                    //success 
                    this.errorinput[key_name].error = null;
                    return true;
                }
            } else {
                this.errorinput[key_name].error = 'please select questions';
                return false;
            }
        },
        quesion_next_show: function (e) {
            var data_index = e.currentTarget.getAttribute("data-index");
            var key_name = e.currentTarget.getAttribute("data-key-id");
           
            if (this.investmentQuestion[key_name].name != null) {
                var child_error = false;
                var subchild_error = false;
                for (let i = 0; i < this.investmentQuestion[key_name].childDetails.length; i++) {
                    if (this.investmentQuestion[key_name].childDetails[i].name != null) {
                        child_error = true;
                        if (child_error) {
                            if (this.investmentQuestion[key_name].childDetails[i].subchild_details.length != 0) {
                                for (let y = 0; y < this.investmentQuestion[key_name].childDetails[i].subchild_details.length; y++) {

                                    if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].fieldTypeId == 9) {
                                        if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name != null) {

                                            subchild_error = true;
                                            break;
                                        }
                                    } else {
                                        subchild_error = true;
                                        if (this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name == null || !this.investmentQuestion[key_name].childDetails[i].subchild_details[y].name) {
                                            subchild_error = false;
                                        }
                                    }
                                }
                            } else {
                                subchild_error = true;
                            }
                        }
                    }
                }

                if (!child_error || !subchild_error) {

                    //error 
                    this.errorinput[key_name].error = 'please select questions';
                } else {
                    //success 
                    var question_class_name = document.getElementsByClassName('question_main');

                    for (let i = 0; i < question_class_name.length; i++) {

                        question_class_name[i].classList.add('d-none');
                    }
                    var next_number_index = parseInt(data_index) + 2;
                    document.getElementById("question_main_" + next_number_index).classList.remove('d-none');
                }
            } else {
                this.errorinput[key_name].error = 'please select questions';
                console.log(this.errorinput[key_name].error);
            }

        },
        check_child_is_active: function (key_name, index_number) {
            this.investmentQuestion[key_name].childDetails[index_number].name = null;
        }
        ,
        input_change_value: function (e) {

            var input_type = e.currentTarget.getAttribute("type");
            var status_value = e.currentTarget.getAttribute("data-type");
            var show_other_id = e.currentTarget.getAttribute("data-id");
            var item_name_input;
            var all_item_name;
            var show_other_id_all_input;
            var show_other_id_all_input_main;
            var show_other_id_array;
            var show_child_key;
            var show_child_index;
            if (input_type == 'radio') {
                //is checked
                if (status_value == 'parent') {
                    console.log(show_other_id)
                    show_other_id_all_input = document.getElementsByClassName(show_other_id);
                    for (let i = 0; i < show_other_id_all_input.length; i++) {
                        show_other_id_all_input[i].classList.remove('d-none');
                    }
                }
                if (status_value == 'child') {
                    // console.log(show_other_id);
                    show_other_id_array = show_other_id.split("_");
                    show_other_id_all_input_main = document.getElementsByClassName(show_other_id_array[0]);
                    show_other_id_all_input = document.getElementsByClassName(show_other_id);
                    if (input_type == 'radio') {
                        item_name_input = e.currentTarget.getAttribute('name');
                        all_item_name = document.getElementsByName(item_name_input);
                        for (let y = 0; y < all_item_name.length; y++) {
                            show_child_key = all_item_name[y].getAttribute("data-key");
                            show_child_index = all_item_name[y].getAttribute("data-index");
                            console.log(show_child_key);
                            if (all_item_name[y].checked == false) {

                                all_item_name[y].value = false;

                                this.check_child_is_active(show_child_key, show_child_index);
                                all_item_name[y].dispatchEvent(new Event('input'));
                            }
                        }
                    }
                    var subquestion_id;
                    var subquestion_id_class;
                    for (let i = 0; i < show_other_id_all_input_main.length; i++) {
                        show_other_id_all_input_main[i].classList.add('d-none');
                        subquestion_id = show_other_id_all_input_main[i].getAttribute('id');
                        subquestion_id_class = document.getElementsByClassName(subquestion_id);
                        for (let y = 0; y < subquestion_id_class.length; y++) {
                            if (subquestion_id_class[y].getAttribute('type') == 'radio' || subquestion_id_class[y].getAttribute('type') == 'checkbox') {
                                subquestion_id_class[y].checked = false;
                                subquestion_id_class[y].dispatchEvent(new Event('input'));
                            } else {
                                subquestion_id_class[y].value = null;
                                subquestion_id_class[y].dispatchEvent(new Event('input'));
                            }
                        }
                    }

                    for (let i = 0; i < show_other_id_all_input.length; i++) {
                        show_other_id_all_input[i].classList.remove('d-none');
                    }
                }
            }
            if (input_type == 'checkbox') {
                //is checked
                if (status_value == 'parent') {
                    //console.log(show_other_id)
                    show_other_id_all_input = document.getElementsByClassName(show_other_id);
                    for (let i = 0; i < show_other_id_all_input.length; i++) {
                        show_other_id_all_input[i].classList.remove('d-none');
                    }

                }
                if (status_value == 'child') {
                    // console.log(show_other_id)  
                    show_other_id_array = show_other_id.split("_");
                    show_other_id_all_input_main = document.getElementsByClassName(show_other_id_array[0]);
                    show_other_id_all_input = document.getElementsByClassName(show_other_id);
                    for (let i = 0; i < show_other_id_all_input_main.length; i++) {
                        show_other_id_all_input_main[i].classList.add('d-none');
                    }

                    for (let i = 0; i < show_other_id_all_input.length; i++) {
                        show_other_id_all_input[i].classList.remove('d-none');
                    }
                }
            }
            if (input_type == 'text') {
                //is value empty
                if (status_value == 'parent') {
                    //console.log(show_other_id)
                    document.getElementById(show_other_id).classList.remove('d-none');
                }


            }
        },
        get_input_type(field_id) {
            var type = 'text';
            if (field_id == 1) {
                type = 'text';
                return type;
            }
            if (field_id == 2) {
                type = 'data';
                return type;
            }
            if (field_id == 3) {
                type = 'time';
                return type;
            }
            if (field_id == 4) {
                type = 'number';
                return type;
            }
            if (field_id == 5) {
                type = 'datatime';
                return type;
            }
            if (field_id == 6) {
                //AlphaNumeric
                type = 'number';
                return type;
            }
            if (field_id == 7) {

                type = 'checkbox';
                return type;
            }
            if (field_id == 8) {

                type = 'file';
                return type;
            }
            if (field_id == 9) {

                type = 'radio';
                return type;
            }
            if (field_id == 10) {

                type = 'dropdown';
                return type;
            }
        },
        get_question_class_name: function (index) {
            if (index != 0) {
                return 'd-none';
            } else {
                return '';
            }
        },

        get_child_input: function (child_details) {
            var child_details_data = [];
            var subchild_details_data = [];
            for (let i = 0; i < child_details.length; i++) {
                subchild_details_data = [];
                if (child_details[i].subChildDetails.length != 0) {

                    for (let y = 0; y < child_details[i].subChildDetails.length; y++) {
                        subchild_details_data[y] = {
                            name: null,
                            key: ['requiredFunction'],
                            msg: ['Field are required'],
                            fieldTypeId: child_details[i].subChildDetails[y].fieldTypeId,
                            keyname: child_details[i].subChildDetails[y].subChildId,
                            title: child_details[i].subChildDetails[y].title,
                            id: child_details[i].subChildDetails[y].subChildId,
                        }
                    }
                }
                child_details_data[i] = {
                    name: null,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    fieldTypeId: child_details[i].fieldTypeId,
                    keyname: child_details[i].childId,
                    title: child_details[i].title,
                    id: child_details[i].childId,
                    subchild_details: subchild_details_data
                }
            }
            return child_details_data;
        },
        get_input_typy: function (questionnaires) {
            //var questionnaires_vau;
            console.log(questionnaires);



            if (this.investmentQuestion != null) {
                const hasName = containsKey(this.investmentQuestion, questionnaires.formId + '_' + questionnaires.id);

                if (!hasName) {
                    this.investmentQuestion[questionnaires.formId + '_' + questionnaires.id] = {
                        name: questionnaires.id,
                        key: ['requiredFunction'],
                        msg: ['Field are required'],
                        keyname: questionnaires.formId + '_' + questionnaires.id,
                        formId: questionnaires.formId,
                        fieldTypeId: questionnaires.fieldTypeId,
                        title: questionnaires.title,
                        id: questionnaires.id,
                        childDetails: this.get_child_input(questionnaires.childDetails),
                    };

                }
            } else {

                this.investmentQuestion[questionnaires.formId + '_' + questionnaires.id] = {
                    name: questionnaires.id,
                    key: ['requiredFunction'],
                    msg: ['Field are required'],
                    keyname: questionnaires.formId + '_' + questionnaires.id,
                    formId: questionnaires.formId,
                    fieldTypeId: questionnaires.fieldTypeId,
                    fields: questionnaires.fields,
                    extraFields: questionnaires.extraFields,
                    title: questionnaires.title,
                    id: questionnaires.id,
                    childDetails: this.get_child_input(questionnaires.childDetails),
                }
            }




            console.log(this.investmentQuestion);
            return questionnaires.name;
        },
        showclass: function (index) {
            var display;
            if (index != 0) {
                display = 'd-none';
            } else {
                display = '';
            }
            return display;
        },
        backelement: function (e) {
            var question_main = e.currentTarget.getAttribute("data-main-sub");
            var prv_sub_question = e.currentTarget.getAttribute("data-sub-id");
            var prv_question = e.currentTarget.getAttribute("data-id");
            // var prv_question_n = e.currentTarget.getAttribute("data-prv-id");
            var current_question = e.currentTarget.getAttribute("data-current-id");
            //document.getElementById(prv_question_n).classList.remove('d-none')
            var data_key_name = e.currentTarget.getAttribute("data-key-name");
            if (this.inputdata[data_key_name].name != this.inputdata[data_key_name].notdetails) {
                //go main page
                console.log(this.inputdata[data_key_name].substatus)
                if (this.inputdata[data_key_name].substatus == 2) {
                    //go parent question
                    console.log('parent Question')
                    //remove d-none
                    //this.inputdata[data_key_name].substatus = 1;
                    document.getElementById(prv_sub_question).classList.add('d-none');
                    document.getElementById(question_main).classList.remove('d-none');
                    document.getElementById('next-' + data_key_name).setAttribute("data-sub-validation", "no");
                } else {
                    console.log('prv element')
                    document.getElementById(prv_question).classList.remove('d-none');
                    document.getElementById(current_question).classList.add('d-none');
                }

            } else {
                console.log('prv element')

            }

        },
        next_element: function (e) {
            console.log(this.subscription_questions)
            console.log(e.currentTarget.getAttribute("data-id"));
            // var next_question = e.currentTarget.getAttribute("data-id");
            //var next_sub_question = e.currentTarget.getAttribute("data-sub-id");
            //var main_question = e.currentTarget.getAttribute("data-main-sub");
            //var data_key_name = e.currentTarget.getAttribute("data-key-name");
            //var data_current_id = e.currentTarget.getAttribute("data-current-id");


        },
        nextelement: function (e) {
            console.log(this.subscription_questions)
            console.log(e.currentTarget.getAttribute("data-id"));
            var next_question = e.currentTarget.getAttribute("data-id");
            var next_sub_question = e.currentTarget.getAttribute("data-sub-id");
            var main_question = e.currentTarget.getAttribute("data-main-sub");
            var data_key_name = e.currentTarget.getAttribute("data-key-name");
            var data_current_id = e.currentTarget.getAttribute("data-current-id");
            var valid_true = false;
            if (this.inputdata[data_key_name].name == this.inputdata[data_key_name].notdetails) {
                console.log(this.inputdata[data_key_name].name);
                //no userdetails  substatus: 1,
                if (this.inputdata[data_key_name].keyname == 'quesention_8') {
                    //form submit 

                    console.log('submit');
                    this.finalsubmit();
                } else {
                    document.getElementById(next_question).classList.remove('d-none');
                    document.getElementById(data_current_id).classList.add('d-none');
                    e.currentTarget.setAttribute("data-sub-validation", "no");
                    this.inputdata[data_key_name].substatus = 1;
                }

            } else {
                //empty checking
                if (this.inputdata[data_key_name].name) {
                    var is_sub = e.currentTarget.getAttribute("data-sub-validation");
                    if (this.inputdata[data_key_name].substatus == 1) {
                        this.inputdata[data_key_name].substatus = 2
                    }
                    if (is_sub == 'yes') {
                        //check validation


                        if (this.inputdata[data_key_name].userQuestions) {

                            const keys = Object.keys(this.inputdata[data_key_name].userQuestions);
                            for (let i = 0; i < keys.length; i++) {
                                const key = keys[i];

                                if (this.inputdata[data_key_name].userQuestions[key].name) {
                                    valid_true = true
                                } else {
                                    valid_true = false
                                }
                            }


                        }

                        if (valid_true) {
                            if (this.inputdata[data_key_name].keyname == 'quesention_8') {
                                //form submit 
                                this.finalsubmit();
                                console.log('submit');
                            } else {
                                document.getElementById(next_question).classList.remove('d-none');
                                document.getElementById(data_current_id).classList.add('d-none');
                            }
                        }
                    } else {
                        document.getElementById(next_sub_question).classList.remove('d-none');
                        document.getElementById(main_question).classList.add('d-none');
                    }

                    e.currentTarget.setAttribute("data-sub-validation", "yes");
                }

            }
        },
        finalsubmit: function () {
            var details = [];
            var result_value;
            let userDetails;
            var questiondetais;
            var i_i;
            var y_y;
            for (let i = 0; i < this.subscription_questions.length; i++) {
                userDetails = [];
                i_i = i + 1;
                for (let y = 0; y < this.subscription_questions[i].userQuestions.length; y++) {
                    y_y = y + 1;
                    if (this.inputdata['quesention_' + i_i].notdetails == this.inputdata['quesention_' + i_i].name) {
                        questiondetais = {
                            userDetailQuestionId: this.subscription_questions[i].userQuestions[y].userQuestionId,
                            value: '',
                        };
                        userDetails.push(questiondetais);
                    } else {
                        questiondetais = {
                            userDetailQuestionId: this.subscription_questions[i].userQuestions[y].userQuestionId,
                            value: this.inputdata['quesention_' + i_i].userQuestions['userQuestions_' + y_y].name,
                        };
                        userDetails.push(questiondetais);
                    }
                }
                result_value = {
                    questionId: this.subscription_questions[i].questionId,
                    option: this.inputdata['quesention_' + i_i].name,
                    userDetails: userDetails,
                }
                details.push(result_value)
            }
            console.log(details)
            var investment_details = this.getlocalkey('subcriptionitems_tem');
            console.log(investment_details);
            var final_post = {
                investmentId: investment_details.investmentId,
                questions: details
            }
            this.globalpostauth('investment/subscription/userDetails', final_post).then((result) => {
                const responsedata = result.data;
                console.log(responsedata);
                this.$router.push({ name: 'subcriptiondelartion' })
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