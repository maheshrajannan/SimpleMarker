function addMapPicker() {
  //TODO: When setting the view for the very first time, 
  //set it to user's location, by default.
  var mymap = L.map('mapid');
  //mymap.setZoom(1);

  /* Map GeoJson Link */
   // L.esri.basemapLayer('Topographic').addTo(mymap);

  var OpenStreetMap_Mapnik = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //INFO:removed zoom options, the L control automatically finds appropriate zoom.
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);
  mymap.locate({setView: true, maxZoom:12});
//User Location
//INFO: https://github.com/domoritz/leaflet-locatecontrol
var lc = L.control.locate({
    position: 'topleft',
    setView: 'always',
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(mymap);
/**INFO:
You can call start() or stop() 
on the locate control object to set the location on page load for example.
https://github.com/domoritz/leaflet-locatecontrol
**/



  /* 
  Draggable Marker with popup coordinates
  var marker = L.marker([51.505, -0.09], {
  draggable: true
  }).addTo(mymap);
  */

  /* Car Marker */  
  var carIcon = L.icon(
      { 
        iconUrl: 'car-icon.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [30,45],
        shadowSize: [55,68],
        iconAnchor: [14,40],
        shadowAnchor: [17,63],
        popupAnchor: [1,-35]
      }
    );

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
      var marker = L.marker(e.latlng, {icon: carIcon,
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