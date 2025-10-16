<template>
    <div>
      <Header/>
      <Slider :name="$route.name == 'notification' ? 'Notification' : 'Profile'"/>
      <Manageprofile v-if="$route.name=='user_profile'"/>
      <Manageeditpassword v-if="$route.name=='user_edit_password'"/>
      <Notificationsetting v-if="$route.name=='notificationsetting'"/>
      <Notification v-if="$route.name=='notification'"/>
      <Editaddress v-if="$route.name=='user_edit_address'"/>
      <Editemail v-if="$route.name=='user_edit_email'"/>
      <Editnumber v-if="$route.name=='user_edit_number'"/>
      <Footer/>
      <Loginmodal/>
    </div>
</template>

<script>

export default {
  name: 'Ivestment_page',
  props: {
    msg: String
  },
  data(){
    return {
      page_tye: '',

    }
  },

  components: {
    Header: () => import("./include/Header.vue"),
    Slider: () => import("./include/Otherbanner.vue"),
    Manageprofile: () => import("./manage_profile/user_profile.vue"),
    Manageeditpassword: () => import("./manage_profile/change_password.vue"),
    Editaddress: () => import("./manage_profile/edit_address.vue"),
    Editemail: () => import("./manage_profile/edit_email.vue"),
    Editnumber: () => import("./manage_profile/edit_number.vue"),
    Notificationsetting: () => import("./manage_profile/notification_setting.vue"),
    Notification: () => import("./manage_profile/notification_view.vue"),
    Loginmodal: () => import("./modal/Login_signup.vue"),
    Footer: () => import("./include/Footer.vue"),
},
created() {
 var loginstatus = this.checkloginstatus();
 if(!loginstatus){
  this.$router.push({ name: 'login'});
 }
}
}
</script>