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

The New York Times provieds a bunch of APIs, for this application we are going to use an **Article Search API** to pull all articles related to the address entred in the form.

To start with NYTimes API we need first to get an **API Key** from the site [NYTimes developers](https://www.nytimes.com/).

Now for this request we have implemented it with the **getJSON** function, that will load for as a **JSON-encoded data** from he server:

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

**.fail()** is the **error callback**.


### Wikipedia API
## Responsive design
