function reddenPage() {
  // document.body.style.backgroundColor = 'red';
  // console.log("Turns the page red");
  content = document.body.innerHTML;
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  content = content.replace( /(<([^>]+)>)/ig, ' ');
  str = content;
  str = str.replace(/\s\s+/g, '. ');
  console.log(str);
  const elem = document.createElement('div');
  elem.style.cssText = 'position: fixed; padding:0; top:0; left:0; width: 100%; height: 100%; background:rgba(24,24,24,0.95);';
  document.body.appendChild(elem);
}

chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
