<template>
    <section class="my-document-section bg-image">
        <div class="container">
            <div class="row">
                <div class="my-document d-flex align-items-start">
                    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <router-link :to="{name:'user_doc'}" class="nav-link" :class="($route.name == 'user_doc') ? 'active' : ''"> <img
                                src="../../assets/image/icons/nric.svg" class="img-fluid">NRIC /
                            Passport</router-link>

                            <router-link :to="{name:'subseription'}" class="nav-link" :class="($route.name == 'subseription' || $route.name == 'subseriptiondetails' ) ? 'active' : ''"><img src="../../assets/image/icons/subcription.svg" class="img-fluid">
                            Subscription Form</router-link>

                              <router-link :to="{name:'proof_of_residense'}" class="nav-link" :class="($route.name == 'proof_of_residense') ? 'active' : ''"><img src="../../assets/image/icons/proof.svg" class="img-fluid">Proof of
                            Residence</router-link>

                            <router-link :to="{name:'proof_of_payment'}" class="nav-link" :class="($route.name == 'proof_of_payment') ? 'active' : ''"><img src="../../assets/image/icons/proof-1.svg" class="img-fluid">Proofs of
                            Payment</router-link>

                            <router-link :to="{name:'digitalsin'}" class="nav-link" :class="($route.name == 'digitalsin') ? 'active' : ''"><img src="../../assets/image/icons/proof-3.svg" class="img-fluid">Digital
                            Signature Record</router-link>

                    </div>
                    <div class="tab-content" id="v-pills-tabContent">
                        <Nricpassport v-if="$route.name == 'user_doc'" />
                        <Subseription v-if="$route.name == 'subseription'" />
                        <Financial v-if="$route.name == 'financial'" />
                        <Proof_of_payment v-if="$route.name == 'proof_of_payment'" />
                        <Proof_of_residense v-if="$route.name == 'proof_of_residense'" />
                        <Digitalsin v-if="$route.name == 'digitalsin'" />
                        <Subseriptiondetails v-if="$route.name == 'subseriptiondetails'" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>   
   
<script>
export default {
    name: 'Manage_document',
    components: {
        Nricpassport: () => import("../mydocument/nricpassport.vue"),
        Subseription: () => import("../mydocument/subceription.vue"),
        Financial: () => import("../mydocument/financial.vue"),
        Proof_of_payment: () => import("../mydocument/proof_of_payment.vue"),
        Proof_of_residense: () => import("../mydocument/proof_of_residense.vue"),
        Digitalsin: () => import("../mydocument/digitalsin.vue"),
        Subseriptiondetails: () => import("../Subceription_from/subceription_from.vue")
    },

}
</script>