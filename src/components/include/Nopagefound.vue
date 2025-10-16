<template>
    <section class="my-activity-list-details-view bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="my-activity-details-box">
                        <div class="successful text-center">
                            <img src="../../assets/image/icons/submited.svg" alt="" class="img-fluid">
                            <div class="mt-3">
                                <h4><strong>No Page found</strong></h4>
                                <p>No Page found</p>
                                <p>No Page found</p>
                            </div>

                            <div class="grid-button mt-4">
                                 <router-link to="/" class="btn btn-secondary" type="button">Back to Home</router-link>
                            </div>
                        </div>
                    </div><!-- end-->
                </div>
            </div>

        </div>
    </section>
</template>
<script>
export default {
    name: 'No_page_found',
   
}
</script>