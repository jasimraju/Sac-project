<template>
<div class="my-activity-left-side">
    <ul class="activity-nav">
        <li :class="($route.name == 'myactive')?'active':''"><router-link :to="{name:'myactive'}"><img class="img-fluid"
                    src="../../assets/image/icons/m-a-subcription.svg"
                    >Subscriptions</router-link></li>
        <li :class="($route.name == 'interest')?'active':''"><router-link :to="{name:'interest'}"><img class="img-fluid" src="../../assets/image/icons/investment.svg"
                    >Interested Investments</router-link></li>
       
    </ul>
</div>
</template>
<script>

export default {
    name: 'MyActiveleftmenu_page',
    props: {
        msg: String
    },

}
</script>