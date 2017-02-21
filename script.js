var isbn;
var book;
var apikey = "AIzaSyDFFrq30NUVTot6ubglCDwCC4aHx3PN2Bg" ;


$('.search').on('click', function(){
 isbn = ($('#isbn_search').val());
 if (isbn.length > 4) {
  fetch(isbn);


 }

});

var postelm=function(bt, bst ,bd,ba,bc) {

    source = $('#book-template').html();
    template = Handlebars.compile(source);
    newHTML = template(
      {
        booktitle:bt,
        booksubtitle: bst,
        bookdescription:bd,
        bookauthor:ba,
        bookcover:bc
      });

  return newHTML;
}

var showBook = function(obj) {
//  console.log("showBook:"+obj);
  $('.book').remove();
for (var i=0; i<9; i++){
  $('.result').append(
   postelm(book.items[i].volumeInfo.title, book.items[i].volumeInfo.subtitle,book.items[i].volumeInfo.description,book.items[i].volumeInfo.authors,book.items[i].volumeInfo.imageLinks.thumbnail  ));
}
  }






var fetch = function (query) {

  if (isNaN(query)) {
    console.log(query.length);
    var getISBN = "https://www.googleapis.com/books/v1/volumes?key="+apikey+"&q="+ query;
  } else {
    var getISBN = "https://www.googleapis.com/books/v1/volumes?key="+apikey+"&q=isbn:"+ query;
   }

  console.log("url : "+getISBN);

  $.ajax({
    method: "GET",
    url: getISBN,
    dataType: "json",
    success: function(data) {
      console.log('success')
      book = (data);
      showBook(book);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      console.log('error');
    }
  });
};
