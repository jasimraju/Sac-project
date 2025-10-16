<template>
    <div>
        <Header />
        <Slider name="No Page" />
        <Thanks />
        <Footer />
    </div>
</template>
<script>

export default {
    name: 'No_page',
    props: {
        msg: String
    },
     components: {
        Header: () => import("./include/Header.vue"),
        Slider: () => import("./include/Otherbanner.vue"),
        Thanks: () => import("./include/Nopagefound.vue"),
        Footer: () => import("./include/Footer.vue"),


    },
    created(){
        console.log('tssfsdf');
    }
}
</script>