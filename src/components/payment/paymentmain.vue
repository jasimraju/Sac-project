<template>
    <section class="archive-section investment-list-details-view">
        <div class="container">


          
                <paymentstart v-if="!$route.params.type" />
                <paymentstartquestion v-if="$route.params.type == 2" />
                <makepayment v-if="$route.params.type == 1" />
                <chequepayment v-if="$route.params.type == 3" />
                <bankdetails v-if="$route.params.type == 4" />
                <paynowpayment v-if="$route.params.type == 5" />
                <uploadpayment v-if="$route.params.type == 6" />



        </div>
    </section>
</template>    

<script>
export default {
    name: 'Subscription_description',
    props: {
        subscription_details_data: Object
    },
    components: {
        paymentstart: () => import("./paymentstart.vue"), 
        makepayment: () => import("./makepayment.vue"),
        paymentstartquestion: () => import("./paymentquestion.vue"),
        chequepayment: () => import("./cheque.vue"),
        bankdetails: () => import("./bankdetails.vue"),
        paynowpayment: () => import("./paynowpayment.vue"),
        uploadpayment: () => import("./uploadpayment.vue"),
       
},
    data() {
        return {
            upload_singure: null,
            upload_singure_name: null
        }
    },
    methods: {
        uploadhandler: function (e) {
            var file_value = e.currentTarget;
            var formData = new FormData();

            formData.append("multipartFile", file_value.files[0]);
            const path = file_value.value
            const fileName = path.split(/(\\|\/)/g).pop();
            var type_value = e.currentTarget.getAttribute('data-type');
            if (type_value == 'front') {
                this.upload_singure_name = fileName;
                this.upload_singure = formData;

            }

        }
    }


}
</script>