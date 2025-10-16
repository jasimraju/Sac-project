<template>
    <section class="explore-app-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="user-profile-section">
                        <div class="profile-image">
                            <div class="circle-box">
                                <img class="img-fluid" v-if="imageId == null" src="../../assets/image/icons/retail-user.png" alt="">
                                <img  v-else :src="m_baseUrl+m_version+'file/get/'+imageId" alt="" class="img-fluid">
                                  </div>
                            <div class="upload-file">
                                <input type="file"  @change="uploadhandler"  accept=".jpg, .png" id="file-upload" required="">
                                <label for="file-upload" required="">
                                    <h5>Tap to change<img src="../../assets/image/icons/edit.png"></h5>
                                </label>
                            </div>
                        </div>

                        <div class="user-profile-info">
                            <div class="profile-box">
                                <div class="label">
                                    <h5>Name</h5>
                                </div>
                                <div class="data">
                                    <h4>{{ user_name }}</h4>
                                    
                                </div>
                            </div>
                            <div class="profile-box">
                                <div class="label">
                                    <h5>NRIC/Passport No</h5>
                                </div>
                                <div class="data">
                                    <h4>{{ nric_passport }}</h4>
                                    <a @click="click_notice_edit_by_admin" href="javascript:"><img src="../../assets/image/icons/edit.png"></a>
                                </div>
                            </div>
                            <div class="profile-box">
                                <div class="label">
                                    <h5>Date of Birth</h5>
                                </div>
                                <div  class="data">
                                    <h4>{{ dob }}</h4>
                                    <a @click="click_notice_edit_by_admin" href="javascript:"><img src="../../assets/image/icons/edit.png"></a>
                                </div>
                            </div>
                            <div class="profile-box">
                                <div class="label">
                                    <h5>CDP Securities Account No</h5>
                                </div>
                                <div class="data">
                                    <h4>{{ cdpaccountno }}</h4>
                                    <a @click="click_notice_edit_by_admin" href="javascript:"><img src="../../assets/image/icons/edit.png"></a>
                                </div>
                            </div>
                            <div class="profile-box">
                                <div class="label">
                                    <h5>Phone Number</h5>
                                </div>
                                <div class="data">
                                    <h4>{{ phone_number }}</h4>
                                    <a @click="setlinkroute" data-type="user_edit_number" href="javascript:"><img src="../../assets/image/icons/edit.png"></a>
                                </div>
                            </div>
                            <div class="profile-box">
                                <div class="label">
                                    <h5>Email </h5>
                                </div>
                                <div class="data">
                                    <h4>{{ user_email }}</h4>
                                    <a @click="setlinkroute" data-type="user_edit_email" href="javascript:"><img src="../../assets/image/icons/edit.png"></a>
                               
                                </div>
                            </div>
                            <div class="profile-box">
                                <div class="label">
                                    <h5>Address </h5>
                                </div>
                                <div class="data">
                                    <h4>{{ user_address }}</h4>
                                    <a href="#verify-password"  id="verify-password-show" class="btn btn-warning bt-ms d-none" data-bs-toggle="modal"></a>
                                    <a @click="setlinkroute" data-type="user_edit_address" href="javascript:"><img src="../../assets/image/icons/edit.png"></a>
                                    
                                </div>
                            </div>
                        </div>
                        <a href="#notification-modal"  id="notification-modal-show" class="btn btn-warning bt-ms d-none" data-bs-toggle="modal"></a>
                    <Verfiypassword :re_route="re_route"/>
                    <NotificationModal :re_route="re_route"/>
                    
                    </div>
                </div>
            </div>
        </div>
        
       
    </section>
</template>   
   
<script>
export default {
    name: 'Manage_profile',
    components: {
    Verfiypassword: () => import("../modal/Verfiypassword.vue"),
    NotificationModal: () => import("../modal/NoticeModal.vue"),
    },
    data(){return {
        user_id:false,
		user_name:false,
        nric_passport:false,
        dob:false,
        phone_number:false,
       cdpaccountno:false,
        user_email:false,
        user_address:false,
        re_route:'',
        upload_file:[],
        imageId_link: null,
        upload_filename:[],
        imageId:'',

	}
},
    created() {
        this.user_id = this.getuserid();
        
        this.globalGetreauth("userProfile/details/"+this.user_id).then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                            this.user_name = userdata.usersDetailsBasicInformation.firstName+' '+userdata.usersDetailsBasicInformation.middleName+' '+userdata.usersDetailsBasicInformation.lastName;
							this.nric_passport = userdata.usersDetailsBasicInformation.nricOrPassportNumber;
                            this.dob = userdata.usersDetailsBasicInformation.dateOfBirth;
                            this.phone_number = userdata.mobileNumber;
                            this.cdpaccountno = userdata.usersDetailsBasicInformation.securityAccountNumber;
                            this.user_email = userdata.email;
                            this.imageId = userdata.imageId;
            this.user_address = userdata.usersResidentialAddress.proofOfResidence + ' ' + userdata.usersResidentialAddress.street + userdata.usersResidentialAddress.unitNo + ' ' + userdata.usersResidentialAddress.residenceCountry + ' ' + userdata.usersResidentialAddress.pincode;
            console.log(userdata);
           
   
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
    methods: {
        setlinkroute:function(e){
      
            this.re_route = e.currentTarget.getAttribute('data-type');
            var get_optel = document.querySelector("#verify-password-show"); 
					get_optel.click();
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
                this.file_upload_profile();
        },
        file_upload_profile:function(){
            this.globalfileupload('file/secure/upload', this.upload_file[0]).then((result) => {
                var file_id;
                    file_id =   result.data.response.id;

                //set new file
                //userProfile/save/image
                this.globalpostauth('userProfile/save/image?id='+file_id, null).then((result_por) => {
                    console.log(result_por);
                    this.$router.go(this.$router.currentRoute)
                }).catch((error) => {
                console.log(error);
            });
               //get new image 


            }).catch((error) => {
                console.log(error);
            });
        },
        click_notice_edit_by_admin:function(){
            console.log('tdst');
            var get_optel = document.querySelector("#notification-modal-show"); 
            
					get_optel.click();
        }
    },
    



}
</script>