function addMapPicker() {
	
	var mapCenter = [22, 87];
	var mymap = L.map('mapid', {center : mapCenter, zoom : 5});

/* Map GeoJson Link */

	var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(mymap);


/* Draggable Marker with popup coordinates */

var marker = L.marker(mapCenter,{draggable: true}).addTo(mymap);

    function updateMarker(lat, lng) {
      marker
            .setLatLng([lat, lng])
// Popup update coordinate solution
            .bindPopup("Your location :  " + marker.getLatLng().toString()+'<label for="latInput">Latitude</label>'+
              '<input id="latInput" value='+marker.getLatLng().lat+'></br>'+'<label for="lngInput">Longitude</label>'+
              '<input id="lngInput" value='+marker.getLatLng().lng+'>')
            .openPopup();
            
          return false;
    };
    
  /* Onclick update coordinates */

    //TODO: declare a function say mapClick and put the function here. 

  function onMapClick(e) {
        //map click event object (e) has latlng property which is a location at which the click occured.
        $('#latInput').val(e.latlng.lat);
        $('#lngInput').val(e.latlng.lng);
        updateMarker(e.latlng.lat, e.latlng.lng);
  };
  mymap.on('click', onMapClick);

    //TODO: declare a function say mapDragEnd and put the function here.
    //TODO: you can put these 2 functions mapDragEnd and mapClick , in to a class called mapActionListnere.

  function onMapDragEnd(e) {
        //map click event object (e) has latlng property which is a location at which the click occured.
        marker.bindPopup("pop drag"+'<div class="coordinput"><label for="latInput">Latitude</label><input id="latInput"/></br><label for="lngInput">Longitude</label><input id="lngInput"/></div>')
        document.getElementById('latInput').value = marker.getLatLng().lat;
        document.getElementById('lngInput').value = marker.getLatLng().lng;
        updateMarker(e.latlng.lat, e.latlng.lng);
  };
  mymap.on('drag', onMapDragEnd);

};

  var updateMarkerByInputs = function() {
   return updateMarker( $('#latInput').val() , $('#lngInput').val());
  }

  $('#latInput').on('input', updateMarkerByInputs);
  $('#lngInput').on('input', updateMarkerByInputs);

$(document).ready(function() {
    addMapPicker();
});


