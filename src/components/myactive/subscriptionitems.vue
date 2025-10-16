<template>
                    <div class="subcription-card completed">
                    </div><!-- end-->
               
</template>
<script>

export default {
    name: 'subcriptionitems_loop',
    data() {
        return {
            loginstatus: false,
            subscription_invesment_in_process: [],
            subscription_invesment_completed: [],
        }
    },
    props: {
        msg: String,
        subcriptionitems: Object
    }
}
</script>