(function() {
	var noGeoLocation = function () {
		alert("Unable to locate you");
	};

	if (!navigator.geolocation || !document.querySelector) {
		noGeoLocation();
	} else {
		navigator.geolocation.getCurrentPosition(
			function(p) {
				document.querySelector("[name='latitude']").value = p.coords.latitude;
				document.querySelector("[name='longitude']").value = p.coords.longitude;
				document.querySelector("[type='submit']").removeAttribute("diabled");
			},
			function(err) {
				noGeoLocation();
			}
		);
	}
})();