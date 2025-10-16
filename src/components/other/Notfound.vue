<template>
<img src="../../assets/image/icons/upcoming.svg" alt="n/a">
							<h2 class="mt-4">Oops! We don't have upcoming offerings currently.</h2>
							<p>We will keep you informed on further update via notification. </p>
							<div class="grid-button mt-4">
								<a href="#" class="btn btn-secondary" type="button">Notification Setting</a>
								<a href="#" class="btn btn-warning" type="button">View Completed campaigns</a>
							</div>
                            </template>
<script>
 export default {
        name: 'Notfound_view',
        props: {
            title: String,
            description:String,
            button_one:String,
            button_two:String,
            button_one_url:String,
            button_two_url:String,
          }
    }
</script>