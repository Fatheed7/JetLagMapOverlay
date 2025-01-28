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