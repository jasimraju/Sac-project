<template>

    <section class="explore-app-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="user-profile-section">

                        <div class="notifications-list" v-for='(notification, index) in notifications' :class="index > 10 ? 'd-none' : ''"  :data-index="index" :key="notification.id">
                            <div class="notification-content"  >
                                <div class="notifi-icons">
                                    <span :class="!notification.redStatus?'notifi-active':'notifi-view'" @click="notification_read(notification.notificationId)"> <i class="bi bi-bell-fill"></i> </span>
                                    
                                    <span class="active-dot-notifi" v-if="!notification.redStatus"><i class="fas fa-circle"></i></span>
                                </div>
                                <div class="content">
                                    <div class="date">{{ notification.createdDate }}</div>
                                    <h4 class="title">{{ notification.message }}</h4>
                                    <p>{{ notification.description }}</p>
                                </div>
                            </div>

                            <div class="action">
                                <span @click="notification_del(notification.notificationId)"><i class="fas fa-trash-alt"></i> Remove</span>
                            </div>
                        </div>

                      
                      
                    </div>
                    <div class="more-btn">
								<button class="btn btn-secondary" @click="remove_display" data-remove-class="d-none" data-class="notifications-list">View All Notification</button>
							</div>
                </div>
            </div>
        </div>
    </section>
</template>   
   
<script>
export default {
    name: 'Notification_view',
    data(){
    return {
      notifications: [],

    }
  },
  computed: {
    showclass: function(loop_number) {
		
		var display = (loop_number > 10 ?' d-none':'');
	
        return display;
    }
},
    created() {
        this.user_id = this.getuserid();
        
        this.globalGetreauth("notification").then((result_other) => {
            this.notifications = result_other.data;
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
                this.set_notification_number(0)
    },
    methods:{
        notification_del:function(notid){
            var nottification_id = notid;
            var postdata ={};
            this.globalpostauth('notification/delete/'+nottification_id,postdata).then((result) =>{
                console.log(result);
               this.$router.go();
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
        },
        notification_read:function(notid){
            var nottification_id = notid;
            var postdata ={};
            this.globalpostauth('notification/status/read/'+nottification_id,postdata).then((result) =>{
                console.log(result);
                this.$router.go();
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
        },
        remove_display(e){
            
		var morebutton = e.currentTarget;
		var data_class = morebutton.getAttribute("data-class"); 
		var data_remvoe_class = morebutton.getAttribute("data-remove-class"); 
		var event_class = document.querySelectorAll('.'+data_class);
		for (var i = 0; i < event_class.length; ++i) {
			var item = event_class[i]; 
			item.classList.remove(data_remvoe_class);
		}
		morebutton.classList.add(data_remvoe_class);
	
		
	}

    }

}
</script>