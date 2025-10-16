
 <template>
 <div class="user-view-register text-center">
    <img src="../../assets/image/icons/success.svg" class="img-fluid" alt="">
    <h3>Submission Successful</h3>
    <p>We have received your request and will contact you within 3 business days.</p>
    <p>If you have not heard from us (after more than 3 working days) <br/>
        or you have changed your mind, please email us at</p>
    <p><a href="mailto:enquiry@saccapital.com.sg">enquiry@saccapital.com.sg</a></p>

    <div class="grid-button mt-4">
        <router-link :to="{name:'home'}" class="btn btn-warning" type="button">Done</router-link>
    </div>
</div>
 </template>

<script>
export default {
   name: 'Submission_success',
   created() {
    
   }

}
</script>