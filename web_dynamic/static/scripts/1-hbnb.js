window.addEventListener('load', function () {
	//Task 2: Handle checkbox changes for amenities
	const amenityIds = {};
	
	$('input[type="checkbox"]').change(function () {
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');

		if (this.checked) {
			amenityIds[amenityId] = amenityName;
		} else {
			delete amenityIds[amenityId];
		}

		const amenityNames = Object.values(amenityIds);
		const amenitiesText = amenityNames.length ? amenityNames.join(', ') : '&nbsp';

		$('div.amenities h4').html(amenitiesText);
	});
});
