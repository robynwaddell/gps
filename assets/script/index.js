'use strict';
// import { select } from './utils.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNndWVuZXR0ZSIsImEiOiJjbHExOWUxeWcwNmwyMmlvMGY3NXF3bGc4In0.SXaq4QutArp0bqPMpmnkjg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/robynwaddell/clsxo7ngz004b01pt5xq5h7mn',
    center: [-97.1418535214156, 49.89382907977702],
    zoom: 9,
    pitch: 40
});

let userLocation;

function addMarker(coordinates) {
    // Grabbed from: https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-example
    let marker = new mapboxgl.Marker({
        color: "#860D0D",
        width: '10px',
        height: '10px',
        draggable: true
        }).setLngLat(coordinates)
        .addTo(map);
    // const el = document.createElement('div');
    // el.className = 'marker';

    // new mapboxgl.Marker(el)
    //     .setLngLat(coordinates)
    //     .addTo(map);
}

function getLocation(position) {
    let { latitude, longitude } = position.coords;
    userLocation = [longitude, latitude];
    map.flyTo({ center: userLocation, zoom: 17 });
    addMarker(userLocation);
}

function errorHandler() {
    alert('Unable to retrieve your location');
}

const options = {
    enableHighAccuracy: true
};

setTimeout(() => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        alert('Browser does not support geolocation');
    }
}, 1000);


map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true,
            maximumAge: 0
        },
        trackUserLocation: true,
        showUserHeading: true
    })
);
