function save_options() {
    var parentalCon = document.getElementById('Parental Control').value;
    var bias = document.getElementById('Bias').value;
    console.log(parentalCon)
    console.log(bias)
    chrome.storage.sync.set({
      parentalControl: parentalCon,
      sensitivity: bias
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
      sensitivity: 0,
    }, function(items) {
      document.getElementById('Parental Control').value = items.parentalControl;
      document.getElementById('Bias').value = items.sensitivity;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);

