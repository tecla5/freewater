function getCountry(formattedAddress){
  var splits = formattedAddress.split(' ');
  return splits[ splits.length - 1 ];
}

function getDistance(pos1, pos2){
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
}

function getReliability(mark){

  if ((mark.nConfirms + mark.nComplaints) === 0) {return '../../images/new_water_icon.png';}

  var reliability =  (mark.nConfirms * 100)/ (mark.nConfirms + mark.nComplaints);

  if (reliability >= 75) {return '../../images/water_icon_100.png';}
  else if (reliability < 75 && reliability >= 50) {return 'images/water_icon_75.png';}
  else if (reliability < 50 && reliability >= 30) {return '../../images/water_icon_50.png';}
  else {return '../../images/water_icon_20.png';}
}

Polymer({
  is: 'smart-map',
  listeners: {
    'tap': 'tap'
  },
  properties:{
    marks: Array,
    pos: Object,
    direction: Object,
    searchResults: Array
  },
  observers: [
    'changeMark(marks, pos)',
    'currentPosChanged(searchResults)'
  ],

  ready: function(){
    console.log('smart-map ready');
    this.fire('map-ready');

    this.loadCurrentPos();
    setTimeout(this.loadCurrentPos.bind(this), 10000);
  },

  loadCurrentPos: function(){
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(
                this.updateCurrentPosMarker.bind(this),
                function(error){console.log('geolocation', error);},
                {enableHighAccuracy:false});// TODO: option change to true
    } else {
      console.log('Geolocation is not supported.');
      throw  'Geolocation is not supported.';
    }
  },

  currentPosChanged: function(searchResults){
    if (searchResults.length > 0){
      this.pos.name = searchResults[0].name;
      /*jshint camelcase: false */ /* option: add to .jshintrc file */
      this.pos.formattedAddress = searchResults[0].formatted_address;

      var oldCountry = this.pos.country;
      this.pos.country = getCountry(this.pos.formattedAddress);

      if (this.pos.country !== oldCountry){
        this.fire('country-changed', {country: this.pos.country});
      }
    }
  },
  changeMark: function(marks, pos){
    this.marks = marks;
    this.pos =pos;

    if (marks && marks.length > 0 && this.pos){
      this.sorted = [];

      for (var i = 0; i < marks.length; i++){
        var mark = marks[i];

        mark.distance = getDistance(this.pos, mark);
        mark.nConfirms = mark.confirms ? mark.confirms.length : 0;
        mark.nComplaints = mark.complaints ? mark.complaints.length : 0;
        mark.opinionButtonStyle = mark.gaveOpinion ? 'color:gray;' : 'color:blue;';
        mark.icon = getReliability(mark);

        this.sorted.push(mark);
      }

      this.sorted.sort( function (a, b) { return a.distance - b.distance; });

      this.closer = this.sorted[0].distance < 20;
      this.veryCloser = this.sorted[0].distance < 0.5;

    }
  },
  updateCurrentPosMarker: function(location){
    console.log('your position', location);

    this.pos = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    };


    this.initMap(location);

    this.$.me.latitude = this.pos.lat;
    this.$.me.longitude = this.pos.lng;
    this.$.me.addEventListener('google-map-marker-open', this.publish.bind(this));

    var googleSearch = this.$.gmapsearch;
    googleSearch.query = this.pos.lat + ',' + this.pos.lng;
    googleSearch.search();


  },

  initMap: function(location) {
    //this.$.mymap = document.querySelector('google-map');
    this.$.mymap.zoom = 17;
    this.$.mymap.latitude = this.pos.lat;
    this.$.mymap.longitude = this.pos.lng;
    this.loadCurrentPos();
  },
  tap: function(e){
    if (e.target.alt === 'confirm'){
      this.fire('confirm', { mark: this.marks[ this.getIndex(e.target) ] });
    }else if (e.target.alt === 'complaint'){
      this.fire('complaint', { mark: this.marks[ this.getIndex(e.target) ] });
    }else if(e.target.alt === 'directions'){
      this.markDirectionTo(this.marks[ this.getIndex(e.target) ]);
    }else if (e.target.alt === 'search closer'){
      this.markDirectionTo(this.sorted[ 0 ]);
    }else{
      console.log("settting map to null?");
      //this.$$('google-map-directions').directionsRenderer.setMap(null);
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
  markDirectionTo: function(mark){
    this.$$('google-map-directions').directionsRenderer.setMap(this.$.mymap.map);

    console.log('markDirectionTo');
    var start = this.pos.lat + ', '+ this.pos.lng;
    var end = mark.lat + ', '+ mark.lng;

    this.direction = {start: start, end: end};
    console.log('this.direction', JSON.stringify(this.direction));
  },
  getIndex: function(target){
    var parent = target.parentElement.parentElement;
    var hiddenElement = parent.querySelector('input[type="hidden"]');
    return hiddenElement.value;
  }
});
