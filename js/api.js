(function($){

  $('#new-quote-button').on('click', function (event) {
    event.preventDefault();
    $('.entry-title').empty();
    $('.entry-content').empty();
    $.ajax({
      method: 'get',
      url: api_vars.root_url + '/wp/v2/posts/',
    })
    .done(function(data){
      console.log(data);
      var random = Math.floor(Math.random()* data.length);
      console.log(data[random]);
      var title = data[random].title.rendered;
      var content = data[random].content.rendered;
      $('.entry-title').append(title);
      $('.entry-content').append(content);
    })
  });

})(jQuery);

// history.pushState(null, null, url) to change to url for the quote withou refreshing the page