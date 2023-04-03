function save_options() {
    var parentalCon = document.getElementById('Parental Control').value;
    var bias = document.getElementById('Bias').value;
    var sensvalue = (1 - bias).toFixed(1);
    console.log(parentalCon)
    console.log(sensvalue)
    chrome.storage.sync.set({
      parentalControl: parentalCon,
      sensitivity: sensvalue
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  function restore_options() {
    chrome.storage.sync.get({
      parentalControl: false,
      sensitivity: 0.7,
    }, function(items) {
      sensvalue = (1 - items.sensitivity).toFixed(1);
      document.getElementById("sens-value").innerHTML = String(sensvalue);
      document.getElementById('Parental Control').value = items.parentalControl;
      document.getElementById('Bias').value = sensvalue;
    });
  }

  function setSens() {
    sensitivity = document.getElementById('Bias').value
    document.getElementById("sens-value").innerHTML = String(sensitivity);
  };

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
  document.getElementById('Bias').onchange = function()  {setSens()};