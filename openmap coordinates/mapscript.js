function addMapPicker() {

  var mapCenter = [22, 87];
  var mymap = L.map('mapid', {
    center: mapCenter,
    zoom: 5
  });

  /* Map GeoJson Link */

  var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);




  /* Draggable Marker with popup coordinates */

  var marker = L.marker(mapCenter, {
    draggable: true
  }).addTo(mymap);

  var mapActionListener = {
    updateMarker:function (lat, lng) {
      marker
            .setLatLng([lat, lng])
      // Popup update coordinate solution
            .bindPopup("Your location :  " + 
              marker.getLatLng().toString()+'<label for="latInput">Latitude</label>'+
              '<input id="latInput" value='+ 
              marker.getLatLng().lat+'></br>'+'<label for="lngInput">Longitude</label>'+
              '<input id="lngInput" value='+ 
              marker.getLatLng().lng+'>')
            .openPopup();
      return false;
    },
  
  /* Onclick update coordinates */

  //TODO: declare a function say mapClick and put the function here. 

    mapClick:function(e) {
      //map click event object (e) has latlng property which is a location at which the click occured.
      $('#latInput').val(e.latlng.lat);
      $('#lngInput').val(e.latlng.lng);
      mapActionListener.updateMarker(e.latlng.lat, e.latlng.lng);
    },
  

    //TODO: declare a function say mapDragEnd and put the function here.
    //TODO: you can put these 2 functions mapDragEnd and mapClick , in to a class called mapActionListnere.

    markerDragEnd:function(e) {
      //map click event object (e) has latlng property which is a location at which the click occured.
      document.getElementById('latInput').value = marker.getLatLng().lat;
      document.getElementById('lngInput').value = marker.getLatLng().lng;
      marker.bindPopup("Your location :  " +
                  marker.getLatLng().toString() + '<label for="latInput">Latitude</label>' +
                  '<input id="latInput" value=' +
                  marker.getLatLng().lat + '></br>' + '<label for="lngInput">Longitude</label>' +
                  '<input id="lngInput" value=' +
                  marker.getLatLng().lng + '>')
              .openPopup();
    }
  }
  mymap.on('click',mapActionListener.mapClick);
  marker.on('dragend', mapActionListener.markerDragEnd);



var updateMarkerByInputs = function() {
  return mapActionListener.updateMarker($('#latInput').val(), $('#lngInput').val());
}

$('#latInput').on('input', updateMarkerByInputs);
$('#lngInput').on('input', updateMarkerByInputs);
}
$(document).ready(function() {
  addMapPicker();
});