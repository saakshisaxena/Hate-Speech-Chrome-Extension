 /*  chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
    
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["./script.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
            })
            .catch(err => console.log(err));
}); */
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) => {
    
  chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./script.js"]
  })
      .then(() => {
          console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch(err => console.log(err));
}) 
  
chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes("chrome://")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["script.js"]
      });
    }
    
  });  

chrome.storage.sync.set({
  parentalControl: false,
  sensitivity: 0
}).then(() => {
  console.log("parentalControl is set to " + false);
  console.log("sensitivity is set to " + 0);
});
