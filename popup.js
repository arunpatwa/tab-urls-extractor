document.addEventListener('DOMContentLoaded', () => {
    const saveTabsButton = document.getElementById('saveTabs');
    
    // Ensure the element exists before trying to add an event listener
    if (saveTabsButton) {
      saveTabsButton.addEventListener('click', () => {
        // Send a message to the background script to save tabs
        chrome.runtime.sendMessage({ action: "save_tabs" }, (response) => {
          if (response && response.status === "success") {
            console.log("Tabs successfully saved to file.");
          } else {
            console.error("Failed to save tabs.");
          }
        });
      });
    } else {
      console.error("The saveTabs button was not found.");
    }
  });
  