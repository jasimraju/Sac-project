<template>
                            <div class="modal fade" id="verify-password" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header add-note-title">
                                    </div>
                                    <div class="modal-body">
                                        <form  @submit.prevent="handlepasswordverfiy" @keydown.enter="$event.preventDefault()">
                                            <div class=" mb-3">
                                                <label class="form-label">Keep your account safe, please verify your
                                                    identity by entering your password. </label>
                                              
                                                    <input class="form-control" :type="fieldType" id="parent-password" v-model="inputdata.password.name"
									placeholder="Current Password">
                                            </div>
                                            <div class="error-box" v-if="errors.length">
							<p><i class="fas fa-times-circle"></i>{{ errors[0] }}</p>
						</div>
                                            <div class="text-center">
                                                <button type="submit" class="btn btn-warning"
                                                   >Continue</button>
                                                <h6 class="mt-4"><span class="forgot-password" @click="forget_Password">Forgotten
									password</span></h6>
                                                <button type="button" class="btn btn-secondary d-none" id="close_modal" data-bs-dismiss="modal"></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
    </template>
    <script>
    import Validation from '../../Validation'
        export default {
        name: 'Verfiypassword_show',
        mixins: [Validation],
        props: {
            re_route: String
          },
        data(){
            return {
                inputdata: {
            password:{
					name:null,
					key:['requiredFunction'],
					msg:['Password field are required'],
					keyname:"password"
				}
            },
        fieldType: "password",
        errors: [],
        }
        },
     
        methods: {
            handlepasswordverfiy() {
                
			this.validation = [];
			this.errors = [];
			this.validationallform(this.inputdata);

			var checkvalidtion = this.checkvalidationarray(this.validation);
			if (checkvalidtion) {
				var postdata = this.inputdata.password.name;
                console.log(postdata);
                this.globalpostauth('userProfile/password/verification?password='+postdata, postdata).then((result) => {
                    console.log(result);
                    if(result.data.status== true){
                        this.closeModal();
                        this.$router.push({ name: this.re_route })
                    }
                }).catch((error) => {
					if (error.response) {
						//do something
                        this.errors.push('Please Type correct Password');
						//this.errors.push(error.response.data.message);
					}
					else if (error.request) {
						//do something else
                        this.errors.push('Please Type correct Password');
						
					} else if (error.message) {
						//do something other than the other two
                        this.errors.push('Please Type correct Password');
					}
				});
            }
            },
            closeModal: function(){
      var get_optel = document.querySelector("#close_modal"); 
					get_optel.click();
    },
    forget_Password:function(){
            var get_optel = document.querySelector("#close_modal"); 
					get_optel.click();
                    this.$router.push({ name: 'forgetpassword'});
        }
        },
       
           
        }
        </script>