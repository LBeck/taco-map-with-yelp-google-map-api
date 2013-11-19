//declare namespace
var yoh = {};

//declare map
var map;

        //trace function for debugging
        function trace(message)
        {
            if (typeof console != 'undefined')
            {
                console.log(message);
            }
        }

        //Function that gets run when the document loads
        yoh.initialize = function()
        {
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(37.7833,-122.4167),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            yoh.getYelp('taco');
        }

//array to hold yelp markers
var yelp = [];

//defines bounding box of all locations
var bounds;

//info window that's displayed when user clicks on marker.
// Notice that for each yelp entry, the function creates an “infowindowcontent” variable
// that creates an HTML string that populates the infowindow.
var infowindow = new google.maps.InfoWindow();

yoh.getYelp = function(term)
{
    console.log("I'm in getYelp ");
    // 'LatLngBounds' constructs an instance that represents a rectable in
    // geographical coordinates.
    bounds = new google.maps.LatLngBounds ();

    // Format: jQuery.getJSON(url[,data][,success(data,textStatus,jqXHR)])
    // Returns: jqXHR, which is a superset of the XMLHTTPRequest object
    // Description: Loads JSON-encoded data from the server using a GET HTTP request.
    $.getJSON('http://api.yelp.com/business_review_search?term=taco&lat='+map.getCenter().lat()+'&long='+map.getCenter().lng()+'&radius=20&limit=5&ywsid=04IdPAieoqr9BYHbNDBw6g&callback=?',
              // 'http://api.yelp.com/business_review_search?term=yelp&lat=37.788022&long=-122.399797&radius=10&limit=5&ywsid=XXXXXXXXXXXXXXXXXX
        function(data)
        {
            console.log("I'm in .getJSON");
            trace(data);
            $.each(data.businesses, function(i,item){
                var infowindowcontent = '<strong>'+item.name+'</strong><br>';
                infowindowcontent += '<img src="'+item.photo_url+'"><br>';
                infowindowcontent += '<a href="'+item.url+'" target="_blank">see it on yelp</a>';
                // 'i' : the array count, 'item.name' : the name of the YELP listing
                // yoh.createYelpMarker(i,item.latitude,item.longitude,item.name,infowindowcontent);
            });
        }
    );
}

// Mapping the results of the YELP API call
yoh.createYelpMarker = function(i,latitude,longitude,title,infowindowcontent)
{
    var markerLatLng = new google.maps.LatLng(latitude,longitude);

    //extent bounds for each stop and adjust map to fit to it
    bounds.extend(markerLatLng);
    map.fitBounds(bounds);

    yelp[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        title: title
    });

    //add an onclick event
    google.maps.event.addListener(yelp[i], 'click', function() {
        infowindow.setContent(infowindowcontent);
        infowindow.open(map,yelp[i]);
    });
}