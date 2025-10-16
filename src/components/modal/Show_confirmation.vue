<template>
  <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header add-note-title">
                                                </div>
                                                <div class="modal-body">
                                                    <div class="text text-center">
                                                        <h3>{{ title }}</h3>
                                                        <p>{{ description }}</p>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal" :id="close_id">Cancel</button>
                                                        <span   type="button" @click="$parent.request_for_data_withdrow();" class="btn btn-warning">Request now</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
</template>
<script>

export default {
name: 'Show_confirmation_show',
props: {
    title:String,
                description:String,
                modal_action:String,
                close_id:String
	},

methods: {

closeModal: function(){
var get_optel = document.querySelector("#close_modal"); 
get_optel.click();
},
},

}
</script>