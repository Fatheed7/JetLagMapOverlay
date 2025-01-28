function toggleOverlay() {
  const overlay = document.getElementsByClassName("image-overlay")[0];
  const button = document.getElementById("overlayButton");
  if(overlay.classList.contains("hide-overlay"))
    {
      overlay.classList.remove("hide-overlay");
      button.textContent = "Hide Overlay";
    }
    else
    {
      overlay.classList.add("hide-overlay");
      button.textContent = "Show Overlay";
    }
}

function fillLocationTile() {
  const overlay = document.getElementsByClassName("image-overlay")[0];
  const locationButton = document.getElementById("locationTileButton");
  if(overlay.getAttribute("src") == "./assets/img/overlay.png")
    {
      overlay.setAttribute("src", "./assets/img/overlayGreen.png");
      locationButton.textContent = "Location Tile: Green";
    }
    else
    {
      overlay.setAttribute("src", "./assets/img/overlay.png");
      locationButton.textContent = "Location Tile: Clear";
    }
}