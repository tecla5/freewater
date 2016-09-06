function getCountry(t){var s=t.split(" ");return s[s.length-1]}function getDistance(t,s){var e=6372.795477598,i=Math.PI/180,o=t.lat,n=t.lng,r=s.lat,a=s.lng,h=2*e*Math.asin(Math.sqrt(Math.pow(Math.sin(i*(o-r)/2),2)+Math.cos(i*o)*Math.cos(i*r)*Math.pow(Math.sin(i*(a-n)/2),2)));return Math.floor(100*h)/100}function getReliability(t){if(t.nConfirms+t.nComplaints===0)return"../../images/new_water_icon.png";var s=100*t.nConfirms/(t.nConfirms+t.nComplaints);return s>=75?"../../images/water_icon_100.png":s<75&&s>=50?"images/water_icon_75.png":s<50&&s>=30?"../../images/water_icon_50.png":"../../images/water_icon_20.png"}Polymer({is:"smart-map",listeners:{tap:"tap"},properties:{marks:Array,pos:Object,direction:Object,searchResults:Array},observers:["changeMark(marks, pos)","currentPosChanged(searchResults)"],ready:function(){console.log("smart-map ready"),this.fire("map-ready"),this.loadCurrentPos(),setTimeout(this.loadCurrentPos.bind(this),1e4)},loadCurrentPos:function(){if(navigator.geolocation)return navigator.geolocation.getCurrentPosition(this.updateCurrentPosMarker.bind(this),function(t){console.log("geolocation",t)},{enableHighAccuracy:!1});throw console.log("Geolocation is not supported."),"Geolocation is not supported."},currentPosChanged:function(t){if(t.length>0){this.pos.name=t[0].name,this.pos.formattedAddress=t[0].formatted_address;var s=this.pos.country;this.pos.country=getCountry(this.pos.formattedAddress),this.pos.country!==s&&this.fire("country-changed",{country:this.pos.country})}},changeMark:function(t,s){if(this.marks=t,this.pos=s,t&&t.length>0&&this.pos){this.sorted=[];for(var e=0;e<t.length;e++){var i=t[e];i.distance=getDistance(this.pos,i),i.nConfirms=i.confirms?i.confirms.length:0,i.nComplaints=i.complaints?i.complaints.length:0,i.opinionButtonStyle=i.gaveOpinion?"color:gray;":"color:blue;",i.icon=getReliability(i),this.sorted.push(i)}this.sorted.sort(function(t,s){return t.distance-s.distance}),this.closer=this.sorted[0].distance<20,this.veryCloser=this.sorted[0].distance<.5}},updateCurrentPosMarker:function(t){console.log("your position",t),this.pos={lat:t.coords.latitude,lng:t.coords.longitude},this.initMap(t),this.$.me.latitude=this.pos.lat,this.$.me.longitude=this.pos.lng,this.$.me.addEventListener("google-map-marker-open",this.publish.bind(this));var s=this.$.gmapsearch;s.query=this.pos.lat+","+this.pos.lng,s.search()},initMap:function(t){this.$.mymap.zoom=17,this.$.mymap.latitude=this.pos.lat,this.$.mymap.longitude=this.pos.lng,this.loadCurrentPos()},tap:function(t){"confirm"===t.target.alt?this.fire("confirm",{mark:this.marks[this.getIndex(t.target)]}):"complaint"===t.target.alt?this.fire("complaint",{mark:this.marks[this.getIndex(t.target)]}):"directions"===t.target.alt?this.markDirectionTo(this.marks[this.getIndex(t.target)]):"search closer"===t.target.alt?this.markDirectionTo(this.sorted[0]):console.log("settting map to null?")},publish:function(){console.log("this.veryCloser",this.veryCloser),this.veryCloser||(this.fire("publish",{lat:this.pos.lat,lng:this.pos.lng,name:this.pos.name,formattedAddress:this.pos.formattedAddress,confirms:[],complaints:[],cretedDate:firebase.database.ServerValue.TIMESTAMP,country:this.pos.country}),this.veryCloser=!0)},markDirectionTo:function(t){this.$$("google-map-directions").directionsRenderer.setMap(this.$.mymap.map),console.log("markDirectionTo");var s=this.pos.lat+", "+this.pos.lng,e=t.lat+", "+t.lng;this.direction={start:s,end:e},console.log("this.direction",JSON.stringify(this.direction))},getIndex:function(t){var s=t.parentElement.parentElement,e=s.querySelector('input[type="hidden"]');return e.value}});