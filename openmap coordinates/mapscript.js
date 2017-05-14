function addMapPicker() {

  //TODO: get current location coordinates, then set the view, that is closely relevant.
  var mymap = L.map('mapid').setView([51.505, -0.09], 5);

  /* Map GeoJson Link */
   // L.esri.basemapLayer('Topographic').addTo(mymap);

  var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);


  /* Draggable Marker with popup coordinates */

  // var marker = L.marker([51.505, -0.09], {
  //      draggable: true
  //     }).addTo(mymap);


  var mapActionListener = {
    updateMarker:function (marker,lat, lng) {
      marker
            .setLatLng([lat, lng])
      // Popup update coordinate solution
            .bindPopup("Your location :  " + 
              marker.getLatLng().toString()+'</br><label for="latInput">Latitude</label>'+
              '<input id="latInput" value='+ 
              marker.getLatLng().lat+'></br>'+'<label for="lngInput">Longitude</label>'+
              '<input id="lngInput" value='+ 
              marker.getLatLng().lng+'><a href="#" class="marker-delete-button"/>Remove</a>')
            .on("popupopen", onPopupOpen);
      return false;
    },
  
  /* Onclick update coordinates */

  //TODO: declare a function say mapClick and put the function here. 

    mapClick:function(e) {
      var marker = L.marker(e.latlng, {
       draggable: true
      }).addTo(mymap);
      //map click event object (e) has latlng property which is a location at which the click occured.
      $('#latInput').val(e.latlng.lat);
      $('#lngInput').val(e.latlng.lng);
      mapActionListener.updateMarker(marker,e.latlng.lat, e.latlng.lng);
      //"this" is not bound to mapActionListener, it points to some map API's class.
      marker.on('dragend', mapActionListener.markerDragEnd);
    },
  

    //TODO: declare a function say mapDragEnd and put the function here.DONE ?
    //TODO: you can put these 2 functions mapDragEnd and mapClick , 
    //in to a class called mapActionListner. DONE ?
    //TODO: does not update the marker.DONE
    //INFO: http://stackoverflow.com/questions/18575722/
    //leaflet-js-set-marker-on-click-update-postion-on-drag

    markerDragEnd:function(ev) {
      //alert("ev="+ev);
      //alert("ev.target="+ev.target);
      //alert("ev.target.getLatLng()="+ev.target.getLatLng());
      var marker = ev.target;
      marker.bindPopup("Your location :  " +
                  marker.getLatLng().toString() + '</br><label for="latInput">Latitude</label>' +
                  '<input id="latInput" value=' +
                  marker.getLatLng().lat + '></br>' + '<label for="lngInput">Longitude</label>' +
                  '<input id="lngInput" value=' +
                  marker.getLatLng().lng + '><a href="#" class="marker-delete-button"/>Remove</a>')
            .on("popupopen", onPopupOpen);      
    }
  }
  mymap.on('click',mapActionListener.mapClick);
  // marker.on('dragend', mapActionListener.markerDragEnd);

  // Function for deleting marker
  function onPopupOpen() {
      var tempMarker = this;
      $(".marker-delete-button:visible").click(function () {
          mymap.removeLayer(tempMarker);
      });
  }

//TODO: this will not work as there are multiple markers.

var updateMarkerByInputs = function() {
  return mapActionListener.updateMarker($('#latInput').val(), $('#lngInput').val());
}
//User Location
//INFO: https://github.com/domoritz/leaflet-locatecontrol
var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(mymap);
//TODO: write 2 lines about what this line below does ? 
//IF you found it  a site then please add the url here.
L.control.scale({maxWidth:100, metric:true, position: 'bottomleft'}).addTo(mymap);
//TODO: this will not work as there are multiple markers.
$('#latInput').on('input', updateMarkerByInputs);
$('#lngInput').on('input', updateMarkerByInputs);
}
$(document).ready(function() {
  addMapPicker();
});