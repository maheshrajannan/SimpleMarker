function addMapPicker() {
  //TODO: When setting the view for the very first time DONE.
  //TODO: Location search plugin.
  //set it to user's location, by default.
  var mymap = L.map('mapid');
  //mymap.setZoom(1);

  /* Map GeoJson Link */
   // L.esri.basemapLayer('Topographic').addTo(mymap);

  var OpenStreetMap_Mapnik = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19,
      //INFO:removed zoom options, the L control automatically finds appropriate zoom.
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);
//User Location
//INFO: https://github.com/domoritz/leaflet-locatecontrol
var lc = L.control.locate({
    position: 'topleft',
    setView: 'always',
    drawMarker: true,
    strings: {
        title: "Show me where I am, yo!",
    }
}).addTo(mymap);
// console.log(lc);
// console.log($(lc)[0]);
// console.log($(lc)[0]._event.latitude);
/**INFO:
You can call start() or stop() 
on the locate control object to set the location on page load for example.
https://github.com/domoritz/leaflet-locatecontrol
**/
lc.start();

console.log(lc);
console.log($(lc)[0]);
// console.log($(lc)[0]._event.latitude);
if($(lc)[0]._event) {
  //console.log($(lc)[0]._event.latitude);  
}

setTimeout(() => {
  console.log($(lc)[0]._event.latitude);
}, 6000);

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

  //TODO: declare a function say mapClick and put the function here DONE.

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
  

    //TODO: declare a function say mapDragEnd and put the function here DONE.
    //TODO: you can put these 2 functions mapDragEnd and mapClick DONE. 
    //in to a class called mapActionListner DONE.
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

//INFO:map unit scale
L.control.scale({maxWidth:100, metric:true, position: 'bottomleft'}).addTo(mymap);
console.log(mymap);
console.log($(mymap)[0]);

// var myVal = $(mymap)[0];
// for(var item in myVal) {
//   // console.log(item);
//   if(item == "_lastCenter") {
//     console.log("true");
//   }
// }
// console.log($(mymap)[0]._lastCenter);
// console.log($(mymap)[0]._layersMaxZoom);
// console.log($(mymap)[0]._layersMinZoom);
// console.log(mymap);
// console.log($(mymap)[0].keyboard);
// console.log($(mymap)[0]);

// console.log(typeof(mymap));

//QUnit testing
QUnit.test("map default options", function( assert ) {
  console.log('MyMap'+Inspect.methods(mymap));
  mymap.setZoom(18);
  console.log('zoom'+mymap.getZoom());
  assert.equal(mymap.getZoom(),
            18,
            "The map is centered at the ZMT's longitude, and the equator"
    );
    assert.equal(mymap.getZoom(),
            18,
            "The default zoom is set to 2"
    );
});

QUnit.test("baseLayer layerGroup", function( assert ) {
    assert.equal(baseLayer.getLayers().length,
            1,
            "There is just one layer in 'baseLayer' layerGroup"
    );console.log(mymap.toString());

    assert.equal(baseLayer.getLayers()[0]._url,
            "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "The url of the layer leads to the correct openstreet map tiles"
    );

    assert.equal(baseLayer.getLayers()[0].options.attribution,
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            "The attribution for the layer is correct"
    );

});
// Testing User Loation
// TODO here we need to check the lat and lng value of user location.
// the variable lc have the object e, It have the user location lat lng value
// so we need to compare the result lat lng to expected lat lng 
// Note : check the line 26 and 27 console.log
QUnit.test("User Location", function (assert) {
    var lc = L.control.locate({
    position: 'topleft',
    setView: 'always',
    drawMarker: true,
    strings: {
        title: "Show me where I am, yo!"
    }
    }).addTo(mymap);
    lc.start();
    setTimeout(() => {
    console.log($(lc)[0]._event.latitude);
    }, 6000);
    var result = $(lc)[0]._event.latitude; 
    console.log(result);
    var expected = 12.9715987;
    assert.equal(result, 12.9715987,"latitude");
});
// Testing Marker
// QUnit.test("a test", function(assert) {
//   assert.expect(1);
 
//   var $body = $("body");
 
//   $body.on("click", function() {
//     assert.ok(true, "body was clicked!");
//   });
 
//   $body.trigger("click");
// });
}
$(document).ready(function() {
  addMapPicker();
});