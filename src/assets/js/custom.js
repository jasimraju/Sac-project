//navbar js 
	function darken_screen(yesno){
			if( yesno == true ){
				document.querySelector('.screen-darken').classList.add('active');
			}
			else if(yesno == false){
				document.querySelector('.screen-darken').classList.remove('active');
			}
		}
		
	function close_offcanvas(){
		darken_screen(false);
		document.querySelector('.mobile-offcanvas.show').classList.remove('show');
		document.body.classList.remove('offcanvas-active');
	}

	function show_offcanvas(offcanvas_id){
		darken_screen(true);
		document.getElementById(offcanvas_id).classList.add('show');
		document.body.classList.add('offcanvas-active');
	}

	document.addEventListener("DOMContentLoaded", function(){
		document.querySelectorAll('[data-trigger]').forEach(function(everyelement){
			
			let offcanvas_id = everyelement.getAttribute('data-trigger');
			
			everyelement.addEventListener('click', function (e) {
				e.preventDefault();
	        	show_offcanvas(offcanvas_id);
	  			
			});
		});

		document.querySelectorAll('.btn-close').forEach(function(everybutton){
			
			everybutton.addEventListener('click', function (e) {
				e.preventDefault();
	        	close_offcanvas();
	  		});
		});

		document.querySelector('.screen-darken').addEventListener('click', function(event){
			close_offcanvas();
		});
		
    }); 

	// DOMContentLoaded  end
	let items = document.querySelectorAll('#recipeCarousel .carousel-item')

		items.forEach((el) => {
			const minPerSlide = 4
			let next = el.nextElementSibling
			for (var i=1; i<minPerSlide; i++) {
				if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})


//slick slider
		$(document).ready(function(){
      $('.upcoming-events-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        speed: 300,
        infinite: true,
        autoplaySpeed: 5000,
        autoplay: false,
        responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
      });
    });

  
//slick slider
		$(document).ready(function(){
      $('.latest-events-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        speed: 300,
        infinite: true,
        autoplaySpeed: 5000,
        autoplay: false,
        responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
      });
    });

//Date Picker
    $(document).ready(function(){
  
		  $(function () {
			$('#startDate').datepicker({
		   format: 'dd/mm/yyyy' 
		  	});
		  });
	});
    
    
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


//select2 
$(document).ready(function() {
    $('.js-example-basic-single').select2();


    $(document).on('change','.user-view-register .select2',function(){
        var countryFlag =  $(this).find('img').attr('src');
        console.log(countryFlag);
    });
});

function format(item, state) {
  if (!item.id) {
    return item.text;
  }
  var countryUrl = "https://hatscripts.github.io/circle-flags/flags/";
  var stateUrl = "https://oxguy3.github.io/flags/svg/us/";
  var url = state ? stateUrl : countryUrl;
  var img = $("<img>", {
    class: "img-flag",
    width: 26,
    src: url + item.element.value.toLowerCase() + ".svg"
  });
  var span = $("<span>", {
    text: " " + item.text
  });
  span.prepend(img);
  return span;
}

$(document).ready(function() {
  $("#countries").select2({
    templateResult: function(item) {
      return format(item, false);
    }
  });
  $("#us-states").select2({
    templateResult: function(item) {
      return format(item, true);
    }
  });
});


//inestments modal auto show 
$(document).ready(function(){
    $("#investment-login-modal").modal('show');
});


/*Notification settings*/
$(document).ready(function(){
      $(".notifications-mute #mute").click(function () {
          if ($(this).is(":checked")) {
              $(".mute-time").addClass('mute-time-show');
          } else {
              $(".mute-time").removeClass('mute-time-show');
          }
      });
});
