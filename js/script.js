var map = L.map("mapid").setView([32.4937, -6.2830], 8.5);

// Google Earth Hybrid basemap
// L.tileLayer("http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// OpenStreetMap basemap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var day;

document.getElementById("haha").onclick = function changeContent() {
  day = document.getElementsByClassName("active").item(0).innerText;
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  L.geoJson(provincesBK, {style: style}).addTo(map);
};

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties[day]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(provincesBK, {style: style}).addTo(map);

// data = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: {
//         title: "Day 1",
//         content: "This is where some people moved to.",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-73.7949, 40.7282, 1],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {
//         title: "The Next Day",
//         content: "This is where some people grooved to.",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-74.3838, 40.9148, 1],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {
//         title: "Amazing Event",
//         content: "This is where they went to have fun.",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [4.899431, 52.379189, 1],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {
//         title: "1776",
//         content: "This where they went when the revolution had begun.",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-71.3489484, 42.4603719, 1],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {
//         title: "1776",
//         content: "This where they went when the revolution had begun.",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-71.2272, 42.4473, 1],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {
//         title: "1984",
//         content: "So they all came here...and disappeared without a trace!",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-0.118092, 51.509865, 1],
//       },
//     },
//     {
//       type: "Feature",
//       properties: {
//         title: "12/22/63",
//         content: "Now, this can be quite the scary place.",
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [-70.2553259, 43.661471, 1],
//       },
//     },
//   ],
// };

// getDataAddMarkers = function ({ label, value, map, exclamation }) {
//   map.eachLayer(function (layer) {
//     if (layer instanceof L.Marker) {
//       map.removeLayer(layer);
//     }
//   });

//   filteredData = provincesBK.features.filter(function (i, n) {
//     return i.properties.OBJECTID === label;
//   });

//   var markerArray = [];
//   L.geoJson(filteredData, {
//     onEachFeature: function onEachFeature(feature, layer) {
//       content = `${exclamation} <br> ${
//         feature.properties.content
//       } <br> (${Math.round((value / 6) * 100)}% done with story)`;
//       var popup = L.popup().setContent(content);
//       layer.bindPopup(popup);
//       markerArray.push(layer);
//     },
//   }).addTo(map);

//   var markerGroup = L.featureGroup(markerArray);
//   map.fitBounds(markerGroup.getBounds()).setZoom(12);
// };

// L.control
//   .timelineSlider({
//     timelineItems: [
//       "33",
//       "Day 1",
//       "The Next Day",
//       "Amazing Event",
//       "1776",
//       "12/22/63",
//       "1984",
//       "Day 1",
//     ],
//     changeMap: getDataAddMarkers,
//     extraChangeMapParams: { exclamation: "Hello World!" },
//   })
//   .addTo(map);
