<template>
    <section class="explore-app-section bg-image">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="user-profile-section">
                        <div class="notifications-settings">
                            <form class="row g-3 needs-validation" novalidate="" data-select2-id="select2-data-5-si06">

                                <div class="notifications-mute">
                                    <div class="form-check form-switch ">
                                        <label class="form-check-label" for="flexSwitchCheckChecked">
                                            <p>Mute all push notifications</p>
                                            <small class="off">Off</small> <span class="mute-done">Until 25, Feb 2022 ;
                                                03.00 pm</span>
                                        </label>
                                        <input class="form-check-input" type="checkbox" id="mute">
                                    </div>
                                </div>

                                <div class="mute-time mt-4">
                                    <h5>Mute all push notifications</h5>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="hours">
                                        <label class="form-check-label" for="hours"> 8 hours</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="week">
                                        <label class="form-check-label" for="week">1 Week</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="month">
                                        <label class="form-check-label" for="month">1 Month</label>
                                    </div>

                                    <div class="grid-box mt-4">
                                        <a href="#success" class="btn btn-warning" type="submit">Submit</a>
                                    </div>
                                </div>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </section>
</template>   
   
<script>
export default {
    name: 'Notification_setting'

}
</script>