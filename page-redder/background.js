
  chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
    
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["./script.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
            })
            .catch(err => console.log(err));
});
  
   chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes("chrome://")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["script.js"]
      });
    }
    
  }); 
  
  
  // chrome.action.onClicked.addListener(function(tab) {
  //   // let feedbackUrl = chrome.runtime.getURL("feedback.html");
  //   console.log("feedback button");
  //       // To be deleted
  //       overlay.remove();
  //       console.log("after overlay.removal");
  //       ///////////////
  //       // chrome.tabs.create({url:feedbackUrl}, function(tab){console.log("tab created", tab)}); 
  // });
