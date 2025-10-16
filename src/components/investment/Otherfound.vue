<template>
    <div class="investment-not-found text-center">
        <img src="../../assets/image/icons/upcoming.svg" alt="n/a">
        <h2 class="mt-4">{{ title }}</h2>
        <p>{{ description }} </p>
        <div class="grid-button mt-4">
            <router-link :to="{ name: button_two_url }" class="btn btn-secondary" type="button">{{ button_two }}</router-link>
            <router-link :to="{ name: button_one_url }" class="btn btn-warning" type="button">{{ button_one }}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Notfound_view',
    props: {
        title: String,
        description: String,
        button_one: String,
        button_two: String,
        button_one_url: String,
        button_two_url: String,
    }
}
</script>