function addMapPicker() {
	
	var mapCenter = [22, 87];
	
	var mymap = L.map('mapid', {center : mapCenter, zoom : 5});

	var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(mymap);



var marker = L.marker(mapCenter,{draggable: true}).addTo(mymap);
    function updateMarker(lat, lng) {
        marker
            .setLatLng([lat, lng])
            .bindPopup("Your location :  " + marker.getLatLng().toString())
            .openPopup();
          return false;
    };
    
    mymap.on('click', function(e) {
        $('#latInput').val(e.latlng.lat);
        $('#lngInput').val(e.latlng.lng);
        updateMarker(e.latlng.lat, e.latlng.lng);
    });

   marker.on('dragend', function (e) {

  document.getElementById('latInput').value = marker.getLatLng().lat;
  document.getElementById('lngInput').value = marker.getLatLng().lng;
  marker.bindPopup("Your location :  " + marker.getLatLng().toString())
  });


    var updateMarkerByInputs = function() {
	    return updateMarker( $('#latInput').val() , $('#lngInput').val());
    }
    $('#latInput').on('input', updateMarkerByInputs);
    $('#lngInput').on('input', updateMarkerByInputs);
}
$(document).ready(function() {
    addMapPicker();
});
/*

<!-- -->
mymap.on('click',
  function mapClickListen(e) {
    var pos = e.latlng;
    console.log('map click event');
    var marker = L.marker(
      pos, {
        draggable: true
      }
    );
    marker.on('drag', function(e) {
      console.log('marker drag event');
    });
    marker.on('dragstart', function(e) {
      console.log('marker dragstart event');
      map.off('click', mapClickListen);
    });
    marker.on('dragend', function(e) {
      console.log('marker dragend event');
      setTimeout(function() {
        map.on('click', mapClickListen);
      }, 10);
    });
    marker.addTo(mymap);
  });

  };   


/* 
 * <!-- -->
mymap.on('click', onMapClick);

// Script for adding marker on map click
function onMapClick(e) {

    var geojsonFeature = {
        "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [e.latlng.lat, e.latlng.lng]
               
        }
    }
 }   
 
 
   var marker;

    L.geoJson(geojsonFeature, {
        
        pointToLayer: function(feature, latlng){
            
            marker = L.marker(e.latlng, {
                
                title: "Resource Location",
                alt: "Resource Location",
                riseOnHover: true,
                draggable: true,

            }).bindPopup("</br><input type='button' value='Delete this marker' class='marker-delete-button'/>");

            marker.on("popupopen", onPopupOpen);
       
            return marker;
        }
    }).addTo(mymap);
}
 <!-- -->


   
    <!-- -->





// Function to handle delete as well as other events on marker popup open
function onPopupOpen() {

    var tempMarker = this;

    $(".marker-delete-button:visible ").click(function () {
        mymap.removeLayer(tempMarker);
    });
}
*/






<!--alert coordinate when place a marker -->


/*
mymap.on('click', function(e) {
    alert(e.latlng);
});
*/


<!-- fixed markers -->

/*	var marker = L.marker([40, 80]).addTo(mymap);

	var point=[43.866667,18.416667];
		var marker=L.marker(point).addTo(mymap);	

	var point=[41.866667,14.416667];		
		var marker=L.marker(point).addTo(mymap);
		marker.bindPopup(
			'<b>welcome</b><div><img style="width:100%" src="images/area.jpg" alt="image"/> </div>',
			{minWidth:256}
		);	

	var point=[40.866667,20.416667];
		var circle=L.circle(
		point,
		5000,
		{
			color:'purple',
			fillColor:'red',
			fillOpacity:0.8,
		}
		).addTo(mymap);
		
*/
