var data = {
  hate: true,
  results: [
    {
      original: "i hate white people",
      processed: ["hate", "people"],
      hate: true,
    },
    {
      original: "i hate people ahhhh",
      processed: ["hate", "people"],
      hate: true,
    },
    {
      original: "we've updated our privacy and cookies policy",
      processed: ["update", "privacy", "cookies", "policy"],
      hate: false,
    },
    {
      original:
        "we've made some important changes to our privacy and cookies policy and we want you to know what this means for you and your data",
      processed: [
        "make",
        "important",
        "change",
        "privacy",
        "cookies",
        "policy",
        "want",
        "know",
        "mean",
        "data",
      ],
      hate: false,
    },
    {
      original: "ok",
      processed: ["ok"],
      hate: false,
    },
    {
      original: "find out what's changed",
      processed: ["find", "change"],
      hate: true,
    },
    {
      original: "let us know you agree to cookies",
      processed: ["let", "us", "know", "agree", "cookies"],
      hate: false,
    },
    {
      original: "let us know you agree to cookies",
      processed: ["let", "us", "know", "agree", "cookies"],
      hate: false,
    },
    {
      original: "we use",
      processed: ["use"],
      hate: false,
    },
    {
      original: "cookies",
      processed: ["cookies"],
      hate: false,
    },
    {
      original: "to give you the best online experience",
      processed: ["give", "best", "online", "experience"],
      hate: true,
    },
  ],
};

async function runModel(text,bias){
  if(bias == null){
    let data = await chrome.storage.sync.get("sensitivity")
    let val = data.sensitivity
    var bias = val
  }
  let parentalControlVal = await chrome.storage.sync.get("parentalControl")
  parentalControl = (parentalControlVal.parentalControl === 'true')
  let response = await fetch("http://localhost:5000/model", {
            method: "POST",
            headers: {
            
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: JSON.stringify({
            "data": text,
            "bias": bias
            }),
    })
  let resJson = await response.json()
  return resJson
}


async function report(statement,hate){
  console.log(statement,hate)
  await fetch("http://localhost:5000/report", {
          method: "POST",
          headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: JSON.stringify({
          "originalText": statement,
          "hate": hate,
          }),
  })
  .then((response) => response.json())
  .then((data) => {
      console.log("Success:", data);
  })
  .catch((error) => {
      console.error("Error:", error);
  });
}



function getDump(document) {
  content = document.body.innerHTML;
  content = content.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  content = content.replace(
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    ""
  );
  content = content.replace(/(<([^>]+)>)/gi, " ");
  str = content;
  str = str.replace(/\s\s+/g, ". ");
  return str;
}

function createButton(inner, css) {
  btn = document.createElement("button");
  btn.innerHTML = inner;
  btn.style.cssText = css;
  return btn;
}

function createHeading(){
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
    let imgUrl = chrome.runtime.getURL("whiteyeexample.png");
  
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
      return headingContainer
}

function createTextResult(data,seeMoreBtn){

  let textResult = document.createElement("div");
  textResult.style.cssText = `
    padding: 10px, 10px, 10px, 10px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    font-size: 1.2em;
    text-align: center;
    display: none;
    flex-wrap: wrap;
    max-height: 400px;
    overflow-y: auto;
    background-color:white;
    padding:5vh;
    padding-top: 2vh;
  `;
  textResult.id = "textResult"
  let headSeeMore= document.createElement("h1");
  headSeeMore.innerHTML = "Hate Speech Detected...";
  headSeeMore.style.cssText=`
  font-size: 4vh;
  font-weight:600;
  color:black;
  `
  textResult.appendChild(headSeeMore)
  seeMoreBtn.addEventListener("click", function () {

    if (document.getElementById("popup")!=null) {
      console.log(document.getElementById('popup'))
      document.getElementById('popup').remove(); 
    }
    
    if (document.getElementById("lineText") == null){
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].hate) {
          let resultBar = document.createElement("div");
          resultBar.setAttribute("id","resultBar");
          // Create a new span element to display the text of the line
          let lineText = document.createElement("span");
          lineText.setAttribute("id","lineText");
          lineText.innerHTML = data.results[i].original + "\t";

          // Create a new button element
          let reportBtn = createButton(
            "Report",
            `
              background-color: red;
              color: white;
              padding: 4px 8px;
              border: none;
              cursor: pointer;
            `
          )

          reportBtn.innerHTML = "Report";
          reportBtn.style.cssText = `
            
           
          background-color: red;
          color: white;
          padding: 1vh;
          border: none;
          border-radius: 2vh;
          box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
          `;
          lineText.style.cssText = `
            flex-basis: 70%;
            margin-bottom: 20px;
            margin-left: 15px;
            margin-right: 15px;
            margin-top: 15px;
            float: left;
          `;
          resultBar.style.cssText = `
          background-color: rgba(241, 241, 241, 0.75);
          color: black;
          font-size: 1.2em;
          text-align: center;
          max-height: 400px;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 1vh;
          margin-bottom: 1vh;
          border-radius: 1vh;
          `;

          // Append the button and the span element to the textResult div
          resultBar.appendChild(lineText);
          resultBar.appendChild(reportBtn);
          textResult.appendChild(resultBar);
          

          reportBtn.addEventListener("click", function () {
            // Send the tuple of the string and "false" to the API endpoint
            report(data.results[i].original, false)
            reportBtn.disabled = true;
            reportBtn.innerHTML = "REPORTED!!";
            reportBtn.style.cssText = `
            color: white;
            background-color: grey;
            padding: 4px 8px;
            border: none;
            border-radius: 15px`
          });
        }
      }
      textResult.style.display = "block";
    }


    if (textResult.style.visibility != "visible") {
      // If textResult is hidden, show it and populate with data
      textResult.style.visibility = "visible"
    } else {
      // If textResult is shown, hide it
      textResult.style.visibility = "hidden";
    }
  });
  return textResult;
}


function createFeedback(data){
    let feedbackBtn = createButton(
        "Report <br/> Hate!",
        ` position: fixed;
          top: 50%;
          right: 0;
          background-color: hwb(42deg 12% 0%);
          color: #ae2323;
          border: none;
          cursor: pointer;
          border-radius: 50%;
          writing-mode: vertical-rl;
          width: auto;
          height: 10vh;
          transform-origin: center;
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
          padding:0;
          padding-left:1vw;
          padding-right:1vw;
          min-width:0;
          min-height:0;
          font-size:1.2vh;
          font-weight:bold;
          z-index: 100000;
        `
    )
    feedbackBtn.id = "feedback-btn"
    if(!parentalControl){
      document.body.appendChild(feedbackBtn);
    }
    // Add an event listener to the feedback button
    feedbackBtn.addEventListener("click", function () {
        // To check if the pop is open then don't open it again!
        console.log(document.getElementById("popup")!=null)
        if (document.getElementById("popup")!=null) {
          console.log(document.getElementById('popup'))
          document.getElementById('popup').remove();
          
        }
        else{
        if (document.getElementById("textResult")!=null) {
          textResult.style.visibility = "hidden";
        }
        
        // Create the new HTML element for the pop-up
        let feedbackPopup = document.createElement("div");
    
        // Set the CSS for the element to position it as a pop-up
        feedbackPopup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            z-index: 9999;
        `;
    
        // Add the content for the pop-up
        feedbackPopup.innerHTML = `
          <div id='feedback-head'>
            <h1 style='font-size:5vh'>Feedback</h1>
            <button id="submit-feedback-btn">Submit</button>
          </div>
        `;
        

        feedbackPopup.setAttribute("id","popup");
        // Add the element to the body of the current webpage
        document.body.appendChild(feedbackPopup);

        document.getElementById('feedback-head').style.cssText = `
            flex-direction: row;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5vh;
          `;
    
        // Create a container element for the original sentences and toggle buttons
        let feedbackList = document.createElement("div");
        feedbackList.classList.add("feedback-list");
        feedbackPopup.appendChild(feedbackList);
        feedbackList.style.height = "300px";
        feedbackList.style.overflowY = "auto";
    
        // To keep a track of changes of the toggle button
        let feedbackDataArray = [];
        // Add the data from hate speech model to the pop up
        for (let i = 0; i < data.results.length; i++) {
            let group = document.createElement('div');
            group.style.cssText = `
            background-color: #f1f1f1bf;
            color: black;
            font-size: 1.2em;
            text-align: center;
            max-height: 400px;
            overflow-y: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items:center;
            padding: 1vh;
            margin-bottom: 1vh;
            border-radius: 1vh;
            `
            let sentence = document.createElement("p");
            sentence.innerHTML = `${i + 1}. ${data.results[i].original}`;
            sentence.classList.add("sentence");
            group.appendChild(sentence);
    
            let toggleBtn = document.createElement("button");
            toggleBtn.style.cssText = `
            border-radius: 1vh;
            border: unset;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            min-width: 20%;
            height: 100%;
            padding: 1vh;
            `
            
            if (data.results[i].hate) {
                toggleBtn.innerHTML = "Hate";
                toggleBtn.style.backgroundColor = "red";
            } 
            else {
                toggleBtn.innerHTML = "Not Hate";
                toggleBtn.style.backgroundColor = "rgb(76, 175, 80)";
            }

            toggleBtn.classList.add("toggle-btn");
            toggleBtn.id = `toggle-btn-${i + 1}`;
            toggleBtn.dataset.hate = data.results[i].hate;
            
            toggleBtn.onclick = function () {
                this.dataset.hate = !JSON.parse(this.dataset.hate);
                console.log("Original hate data:", this.dataset.hate);
                document.getElementById(`toggle-btn-${i + 1}`).innerHTML = this.dataset.hate == "true" ? "Hate" : "Not Hate";
                // Add functionality to submit the tuple on the click of the toggle button
                // Check if the "hate" value of the sentence has been changed
                let statement = this.previousSibling.innerHTML;
                let hateValue = this.dataset.hate;
                console.log(hateValue)
                let feedbackData = { statement: statement, hate: hateValue };
                if (hateValue=="true"){
                  toggleBtn.style.backgroundColor = "red";
                }else {
                  toggleBtn.style.backgroundColor = "rgb(76, 175, 80)";
              }
                let existingDataIndex = feedbackDataArray.findIndex(
                    (data) => data.statement === statement
                );
                if (existingDataIndex !== -1) {
                    feedbackDataArray[existingDataIndex] = feedbackData;
                } 
                else {
                    console.log(feedbackData);
                    feedbackDataArray.push(feedbackData);
                }
            };
            
            group.appendChild(toggleBtn);
            feedbackList.appendChild(group);
        }
    
        // Add submit button listener
        let submitBtn = document.getElementById("submit-feedback-btn");
            submitBtn.addEventListener("click", function () {
            //report each change to server
            for (let x = 0; x < feedbackDataArray.length; x++){
                report(feedbackDataArray[x].statement,feedbackDataArray[x].hate)
            }
            document.body.removeChild(feedbackPopup);
        });

        // Add styling to the submit button 
        submitBtn.style.cssText = `
        background-color: #4caf50;
        border: unset;
        padding: 2vh;
        border-radius: 2vh;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        `
      
        
    
        // Create a close button
        let closeBtn = document.createElement("button");
        closeBtn.innerHTML = "x";
        closeBtn.style.cssText = `
            position: absolute;
            right:    0;
            top:   0;
            padding: 5px 5px 5px 5px;
            background-color: red ;
            color: white;
            border: none;
            cursor: pointer;
            height: fit-content;
            width: fit-content
        `;
        feedbackPopup.appendChild(closeBtn);
        closeBtn.addEventListener("click", function () {
            document.body.removeChild(feedbackPopup);
        });
      }
    });
}

/*****************************************************************************************
 *****************************************************************************************/

// INTEGRATED WITH SERVER:

var parentalControl; 

// Adding the loading screen
// Add the loading screen if it doesn't exist
if (!document.getElementById("loading-screen")) {

  let loadingScreen = document.createElement("div");
  loadingScreen.id="loading-screen"
  loadingScreen.innerHTML = '<div class="spinner"></div>';

  // Set the CSS for the element
  loadingScreen.style.cssText = `
      position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
    `;

  // Create the spinner element
  var spinner = document.createElement("div");
  spinner.id = "spinner";
  spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spinner 0.8s ease-in-out infinite;
    margin: auto;
  `;

  // Append the spinner element to the loading screen element
  loadingScreen.appendChild(spinner);

  // Define the spinner animation
  var spinnerAnimation = `
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  `;
  // Create a style element and add the spinner animation to it
  var spinnerStyles = document.createElement("style");
  spinnerStyles.innerHTML = spinnerAnimation;

  // Add the style element to the head of the document
  document.head.appendChild(spinnerStyles);



  // Add the element to the body of the current webpage
  document.body.appendChild(loadingScreen);
  console.log("loading screen added");
}

runModel(getDump(document),null).then((res)=>{
  // Remove the loading screen
  let loadingScreen = document.getElementById("loading-screen");
  console.log(loadingScreen);
  loadingScreen.remove();
  console.log("loading screen removed");

  // Create the "Feedback" button
  createFeedback(res)

  if (res.hate) {
    console.log(res)
    //console.log(getDump(document));

    // Create the new HTML element
    if ((document.getElementById("overlay")) === null){//prevents duplicate overlays
      let overlay = document.createElement("div");
      overlay.id="overlay"

      // Set the CSS for the element
      overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 9999;
        `;

      // Add the element to the body of the current webpage
      document.body.appendChild(overlay);

      // Create the "Go Back" button
      let goBackBtn = createButton(
        "Go Back",
        `position: absolute; bottom: 10%; left: 10%; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;`
      );

      // Create the "Proceed" button
      let proceedBtn = createButton(
        "Proceed",
        `position: absolute;
        bottom: 10%;
        right: 10%;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;`
      );

      // Create the "See More" button
      let seeMoreBtn = createButton(
        "See More",
        `position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;`
        )

      // Append the buttons to the overlay
      overlay.appendChild(goBackBtn);
      console.log(parentalControl)
      if(!parentalControl){
        overlay.appendChild(proceedBtn);
        overlay.appendChild(seeMoreBtn);
      }
      

      // Add the "Go Back" functionality to the "Go Back" button
      goBackBtn.onclick = function () {
        window.history.back();
        overlay.remove();
      };

      // Add the "Proceed" functionality to the "Proceed" button
      proceedBtn.onclick = function () {
        overlay.remove();
      };

      // Create a new div element
      let headingContainer = createHeading()

      // Append the div to the overlay
      overlay.appendChild(headingContainer);

      // // Create the button element
      let button = createButton("Show Original",``);
      

      // Add an event listener to the button that will display the "original" field when clicked
      button.addEventListener("click", function () {
        for (let i = 0; i < res.results.length; i++) {
          if (res.results[i].hate) {
            console.log(res.results[i].original);
          }
        }
      });

      // Add the button to the page
      document.body.appendChild(button);

      // Create a new div element to display the text result
      textResult = createTextResult(res,seeMoreBtn)

      // Append the textResult div to the overlay
      overlay.appendChild(textResult);

    }

  } else {
    if ((document.getElementById("feedback-btn")) === null){
      console.log("No hate speech detected!");
      console.log(res)
      // Create the "Feedback" button

      createFeedback(res)
    }
  }
})

// USES TEST DATA:
/*if (data.hate) {
  console.log(getDump(document));

  // Create the new HTML element
  let overlay = document.createElement("div");

  // Set the CSS for the element
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        z-index: 9999;
    `;

  // Add the element to the body of the current webpage
  document.body.appendChild(overlay);

  // Create the "Go Back" button
  let goBackBtn = createButton(
    "Go Back",
    `position: absolute; bottom: 10%; left: 10%; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;`
  );

  // Create the "Proceed" button
  let proceedBtn = createButton(
    "Proceed",
    `position: absolute;
    bottom: 10%;
    right: 10%;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;`
  );

  // Create the "See More" button
  let seeMoreBtn = createButton(
    "See More",
    `position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;`
    )

  // Append the buttons to the overlay
  overlay.appendChild(goBackBtn);
  overlay.appendChild(proceedBtn);
  overlay.appendChild(seeMoreBtn);

  // Add the "Go Back" functionality to the "Go Back" button
  goBackBtn.onclick = function () {
    window.history.back();
    overlay.remove();
  };

  // Add the "Proceed" functionality to the "Proceed" button
  proceedBtn.onclick = function () {
    overlay.remove();
  };

  // Create a new div element
  let headingContainer = createHeading()

  // Append the div to the overlay
  overlay.appendChild(headingContainer);

  // // Create the button element
  let button = createButton("Show Original",``);
  

  // Add an event listener to the button that will display the "original" field when clicked
  button.addEventListener("click", function () {
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].hate) {
        console.log(data.results[i].original);
      }
    }
  });

  // Add the button to the page
  document.body.appendChild(button);

  // Create a new div element to display the text result
  textResult = createTextResult(data,seeMoreBtn)

  // Append the textResult div to the overlay
  overlay.appendChild(textResult);

  // Create the "Feedback" button
  createFeedback(data, overlay)

} else {
  console.log("No hate speech detected!");
}*/
