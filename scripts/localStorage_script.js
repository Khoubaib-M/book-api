const bookName = $('input[placeholder="Title"]')
const submit = $('button[type="submit"]')
const history = $('.historyBtn')
const historyContainer = $('#history-container')
const clearHistory = $('#clearHistoryBtn')

submit.on('click', function(){
  localStorage.setItem(localStorage.length + 1, bookName.val());
});

history.on('click', function(){
  historyContainer.empty();
  var historyTitle = $("<h4>Search History</h4>");
  historyContainer.append(historyTitle)
  
  for (var key in localStorage) {
      var value = localStorage.getItem(key);
      if (value !== null) {
        var h5 = $("<h5>" + value + "</h5>");
        historyContainer.append(h5)
      };
    };
});


clearHistory.on('click', function(){
  historyContainer.empty();
  localStorage.clear();
});