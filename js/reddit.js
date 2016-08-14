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
  var card = "<div class='col-sm-8 offset-sm-2'><div class='card'> <div class='card-header'> <p class='card-top'> <span> <img src='img/pug.png' alt='...' class='avatar'> </span> <span> <a class='author permalink'></a> </span> <span class='time pull-right'></span> </p> </div> <img class='card-img-top pug-photo' src='' alt=''> <div class='card-block'> <i class='like fa fa-heart-o'></i> <i class='fa fa-comment-o'></i> <i class='fa fa-share-square-o'></i> <i class='fa fa-ellipsis-v pull-right'></i> <hr> <p> <strong class='ups'></strong> likes</p> <p class='card-text'> <span> <a class='author'></a> </span> <span class='title'></span> <span class='hashtag'></span> </p> </div></div></div>";

  //Loop through and assign each variable
  for (i = 0; i < postCount; i++) { //Note that the first two posts are stickied

    //Create a card
    $("#home").append("<div class='row' id='pug" + i + "\'>" + card + "</div>");
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

    //Hide Videos, Albums, Instagram posts, and Selfposts
    if (photo[i].match("^http://imgur.com/") || photo[i].match("^https://imgur.com/")) {
      if (photo[i].match("^http://imgur.com/gallery") || photo[i].match("^https://imgur.com/gallery") || photo[i].match("^http://imgur.com/a") || photo[i].match("^https://imgur.com/a")) {
        $(pug).css('display', 'none');
      } else {

      }
    } else {
      $(pug).css('display', 'none');
    }
  }
});
