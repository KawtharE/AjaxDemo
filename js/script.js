
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street+','+city;
    $greeting.text('So you want to live in '+address+'?');
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'';
    $body.append('<img class="bgimg" src="'+ streetviewUrl+'">');

    // load NY Times articles
    var url="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+city+"&sort=newest&api-key=e6d2fdce685e4aa5b3fd867f2b011603"
    $.getJSON(url, function(data){
        $nytHeaderElem.text('New York Times Article About '+ city);
        articles = data.response.docs;
        for (var i = 0; i<articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+ article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
        }
    })
    .fail(function(evt){
      $nytHeaderElem.text('Could not reach the New York Times Article, check out your internet connection!');  
    });

    // load Wikipedia API
    //error handling
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Failed to get Wikipidia resources');
    }, 8000);
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback";
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response){
            var wikiArticles = response[1];
            for(var i=0; i<wikiArticles.length; i++){
                wikiarticle = wikiArticles[i];
                var link = 'http://en.wikipedia.org/wiki/'+wikiarticle;
                $wikiElem.append('<li>'+'<a href="'+link+'">'+wikiarticle+'</a>'+'</li>')
            }
            clearTimeout(wikiRequestTimeout);
        }
    })
    return false;
};

$('#form-container').submit(loadData);
