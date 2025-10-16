<template>
    <div class="user-view-register text-center">
        <img src="../../assets/image/icons/success.svg" class="img-fluid" alt="">
        <h3>Email Verification <br />Successful</h3>
        <p>Please wait while we redirect you back to your account. </p>
    </div>
</template>   
<script>
export default {
    name: 'Verify_email',
    created() {
        //setTimeout(1000,this.$router.push({ name: 'home' }))
    }

}
</script>