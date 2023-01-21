function reddenPage() {
  let data = {
      "hate": true,
      "results": [
          {
              "original": "i hate white people",
              "processed": [
                  "hate",
                  "people"
              ],
              "hate": true
          },
          {
              "original": "we've updated our privacy and cookies policy",
              "processed": [
                  "update",
                  "privacy",
                  "cookies",
                  "policy"
              ],
              "hate": false
          },
          {
              "original": "we've made some important changes to our privacy and cookies policy and we want you to know what this means for you and your data",
              "processed": [
                  "make",
                  "important",
                  "change",
                  "privacy",
                  "cookies",
                  "policy",
                  "want",
                  "know",
                  "mean",
                  "data"
              ],
              "hate": false
          },
          {
              "original": "ok",
              "processed": [
                  "ok"
              ],
              "hate": false
          },
          {
              "original": "find out what's changed",
              "processed": [
                  "find",
                  "change"
              ],
              "hate": true
          },
          {
              "original": "let us know you agree to cookies",
              "processed": [
                  "let",
                  "us",
                  "know",
                  "agree",
                  "cookies"
              ],
              "hate": false
          },
          {
              "original": "let us know you agree to cookies",
              "processed": [
                  "let",
                  "us",
                  "know",
                  "agree",
                  "cookies"
              ],
              "hate": false
          },
          {
              "original": "we use",
              "processed": [
                  "use"
              ],
              "hate": false
          },
          {
              "original": "cookies",
              "processed": [
                  "cookies"
              ],
              "hate": false
          },
          {
              "original": "to give you the best online experience",
              "processed": [
                  "give",
                  "best",
                  "online",
                  "experience"
              ],
              "hate": true
          }
      ]
  };

  if (data.hate) {
    content = document.body.innerHTML;
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    content = content.replace( /(<([^>]+)>)/ig, ' ');
    str = content;
    str = str.replace(/\s\s+/g, '. ');
    console.log(str);

    // Create the new HTML element
    let overlay = document.createElement("div");

    // Set the CSS for the element
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(24,24,24,0.95);
        z-index: 9999;
    `;

    // Add the element to the body of the current webpage
    document.body.appendChild(overlay);

    // Create the "Go Back" button
    let goBackBtn = document.createElement("button");
    goBackBtn.innerHTML = "Go Back";
    goBackBtn.style.cssText = `
        position: absolute;
        bottom: 10%;
        left: 10%;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    `;
    // Create the "Proceed" button
    let proceedBtn = document.createElement("button");
    proceedBtn.innerHTML = "Proceed";
    proceedBtn.style.cssText = `
      position: absolute;
      bottom: 10%;
      right: 10%;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    `;

    // Create the "See More" button
    let seeMoreBtn = document.createElement("button");
    seeMoreBtn.innerHTML = "See More";
    seeMoreBtn.style.cssText = `
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    `;

    // Append the buttons to the overlay
    overlay.appendChild(goBackBtn);
    overlay.appendChild(proceedBtn);
    overlay.appendChild(seeMoreBtn);

    // Add the "Go Back" functionality to the "Go Back" button
    goBackBtn.onclick = function() {
      window.history.back();
      overlay.remove();
    };

    // Add the "Proceed" functionality to the "Proceed" button
    proceedBtn.onclick = function() {
      overlay.remove();
    };
  
    // Create a new div element
    let headingContainer = document.createElement("div");

    // Create the heading element
    let heading = document.createElement("h1");

    // Create image element
    let img = document.createElement("img");

    // Set the text content and styles for the heading
    heading.innerHTML = "Hate speech detected";
    heading.style.cssText = `
        margin: 0;
        padding: 0;
        text-align: center;
        color: white;
        font-size: 2em;
        font-weight: bold;
    `;

    // Get the URL of the image file
    let imgUrl = chrome.runtime.getURL("page-redder\whiteyeexample.png");

    // Set the image source
    img.src = imgUrl;

    img.style.cssText = `
        width: 50px;
        height: 50px;
        margin-right: 10px;
        filter: opacity(50%);
    `;

    // Append the heading and image to the div
    headingContainer.appendChild(img);
    headingContainer.appendChild(heading);

    // Set the CSS for the div
    headingContainer.style.cssText = `
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        align-items: center;
    `;

    // Append the div to the overlay
    overlay.appendChild(headingContainer);

    
    // // Create the button element
    let button = document.createElement("button");
    button.innerHTML = "Show Original";

    // Add an event listener to the button that will display the "original" field when clicked
    button.addEventListener("click", function() {
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].hate) {
                console.log(data.results[i].original);
            }
        }
    });

    // Add the button to the page
    document.body.appendChild(button);

    // Create a new div element to display the text result
    let textResult = document.createElement("div");
    textResult.style.cssText = `
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        color: white;
        font-size: 1.2em;
        text-align: center;
    `;

    // Add an event listener to the "See More" button that will update the textResult div when clicked
    seeMoreBtn.addEventListener("click", function() {
        let originalText = "Hate speech detected: <br> <b>";
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].hate) {
                originalText += data.results[i].original + "<br>";
            }
        }
        textResult.innerHTML = originalText;
    });

    // Append the textResult div to the overlay
    overlay.appendChild(textResult);


    
  }
  else {
    console.log("No hate speech detected!")
  }
}

chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});
