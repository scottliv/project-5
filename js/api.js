(function($){

  $('#new-quote-button').on('click', function (event) {
    event.preventDefault();

    $('.entry-title').empty();
    $('.entry-content').empty();
    $('.source').empty();
    
    $.ajax({
      method: 'get',
      url: api_vars.root_url + '/wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1',
    })
    .done(function(data){
     
      var post = data[0];
      console.log(data);
      var title = post.title.rendered;
      var content = post.content.rendered;
      var source = post._qod_quote_source;
      var sourceUrl = post._qod_quote_source_url;

      $('.entry-title').append('-'+title);
      $('.entry-content').append(content);
      if ( source !== '' && sourceUrl !== '') {
        $('.source').append('<a href="' + sourceUrl + '">' + source + '</a>');
      }
      else if ( source !== '' ) {
        $('.source').append(source);
      }
      else{
        $('.source').append('Source Unknown');
      }
    })
  });

  $('#submit-quote').on('click', function (event) {
    event.preventDefault();
    var title = $('#title').val();
    var quote = $('#quote').val();
    var source = $('#source').val();
    var sourceUrl = $('#source-url').val();

    $.ajax({
      method: 'post',
      url: api_vars.root_url + 'wp/v2/posts/',
      data: {
        title: title,
        content: quote,
        status: 'publish',
        _qod_quote_source: source,
        _qod_quote_source_url: sourceUrl
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
      }
    }).done(function (data) {
      $('form').trigger('reset');
      $('form').hide();
      $('article').append('<p>Success! made a new post</p>');
      console.log(data);
    });
  });

  $('#submit-another').on('click', function (event){
    event.preventDefault();
    $('article p:last-child').remove();
    $('form').show();
  })

})(jQuery);

// history.pushState(null, null, url) to change to url for the quote withou refreshing the page