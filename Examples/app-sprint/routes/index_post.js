var request = require("request");

// Proxy through YQL.
var whereURL = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from geo.placefinder where gflags="R" and text="{LAT},{LON}"';

// express extends the Node concept of request/response HTTP architecture,
// but also keeps true to the basic idea.
var revgeo = function(lat, lon, callback) {
    var url = whereURL.replace("{LAT}", lat).replace("{LON}", lon);

    request(url, function(error, response, contentBody) {
        // Attempt to build the interpoloated address, or fail.
        var address;
        try {
            address = JSON.parse(contentBody).query.results.Result;
            address = Array.isArray(address) ? address[0] : address;
            address = address.line1 + " " + address.line2;
        }
        catch(e) {
            callback("Could not retrieve the location at "+lat+", "+lon);
            return;
        }

        if (error || response.statusCode != 200) {
            callback("Error contacting the reverse geocoding service.");
        }
        else {
            callback(null, address);
        }
    });
};

module.exports = function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    revgeo(latitude, longitude, function(err, address) {
        // diagnostic
        console.log(latitude, longitude, err, address);

        res.render('home', {
            error: err,
            location: {
                latitude: latitude,
                longitude: longitude,
                address: address
            }
        });
    });
};