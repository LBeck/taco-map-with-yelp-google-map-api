!!!! Code breaks at YelpMap.js, line 60 !!!!!!

The Yelp API no longer returns the lat/long of matched
businesses, and the Google Map API needs these to set markers at appropriate points
on the map. Yelp only returns (often only partially filled in addresses). So a 3rd party geocoding service is needed to parse address information.


taco-map-with-yelp-google-map-api
=================================

A taco map using the Yelp API and Google Map API
