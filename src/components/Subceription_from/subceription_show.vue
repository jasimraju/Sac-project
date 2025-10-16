<template>
    <div class="subcription-sub-card pending-subscription" :class="showclass" >
      
      
        <div class="event-data">
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <td>
                            <p>Subscribed From name</p>
                            
                        </td>
                        <td>
                            <p>{{ subcriptionitems.investmentTitle }} </p>
                           
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="subcription-s-button">
            <span class="btn btn-secondary nav-link" @click="subcription_temp_apply(subcriptionitems)">VIEW DETAILS</span>
        </div>
    </div><!-- end-->
</template>
<script>
export default {
    name: 'Investemnt_short_view',
    props: {
        subcriptionitems: Object
    },
    data() {
        return {
            img_url: this.secret_key,
            investment_status: null
        }
    },     
    computed: {
    showclass: function() {
		
		var display = (this.loop_number > 5 ?' d-none':'');
		
        return display;
    }
},
    created() {
     
console.log(this.subcriptionitems);
    },
    methods: {
        subcription_temp_apply: function(subcriptionitems_details){
            console.log(subcriptionitems_details);
            this.setvalueinlocalstroage('subcriptionitems_qustion', subcriptionitems_details);
     
            this.$router.push({ name: 'subseriptiondetails' })
     
        }
    }
}
</script>