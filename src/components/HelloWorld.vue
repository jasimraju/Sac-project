<template>
      
    <section class="login-section">
    <div class="container-fluid">
      <div class="row">
      <div class="col-lg-5 left-sidebar-bg">
          <div class="row">
            <div class="left-sidebar">
              <div class="logo">
                <a href=""><img class="img-fluid" src="../assets/image/logo/logo.png" alt="N/A"></a>
              </div>

              <div class="left-side-slider">
                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div class="carousel-inner">

                    <div class="carousel-item active" data-bs-interval="10000">
                      <div class="content">
                        <h2>Investments with <span>SAC CAPITAL</span></h2>
                        <h4>IPO, Secondary Placements Fully licensed by the Monetary Authority of Singapore to conduct Dealing in Securities and Advising on Corporate Finance</h4>
                      </div>
                    </div>

                    <div class="carousel-item" data-bs-interval="10000">
                     <div class="content">
                        <h2>Investments with <span>SAC CAPITAL</span></h2>
                        <h4>IPO, Secondary Placements Fully licensed by the Monetary Authority of Singapore to conduct Dealing in Securities and Advising on Corporate Finance</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-7 ">
          <div class="row">
            <div class="right-sidebar">
            <div class="get-help text-end">
              <h6>Having troubles?<a href=""> Get Help</a></h6>
            </div>
            <div class="right-sidebar-login-card">
              <div class="right-sidebar-register-conten">
                <div class="user-view-register">
                  <h3>Please provide your contact details</h3>
                  <p>Your contact details will be used for all further communication from SAC Capital. We are committed to keeping your contact details confidential. We will not provide your personal information to any third party individual or company.</p>
                  <div class="login-form">
                    <form class="row mt-4">
                      <div class="mb-3">
                        <input type="text" class="form-control" id="company-name" placeholder="Enter Your Company Name">
                      </div>
                      <div class="mb-3">
                        <input type="text" class="form-control" id="name" placeholder="Enter Your Full Name">
                      </div>
                      <div class="mb-3">
                        <input type="number" class="form-control" id="email" placeholder="Enter Your Phone Number">
                      </div>
                      <div class="mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Enter Your Email Address">
                      </div>
                      <div class="mt-4 mb-3">
                        <a   href="#authentication" class="btn btn-warning bt-ms" data-bs-toggle="modal">SUBMIT</a>
                      </div>
                      <p>By clicking ‘Submit’ you agree for us to contact you.</p>
                    </form>
                  </div>
                </div>
              </div>
              <div class="a-i-apps mt-5">
                <a href="#"><img class="img-fluid" src="../assets/image/icons/g-ios.png"></a>
                <a href="#"><img class="img-fluid" src="../assets/image/icons/android-app.png"></a>
              </div>

            </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


