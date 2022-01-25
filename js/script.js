var map = L.map("mapid").setView([32.4937, -6.283], 8);

// Google Earth Hybrid basemap
// L.tileLayer("http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// OpenStreetMap basemap
function addBM() {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

addBM();

var day;
var geojson = L.geoJson(provincesBK);

document.getElementById("haha").onclick = function changeContent() {
  day = document.getElementsByClassName("active").item(0).innerText;
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  addBM();
  L.geoJson(provincesBK, { style: style }).addTo(map);
  var geojson = L.geoJson(provincesBK);
  geojson = L.geoJson(provincesBK, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
  info.addTo(map);
  legend.addTo(map);
};

function getColor(d) {
  return d > 24
    ? "#810f7c"
    : d > 19
    ? "#8856a7"
    : d > 17
    ? "#8c96c6"
    : d > 15
    ? "#9ebcda"
    : d > 12
    ? "#bfd3e6"
    : "#edf8fb";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties[day]),
    weight: 2,
    opacity: 1,
    color: "gray",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

L.geoJson(provincesBK, { style: style }).addTo(map);

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

geojson = L.geoJson(provincesBK, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    "<h4>Cases</h4>" +
    (props
      ? "<b>" +
        props.Nom_Province +
        "</b><br />" +
        props[day] +
        " cas confirmés </sup>"
      : "Hover over a state");
};

info.addTo(map);

var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [8, 10, 12, 14, 16, 18, 20, 24],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};

legend.addTo(map);
