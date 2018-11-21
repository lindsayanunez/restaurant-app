console.log('Service Worker: Registered');

const cacheFiles = [
'/',
'/index.html',
'/restaurant.html',
'/css/styles.css',
'/js/dbhelper.js',
'/js/main.js',
'/js/restaurant_info.js',
'/data/restaurants.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open('v1').then(function(cache){
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(
      caches.match(e.request).then(function(response){
        if(response){
          console.log('Found ', e.request, ' in cache');
          return response;
        }else{
          console.log('Could not find ', e.request, 'in cache, FETCHING!');
          return fetch(e.request);
          .then(function(response){
            const clonedResponse = response.clone();
            caches.open('v1').then(function(cache){
              cache.put(e.request, response);
            })
            return response;
          })
          .catch(function(err){
            console.error(err);
          });
        }
      })
    );
});

// ##Resources Used

// * [Starter Code from Udacity Front-End Nanodegree] (https://github.com/udacity/mws-restaurant-stage-1)
// * [Matthew Cranford's Tutorial Part 1](https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-1-map-api/)
// * [Matthew Cranford's Tutorial Part 2](https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-2-responsiveness/)
// * [Matthew Cranford's Tutorial Part 3](https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-3-accessibility/)
// * [Matthew Cranford's Tutorial Part 4](https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/)


