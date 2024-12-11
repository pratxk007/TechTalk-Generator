const modal = document.getElementById("modal");
const changeDetailsBtn = document.getElementById("changeDetails");
const saveDetailsBtn = document.getElementById("saveDetails");
const form = document.forms["details-form"];
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwW81njdQtqjuRhBRtZw6-g4N88W2V_qJj1C-GgIsUH6ldL6LpLCK-EiLG-OVozXpO85Q/exec"; // Replace URL for your own excel sheet

const toast = document.getElementById("toast"); // Reference to the toast element

changeDetailsBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Step 6: Save event details to Google Sheets
saveDetailsBtn.addEventListener("click", () => {
  const speakerName = document.getElementById("newSpeaker").value;
  const topicName = document.getElementById("newTopic").value;
  const eventDate = document.getElementById("newDate").value;
  const eventTime = document.getElementById("newTime").value;

  // Display data in modal (for preview)
  if (speakerName)
    document.getElementById("speakerName").textContent = speakerName;
  if (topicName) document.getElementById("topicName").textContent = topicName;
  if (eventDate) {
    const [year, month, day] = eventDate.split("-");
    document.getElementById(
      "eventDate"
    ).textContent = `${day}/${month}/${year}`;
  }
  if (eventTime) document.getElementById("eventTime").textContent = eventTime;
});

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  // Send form data using Fetch API
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      modal.style.display = "none"; // Close the modal after form submission
    })
    .catch((error) => {
      console.error("Error!", error.message);
      showToast("Error submitting form. Please try again.");
    });
});

// Function to show toast notification

// Download the image
document.getElementById("download").addEventListener("click", function () {
  const captureElement = document.getElementById("capture");
  html2canvas(captureElement).then((canvas) => {
    const link = document.createElement("a");
    link.download = "CIMET_Tech_Talks.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
