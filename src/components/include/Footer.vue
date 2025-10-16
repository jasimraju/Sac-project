<template>
	<section class="footer-section">
		<a id="signup_popup" class="btn btn-warning bt-ms d-none" @click="showmodalview" v-if="!loginstatus"></a>
		<div class="modal fade show block" id="investment-login-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
			aria-hidden="true"  v-if="(!loginstatus) && (shommodal)">
		
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
          <button type="button" class="close" @click="showmodalclose" data-dismiss="modal"><i class="bi bi-x-lg"></i></button>
        </div>
					<div class="modal-header add-note-title">
					</div>
					<div class="modal-body">
						<div class="text text-center">
							<img src="../../assets/image/icons/lock.svg">
							<h3>Sign up to see full listing</h3>
							<router-link :to="{name:'registration'}" class="btn btn-warning mt-4" type="button">Sign Up</router-link>
						</div>
						<div class="note text-center mt-3">

							<p>Have account already? <router-link :to="{name:'login'}">Sign in</router-link> here.</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div class="modal-backdrop-vue" v-if="(!loginstatus) && (shommodal)"></div>
		<div class="container">
			<div class="row">

				<div class="col-lg-2 col-md-2 col-sm-6 col-12">
					<div class="footer-widget">
						<div class="logo">
							<a href=""><img class="img-fluid" src="../../assets/image/logo/logo.png" alt=""
									width="115"></a>
						</div>
						<ul class="social-links">
							<li><a href="https://www.linkedin.com/company/sac-capital-private-limited"><i class="fab fa-linkedin-in"></i></a></li>
							<li><a href="mailto: enquiry@saccapital.com.sg"><i class="fas fa-envelope"></i></a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-6 col-12">
					<div class="footer-widget ">
						<div class="footer-title">
							<h4>Contact Info</h4>
						</div>
						<ul>
							<li>
								<p>1 Robinson Road, #21-00 AIA Tower, Singapore 048542.</p>
							</li>
							<li><a href="#">+6232 3200</a></li>
							<li><a href="#">enquiry@saccapital.com.sg</a></li>

						</ul>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-6 col-12">
					<div class="footer-widget links">
						<div class="footer-title">
							<h4>Legal</h4>
						</div>
						<ul>
							<li>
								<router-link :to="{name:'Disclosure'}">Disclosure Statement</router-link>
							</li>
							<li>
								<router-link :to="{name:'Trems'}">Terms and Conditions</router-link>
							</li>
							<!--<li>
								<router-link :to="{name:'faq'}">FAQs</router-link>
							</li>-->
							<li>
								<router-link :to="{name:'aboutus'}">About SAC</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-6 col-12">
					<div class="footer-widget links">
						<div class="footer-title">
							<h4>Quick Links</h4>
						</div>
						<ul>
							<li>
								<router-link :to="{name:'contact'}">Contact us</router-link>
							</li>
							<li>
								<router-link :to="{name:'privacy'}">Privacy Policy</router-link>
							</li>
							<li>
								<router-link :to="{name:'investment'}">Investments</router-link>
							</li>
							<li>
								<router-link :to="{name:'research'}">Equity Research</router-link>
							</li>
							
							<li>
								<router-link :to="{name:'manage_protfoli'}">Managed Portfolios</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-6 col-12">
					<div class="footer-widget links">
						<div class="footer-title">
							<h4>Customer Care</h4>
						</div>
						<ul>
							<li><a @click="showregmodal('myactive')">My Activity</a></li>
							<li><a @click="showregmodal('user_profile')">Manage User Profile</a></li>
							<li><a @click="showregmodal('user_doc')">My Documents</a></li>
							<li><a @click="showregmodal('user_edit_password')">Change Password</a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-2 col-md-2 col-sm-6 col-12">
					
				</div>

				<div class="footer-widget">
					
				</div>
				<div class="footer-widget">
					<div class="Copyright">
						<p>Copyright &copy; 2024 SAC Capital Private Limited, Singapore.</p>
					</div>
				</div>

			</div>
		</div>
	</section>
</template>   

<script>
export default {
	name: 'Footer_main',
	data(){return {
		loginstatus:false,
		shommodal:false,
	}
},
	created() {
    this.loginstatus = this.checkloginstatus();
  },
  methods: {
	showmodalview:function(){
		this.shommodal = true;
	},
	showmodalclose:function(){
		console.log('test');
		this.shommodal = false;
		var get_optel = document.querySelector("#close_modal");
			get_optel.click();
	},

  }

}
</script>