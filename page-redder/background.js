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

  // create the proceed button
  var y = document.createElement("BUTTON");
  var s = document.createTextNode("PROCEED");
  y.setAttribute("id","proceed-button");
  y.appendChild(s);

  // Add a button for feedback
  var z = document.createElement("BUTTON");
  var q = document.createTextNode("FEEDBACK");
  z.setAttribute("id","feedback-button");
  z.appendChild(q);

  // add the blur screen
  const elem = document.createElement('div');
  elem.style.cssText = 'position: fixed; padding:0; top:0; left:0; width: 100%; height: 100%; background:rgba(24,24,24,0.95);';
  elem.appendChild(x);
  elem.appendChild(y);
  elem.appendChild(z);
  elem.setAttribute("id","blur-screen");
  document.body.appendChild(elem);

  document.getElementById("go-back-button").style = "margin: 10%;top: 75%;-ms-transform: translateY(-50%);transform: translateY(-50%);";
  document.getElementById("proceed-button").style = "margin: 30%;top: 75%;-ms-transform: translateY(-50%);transform: translateY(-50%);";
  document.getElementById("feedback-button").style = "margin: 0%;top: 75%;-ms-transform: translateY(-50%);transform: translateY(-50%);";

  document.getElementById("go-back-button").onclick = function() {window.history.back(); elem.remove();};
  document.getElementById("proceed-button").onclick = function() {elem.remove();};
  document.getElementById("feedback-button").onclick = function() { var x = document.createElement("FORM"); x.setAttribute("id", "myForm"); document.body.appendChild(x); var y = document.createElement("INPUT");y.setAttribute("type", "text");y.setAttribute("value", "Donald"); document.getElementById("myForm").appendChild(y);};

}

chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
