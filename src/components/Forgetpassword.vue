<template>
    <section class="login-section">
        <div class="container-fluid">
            <div class="row">
                <leftside />
                <Forgetpassword v-if="$route.params.type == 1" />
                <Rightside v-else/>

            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Forget_password',
    props: {
        msg: String
    },
    components: {
        Leftside: () => import("./LeftsideSlider.vue"),
        Rightside: () => import("./forgetpassword/Forgetpassword.vue"),
        Forgetpassword: () => import("./forgetpassword/Forget_confirmation.vue"),

    }
}
</script>