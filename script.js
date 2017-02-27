var isbn;
var book;
var apikey = "AIzaSyDFFrq30NUVTot6ubglCDwCC4aHx3PN2Bg" ;
var isisbn;



$('.search').on('click', function(){
 isbn = ($('#isbn_search').val());
  fetch(isbn);

});

var postelm=function(bid, bt, bst ,bi, bd,ba,bc) {

    source = $('#book-template').html();
    template = Handlebars.compile(source);
    newHTML = template(
      {
        bookid: bid,
        booktitle:bt,
        booksubtitle: bst,
        bookisbn: bi,
        bookdescription:bd,
        bookauthor:ba,
        bookcover:bc

      });

  return newHTML;
}





var showBook = function(isThisisbn) {
console.log('lookup by isbn: '+isThisisbn);
  $('.book').remove();
var y;

if (isThisisbn)  {y=1} else {y=10};

for (var i=0; i<y; i++){
//if (book.items[i].volumeInfo.imageLinks == 'undefined' ){ cover = "."} else {cover = book.items[i].volumeInfo.imageLinks.thumbnail }
//if (book.items[i].volumeInfo.industryIdentifiers[0] == 'undefined') {identifier = "n/a"} else {identifier = book.items[i].volumeInfo.industryIdentifiers[0].identifier }

  $('.result').append(

   postelm(
            i,
            book.items[i].volumeInfo.title,
            book.items[i].volumeInfo.subtitle,
            book.items[i].volumeInfo.industryIdentifiers[0].identifier,
            book.items[i].volumeInfo.description,
            book.items[i].volumeInfo.authors,
            book.items[i].volumeInfo.imageLinks.thumbnail
          ));


            }
              $('.book').on('click', function() {

                  isbn = $(this).data('id');
                  alert(isbn);
                fetch(isbn);
                console.log("Book # "+isbn+" clicked");
              });

            }







var fetch = function (query) {
  alert(query);
   isisbn = (!isNaN(query) && (query.length == 10 || query.length==13));

    if (isisbn) {
      var getISBN = "https://www.googleapis.com/books/v1/volumes?key="+apikey+"&q=isbn:"+ query;

  } else {
    var getISBN = "https://www.googleapis.com/books/v1/volumes?key="+apikey+"&q=intitle:"+ query;
   }

  console.log("url : "+getISBN);

  $.ajax({
    method: "GET",
    url: getISBN,
    dataType: "json",
    success: function(data) {
      console.log('success')
      book = (data);
      showBook(isisbn);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      console.log('error');
    }
  });
};
