<template>
   <section class="manage-protfolio-intro">
		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-md-5 offset-md-1">
					<div class="manage-left" :style="{'background-image': 'url(' + require('../../assets/image/managed_portfolios_bg.jpg') + ')'}">
						<div class="content">
							<img src="../../assets/image/icons/manage-p.svg" alt="" class="img-fluid">
							<h4>Managed Portfolios</h4>
							<p>SAC Capital is an online Managed Portfolio service that builds, monitors and balances your portfolio for you.</p>
						</div>
					</div>
				</div>
				<div class="col-lg-6 col-md-6 manage-right">
					<div class="manage-right-content">
						<h3>SAC Fund Management</h3>
						<p>SACFM is a value-oriented multi-strategy fund manager. We seek to identify attractive investment opportunities which have a huge gap between price and intrinsic value. </p>
						<p>SACFM aims to protect and grow investor’s assets by seeking to generate attractive absolute returns. </p>
					</div>
				</div>
			</div>
		</div>
	</section>
   </template>   
  
           <script>
               export default {
               name: 'Manage_intro'
                  
               }
               </script>