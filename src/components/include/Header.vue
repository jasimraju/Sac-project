<template>
    <section class="header-section">
		<span class="screen-darken"></span>
		<div class="container">
			<div class="mobile-header d-lg-none">
				<div class="logo">
					<router-link to="/">
			<img class="img-fluid" src="../../assets/image/logo/logo.png" alt="N/A"> 
			</router-link>
			</div>
			<div class="mobile-user-wrap">
			<div class="mobile-user-menu">
					
					<ul class="navbar-nav" v-if="userlogin">
					
			<li class="nav-item notifi">
				<router-link :to="{name:'notification'}" class="nav-link"> <i class="bi bi-bell-fill"></i> </router-link>
			<!--<span class="active-dot-notifi"><i class="fas fa-circle"></i></span>-->
			
			<span  v-if="notification_number_value != 0" id="notification-number" >{{ notification_number_value }}</span>
			<span  id="notification-number" v-else class="d-none">0</span>
			</li>
			<li class="nav-item dropdown">
			<a class="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown">
			<img class="user-image rounded-circle" v-if="userprfile.imageId == null" src="../../assets/image/icons/retail-user.png" alt=""> 
			<img class="user-image rounded-circle" v-else :src="m_baseUrl+m_version+'file/get/'+userprfile.imageId" alt="">
			<span class="user-email">{{userprfile.email}}</span>
			</a>
		<ul class="dropdown-menu dropdown-menu-end">
		<li><router-link :to="{name:'myactive'}" class="dropdown-item"> My Activity<span class="active-dot"><i class="fas fa-circle"></i></span></router-link></li>
		<li><router-link :to="{name:'user_profile'}" class="dropdown-item"> Manage User Profile </router-link></li>
		<li><router-link :to="{name:'user_edit_password'}" class="dropdown-item"> Change Password </router-link></li>
		<li><router-link :to="{name:'user_doc'}" class="dropdown-item"> My Documents </router-link></li>
		<li><router-link :to="{name:'notification'}" class="dropdown-item"> Notifications</router-link></li>
		<li><span @click="logout" class="dropdown-item"> Log out</span></li>
		</ul>
		</li>
			</ul>
			<ul class="navbar-nav without-login"  v-else>
						<li class="nav-item">
							<router-link :to="{name:'login'}" class="nav-link btn-login">Log In</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{name:'registration'}" class="nav-link btn-warning">Sign Up</router-link>
						</li>
					</ul>
				</div>
				

				<button data-trigger="navbar_main" class="d-lg-none btn btn-warning mobile-button" @click="showmobilemenu" type="button"> <i class="fas fa-bars"></i> </button>
			</div>
			</div>
			<!-- nav start-->
			<nav id="navbar_main" class="mobile-offcanvas navbar navbar-expand-lg ">
			<div class="container-fluid">
			<div class="mobile-header">
					<div class="logo">
						<router-link to="/">
			<img class="img-fluid" src="../../assets/image/logo/logo.png" alt="N/A"> 
		</router-link>
			</div>
		
			<div class="offcanvas-header">  
			<button class="btn-close float-end" @click="showmobilemenuremove"></button>
			</div>
			</div>
			<ul class="navbar-nav">
			<li class="nav-item active"><router-link :to="{name:'investment'}" class="nav-link">Investments</router-link></li>
			<li class="nav-item"><a href="https://saccapital.com.sg/research" class="nav-link">Equity Research</a></li>
			<li class="nav-item"><router-link :to="{name:'manage_protfoli'}" class="nav-link"> Managed Portfolios  </router-link></li>
			</ul>
			
		<ul class="navbar-nav ms-auto" v-if="userlogin">
			<li class="nav-item notifi">
				<router-link :to="{name:'notification'}" class="nav-link"> <i class="bi bi-bell-fill"></i> </router-link>
			<!--<span class="active-dot-notifi"><i class="fas fa-circle"></i></span>-->
			<span  id="notification-number" class="d-none">0</span>
			</li>
			<li class="nav-item dropdown">
			<a class="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown">
				<img class="user-image rounded-circle" v-if="userprfile.imageId == null" src="../../assets/image/icons/retail-user.png" alt=""> 
			<img class="user-image rounded-circle" v-else :src="m_baseUrl+m_version+'file/get/'+userprfile.imageId" alt=""> {{userprfile.email}}
			</a>
		<ul class="dropdown-menu dropdown-menu-end">
		<li><router-link :to="{name:'myactive'}" class="dropdown-item"> My Activity<span class="active-dot"><i class="fas fa-circle"></i></span></router-link></li>
		<li><router-link :to="{name:'user_profile'}" class="dropdown-item"> Manage User Profile </router-link></li>
		<li><router-link :to="{name:'user_edit_password'}" class="dropdown-item"> Change Password </router-link></li>
		<li><router-link :to="{name:'user_doc'}" class="dropdown-item"> My Documents </router-link></li>
		<li><router-link :to="{name:'notification'}" class="dropdown-item"> Notifications</router-link></li>
		<li><span @click="logout" class="dropdown-item"> Log out</span></li>
		</ul>
		</li>
			</ul>
			<ul class="navbar-nav ms-auto without-login" v-else>
					<li class="nav-item active"><router-link :to="{name:'login'}" class="nav-link btn-login">Log In</router-link></li>
					<li class="nav-item"><router-link :to="{name:'registration'}" class="nav-link btn-warning">Sign Up</router-link></li>
				</ul>
			</div> 
			</nav>
		</div>
	</section>
    </template>   

            <script>
                export default {
                name: 'Header_main',
				data(){
					return {
						userlogin:false,
						userprfile:[],
						userauth:[],
						notification_number:null

					}
				},
				created() {
					this.checkuserlogin();
					if(this.userlogin){
						this.userauth = this.getlocalkey('userdata');
						this.globalGetreauth('userProfile/details/'+this.userauth.id).then((result) =>{
            const responsedata = result.data;
        this.userprfile = responsedata;
		
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
					}
					
				},
				methods:{
					logout:function(){
						window.localStorage.clear();
					
						if(this.$route.name == 'home'){
							//location reload
							window.location.reload(); 
						}
						else{
							//back home
							this.$router.push('/');
						}
						
					},
					showmobilemenu:function(e){
						var morebutton = e.currentTarget;
					var data_trigger = morebutton.getAttribute("data-trigger"); 
					var element = document.getElementById(data_trigger);
					let element_c = document.querySelector(".screen-darken");
					element.classList.add('show');
						document.body.classList.add("offcanvas-active");
						element_c.classList.add('active');
					},
					showmobilemenuremove:function(){
						var element = document.getElementById('navbar_main');
						let element_c = document.querySelector(".screen-darken");
						element.classList.remove('show');
						element_c.classList.remove('active');
						document.body.classList.remove("offcanvas-active");
					}
				}
                }
                </script>