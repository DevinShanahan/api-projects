$(document).ready(function() {
  var colors = ["#aa0000","#00aa00","#0000aa","#aaaa00","#aa00aa","#00aaaa"]
  var color1 = colors[Math.floor(Math.random()*colors.length)];
  var color2 = colors[Math.floor(Math.random()*colors.length)];
  var state = true;
  var quote = 'Harry, I took care of it';
  var quoteTitle = 'Lloyd Christmas';
  $('#button').on('click', function(e) {
    quote = '';
    quoteTitle = '';
    e.preventDefault();
    $.ajax( {
      url: 'https://quotesondesign.com//wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift();
        $('#quote').html(post.content+"<br>-"+post.title);
        quote+=post.content;
        quoteTitle += post.title;
      },
      cache: false
    });
    if (state) {
      $(".container").animate({
          backgroundColor: color1,
          color: "#000",
        }, 1500 );;
    } else {
      $(".container").animate({
          backgroundColor: color2,
          color: "#000",
        }, 1500 );;
    }
    state = !state;
    color1 = colors[Math.floor(Math.random()*colors.length)];
  color2 = colors[Math.floor(Math.random()*colors.length)];

  });
  $('#twitter').on('click', function(e) {
    quote = quote.replace(/<\/?[\w]{1,7}>/g,"");
    quote = quote.replace(/&#821[6-7];/g,"'");
    quote = quote.replace(/&#822\d;/g,"\"");
    quote = quote.replace(/&#8211;/g,"-");
    quote = encodeURI(quote);
    $('#twitter').attr('href', 'https://twitter.com/intent/tweet?text='+quote+" - "+encodeURI(quoteTitle));
  });


});
