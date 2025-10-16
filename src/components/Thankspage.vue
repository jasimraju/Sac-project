<template>
    <div>
        <Header />
        <Slider name="Thanks" />
        <Thanks :details="thank_msg"/>
        <Footer />
    </div>
</template>

<script>

export default {
    name: 'Thanks_page',
    props: {
        msg: String
    },
    data(){return{
        thank_msg:null,
    }},
    components: {
        Header: () => import("./include/Header.vue"),
        Slider: () => import("./include/Otherbanner.vue"),
        Thanks: () => import("./include/Thanks.vue"),
        Footer: () => import("./include/Footer.vue"),


    },
    created(){
        this.thank_msg = this.getlocalkey('thanks_tem');
       
    }
}
</script>