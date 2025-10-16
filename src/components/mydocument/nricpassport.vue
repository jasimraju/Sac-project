<template>
<div class="tab-pane fade show active" id="v-pills-nric" role="tabpanel"
aria-labelledby="v-pills-nric-tab">
<div class="document-header-section">
    <h4>NRIC / Passport</h4>
    <a href="#add-new" class="btn btn-warning" data-bs-toggle="modal"><i
            class="fas fa-plus-circle"></i> New Add </a>
</div>

<!-- Modal Start visit -->
<div class="modal fade" id="add-new" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header add-note-title"> <button type="button"
                    class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="uploader-container front">
                    <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="front"
                                        accept=".pdf, .doc, .jpg, .png" id="file-front">
                                    <label for="file-front" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload Front side of NRIC</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_front_name != null">
                                    <p>{{ upload_front_name }} <a href="#"><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                    <a href="javascript:void(0)" class="btn btn-warning mt-4" data-type="front" data-next="back" @click="show_hide_next">Next</a>
                            </div>
                            <div class="uploader-container back d-none">
                                <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="back"
                                        accept=".pdf, .doc, .jpg, .png" id="file-back">
                                    <label for="file-back" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload Back side of NRIC</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_back_name != null">
                                    <p>{{ upload_back_name }} <a href="#"><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                    <a href="javascript:void(0)" class="btn btn-warning mt-4" data-type="back" data-next="passport" @click="show_hide_next">Next</a>
                            </div>
                            <div class="uploader-container passport d-none">
                                <div class="upload-files-container">
                                    <input type="file" @change="uploadhandler" data-type="passport"
                                        accept=".pdf, .doc, .jpg, .png" id="file-upload">
                                    <label for="file-upload" required>
                                        <img src="../../assets/image/icons/file-upload.svg">
                                        <h5>Upload passport</h5>
                                        <p>Required format: pdf / doc / jpg / png</p>
                                    </label>
                                </div>
                                <div class="file-info" v-if="upload_passport_name != null">
                                    <p>{{ upload_passport_name }} <a href="#"><i class="fas fa-trash-alt"></i></a></p>
                                </div>
                    <a href="javascript:void(0)" class="btn btn-warning mt-4" data-type="passport" data-next="front"  @click="show_hide_next">Next</a>
                            </div>
            </div>
        </div>
    </div>
</div>
<!--- end --->

<div class="document-content-section">
    <div class="row">
        <div class="col-lg-6 front" v-if="nricFrontView !=null">
            <div class="document-card">
                <div class="image">
                    <img :src="m_baseUrl+m_version+'file/get/'+nricFrontView" alt=""
                        class="img-fluid">
                </div>
                <div class="content">
                    <div class="img-details">
                        <h5 class="image-name">NRIC-front.jpg</h5>
                       
                    </div>
                    <div class="download">
                        <a :href="m_baseUrl+m_version+'file/'+nricFrontView"><i class="fas fa-arrow-down"></i> Download</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 backend" v-if="nricBackView !=null">
            <div class="document-card">
                <div class="image">
                    <img :src="m_baseUrl+m_version+'file/get/'+nricBackView" alt=""
                        class="img-fluid">
                </div>
                <div class="content">
                    <div class="img-details">
                        <h5 class="image-name">NRIC-back.jpg</h5>
                       
                    </div>
                    <div class="download">
                        <a :href="m_baseUrl+m_version+'file/'+nricBackView"><i class="fas fa-arrow-down"></i> Download</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 passport" v-if="uploadPassport !=null">
            <div class="document-card">
                <div class="image">
                    <img :src="m_baseUrl+m_version+'file/get/'+uploadPassport" alt=""
                        class="img-fluid">
                </div>
                <div class="content">
                    <div class="img-details">
                        <h5 class="image-name">Password.jpg</h5>
                   
                    </div>
                    <div class="download">
                        <a :href="m_baseUrl+m_version+'file/'+uploadPassport"><i class="fas fa-arrow-down"></i> Download</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
    name: 'Manage_document_nrice_passport',
    data(){
        return {
            uploadPassport: null,
             nricFrontView: null,
            nricBackView: null,
            upload_front: null,
            upload_back: null,
            upload_passport: null,
            upload_front_name: null,
            upload_back_name: null,
            upload_passport_name: null,
            upload_front_id: null,
            upload_back_id: null,
            upload_passport_id: null,
        }
    },
    created() {
        this.user_id = this.getuserid();
       
        this.globalGetreauth("userProfile/nric/passports").then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                        this.uploadPassport = userdata.uploadPassport;
                        this.nricFrontView = userdata.nricFrontView;
                        this.nricBackView = userdata.nricBackView;
   
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
            var end_point;
            var end_type;
            var end_postdata;
            this.globalfileupload('file/secure/upload', formData).then((result) => {
                
                this[key] = result.data.response.id;
               
                if (key == "upload_front_id") {
                    end_point = 'userProfile/save/nric/front?saccapitalFileId='+this[key];
                    end_type='post';
                    end_postdata=null;
                    this.data_submit(end_point,end_type,end_postdata);
                }

                if (key == "upload_back_id") {
                    end_point = 'userProfile/save/nric/back?saccapitalFileId='+this[key];
                    end_type='post';
                    end_postdata=null;
                    this.data_submit(end_point,end_type,end_postdata);
                }

                if (key == "upload_passport_id") {
                    end_point = 'userProfile/save/passport?saccapitalFileId='+this[key];
                    end_type='post';
                    end_postdata=null;
                    this.data_submit(end_point,end_type,end_postdata);
                }

            }).catch((error) => {
                console.log(error);
            });
        },
        show_hide_next:function (e){
            var newclassname;
            var type_value = e.currentTarget.getAttribute('data-type');
            var type_value_next = e.currentTarget.getAttribute('data-next');
            console.log(type_value_next);
            if(type_value == 'front'){
                if(this.upload_front !=null){
                this.final_submitfrom(this.upload_front, 'upload_front_id');
            }
                this.add_class_to('uploader-container','d-none');
                const newclass = document.getElementsByClassName(type_value_next);
                     
                     var  len = newclass !== null ? newclass.length : 0;
        var i = 0;
    for(i; i < len; i++) {
        console.log(newclass[i].className)
        newclassname = newclass[i].className.replaceAll("d-none","");
        newclass[i].className = newclassname;
    }

            }

            if(type_value == 'back'){
                if(this.upload_back !=null){
                this.final_submitfrom(this.upload_back, 'upload_back_id');
            }
                this.add_class_to('uploader-container','d-none');
                const newclass = document.getElementsByClassName(type_value_next);
                     
                       len = newclass !== null ? newclass.length : 0;
         i = 0;
    for(i; i < len; i++) {
        console.log(newclass[i].className)
        newclassname = newclass[i].className.replaceAll("d-none","");
        newclass[i].className = newclassname;
    }
            }

            if(type_value == 'passport'){
                if(this.upload_passport !=null){
                this.final_submitfrom(this.upload_passport, 'upload_passport_id');
            }
                this.add_class_to('uploader-container','d-none');
               
                const newclass = document.getElementsByClassName(type_value_next);
                     
                       len = newclass !== null ? newclass.length : 0;
         i = 0;
    for(i; i < len; i++) {
        console.log(newclass[i].className)
        newclassname = newclass[i].className.replaceAll("d-none","");
        newclass[i].className = newclassname;
    }
                     var get_optel = document.querySelector("#close"); 
					get_optel.click();

            }
           
        },
        add_class_to:function(name_class,ext_class_name){
            var buttons = document.getElementsByClassName(name_class),
        len = buttons !== null ? buttons.length : 0,
        i = 0;
    for(i; i < len; i++) {
        buttons[i].className += " "+ext_class_name; 
    }
        },

    data_submit:function(end_point_url,type,post_value=null){
        if(type == 'post'){
           
                //with post data
                this.globalpostauth(end_point_url,post_value).then((result_other) => {
                    console.log(result_other);
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

           
            }else{

                this.globalGetreauth(end_point_url).then((result_other) => {
                    console.log(result_other);
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
    }
       
    }

  
}
</script>
