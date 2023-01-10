var searchButtonEl = $("#search-button");
var searchInputtitleEl = $("#title");
var searchInputauthorEl = $("#author");
var apiKey = "AIzaSyBVG1rpVMfNwBew0YglWcQdT0FSQPfR1E8";

function createBookInfo(bookdata) {
  bookdata.forEach((book, index) => {
    var bookInfoArea = $("<div/>")
      //.addClass("book-area") - do not use
      .addClass("carousel-item");
    //Create bookinfoArea div to show information about books

    if (index === 0) {
      bookInfoArea.addClass("active");
    }

    //Create booktitle, bookauthor,bookfrontpage, bookdesc divs and append to section div
    var bookTitle = $("<div/>").addClass("book-title").appendTo(bookInfoArea);
    bookTitle.html(book.volumeInfo.title);

    var bookAuthor = $("<div/>").addClass("book-author").appendTo(bookInfoArea);
    bookAuthor.html(book.volumeInfo.authors[0]);

    var bookFrontpage = $("<div/>")
      .addClass("book-frontpage")
      .appendTo(bookInfoArea);
    var imagePage = $("<img/>").appendTo(bookFrontpage);
    imagePage.attr("src", book.volumeInfo.imageLinks.smallThumbnail);
    console.log(book.volumeInfo.imageLinks.smallThumbnail);

    var bookDesc = $("<div/>").addClass("book-desc").appendTo(bookInfoArea);
    bookDesc.html(book.volumeInfo.description);

    getgiffy(book.etag, bookInfoArea);

    $(".carousel-inner").append(bookInfoArea);
  });
}
function getgiffy(etag, bookInfoArea) {
  $.get(
    `https://api.giphy.com/v1/gifs/random?tag=${etag}.data&api_key=kJUvzKYBeb8ygT26srrOdvDd4BJ4ITYv`
  ).then(function (bookgif) {
    // Get data for giffy images using Ajax
    console.log(bookgif.data.images.preview_gif);
    var bookGifArea = $("<div/>").addClass("book-gif");
    var gifPage = $("<img/>").appendTo(bookGifArea);
    gifPage.attr("src", bookgif.data.images.preview_gif.url);
    gifPage.attr("width", "150");
    gifPage.attr("height", "150");

    bookInfoArea.append(bookGifArea);
  });
}

function getBookInfo(event) {
  event.preventDefault();
  var searchTitle = searchInputtitleEl.val();

  var searchAuthor = searchInputauthorEl.val();

  var q = `q=intitle:${searchTitle}+inauthor:${searchAuthor}`;

  $.get(
    `https://www.googleapis.com/books/v1/volumes?${q}&orderBy=newest&key=${apiKey}`
  ).then(function (bookdata) {
    console.log(bookdata.items);
    createBookInfo(bookdata.items);
    // fetch book information through server api using apikey and publish year
  });
}

function init() {
  searchButtonEl.click(getBookInfo);
}

init();
