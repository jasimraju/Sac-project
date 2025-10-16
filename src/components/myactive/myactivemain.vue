<template>
    <section class="my-activity-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3 ">
                    <myactiveleftmenu/>
                </div>
               <subscriptionmain v-if="$route.name == 'myactive'"/>
               <interestinvestment v-if="$route.name == 'interest'"/>
            </div>
        </div>
    </section>
</template>
<script>

export default {
    name: 'MyActive',
    props: {
        msg: String
    },
    components: {
        subscriptionmain: () => import("./subscriptionmain.vue"), 
        myactiveleftmenu: () => import("./myactiveleftmenu.vue"), 
        interestinvestment: () => import("./inerestInvestemt.vue"), 
     
}
}
</script>