const bookName = $('input[placeholder="Title"]');
const submit = $('button[type="submit"]');
const history = $(".historyBtn");
const historyContainer = $("#history-container");
const clearHistory = $("#clearHistoryBtn");

submit.on("click", function (e) {
  e.preventDefault();
  localStorage.setItem(localStorage.length + 1, bookName.val());
});

history.on("click", function() {
  historyContainer.empty();
  var historyTitle = $("<h4>Search History</h4>");
  historyContainer.append(historyTitle);

  for (var key in localStorage) {
    var value = localStorage.getItem(key);
    if (value !== null) {
      var a_link = $("<p><a href='#' class='value-link'>" + value + "</a></p>");
      historyContainer.append(a_link);
    };
  };

  $(".value-link").click(function() {
    var searchTitle = $(this).text();
    console.log(searchTitle);
    var q = `q=intitle:${searchTitle}`;

    $.get(
      `https://www.googleapis.com/books/v1/volumes?${q}&orderBy=newest&key=${apiKey}`
    ).then(function (bookdata) {
      console.log(bookdata.items);
      createBookInfo(bookdata.items);
    });

  });

});
    



clearHistory.on("click", function () {
  historyContainer.empty();
  localStorage.clear();
});
