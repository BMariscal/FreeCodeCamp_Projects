//Run some jQuery
$(document).ready(function() {
  //On click run code
  $("#search").click(function() {
    //Get value of input search field
    var searchTerm = $('#searchTerm').val();
    //API url with searchTerm
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    //Run ajax and get return in data type JSON

    $.ajax({
      type: "GET", //what type of call we're doing
      url: url, //where to get it from
      contentType: "application/json; charset=utf-8", //?
      async: false,
      dataType: "json", //data type of json
      success: function(data, textStatus, jqXHR) {
        //when call is a success do this
        $('#output').html('');
        for (var i = 0; i < data[1].length; i++) {
          $('#output').prepend("<div><div class='btn-info'><a href=" + data[3][i] + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
        }
        $("#searchTerm").val('');
      },
      //if error
      error: function(errorMessage) {
        alert("Error");
      }
    });

  });
  $("#searchTerm").keypress(function(e) {
    if (e.which == 13) {
      $("#search").click();
    }
  });
});