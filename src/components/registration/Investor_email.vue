<template>
    <div class="col-lg-7 col-md-7 ">
        <div class="right-sidebar">
            <RegHeader />
            <div class="right-sidebar-register-conten">
                <div class="user-register-form" v-if="$route.params.id == 1 || $route.params.id == 2">
                    <h3 v-if="$route.params.id == 2" >Accredited Investor Create Account</h3>
                    <h3 v-if="$route.params.id == 1" >Retail Investor Create Account</h3>
                    <form class="row mt-4" @submit.prevent="handleregistration" @keydown.enter="$event.preventDefault()">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="parent-email" placeholder="Email Address" v-model="inputdata.email.name">
                        </div>

                        <div class="input-group mb-3">
                            <input class="form-control" :type="fieldType" id="parent-password" placeholder="Password" v-model="inputdata.password.name" @keyup="passwordonkeyvalidation(rules,$event)" @keydown="passwordonkeyvalidation(rules,$event)">
                            <button class="btn btn-outline-secondary" type="button"  @click="changepassword(1)"><i
                                    class="password-show fas fa-eye"></i></button>
                        </div>

                        <div class="password-validation-status">
                            <p><strong>Password should contain</strong></p>
                            <ul v-if="rules.length">
                                <li v-for="description in rules"  v-bind:key="description"><i class="fas fa-times-circle" :id="'msg_'+description['id']"></i>{{description['description']}}</li>                               
                            </ul>
                        </div>

                        <div class="input-group mb-3">
                            <input class="form-control" :type="fieldType_confirm" id="parent-confirm_password" placeholder="Confirm Password" v-model="inputdata.confirm_password.name">
                            <button class="btn btn-outline-secondary" type="button" @click="changepassword(2)"><i
                                    class="password-show fas fa-eye"></i></button>
                        </div>

                        <div class="error-box" v-if="errors.length">
									<p v-for="error in errors" v-bind:key="error"><a href="#"><i class="fas fa-times-circle"></i></a>{{ error }}</p>
								</div>
								
                        <div class="grid-button mt-4">
                            <button class="btn btn-warning bt-ms" >Continue</button>
                                            </div>
                    </form>

                </div>
                <div v-else>
                    <Reg_company/>
                </div>
                <Android />
            </div><!-- end-->

        </div><!-- right-sidebar --->
    </div>

</template>   

<script>
import Validation from '../../Validation'
export default {
    name: 'Investor_view',
    mixins: [Validation],
    components: {
        Android: () => import("../AndroidLink.vue"),
        RegHeader: () => import("../RegHeader.vue"),
        Reg_company: () => import("./Contact_details_co.vue"),
    },
    data() {
        return {
        inputdata: {
				email:{
					name:null,
					key:['requiredFunction','validEmail'],
					msg:['Email field are required','Please type valid email'],
					keyname:"email",
                    
				},
				password:{
					name:null,
					key:['requiredFunction','passwordvalidation'],
					msg:['Password field are required','Invalid password'],
					keyname:"password",
                    pattern:null,
                    key_ser:1
                   
				},
                confirm_password:{
					name:null,
					key:['requiredFunction','checkConfirmpassword'],
					msg:['Confirm Password field are required','Password not match'],
					keyname:"confirm_password",
                    pattern:"password",
                    
				}
			},
			errors: [],
			validation:[],
			fieldType: "password",
            fieldType_confirm: "password",
			userlogin:false,
            response_value:null,
            rules:[],
            token:null,
            code:null,
            nric:null
        }
    },
    created() {
	
    this.globalGetre('/v1/user/'+this.$route.params.id).then((result) =>{
         const rolesdata = result.data;
     this.response_value = rolesdata;
     this.rules = this.response_value[0].passwordValidations;
     this.inputdata.password.pattern = this.response_value[0].passwordValidations;
        if(this.$route.query.number !=undefined){
            
            this.token = decodeURI(this.$route.query.data);
            this.code = decodeURI(this.$route.query.code);
            this.nric = decodeURI(this.$route.query.number);
            console.log( this.token);
            console.log( this.code);
            console.log( this.nric);
            this.setvalueinlocalstroage_all('temp_nric',this.nric);
        }
     

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
 methods: {
    changepassword: function(type){
        if(type == 1){
            this.fieldType =  this.showpassword(this.fieldType);
    }
    else{
        this.fieldType_confirm =  this.showpassword(this.fieldType_confirm);
    }
    },
    handleregistration: function () {
        this.validation = [];
			this.errors = [];
			this.validationallform(this.inputdata);

			var checkvalidtion = this.checkvalidationarray(this.validation);
			if (checkvalidtion) {
                var postdata = {
                    userRoleId:this.$route.params.id,
					email: this.inputdata.email.name,
					password: this.inputdata.password.name,
                    confirmPassword: this.inputdata.confirm_password.name,
				};
                var end_point = '/v1/user';
                if(this.token !=null && this.code !=null && this.nric != null){
                    postdata = {
                    userRoleId:this.$route.params.id,
					email: this.inputdata.email.name,
					password: this.inputdata.password.name,
                    nric: this.nric,
                    accessToken: this.token,
				}; 
                end_point = '/v1/auth/user/singpass/register';
                }
				this.globalPost(end_point, postdata).then((result) => {
					//console.log(result);
                    var response_val = result;
                    console.log(response_val);
                    if(response_val.data.status){
                        //save jwt token
                        this.saveregistration_token(response_val.data.response);
                        //response_val.response["role_id"] = this.$route.params.id;
                       // response_val.response["secrect_key"] = this.encryptdata(this.inputdata.password.name);
                      //  this.setvalueinsessiosstroage('reg_details_without_verify',response_val.response);
                      if(this.token !=null && this.code !=null && this.nric != null){
                        var postdata_email = this.inputdata.email.name;
                        this.globalgetdata('user/resendEmail?email='+postdata_email).then((result) => {
                    console.log(result);
                    
                  
                }).catch((error) => {
                    if (error.response) {
                        //do something	

                        this.errors.push(error.response.data.statusMessage);
                    }
                    else if (error.request) {
                        //do something else						
                    } else if (error.message) {
                        //do something other than the other two
                    }
                });
                      }
                        this.$router.push({ name: 'investor_personinfo_confirm' });
                    }else{
                        console.log('Registration wrong');
                    }
					}).catch((error) => {
					if (error.response) {
						//do something
                        if(error.response.data.message !=undefined){
                            this.errors.push(error.response.data.message);
                        }else{
						this.errors.push(error.response.data.statusMessage);
                    }
					}
					else if (error.request) {
						//do something else
                        if(this.$route.query.number !=undefined){
                            this.errors.push(error.response.data.message);
                        }else{
						this.errors.push(error.request.data.statusMessage);
                    }
					} else if (error.message) {
                     
						//do something other than the other two
                        //this.errors.push(error.message.data.statusMessage);
					}
				});
            }
    }
 }

}
</script>
