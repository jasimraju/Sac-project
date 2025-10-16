<template>
    <div class="tab-pane fade show active" id="v-pills-nric" role="tabpanel" aria-labelledby="v-pills-nric-tab">
        <div class="document-header-section">
            <h4>Subceription</h4>
        </div>
        <div class="investment-filter">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="search-filter">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Search Items......." aria-label="serch">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-12"></div>

                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="sorting-filter">
                        <select class="form-select" aria-label="Default select example">
                            <option>Newest (default)</option>
                            <option value="Most Popular">Most Popular</option>
                            <option value="Alphabetical">Alphabetical</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>



        <div class="document-content-section">
            <div class="row" v-if="subseqfrom.length">
							<div class="col-lg-6" v-for="(investment) in subseqfrom"
								:key="investment.investmentId">
								
                                <Subsceription_from  :subcriptionitems="investment" />
							</div>

							<div class="more-btn">
								<button class="btn btn-secondary">View More</button>
							</div>

						</div>
                <Otherdata v-else :title="'Opps! You donot have any subscription yet..'" :description="'We will keep you informed on further update via notification'" :button_one="'Home'" :button_one_url="'home'" :button_two="'VIEW INVESTMENTS'" :button_two_url="'investment'" />
            
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'Manage_document_subceription',
    components: { 
    Subsceription_from: () => import('../Subceription_from/subceription_show.vue'),
	Otherdata: () => import("../investment/Otherfound.vue"),
    },
    data(){
        return {
            subseqfrom: null,
             
        }
    },
    created() {
        this.globalGetreauth("userProfile/subscription/userDetails").then((result_other) => {
							//check profile
                            var userdata = result_other.data;
                        this.subseqfrom = userdata
                        console.log(this.subseqfrom);
   
                        }).catch((error) => {
					if (error.response) {
						//do something
						this.errors.push(error.response.data.message);
					}
					else if (error.request) {
						//do something else
						
					} else if (error.message) {
						//do something other than the other two
					}
				});

                console.log(this.subseqfrom);
    }

}
</script>
    