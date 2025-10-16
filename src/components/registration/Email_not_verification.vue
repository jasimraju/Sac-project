<template>
    <div>
<div class="user-view-register text-center">
								<img src="../../assets/image/icons/worng.svg" class="img-fluid" alt="">
								<h3>Something went wrong</h3>
								<p>The verification link have expired. Please try again!</p>
							</div>

							<div class="grid-button mt-4 text-center">
								<router-link :to="{name:null}">No, go back </router-link>
								<router-link :to="{name:null}">Try Again</router-link>
							</div>
                        </div>
</template>   
<script>
export default {
   name: 'Not_verify_email',
   created() {
    
   }

}
</script>