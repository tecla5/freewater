

Polymer({
  is: 'smart-map',
  listeners: {
    'tap': 'tap'
  },
  properties:{
    location: { type: Object, observer: '_locationChanged'},
    markers: { type: Array, observer: '_markersChanged' },
    pos: Object,
    direction: Object
  },
  observers: [
    '_initMap(location)',
    '_findMarkers(location)',
    'setMyCountry(markers)'
  ],



  ready: function(){
    //console.log('smart-map ready');

    // TODO a better observer
    setTimeout(this.checkLocation.bind(this), 3000); // 1000 give a error

    //TODO see when could be used
    //this.fire('map-ready');
  },


  _locationChanged: function(newData, oldData){
    //console.log('locationChanged', newData, oldData);

    // display map
    //this.$.mymap.style.display="block";
    this.$.mymap.style.visibility= this.location ? 'visible' : 'hidden';
  },


  _markersChanged: function(newData, oldData){
    console.log('_markersChanged', newData, oldData);

    this._addInfoMarkers(newData,this.location);

  },


  _initMap: function(location) {
    var m = this.$.mymap;
    //m.zoom = 17;
    m.latitude = location.coords.latitude;
    m.longitude = location.coords.longitude;
  },


  _searchInMap: function(latitude, longitude) {
    console.log('_searchInMap', latitude, longitude);

    if(this.$.gmapsearch){
      var googleSearch = this.$.gmapsearch;
      googleSearch.query = latitude + ',' + longitude;
      googleSearch.search();
    }

  },

  _findMarkers(location){
    this._searchInMap(location.coords.latitude, location.coords.longitude);
    //console.log(location, this.markers);
  },


  _updateLocation: function(location){
    console.log('_updateLocation',location);
    this.location = location;
    var c = location.coords;

    //set my position marker
    var gmm = this.$.gmm;
    gmm.latitude = c.latitude;
    gmm.longitude = c.longitude;
    gmm.addEventListener('google-map-marker-open', this.publish.bind(this));

    this.pos = {
      lat: c.latitude,
      lng: c.longitude
    };
  },

  checkLocation: function(){
    if (!navigator.geolocation) throw  'Geolocation is not supported.';

    // TODO: option change to true
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    navigator.geolocation.getCurrentPosition(
        this._updateLocation.bind(this)
        , function(error){console.log('geolocation', error);}
        , {enableHighAccuracy:false} );

  },


  _getCountry: function(formattedAddress){
    var splits = formattedAddress.split(' ');
    return splits[ splits.length - 1 ];
  },

  setMyCountry: function(nearMarkers){
    // console.log('observer MyCountry(markers)',nearMarkers);
    if (nearMarkers.length > 0){
      var nearMarker = nearMarkers[0].detail;
      console.log(nearMarker);
      this.pos = this.pos | {};
      this.pos.name = nearMarker.name;
      /*jshint camelcase: false */ /* option: add to .jshintrc file */
      this.pos.formattedAddress = nearMarker.formattedAddress;

      var oldCountry = this.pos.country;
      this.pos.country = this._getCountry(nearMarker.detail.formattedAddress);

      if (this.pos.country !== oldCountry){
        this.fire('country-changed', {country: this.pos.country});
      }
    }

  },

  _getDistance: function(pos1, pos2){
      var R = 6372.795477598;
      var C = Math.PI/180;
      var lata = pos1.lat;
      var lona = pos1.lng;

      var latb = pos2.lat;
      var lonb = pos2.lng;

      var distance = 2 * R * Math.asin(
        Math.sqrt( Math.pow ( Math.sin(C * ( lata - latb ) / 2), 2) +
          Math.cos( C * lata ) * Math.cos(C * latb) *
          Math.pow (Math.sin(C * ( lonb - lona) / 2 ), 2))
      );

      return Math.floor(distance * 100) / 100;
  },

  _getReliability: function (marker){

    if ((marker.nConfirms + marker.nComplaints) === 0) {return '../../images/new_water_icon.png';}

    var reliability =  (marker.nConfirms * 100)/ (marker.nConfirms + marker.nComplaints);

    if (reliability >= 75) {return '../../images/water_icon_100.png';}
    else if (reliability < 75 && reliability >= 50) {return '../../images/water_icon_75.png';}
    else if (reliability < 50 && reliability >= 30) {return '../../images/water_icon_50.png';}
    else {return '../../images/water_icon_20.png';}
  },

  _addInfoMarkers: function(markers, location){

    if (markers && markers.length > 0 && location){
      this.sorted = [];

      for (var i = 0; i < markers.length; i++){
        var marker = markers[i];

        marker.distance = this._getDistance(location, marker);
        marker.nConfirms = marker.confirms ? marker.confirms.length : 0;
        marker.nComplaints = marker.complaints ? marker.complaints.length : 0;
        marker.opinionButtonStyle = marker.gaveOpinion ? 'color:gray;' : 'color:blue;';
        marker.icon = this._getReliability(marker);

        this.sorted.push(marker);
      }

      this.sorted.sort( function (a, b) { return a.distance - b.distance; });

      this.closer = this.sorted[0].distance < 20;
      this.veryCloser = this.sorted[0].distance < 0.5;

    }
  },




  tap: function(e){
    if (e.target.alt === 'confirm'){
      this.fire('confirm', { marker: this.markers[ this.getIndex(e.target) ] });
    }else if (e.target.alt === 'complaint'){
      this.fire('complaint', { marker: this.markers[ this.getIndex(e.target) ] });
    }else if(e.target.alt === 'directions'){
      this.markDirectionTo(this.markers[ this.getIndex(e.target) ]);
    }else if (e.target.alt === 'search closer'){
      this.markDirectionTo(this.sorted[ 0 ]);
    }else{
      console.log("setting map to null?");
      this.$$('google-map-directions').directionsRenderer.setMap(null);
    }
  },
  publish: function(){
    console.log('this.veryCloser', this.veryCloser);
    if (!this.veryCloser){
      this.fire('publish', {lat: this.pos.lat,
        lng: this.pos.lng,
        name: this.pos.name,
        formattedAddress: this.pos.formattedAddress,
        confirms: [],
        complaints: [],
        cretedDate: firebase.database.ServerValue.TIMESTAMP,
        country: this.pos.country});

        this.veryCloser = true;
    }
  },
  markDirectionTo: function(marker){
    this.$$('google-map-directions').directionsRenderer.setMap(this.$.mymap.map);

    console.log('markDirectionTo');
    var start = this.pos.lat + ', '+ this.pos.lng;
    var end = marker.lat + ', '+ marker.lng;

    this.direction = {start: start, end: end};
    console.log('this.direction', JSON.stringify(this.direction));
  },
  getIndex: function(target){
    var parent = target.parentElement.parentElement;
    var hiddenElement = parent.querySelector('input[type="hidden"]');
    return hiddenElement.value;
  }
});
