// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function reddenPage(){
    var newURL = 'feedback.html';
    chrome.tabs.create({ url: newURL });
    
}
// This event is fired with the user accepts the input in the omnibox.
chrome.action.onClicked.addListener((tab) => {
    // Encode user input for special characters , / ? : @ & = + $ #
    if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: reddenPage
    });
  }
});