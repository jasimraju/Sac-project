<template>
	<div class="col-lg-7 ">
		<div class="row">
			<div class="right-sidebar">
				<RegHeader />
				
				<h6>Have account already? <router-link :to="{name:'login'}">Sign In</router-link> here.</h6>
				<div class="user-section-title">
					<h3>Who are you? </h3>
					<h6>Help us to understand you more</h6>
					<span>Select one role</span>
				</div>
				<div class="user-role-section">
					<div class="row">
						<div class="col-lg-6 col-md-6 col-sm-6 col-12" v-for='(role) in response' :key="role.id">
							<div class="user-role-box left">
								<router-link :to="{name:'investor_reg', params: {id:role.id }}">
									<div class="img">
										<img class="img-fluid" :src="m_baseUrl+m_version+'file/get/'+role.thumbnailId">
									</div>
									<div class="content">
										<h3>{{role.name}}</h3>
									</div>
									<div class="arrow-click">
										<img class="img-fluid" src="../assets/image/icons/user-arrow.png">
									</div>
								</router-link>
								<div class="role-description">
									<h5>{{role.title}}</h5>
									<p v-html="role.description">
										
									</p>
								</div>
							</div>
						</div>
						<Android />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>


export default {
	name: 'Login_innerview',
	props: {
		msg: String
	},
	components: {
		Android: () => import("./AndroidLink.vue"),
		RegHeader: () => import("./RegHeader.vue"),
	},
	created() {
		
		this.globalGet('/v1/user');
	}

}
</script>