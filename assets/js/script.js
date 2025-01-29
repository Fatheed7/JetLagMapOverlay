const map = L.map('map').setView([0, 0], 2);

const tileLayers = {
  "OpenStreetMap": 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  "Esri WorldTopoMap": 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  "Esri WorldGrayCanvas": 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  "CartoDB Positron": 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  "CartoDB Positron No Labels": 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
  "Alidade Smooth": 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.jpg',
  "Alidade Dark": 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png',
  "Thunderforest Transport": 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=1c5223f3b25f4c82b3616abb648b09aa',
  "Thunderforest Transport Dark": 'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=1c5223f3b25f4c82b3616abb648b09aa'
};

const layers = Object.fromEntries(
  Object.entries(tileLayers).map(([name, url]) => [
    name,
    L.tileLayer(url, { attribution: '© OpenStreetMap contributors' })
  ])
);

layers["Esri WorldTopoMap"].addTo(map);

L.control.layers(layers).addTo(map);

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