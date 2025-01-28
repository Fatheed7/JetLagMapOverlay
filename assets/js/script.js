const map = L.map('map').setView([0, 0], 2);

const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
});

const alidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.jpg', {
  attribution: '© OpenStreetMap contributors'
});

const alidadeDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
});

const thunderforestTransport = L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=1c5223f3b25f4c82b3616abb648b09aa', {
  attribution: '© OpenStreetMap contributors'
});

const thunderforestTransportDark = L.tileLayer('https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=1c5223f3b25f4c82b3616abb648b09aa', {
  attribution: '© OpenStreetMap contributors'
});

const esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: '© OpenStreetMap contributors'
});

esriWorldTopoMap.addTo(map);

L.control.layers({
  "OpenStreetMap": osmLayer,
  "Esri WorldTopoMap": esriWorldTopoMap,
  "Alidade Smooth": alidadeSmooth,
  "Alidade Dark": alidadeDark,
  "Thunderforest Transport": thunderforestTransport,
  "Thunderforest Transport Dark": thunderforestTransportDark
}).addTo(map);

const imageElement = document.createElement('img');
imageElement.src = './assets/img/overlay.png';
imageElement.alt = "Jet Lag: The Game tag overlay";
imageElement.className = 'image-overlay';
imageElement.style.width = '250px';
imageElement.style.height = 'auto';

const mapContainer = document.getElementById('map');
mapContainer.appendChild(imageElement);

let isLocked = false;
let lockedPosition = null;

function updateImagePosition() {
  if (!isLocked) {
    const mapCenter = map.latLngToContainerPoint(map.getCenter());
    imageElement.style.left = `${mapCenter.x}px`;
    imageElement.style.top = `${mapCenter.y}px`;
  } else if (lockedPosition) {
    const currentPosition = map.latLngToContainerPoint(lockedPosition);
    imageElement.style.left = `${currentPosition.x}px`;
    imageElement.style.top = `${currentPosition.y}px`;
  }
}

map.on('move', updateImagePosition);
map.on('zoom', updateImagePosition);

const scaleSlider = document.getElementById('scale-slider');
const scaleValue = document.getElementById('scale-value');
scaleSlider.addEventListener('input', () => {
  const scale = scaleSlider.value;
  scaleValue.textContent = scale;
  imageElement.style.width = `${scale}px`;
});

const rotateSlider = document.getElementById('rotate-slider');
const rotateValue = document.getElementById('rotate-value');
rotateSlider.addEventListener('input', () => {
  const rotation = rotateSlider.value;
  rotateValue.textContent = rotation;
  imageElement.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
});

const lockButton = document.getElementById('lockButton');

lockButton.addEventListener('click', () => {
  isLocked = !isLocked;
  if (isLocked) {
    lockedPosition = map.getCenter();
    lockButton.textContent = 'Unlock Overlay';
  } else {
    lockedPosition = null;
    lockButton.textContent = 'Lock Overlay';
    updateImagePosition();
  }
});

updateImagePosition();

    document.getElementById("close").addEventListener("click", function (event) {
      event.preventDefault();
      const parentElement = document.getElementById("bottom-message")
      if (parentElement) {
          parentElement.classList.add("hide-overlay");
      }
    })