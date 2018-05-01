function initMap() {
    var malta = {lat: 35.903445, lng: 14.419537};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: malta
    });
    var marker = new google.maps.Marker({
      position: malta,
      map: map
    });
    var marker2 = new google.maps.Marker({
        position: {lat:35.8988736, lng:14.513945},
        map: map
    });
    var marker3 = new google.maps.Marker({
        position: {lat:36.0530458, lng:14.1887455},
        map: map
    });
}
