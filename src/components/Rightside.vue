<template>
      
      <div class="col-lg-7 ">
          <div class="row">
            <div class="right-sidebar">
              <RegHeader/>
            <div class="right-sidebar-login-card">
              <div class="right-sidebar-register-conten">
                <div class="user-view-register">
                  <h3>Please provide your contact details</h3>
                  <p>Your contact details will be used for all further communication from SAC Capital. We are committed to keeping your contact details confidential. We will not provide your personal information to any third party individual or company.</p>
                  <div class="login-form">
                    <form class="row mt-4">
                      <InputElement type="text" placeholder="Enter Your Company Name"  name="company_name" />
                      <InputElement type="text" placeholder="Enter Your Full Name"  name="name" />
                      <InputElement type="number" placeholder="Enter Your Phone Number"  name="phone" />
                      <InputElement type="email" placeholder="Enter Your Email Address"  name="email" />
                        
                      <div class="mt-4 mb-3">
                        <a   href="#authentication" class="btn btn-warning bt-ms" data-bs-toggle="modal">SUBMIT</a>
                      </div>
                      <p>By clicking ‘Submit’ you agree for us to contact you.</p>
                    </form>
                  </div>
                </div>
              </div>
              <Android/>

            </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
name: 'Login_Reg',
props: {
  msg: String
},
components: {
    Android: () => import("./AndroidLink.vue"),
    RegHeader: () => import("./RegHeader.vue"),
    InputElement: () => import("./InputElement.vue")
    }

}
</script>



