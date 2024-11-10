let currentIndex = 0;
const tiles = document.querySelectorAll(".tile");

// Scroll to a specific tile based on index
function scrollToTile(index) {
  if (index >= 0 && index < tiles.length) {
    currentIndex = index;
    tiles[currentIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Optional: Keyboard navigation for vertical scrolling
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && currentIndex > 0) {
    scrollToTile(currentIndex - 1);
  } else if (event.key === "ArrowDown" && currentIndex < tiles.length - 1) {
    scrollToTile(currentIndex + 1);
  }
});

// Toggle Sidebar Menu
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.transform === "translateX(0%)") {
    sidebar.style.transform = "translateX(-100%)";
  } else {
    sidebar.style.transform = "translateX(0%)";
  }
}
