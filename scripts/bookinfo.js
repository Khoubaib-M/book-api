// created global variables
var searchButtonEl = $("#search-button");
var searchInputtitleEl = $("#title");
var searchInputauthorEl = $("#author");
var apiKey = "AIzaSyBVG1rpVMfNwBew0YglWcQdT0FSQPfR1E8";
var carouselInner = document.querySelectorAll(".carousel-inner");

function validateAuthor(authors) {
  // selecting number of authors
  if (!authors) {
    authors = "Unknown Author";
  } else if (authors.length > 1) {
    return `Authors: ${authors[0]} and more ${authors.length - 1}`;
  }
  return `Author: ${authors}`;
}

function createBookInfo(bookdata) {
  $(".carousel-inner").html("");
  bookdata.forEach((book, index) => {
    var bookInfoArea = $("<div/>").addClass("carousel-item");
    //Create bookinfoArea div to show information about books

    if (index === 0) {
      bookInfoArea.addClass("active");
    }

    //Create booktitle, bookauthor,bookfrontpage, bookdesc divs and append to carousel-inner div
    var bookTitle = $("<div/>").addClass("book-title").appendTo(bookInfoArea);
    bookTitle.html("Title: " + book.volumeInfo.title);

    var bookAuthor = $("<div/>").addClass("book-author").appendTo(bookInfoArea);

    var authors = validateAuthor(book.volumeInfo.authors);

    bookAuthor.html(authors);

    var bookFrontpage = $("<div/>")
      .addClass("book-frontpage")
      .appendTo(bookInfoArea);
    var imagePage = $("<img/>").appendTo(bookFrontpage);

    if (book.volumeInfo.imageLinks) {
      imagePage.attr("src", book.volumeInfo.imageLinks.smallThumbnail);
    }

    // Added modal - MM
    $(carouselInner).each(function (counter) {
      $(bookInfoArea).append(
        `<a class="viewMoreLink" id="${index}">View More</a>`
      );

      var viewDescLink = document.querySelectorAll(".viewMoreLink");

      $(viewDescLink).on("click", function (event) {
        //creating elements inside modal
        var getModalClass = document.getElementById("modalTest");
        getModalClass.style.display = "block";

        var bookNameTitle = document.getElementById("testParaTitle");
        var bookNameDesc = document.getElementById("testParaDesc");
        var bookNameAuthor = document.getElementById("testParaAuthor");

        var btnClicked = event.target.id;
        console.log(bookdata[btnClicked]);

        // displaying modal information
        bookNameTitle.textContent =
          "Title: " + bookdata[btnClicked].volumeInfo.title;

        bookNameDesc.textContent =
          "Description: " + bookdata[btnClicked].volumeInfo.description;

        bookNameAuthor.textContent =
          "Author: " + bookdata[btnClicked].volumeInfo.authors;

        // closing modal by pressing X
        var closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", function () {
          getModalClass.style.display = "none";
        });

        // closinh modal by pressing close button
        var closeModalBtn = document.getElementById("closeModalBtn");
        closeModalBtn.addEventListener("click", () => {
          getModalClass.style.display = "none";
        });
      });
    });
    // end of modal code

    getgiffy(book.etag, bookInfoArea);

    $(".carousel-inner").append(bookInfoArea);
  });
}

function getgiffy(etag, bookInfoArea) {
  // get gif image using etag from bookdata of google api
  $.get(
    `https://api.giphy.com/v1/gifs/random?tag=${etag}.data&api_key=kJUvzKYBeb8ygT26srrOdvDd4BJ4ITYv`
  ).then(function (bookgif) {
    var bookGifArea = $("<div/>").addClass("book-gif");
    // creating div for gif image
    var gifPage = $("<img/>").appendTo(bookGifArea);
    gifPage.attr("src", bookgif.data.images.preview_gif.url);
    gifPage.attr("width", "150");
    gifPage.attr("height", "150");

    bookInfoArea.append(bookGifArea);
  });
}

function getBookInfo(event) {
  event.preventDefault();
  // getting input values of title and author
  var searchTitle = searchInputtitleEl.val();

  var searchAuthor = searchInputauthorEl.val();

  var q = `q=intitle:${searchTitle}`; // query search for inputted title

  if (searchAuthor) {
    // add author to search query if user inputs author
    q += `+inauthor:${searchAuthor}`; //appending inputted author to query search
  }

  var url = `https://www.googleapis.com/books/v1/volumes?${q}&orderBy=newest&key=${apiKey}`;
  $.get(url).then(function (bookdata) {
    createBookInfo(bookdata.items);
    // get book information through server api using apikey and passing querysearch
  });
}

function init() {
  searchButtonEl.click(getBookInfo);
}

init();

// mm's testing

function modalTest() {
  //
}
modalTest();
