<template>
    <div class="right-sidebar-register-conten">
        <div class="user-register-form">
            <div class="user-view-register text-left">
                <h3>SAC Terms and Conditions</h3>
                <div class="form-check">
                 <input class="form-check-input" type="checkbox" :value="inputdata.treams_condition.keyname" v-model="inputdata.treams_condition.name"  id="parent-declare">
                 
                                <label class="form-check-label " for="declare">  Acknowledgement and Agreement to the <router-link :to="{name:'Trems'}" >SAC Terms and Conditions</router-link></label>
                            </div>
                            </div>
            <div class="mt-4 mb-3">
                <span  class="btn btn-warning bt-ms" @click="checkvalidation">Continue</span>
            </div>
        </div>
    </div><!-- end-->
</template>   

<script>

export default {
    name: 'Investor_view',
   
    data() {
        return {        
            inputdata: {
                treams_condition: {
                    name: false,
                    key: ['requirednotFunction'],
                    msg: ['Employee status field are required'],
                    keyname: "treams_condition",
                    input_type: "checkbox",
                    key_id: 19

                },
            },
        
        }
    },
    created() {

    },
    methods: {
        checkvalidation: function(){
               
            if (this.inputdata.treams_condition.name) {
                console.log('validation');
                this.$router.push({ name: 'singpass'})
            }
           
        }
    }
}
</script>
