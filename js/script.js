var map = L.map("mapid").setView([33.97650767068736, -6.866922653914198], 18);

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

data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        title: "Day 1",
        content: "This is where some people moved to.",
      },
      geometry: {
        type: "Point",
        coordinates: [-73.7949, 40.7282, 1],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "The Next Day",
        content: "This is where some people grooved to.",
      },
      geometry: {
        type: "Point",
        coordinates: [-74.3838, 40.9148, 1],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "Amazing Event",
        content: "This is where they went to have fun.",
      },
      geometry: {
        type: "Point",
        coordinates: [4.899431, 52.379189, 1],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "1776",
        content: "This where they went when the revolution had begun.",
      },
      geometry: {
        type: "Point",
        coordinates: [-71.3489484, 42.4603719, 1],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "1776",
        content: "This where they went when the revolution had begun.",
      },
      geometry: {
        type: "Point",
        coordinates: [-71.2272, 42.4473, 1],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "1984",
        content: "So they all came here...and disappeared without a trace!",
      },
      geometry: {
        type: "Point",
        coordinates: [-0.118092, 51.509865, 1],
      },
    },
    {
      type: "Feature",
      properties: {
        title: "12/22/63",
        content: "Now, this can be quite the scary place.",
      },
      geometry: {
        type: "Point",
        coordinates: [-70.2553259, 43.661471, 1],
      },
    },
  ],
};

getDataAddMarkers = function ({ label, value, map, exclamation }) {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  filteredData = data.features.filter(function (i, n) {
    return i.properties.title === label;
  });

  var markerArray = [];
  L.geoJson(filteredData, {
    onEachFeature: function onEachFeature(feature, layer) {
      content = `${exclamation} <br> ${
        feature.properties.content
      } <br> (${Math.round((value / 6) * 100)}% done with story)`;
      var popup = L.popup().setContent(content);
      layer.bindPopup(popup);
      markerArray.push(layer);
    },
  }).addTo(map);

  var markerGroup = L.featureGroup(markerArray);
  map.fitBounds(markerGroup.getBounds()).setZoom(12);
};

L.control
  .timelineSlider({
    timelineItems: [
      "Day 1",
      "Day 1",
      "The Next Day",
      "Amazing Event",
      "1776",
      "12/22/63",
      "1984",
      "Day 1",
    ],
    changeMap: getDataAddMarkers,
    extraChangeMapParams: { exclamation: "Hello World!" },
  })
  .addTo(map);
