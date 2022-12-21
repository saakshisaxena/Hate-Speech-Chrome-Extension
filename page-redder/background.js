function reddenPage() {
  document.body.style.backgroundColor = 'red';
  console.log("Turns the page red");
  // console.log("doc.body = "+document.body.innerHTML);
  content = document.body.innerHTML;
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  // console.log(content);
  content = content.replace( /(<([^>]+)>)/ig, '');
  // console.log(content);
  str = content;
  // str=str.replaceAll("(?i)(^([a-z])\\.|(?<= )([a-z])\\.|(?<=\\.)([a-z])\\.)", "$2$3$4").trim();  
  // str=str.replaceAll("(?i)^(([a-z]) ([a-z]))($| )", "$2$3 ").trim();
  // str=str.replaceAll("(?i)(?<= )(([a-z]) ([a-z]))($| )", "$2$3 ").trim();
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
