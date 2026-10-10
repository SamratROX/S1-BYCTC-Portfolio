// Checking device type
function checkDeviceType() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent,);

  if (isTouch || isMobileUserAgent) {
    document.body.classList.add("is-mobile");
  } else {
    document.body.classList.add("is-desktop");
  }
}
checkDeviceType();

// Copy btn 
async function copyToClipboard(type, button) {
  const phoneNumbers = {
    phone1: "6294798212",
    phone2: "7318872538",
    whatsapp1: "9851173310",
  };

  const number = phoneNumbers[type];

  if (!number || !button) return;

  try {
    await navigator.clipboard.writeText(number);

    // Change the icon to a check mark
    button.innerHTML = '<i class="fa-solid fa-check"></i>';

    // Clear the previous timer for this button
    clearTimeout(button.copyTimer);

    // Restore the copy icon after 3 seconds
    button.copyTimer = setTimeout(() => {
      button.innerHTML = '<i class="fa-solid fa-copy"></i>';
    }, 3000);
  } catch (error) {
    console.error("Failed to copy phone number:", error);
  }
}