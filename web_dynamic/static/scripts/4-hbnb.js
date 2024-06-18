window.addEventListener('load', function () {
	// Task 3: Check API status
	$.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
		if (data.status === 'OK') {
			$('#api_status').addClass('available');
		} else {
			$('#api_status').removeClass('available');
		}
	}).fail(function () {

		$('#api_status').removeClass('available');
	});

	// Task 2: Handle checkbox changes for amenities
	const amenityIds = {};
	$('input[type="checkbox"]').click(function () {
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');

		if (this.checked) {
			amenityIds[amenityId] = amenityName;
		} else 
			delete amenityIds[amenityId];
	}

	const amenityNames = Object.values(amenityIds);
	const amenitiesText = amenityNames.length ? amenityNames.join(', ') : '&nbsp;';
		$('div.amenities h4').html(amenitiesText);
	});

	// Task 4: Fetch and display filtered places
	$('.filters button').click(function () {
		$.ajax({
			type: 'POST',
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			contentType: 'application/json',
			data: JSON.stringify({ amenities: Object.keys(amenityIds) })
		}).done(function (data) {

			$('section.places').empty();
			$('section.places').append('<h1>Places</h1>');
			for (const place of data) {
				const template = `
				<article>
				<div class="title">
				<h2>${place.name}</h2>
				<div class="price_by_night">
				$${place.price_by_night}
				</div>
				</div>
				<div class="information">
				<div class="max_guest">
				<i class="fa fa-users fa-3x" aria-hidden="true"></i>
				<br />
				${place.max_guest} Guests
				</div>
				<div class="number_rooms">
				<i class="fa fa-bed fa-3x" aria-hidden="true"></i>
				<br />
				${place.number_rooms} Bedrooms
				</div>
				<div class="number_bathrooms">
				<i class="fa fa-bath fa-3x" aria-hidden="true"></i>
				<br />
				${place.number_bathrooms} Bathroom
				</div>
				</div>
				<div class="description">
				${place.description}
				</div>
				</article>`;

			$('section.places').append(template);

			}).fail(function () {
				console.error('Error fetching places');

			});
		});
	});
