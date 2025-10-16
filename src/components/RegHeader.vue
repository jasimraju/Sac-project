<template>

     <div class="get-help text-end">
                    <h6>Having troubles?
                <router-link :to="{name:'contact'}">Get Help</router-link>
            </h6>
            </div>
    </template>

<script>
    export default {
    name: 'RegHeader',
    props: {
      msg: String
    }
    

    }
    </script>