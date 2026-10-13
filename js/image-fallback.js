/**
 * Enhanced Image Fallback Handler for Hostinger
 * This script adds robust error handling to all images on the page
 * to ensure they load correctly even if the original path fails.
 * Optimized for Hostinger hosting environment.
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Image fallback handler initialized");

  // Get the base URL for the site
  const baseUrl = window.location.origin;
  const pathSegments = window.location.pathname.split("/");
  let basePath = "";

  // If we're in a subdirectory, extract it
  if (pathSegments.length > 2) {
    // Remove the file name if present
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment.includes(".")) {
      pathSegments.pop();
    }
    basePath = pathSegments.join("/");
    if (!basePath.endsWith("/")) {
      basePath += "/";
    }
  }

  console.log("Base URL detected:", baseUrl);
  console.log("Base path detected:", basePath);

  // Apply error handling to all images
  const allImages = document.querySelectorAll("img");

  allImages.forEach((img) => {
    // Skip images that already have error handlers
    if (img.hasAttribute("data-fallback-applied")) {
      return;
    }

    // Store original source
    const originalSrc = img.src;

    // Add error handler
    img.onerror = function () {
      console.warn("Failed to load image:", img.src);

      // If this is already a fallback attempt, use default fallback
      if (img.hasAttribute("data-using-fallback")) {
        const attempts = parseInt(img.getAttribute("data-using-fallback")) || 0;

        if (attempts >= 3) {
          console.error("Multiple fallback attempts failed for:", originalSrc);
          img.src = basePath + "img/placeholder.webp"; // Final fallback
          return;
        }

        img.setAttribute("data-using-fallback", (attempts + 1).toString());
      } else {
        img.setAttribute("data-using-fallback", "1");
      }

      // Extract filename and path information
      const filename = img.src.split("/").pop();

      // Try different path formats for Hostinger
      const attempts = [
        // Attempt 1: Relative path from current directory
        "img/certificates/" + filename,

        // Attempt 2: Absolute path from domain root
        "/img/certificates/" + filename,

        // Attempt 3: Full URL with domain
        baseUrl + "/img/certificates/" + filename,

        // Attempt 4: Path with subdirectory if applicable
        basePath + "img/certificates/" + filename,

        // Attempt 5: Try without 'certificates' subdirectory
        "img/" + filename,

        // Attempt 6: Try with lowercase filename
        "img/certificates/" + filename.toLowerCase(),

        // Attempt 7: Try with uppercase filename
        "img/certificates/" + filename.toUpperCase(),
      ];

      // Get the next attempt based on current attempt count
      const attemptCount =
        parseInt(img.getAttribute("data-using-fallback")) || 1;
      if (attemptCount <= attempts.length) {
        const nextAttempt = attempts[attemptCount - 1];
        console.log(`Attempt ${attemptCount}:`, nextAttempt);
        img.src = nextAttempt;
      } else {
        // Final fallback
        console.log("Using default fallback image");
        img.src = basePath + "img/placeholder.webp";
      }
    };

    // Mark as having fallback applied
    img.setAttribute("data-fallback-applied", "true");

    // Check if image is a certificate image and preemptively fix path if needed
    if (img.src.includes("certificates") && img.src.includes("'")) {
      // Fix paths with apostrophes for Hostinger
      const filename = img.src.split("/").pop();
      const fixedFilename = filename.replace("'", "a");
      const newSrc = img.src.replace(filename, fixedFilename);
      console.log(
        "Preemptively fixing path with apostrophe:",
        img.src,
        "->",
        newSrc
      );
      img.src = newSrc;
    }
  });

  // Create a placeholder SVG if it doesn't exist
  const placeholderImg = new Image();
  placeholderImg.src = basePath + "img/placeholder.webp";
  placeholderImg.onerror = function () {
    // Create a data URI for a simple placeholder
    const svgContent =
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/><text x="200" y="150" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#999999">Image Loading...</text><text x="200" y="180" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#999999">InternPortal</text></svg>';
    const dataURI = "data:image/svg+xml;base64," + btoa(svgContent);

    // Update all fallback images
    document
      .querySelectorAll('img[src="' + basePath + 'img/placeholder.webp"]')
      .forEach((img) => {
        img.src = dataURI;
      });
  };
});
