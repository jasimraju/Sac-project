<template>
    <div class="modal fade" id="authentication"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header add-note-title">
        </div> 
        <div class="modal-body">
        <div class="text text-center">
        <img src="../../assets/image/icons/two-auth.svg">
        <h3>Two-step Authentication</h3>
        <p>Thank you for keeping your account secure. </p>
        <p>Check your Mail: </p>
        <p><strong>{{user_email}}</strong></p>
        </div>
        <form class="d-grid" @submit.prevent="handleOtp" @keydown.enter="$event.preventDefault()">
        <div class="two-authentication">
        <input type="text" id="parent-opt_1" @keyup="change_focuse" v-model="inputopt.opt_1.name"  placeholder="-">
        <input type="text" id="parent-opt_2" @keyup="change_focuse" v-model="inputopt.opt_2.name"  placeholder="-">
        <input type="text" id="parent-opt_3" @keyup="change_focuse" v-model="inputopt.opt_3.name"  placeholder="-">
        <input type="text" id="parent-opt_4" @keyup="change_focuse" v-model="inputopt.opt_4.name"  placeholder="-">
        <input type="text" id="parent-opt_5" @keyup="change_focuse" v-model="inputopt.opt_5.name"  placeholder="-">
        <input type="text" id="parent-opt_6" @keyup="change_focuse" v-model="inputopt.opt_6.name"  placeholder="-">
        </div>
        <div class="note text-center mt-3">
        <p>It may take a minute to receive your code.<br/> Haven’t received? <a href="#">Resend a new code.</a></p>
        </div>
        <div class="error-box" v-if="errors.length">
            <p ><a href="#"><i class="fas fa-times-circle"></i></a>{{ errors[0] }}</p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="close_modal" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-warning" >Submit</button>
        </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </template>
        
        
    <script>
    import Validationopt from '../../Validation'
    export default {
        name: 'RegAuthenticationModal',
        mixins: [Validationopt],
        props: {
            phone_number: String,
            user_email:String,
            user_id:String
        },
        data() {
                return{
                    inputopt: {
                    opt_1:{
                        name:null,
                        key:['requiredFunction'],
                        msg:['Please type opt'],
                        keyname:"opt_1"
                    },
                    opt_2:{
                        name:null,
                        key:['requiredFunction'],
                        msg:['Please type opt'],
                        keyname:"opt_2"
                    },
                    opt_3:{
                        name:null,
                        key:['requiredFunction'],
                        msg:['Please type opt'],
                        keyname:"opt_3"
                    },
                    opt_4:{
                        name:null,
                        key:['requiredFunction'],
                        msg:['Please type opt'],
                        keyname:"opt_4"
                    },
                    opt_5:{
                        name:null,
                        key:['requiredFunction'],
                        msg:['Please type opt'],
                        keyname:"opt_5"
                    },
                    opt_6:{
                        name:null,
                        key:['requiredFunction'],
                        msg:['Please type opt'],
                        keyname:"opt_6"
                    }
                    
                },
                errors: [],
    
                }
            },
            methods: {
            handleOtp() {
                //user/forgot/password/otp/validation
                console.log(this.phone_number);
                this.validation = [];
                this.errors = [];
                this.validationallform(this.inputopt);
    
                var checkvalidtion = this.checkvalidationarray(this.validation);
                if (checkvalidtion) {
                    console.log(this.user_id);
                    var otp_valu = this.inputopt.opt_1.name+this.inputopt.opt_2.name+this.inputopt.opt_3.name+this.inputopt.opt_4.name+this.inputopt.opt_5.name+this.inputopt.opt_6.name;
                    this.global_ver_Post('user/forgot/password/otp/validation?otp='+otp_valu+'&email='+this.user_email).then((result) => {
                        console.log(result);									
                        if(result.data.status == true){
                           
                            this.closeModal();
                            //this.$router.push({ name: 'twosetpauthconfirm' })
                            this.setvalueinsessiosstroage('response_id',this.user_id);
                            this.$router.push({ name: 'forgetpassword', params:{type:1} })
                        }
                        else{
                            this.errors.push(result.data.statusMessage);
                            localStorage.clear();
                        }
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
                }
                else {
                    console.log("submitting");
                }
            
            },
            change_focuse: function(e){
                const value_op = e.target.value;
                var correct_iput = this.validnumbre(value_op);
                var empty_check = this.requiredFunction(value_op);
                if(correct_iput && empty_check && value_op.length <=1){
                var element_id = e.currentTarget.getAttribute('id');
                element_id = element_id.replace("parent-opt_", "");
                element_id = parseInt(element_id)+1
                if(element_id < 7){
                document.getElementById("parent-opt_"+element_id).focus();
                }
                }
                else{
                    e.target.value = '';
                }
            },
        closeModal: function(){
          var get_optel = document.querySelector("#close_modal"); 
                        get_optel.click();
        }
    
        }   
        
    }
    </script>