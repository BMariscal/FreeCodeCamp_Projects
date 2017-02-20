function generateQuote() {
    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
      type: 'POST', // The HTTP Method
      data: {}, // Additional parameters here
      datatype: 'json',
      success: function(data) {
        quote = JSON.parse(data);
        $('.quote').html('&quot;' + quote.quote + '&quot;');
        $('.author').html("~ " + quote.author );
      },
      error: function(err) {
        console.log(err);
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "QhkMLuzr0FmshscMOvVXcnAyilAHp1Q1Pqujsnfm1b8ywyVwDp"); // Enter here your Mashape key
      }   
    
    });
  };

$(document).ready(function() {
  var quote;
  
  generateQuote();

  $('.quoteButton').click(function(event) {
    generateQuote();
   
  });
 
   $("#tw").click(function(){
   
   var Quote = $("#quote").text();
  var Author = $("#author").text();
  $("a").attr("href", "https://twitter.com/intent/tweet/?text=" + " " + Quote + " " + Author);
  });  
 
});