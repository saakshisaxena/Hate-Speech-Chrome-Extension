function reddenPage() {
  document.body.style.backgroundColor = 'red';
  console.log("Turns the page red");
  content = document.body.innerHTML;
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  content = content.replace( /(<([^>]+)>)/ig, '');
  str = content;
  str = str.replace(/\s\s+/g, '. ');
  console.log(str);
}

chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
