<template>
     <section class="my-activity-list-details-view bg-image">
        <div class="container">
            <pendingsubscriptionstart v-if="!$route.params.id" />
            <pendingsubscriptionstarttwo v-if="$route.params.id == 1" />
            <pendingsubsription v-if="$route.params.id == 2" />
        </div>
    </section>
</template>    

<script>
export default {
    name: 'Pending_subcription',
     components: {
        pendingsubscriptionstart: () => import("./form_start.vue"),
        pendingsubscriptionstarttwo: () => import("./form_two.vue"),  
        pendingsubsription: () => import("./pendingsubscriptionstart.vue"), 

       
},
methods: {

}


}
</script>