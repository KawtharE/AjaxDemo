# Calling Google Street View API, NYTimes API and Wikipedia API with AJAX jQuery 3.3.1

**JQuery** is useful for javascript developers and make a lot of tasks much more simpler.

**AJAX requests** simplify a lot of works when calling APIs, and since there are a lot of free APIs available out there, we can take advantage of theme in our applications. In this demo we are implementing three external APIs:

   -Google Street View API
  
   -New York Times API
  
   -Wikipedia API
  
This demo is responsive and work properly in all devices and we have achieved this by adopting two **Flex pattern**:

   **Layout Shifter Pattern** and **Off Canvas Pattern**
   
   
### The demo on Desktop Browser

![Starting Screen](https://github.com/KawtharE/AjaxDemo/blob/master/assets/DemoOnDesktopBrowser.gif)

### The demo on different screen sizes

![Starting Screen](https://github.com/KawtharE/AjaxDemo/blob/master/assets/DemoResponsive.gif)

**Note:** when designing a responsive web application, it's the best strategy to design small then go larger means same web application will have a mobile version and a dektop version with no big difference the goal is to make everything look and work properly in all devices.

=>As you can see in the demo, the image retrived from *Google Street View* was displayed as a background on desktop version and at the top the page in the mobile version.
The address related *NYTimes* articles and the *Wikipedia* links are displayed as a lists.

## AJAX requests

To achieve AJAX request jQuery provide us with two different methods: **$.ajax()**, **$getJSON()**. Both methods take in an URL (to where we send the request) and some optional parameters.

The most important advantage of AJAX is that it allows us to interact with the server **without pausing the script** or **reloading the page** when getting the response.

### Google Street View API

In fact for using this API we are not calling an AJAX request, we are just forming an image URL and appending the image to the page using the **jquery append()** function.

The Google Street View image URL must include **the size** and **the location** parameter. The location informations (street and city) are retrieved from the Form inputs using the **jquery val()** function:

         var street = $('#street').val();
         var city = $('#city').val();
         var fullAddress = street + ',' + city;
         var imgUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+fullAddress+'';
         $container.append('<img class="img" src="'+imgUrl+'">');
         
         
### New York Times API

The New York Times provieds a bunch of APIs, for this application we are going to use the **Article Search API** to pull all articles related to the address entred in the form.

To start with NYTimes API we need first to get an **API Key** from the site [NYTimes developers](https://www.nytimes.com/).

Now for this AJAX request we have implemented it with the **getJSON** function, that will load for us a **JSON-encoded data** from he server:

	var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+city+'&sort=newest&api-key=e6d2fdce685e4aa5b3fd867f2b011603';
      $.getJSON(nyTimesUrl, function(data){
         $nytimesTitle.text('New York Times Articles about '+fullAddress);
         var nyTarticles = data.response.docs;
         for(var i=0; i<nyTarticles.length; i++){
            var nyTarticle = nyTarticles[i];
            $nytimes.append('<li class="nyTimesLinks">'+'<a href="'+nyTarticle.web_url+'">'+nyTarticle.headline.main+'</a>       <p>'+nyTarticle.snippet+'</p><hr>');
         }
      })
      .fail(function(evt){
         $nytimes.text('Sorry we could not reach any information, can you please check your internet connexion or verify your address!')
      });
      
The **anonymous function** which is passed to the **getJSON function** as a parameter, is the **success callback** and **data** is **the server JSON response**.

**.fail()** is the **error callback** in ordere to handle errors that can be a result of internet connection interruption, over requests call number per hour, etc.


### Wikipedia API

For the last asynchronous request, the wikipedia API request it is a little bit different, no need for API key, however we can not make **JSON requests** because wikipedia servers do not allow **cross origin requests**. To set this issue we can either *set the origin and content type headers on the request* or use **JSONP**.

**JSON with Padding (JSONP)** used to request data from server in different domain without thinking about **cross-domain issue**. It uses the **< script >** tag. We can recognize that the server API uses JSONP if the URL contain **callback=?** argument.

	var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';
	$.ajax({
		url: wikiUrl,
		dataType: 'jsonp'
	})
	.done(function(response){
		$wikiTitle.text('Wikipedia Links about '+fullAddress);
        var wikiArticles = response[1];
        for(var i=0; i<wikiArticles.length; i++){
            wikiarticle = wikiArticles[i];
            var link = 'http://en.wikipedia.org/wiki/'+wikiarticle;
            $wikipedia.append('<li>'+'<a href="'+link+'">'+wikiarticle+'</a>'+'</li><br>')
        }
	})
	
**Error Handling with JSONP** due to technical limitation, there is no built-in method to handle errors but we still can achieve it in other ways. One of these ways is setting a timeout variable before calling the AJAX request by calling **setTimeout** method and then stopping the timeout inside the success callback by calling the **clearTimeout()** method:


	var wikiRequest = setTimeout(function(){
		$wikipedia.text('There was an Error while trying to reach Wikipedia');
	}, 5000);
	.
	.
	.
        clearTimeout(wikiRequest);
	.
	.
	.

![Starting Screen](https://github.com/KawtharE/AjaxDemo/blob/master/assets/DemoErrorHandling.gif)


## Responsive design

**Flexbox** is one of the most powerful tools that can be used for layout, it make position elements a very easy task and even changing the order of elements is a lot easier with flex witout any need to change the HTML.

We have adopted here two **Flex patterns: Layout Shifter Pattern and Off Canvas Pattern** in order to have a web application that looks great in all current devices and even in futur devices:

	div.container{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	div.address{
		width: 100%;
	}
	div.nyTimes{
		width: 50%;
	}
	div.wikipedia{
		width: 35%;
	}
	
**Break points** founded here are not choosen based on devices sizes (that's a bad practice) but based on **CSS changes** that need to be made. So we have ended up with 3 versions of the web application with no really big difference between them: one for **small devices (width=<300px)**, one for **medium devices (301px=<width=<600px)** and one for **larger devices**

	@media screen and (max-width: 300px){
	.
	.
	.
	}
	@media screen (min-width: 301px) and (max-width: 600px){
	.
	.
	.
	}
