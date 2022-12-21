function runSwitchjs() {
  // chrome.tabs.executeScript({
  //   file: 'switch.js'
  // });
  alert("Hate Speech Detected!");
}

// A function to use as callback
// function doStuffWithDom(domContent) {
//   console.log('I received the following DOM content:\n' + domContent);
// }

// document.getElementById("test").addEventListener('click', () => {
//   console.log("Popup DOM fully loaded and parsed");

// function modifyDOM() {
//     //You can play with your DOM here or check URL against your regex
//     console.log('Tab script:');
//     console.log(document.body);
//     return document.body.innerHTML;
// }

// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.text && (request.text == "getDOM")) {
//       sendResponse({ dom: document.body.innerHTML });
//     }
//   }
// );

console.log("TEST EXTENSION");

document.getElementById('clickme').addEventListener('click', runSwitchjs);

chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, { action: "report_back" }, function(response) {
    console.log(response);
  });
});