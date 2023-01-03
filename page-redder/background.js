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

  // create the go back button
  var x = document.createElement("BUTTON");
  var t = document.createTextNode("GO BACK");
  x.setAttribute("id","go-back-button");
  x.appendChild(t);
  // document.body.appendChild(x);

  // add the blur screen
  const elem = document.createElement('div');
  elem.style.cssText = 'position: fixed; padding:0; top:0; left:0; width: 100%; height: 100%; background:rgba(24,24,24,0.95);';
  elem.appendChild(x);
  elem.setAttribute("id","blur-screen");
  document.body.appendChild(elem);

  document.getElementById("go-back-button").onclick = function() {window.history.back(); elem.remove();};
}


chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
