<template>
    <div class="row">
        <div class="col-md-10 offset-md-1">
            <div class="investment-list-details">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-overview-tab" data-bs-toggle="pill"
                            data-bs-target="#overview" type="button" role="tab" aria-controls="pills-overview"
                            aria-selected="true">Overview</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-timeline-tab" data-bs-toggle="pill" data-bs-target="#timeline"
                            type="button" role="tab" aria-controls="pills-timeline" aria-selected="false">Timeline</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-statistics-tab" data-bs-toggle="pill"
                            data-bs-target="#statistics" type="button" role="tab" aria-controls="pills-statistics"
                            aria-selected="false">Statistics</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-payment-tab" data-bs-toggle="pill" data-bs-target="#payment"
                            type="button" role="tab" aria-controls="pills-payment" aria-selected="false">Payment</button>
                    </li>

                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel"
                        aria-labelledby="pills-overview-tab">
                        <div class="overview">
                            <h3>Company</h3>
                            <div v-html="subscription_details_data.overview"></div>
                        </div>
                    </div>
                    <!-- end all investment--->

                    <div class="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="pills-timeline-tab">
                        <div class="timeline">
                            <h3>Indicative Key Dates</h3>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>Book Building Open Date</p>
                                        </td>
                                        <td>
                                            <h5> {{ subscription_details_data.timeline.openDate }}</h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Book Building Close Date</p>
                                        </td>
                                        <td>
                                            <h5>{{ subscription_details_data.timeline.closeDate }}</h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Allocation Date</p>
                                        </td>
                                        <td>
                                            <h5>{{ subscription_details_data.timeline.allocationDate }}</h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Application and payment start Date</p>
                                        </td>
                                        <td>
                                            <h5>{{ subscription_details_data.timeline.allocationDate }}</h5>
                                        </td>
                                    </tr>
                                    <tr>
												<td>
													<p>Application and Payment Due Date and Time</p>
												</td>
												<td>
													<h5>{{ subscription_details_data.timeline.paymentDate }}
													</h5>
												</td>
											</tr>
                                    <tr>
                                        <td>
                                            <p>Listing Date</p>
                                        </td>
                                        <td>
                                            <h5>{{ subscription_details_data.timeline.listingDate }}</h5>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <!-- end upcomint investment--->
                    <div class="tab-pane fade" id="statistics" role="tabpanel" aria-labelledby="pills-statistics-tab">
                        <div class="statistics">
                            <h3>Indicative Invitation Statistics</h3>                          
                            <p v-html="subscription_details_data.statistics.statistics"></p>
                        </div>
                    </div>
                    <!-- end complete investment--->


                    <div class="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="pills-payment-tab">
                    
                        <div class="row" v-if="subscription_details_data.status == 'Pending Payment' || subscription_details_data.status == 'Pending Admin Approval' || subscription_details_data.status == 'Payment Received'">
                            <div class="col-lg-6 col-md-6" v-for="(payment) in subscription_details_data.payments" :key="payment.investmentId">
                                <div class="subcription-card">
                                    <div class="head">
                                        <div class="logo">
                                            <a href="../../"><img class="img-fluid" v-if="payment.thumbnailId !=null"
                                                :src="m_baseUrl+m_version+'file/get/'+payment.thumbnailId">
                                                <img class="img-fluid" v-else
                                                src="../../assets/image/logo/logo.png"></a>
                                        </div>
                                        <div class="name">
                                            <small></small>
                                            <h4>{{ payment.title }}</h4>
                                        </div>
                                    </div>

                                    <div class="event-data">
                                        <table class="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p v-if="payment.status == 'issuer'">Investment Amount Payable</p>
                                                        <p v-else>Placement Fee Payable</p>
                                                        <h5>S${{ parseFloat(payment.amount).toFixed(2) }}</h5>
                                                    </td>
                                                    <td>
                                                        <p>Status</p>
                                                        <h5 v-if="payment.proofOfPaymentId == null">Pending Payment</h5>
                                                        <h5 v-else>Completed</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class="submit">
                                                        <p>Payment Due Date & Time</p>
                                                        <h5>{{ subscription_details_data.paymentDate }} {{ tConvert(payment.paymentDueTime+':00') }}</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="subcription-s-button">
                                        <router-link v-if="payment.proofOfPaymentId == null" :to="{name:'Payment', params: { type: 1 }}"  class="btn btn-warning">Payment Instruction</router-link>
                                        <router-link :to="{name:'Payment', params: { type: 1 }}"  v-else class="btn btn-warning">VIEW DETAILS</router-link>
                                
                                    </div>
                                </div><!-- end-->
                            </div>
                          

                        </div>
                        <div class="pandding-box" v-else-if="subscription_details_data.status != 'Pending Payment'">
                            <img src="../../assets/image/icons/subcription-payment.svg">
                            <h4>Subscribe now before make payment.</h4>
                            <router-link class="btn btn-warning" :to="{ name: 'subscriptionentry',params: { id: 1 } }">Subscribe
                                Now</router-link>

                        </div>
                    </div>
                    <!-- end complete investment--->


                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Subscription_description',
    props: {
        subscription_details_data: Object
    }


}
</script>