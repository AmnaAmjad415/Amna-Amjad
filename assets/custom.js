// For Just the popup

document.addEventListener("DOMContentLoaded", function() {
    const hotspots = document.querySelectorAll(".hotspot");
    const popup = document.getElementById("hotspot-popup");
    const popupText = document.getElementById("popup-text");
    const closeBtn = popup.querySelector(".close");

    hotspots.forEach(hotspot => {
      hotspot.addEventListener("click", function() {
        popupText.textContent = this.getAttribute("data-info");
        popup.style.display = "block";
      });
    });

    closeBtn.addEventListener("click", function() {
      popup.style.display = "none";
    });

    // Close popup if clicked outside
    window.addEventListener("click", function(e) {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  });

// For content on popup

  <script>
document.addEventListener("DOMContentLoaded", function() {
  const hotspots = document.querySelectorAll(".hotspot");
  const popup = document.getElementById("product-popup");
  const closeBtn = popup.querySelector(".close");

  const popupImage = document.getElementById("popup-image");
  const popupTitle = document.getElementById("popup-title");
  const popupPrice = document.getElementById("popup-price");
  const popupDesc = document.getElementById("popup-desc");
  const popupColors = document.getElementById("popup-colors");
  const popupSize = document.getElementById("popup-size");

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("click", function() {
      popupImage.src = this.getAttribute("data-img");
      popupTitle.textContent = this.getAttribute("data-title");
      popupPrice.textContent = this.getAttribute("data-price");
      popupDesc.textContent = this.getAttribute("data-desc");

      // Colors
      popupColors.innerHTML = "";
      const colors = JSON.parse(this.getAttribute("data-colors"));
      colors.forEach(color => {
        const btn = document.createElement("button");
        btn.textContent = color;
        btn.addEventListener("click", () => {
          popupColors.querySelectorAll("button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        });
        popupColors.appendChild(btn);
      });

      // Sizes
      popupSize.innerHTML = "";
      const sizes = JSON.parse(this.getAttribute("data-sizes"));
      sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        popupSize.appendChild(option);
      });

      popup.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => popup.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });
});
</script>

// For add to cart

document.addEventListener("DOMContentLoaded", function() {
  const hotspots = document.querySelectorAll(".hotspot");
  const popup = document.getElementById("product-popup");
  const closeBtn = popup.querySelector(".close");

  const popupImage = document.getElementById("popup-image");
  const popupTitle = document.getElementById("popup-title");
  const popupPrice = document.getElementById("popup-price");
  const popupDesc = document.getElementById("popup-desc");
  const popupColors = document.getElementById("popup-colors");
  const popupSize = document.getElementById("popup-size");
  const addToCartBtn = document.getElementById("popup-add-to-cart");

  let selectedVariantId = null;

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("click", function() {
      popupImage.src = this.getAttribute("data-img");
      popupTitle.textContent = this.getAttribute("data-title");
      popupPrice.textContent = this.getAttribute("data-price");
      popupDesc.textContent = this.getAttribute("data-desc");

      // Colors
      popupColors.innerHTML = "";
      const colors = JSON.parse(this.getAttribute("data-colors"));
      colors.forEach(c => {
        const btn = document.createElement("button");
        btn.textContent = c.name;
        btn.addEventListener("click", () => {
          popupColors.querySelectorAll("button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedVariantId = c.variant_id; // store correct variant
        });
        popupColors.appendChild(btn);
      });

      // Sizes (optional, if sizes are separate variants you’d handle same way)
      popupSize.innerHTML = "<option>Choose your size</option>";
      const sizes = JSON.parse(this.getAttribute("data-sizes"));
      sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        popupSize.appendChild(option);
      });

      popup.style.display = "flex";
    });
  });

  // Add to cart button
  addToCartBtn.addEventListener("click", function() {
    if (!selectedVariantId) {
      alert("Please select a color/variant first!");
      return;
    }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: selectedVariantId,
        quantity: 1
      })
    })
    .then(res => res.json())
    .then(data => {
      alert("✅ Added to cart!");
      popup.style.display = "none";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Failed to add to cart");
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => popup.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });
});

