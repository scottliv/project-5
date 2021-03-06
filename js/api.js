(function($){

  // Ajax functions
  function ajaxGet(request) {
    $.ajax({
      method: 'get',
      // Go to the wordpress rest api and get the request
      url: api_vars.root_url + request,
    })
    .done(function (data) {

      var post = data[0];
      var slug = post.slug;
      var title = post.title.rendered;
      var content = post.content.rendered;
      var source = post._qod_quote_source;
      var sourceUrl = post._qod_quote_source_url;
      var url = api_vars.home_url + '/' + slug;

      // Append slug to url
      history.pushState({page:slug}, null, url);

      // Change the html elements of the post
      $('.entry-title').html('-' + title + ', ');
      $('.entry-content').html(content);
      if (source !== '' && sourceUrl !== '') {
        $('.source').html('<a href="' + sourceUrl + '">' + source + '</a>');
      } else if (source !== '') {
        $('.source').html(source);
      } else {
        $('.source').html('Source Unknown');
      }
      }).fail(function () {
        $('article').append('<p>Unable to get a post</p>');
      });
  }

  function ajaxPost () {
     // Get content from submit form
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

      // Check to see if user is logged in
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
      }

    }).done(function () {
      
      // Clear form and hide it
      $('form').trigger('reset');
      $('form').hide();
      $('article').append('<p>Success! made a new post</p>');
      $('#submit-another').toggleClass('hidden');
    }).fail(function () {
       $('article').append('<p>Unable to make a post</p>');
    });
  }

  // Button Event Handlers

  // Get a new Quote
  $('#new-quote-button').on('click', function (event) {
    event.preventDefault();
    $('#new-quote-button').blur();
    // Get a random quote
   var randomRequest = 'wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1';

   ajaxGet(randomRequest);
  });

  // Post a quote
  $('#submit-quote').on('click', function (event) {
    event.preventDefault();
    ajaxPost();   

  });

  // Show new form
  $('#submit-another').on('click', function (event){
    event.preventDefault();
    $('article p:last-child').remove();
    $('form').show();
    $('#submit-another').toggleClass('hidden');
  })

  // Enable the back button to cycle through quote history
   window.onpopstate = function (e) {
    var url = api_vars.home_url;
    var state = e.state.page;
    if (state !== null) {
      window.location.href = url + '/' + state;
    }
   }

})(jQuery);
