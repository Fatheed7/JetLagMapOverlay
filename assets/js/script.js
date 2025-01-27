const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const imageElement = document.createElement('img');
imageElement.src = './assets/img/overlay.png';
imageElement.className = 'image-overlay';
imageElement.style.width = '250px';
imageElement.style.height = 'auto';

const mapContainer = document.getElementById('map');
mapContainer.appendChild(imageElement);

function updateImagePosition() {
  const mapCenter = map.latLngToContainerPoint(map.getCenter());
  imageElement.style.left = `${mapCenter.x}px`;
  imageElement.style.top = `${mapCenter.y}px`;
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

updateImagePosition();