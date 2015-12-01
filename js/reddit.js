var redditAPI = "https://www.reddit.com/r/pugs/new/.json?limit=100&after=t3_10omtd/";

$.getJSON(redditAPI, function(json) {

  //Find out how many pug posts were found from the Reddit api
  var postCount = json.data.children.length;

  //Create some neat-o variables
  var title = [];
  var author = [];
  var permalink = [];
  var ups = [];
  var photo = [];
  var postDate = [];
  var postDateHuman = [];
  var source = [];

  //html for a card
  var card = "<div class='col-sm-8 col-sm-offset-2'><div class='card'> <div class='card-header'> <p class='card-top'> <span> <img src='img/pug.png' alt='...' class='avatar'> </span> <span> <a class='author permalink'></a> </span> <span class='time pull-right'></span> </p> </div> <img class='card-img-top pug-photo' src='' alt=''> <div class='card-block'> <i class='like fa fa-heart-o'></i> <i class='fa fa-comment-o'></i> <i class='fa fa-share-square-o'></i> <i class='fa fa-ellipsis-v pull-right'></i> <hr> <p> <strong class='ups'></strong> likes</p> <p class='card-text'> <span> <a class='author'></a> </span> <span class='title'></span> <span class='hashtag'></span> </p> </div></div></div>";

  //html for a adcard
  var adcard = "<div class='col-sm-8 col-sm-offset-2'><div class='card'> <div class='card-header'> <p class='card-top'> <span> <img src='img/pug.png' alt='...' class='avatar'> </span> <span> <a class='author permalink'>Google</a> </span> <span class='time pull-right'></span> </p> </div>" + ad + "<div class='card-block'> <i class='like fa fa-heart-o'></i> <i class='fa fa-comment-o'></i> <i class='fa fa-share-square-o'></i> <i class='fa fa-ellipsis-v pull-right'></i> <hr> <p> <strong class='ups'></strong> likes</p> <p class='card-text'> <span> <a class='author'>Google</a> </span> <span class='title'>Sponsored Ad</span> <span class='hashtag'></span> </p> </div></div></div>";

  //html for a ad
  var ad = "<script async src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script> <!-- instagrumble --> <ins class='adsbygoogle' style='display:block' data-ad-client='ca-pub-4676498492886978' data-ad-slot='2014569934' data-ad-format='auto'></ins> <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>";



  //Loop through and assign each variable
  for (i = 0; i < postCount; i++) { //Note that the first two posts are stickied

    //Create a card
    $(".container").append("<div class='row' id='pug" + i + "\'>" + card + "</div>");
    var pug = "#pug" + i;

    //Assign each variable
    title[i] = json.data.children[i].data.title;
    console.log('Title : ', title[i]);
    $(pug + " .title").text(title[i]);

    author[i] = json.data.children[i].data.author;
    console.log('Author : ', author[i]);
    $(pug + " .author").text(author[i]);

    permalink[i] = json.data.children[i].data.permalink;
    console.log('Permalink : ', permalink[i]);
    $(pug + " .permalink").attr("href", "https://www.reddit.com" + permalink[i]);

    ups[i] = json.data.children[i].data.ups;
    console.log('Ups : ', ups[i]);
    $(pug + " .ups").text(ups[i]);

    photo[i] = json.data.children[i].data.url;
    console.log('Photo : ', photo[i]);
    $(pug + " .pug-photo").attr("src", photo[i] + ".jpg");
    $(pug + " .pug-photo").attr("alt", photo[i] + ".jpg");

    postDate[i] = new Date(json.data.children[i].data.created_utc * 1000);
    postDateHuman[i] = moment(postDate[i]).fromNow();
    console.log('Post Date: ', postDateHuman[i]);
    $(pug + " .time").text(postDateHuman[i]);

    //Every 15 posts insert an ad
    //if (i % 15 === 0) {
      //$(".container").append("<div class='row' id='pugad" + "\'>" + adcard + "</div>");
    //}

    //Hide Videos, Albums, Instagram posts, and Selfposts
    source[i] = json.data.children[i].data.domain;
    if (source[i] == 'youtube.com') {
      $(pug).css('display', 'none');
    }
    if (source[i] == 'instagram.com') {
      $(pug).css('display', 'none');
    }
    if (source[i] == 'self.pugs') {
      $(pug).css('display', 'none');
    }
    if (photo[i].match("^http://imgur.com/a")) {
      $(pug).css('display', 'none');
    }
    if (photo[i].match("^https://imgur.com/a")) {
      $(pug).css('display', 'none');
    }
    if (photo[i].match("^http://imgur.com/gallery")) {
      $(pug).css('display', 'none');
    }
    if (photo[i].match("^https://imgur.com/gallery")) {
      $(pug).css('display', 'none');
    }
  }
});
