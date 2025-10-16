<template>
	<div class="col-lg-7 col-md-7">
		<div class="row">
			<div class="right-sidebar">
				<RegHeader />
				<div class="right-sidebar-register-conten">
					<div class="user-view-register">
						<img src="../../assets/image/icons/two-auth.svg" class="img-fluid" alt="">
						<h3>Unlock Investing</h3>
						<p>By regulation, we need more details from you. Help us verify your identity.</p>
					</div>

					<div class="unlock-investing">
						<div class="row">

							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<router-link :to="!compled_data.basic_info ? { name: 'basicinfo' } : false">
									<div class="unlock-invest-box" :class="(compled_data.basic_info == true) ? 'active' : ''">

										<a href="">
											<img src="../../assets/image/icons/basic.svg" alt="">
											<div class="content">
												<h3>Basic Information</h3>
												<p>3 mins ></p>
											</div>
										</a>
									</div>
								</router-link>
							</div>

							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<router-link :to="!compled_data.address ? { name: 'residentialaddress' } : false">
									<div class="unlock-invest-box" :class="(compled_data.address == true) ? 'active' : ''">
										<a href="">
											<img src="../../assets/image/icons/residential.svg" alt="">
											<div class="content">
												<h3>Residential Address</h3>
												<p>3 mins ></p>
											</div>
										</a>
									</div>
								</router-link>
							</div>

							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<router-link :to="!compled_data.financial ? { name: 'financial_reg' } : false">
									<div class="unlock-invest-box" :class="(compled_data.financial == true) ? 'active' : ''">
										<a href="">
											<img src="../../assets/image/icons/financial.svg" alt="">
											<div class="content">
												<h3>Financial Information</h3>
												<p>3 mins ></p>
											</div>
										</a>
									</div>
								</router-link>
							</div>

							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<router-link :to="!compled_data.delaration ? { name: 'declaration' } : false">
									<div class="unlock-invest-box" :class="(compled_data.delaration == true) ? 'active' : ''">
										<a href="">
											<img src="../../assets/image/icons/declaration.svg" alt="">
											<div class="content">
												<h3>Declaration & Agreement</h3>
												<p>3 mins ></p>
											</div>
										</a>
									</div>
								</router-link>
							</div>

						</div><!-- end row -->
					</div><!-- unlock investing -->
					<a href="javascript:void(0)" @click="enent_finish_button" class="btn btn-warning"
						v-if="(compled_data.basic_info && compled_data.address && compled_data.financial && compled_data.delaration)">Finish</a>
				</div><!-- end-->
			</div>
		</div>
	</div>
</template>   
<script>
export default {
	name: 'Unblocking_homepage',
	components: {
		RegHeader: () => import("../RegHeader.vue"),
	},
	data() {
		return {
			compled_data: {
				basic_info: false,
				address: false,
				financial: false,
				delaration: false,

			},
			myinfodata:null
		}
	},
	created() {
		var userdataonelogin = this.getsessionkey('userdata');
		if(this.$route.query.data !=undefined){
		this.myinfodata = decodeURI(this.$route.query.data);
		var check_json = this.isJson(this.myinfodata);
		if(check_json){
			this.setvalueinlocalstroage_all('temp_myinfo',this.myinfodata);

		}
		console.log(this.myinfodata)
	}
    if(userdataonelogin == null){
        var token_json = localStorage.temp_token;
        if(token_json == null){
        this.$router.push('/login');
        }
    }
		var basic_enifo = this.getsessionkey('basicinfo');
		if (basic_enifo != null) {

			this.compled_data.basic_info = true;

		}

		var residentialstore = this.getsessionkey('residentialstore');
		if (residentialstore != null) {
			this.compled_data.address = true;

		}

		var financial = this.getsessionkey('financial_infomation');
		if (financial != null) {
			console.log(financial);
			this.compled_data.financial = true;
		}

		var declartion_aggreement = this.getsessionkey('declartion_aggreement');
		if (declartion_aggreement != null) {
			this.compled_data.delaration = true;

		}
		if(basic_enifo != null && residentialstore != null && financial != null && declartion_aggreement != null){
			var postdata = null;
			this.globalfileupload_oneregistration('user/singpass/manual/1', postdata).then((result) => {
				console.log(result);
			}).catch((error) => {
                console.log(error);
            });
		}



	},
	methods: {
		enent_finish_button:function(){
			localStorage.clear();
			sessionStorage.clear();
			const thanks_mgs = {
                    "title":"Submission Successful",
                    "description": "We have received your request and will notify you on the status of ths appliction within 3 business days. If required, we will contact you for further information or documents to supplement the application.",
                    "other": "If you require any clarfications or assistance, please email us at enquiry@saccapital.com.sg",
                    "link":"login",
                    'button_text':"LOGIN"
                }
                this.setvalueinlocalstroage('thanks_tem',thanks_mgs);
                this.$router.push({ name: 'thanks'})

		}
	}

}
</script>