(function($){

  $('#new-quote-button').on('click', function (event) {
    event.preventDefault();

    $('.entry-title').empty();
    $('.entry-content').empty();
    $('.source').empty();
    
    $.ajax({
      method: 'get',
      url: api_vars.root_url + '/wp/v2/posts/',
    })
    .done(function(data){
      // console.log(data);
      var random = Math.floor(Math.random()* data.length);
      var post = data[random];
      console.log(post);
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
    var content = $('#content').val();
    var source = $('#source').val();
    var sourceUrl = $('#sourceUrl').val();

    $.ajax({
      method: 'post',
      url: api_vars.root_url + 'wp/v2/posts/',
      data: {
        title: title,
        content: content,
        _qod_quote_source = source,
        _qod_quote_source_url = sourceUrl
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-WP-Nonce', red_vars.wpapi_nonce);
      }
    }).done(function (response) {
      alert('Success! made a new post');
    });
  });

})(jQuery);

// history.pushState(null, null, url) to change to url for the quote withou refreshing the page