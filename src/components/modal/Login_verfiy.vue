<template>   
    <div class="modal fade" id="notification-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content notice">
            <div class="modal-header add-note-title">Notice
            </div>
            <div  class="modal-body">
                <div>Please email us at</div>
                <div> <a href="mailto:enquiry@saccapital.com.sg">enquiry@saccapital.com.sg</a></div>
                <div>to change personal Information</div>
            </div>
            <div class="modal-footer d-none">
							<button type="button" class="btn btn-secondary" id="close_modal"
								data-bs-dismiss="modal">Cancel</button>
							
						</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
name: 'Notification_show',
props: {
re_route: String
},

methods: {

closeModal: function(){
var get_optel = document.querySelector("#close_modal"); 
get_optel.click();
},
},

}
</script>