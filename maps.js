    var pablo ="cafe";
    



	let pos;
    let map;
    // let bounds;
    let infoWindow;
    let currentInfoWindow;
    let service;
    let infoPane;
    
	function initMap() {
      // Initialize variables
    //   bounds = new google.maps.LatLngBounds();
      infoWindow = new google.maps.InfoWindow;
      currentInfoWindow = infoWindow;
      /* TODO: Step 4A3: Add a generic sidebar */
      // Try HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false
		  
		  
		  });
        //   bounds.extend(pos);
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
          /* TODO: Step 3B2, Call the Places Nearby Search */
          // Call Places Nearby Search on user's location
         getNearbyType(pos);
        }, () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infoWindow);
        });
      } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
      }
    }
   
   // Handle a geolocation error
    function handleLocationError(browserHasGeolocation, infoWindow) {
      // Set default location to Sydney, Australia
      pos = { lat: -33.856, lng: 151.215 };
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false
		});
      // Display an InfoWindow at the map center
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
      currentInfoWindow = infoWindow;

      getNearbyType(pos);
    }
 
    // Perform a Places Nearby Search Request
    function getNearbyType(position) {
        let request = {
          location: position,
          radius: '700',
          keyword: pablo
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, nearbyCallback);
      }
      // Handle the results (up to 20) of the Nearby Search
      function nearbyCallback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          createMarkers(results);
          console.log("Marker Type" +results);
        }
      }
  
    
      // Below this is working ok 
     
      function createMarkers(places) {
        places.forEach(place => {
          let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            animation: google.maps.Animation.DROP,
          });

// This can be removed or maybe modified to disply information when icon is clicked.

        //   marker.addListener('click', toggleBounce);
        //   function toggleBounce() {
        //       if (marker.getAnimation() !== null) {
        //         marker.setAnimation(null);
        //       } else {
        //         marker.setAnimation(google.maps.Animation.BOUNCE);
        //       }
        //   }

        
          function drop() {
              for (var i =0; i < markerArray.length; i++) {
                setTimeout(function() {
                  addMarkerMethod();
                }, i * 700);
              }
            }
        });
      }

          //  this is for the icon search
          function setSearchType(selectedSearchType) {
            selectedType ='';
            selectedType = selectedSearchType;
            console.log("inside " +selectedType)
            // pablo = selectedType
        
            }
        
  