chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
  });
  
  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "save_tabs") {
      chrome.tabs.query({}, (tabs) => {
        const urls = tabs.map(tab => tab.url); // Extract URLs from all tabs
        console.log("Opened Tab URLs: ", urls);
  
        // Convert the array of URLs into a string format (each URL on a new line)
        const fileContent = urls.join('\n');
  
        // Create a blob with the content
        const blob = new Blob([fileContent], { type: 'text/plain' });
  
        // Use FileReader to read the Blob as a data URL
        const reader = new FileReader();
        reader.onloadend = function() {
          const dataUrl = reader.result;
  
          // Trigger the download of the file with the tab URLs
          chrome.downloads.download({
            url: dataUrl, // Use the data URL
            filename: 'tab_urls.txt',  // Name of the file to save
            saveAs: true  // Prompt user to choose where to save the file
          }, (downloadId) => {
            console.log("Download started with ID: ", downloadId);
          });
        };
  
        reader.readAsDataURL(blob); // Read the blob as a data URL
      });
  
      sendResponse({ status: "success" });
    }
    return true; // Required to use asynchronous `sendResponse`
  });
  