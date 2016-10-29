
Polymer({
  is: 'fw-maps',
  properties: {
    user: { type: Object, observer: '_userChanged'},
    marks: { type: Array, notify: true } // _marksChanged
  },
  observers: [
    '_marksChanged(marks.splices)'
  ],

  ready: function(){
    //console.log('ready fw-map', this.marks);

    this.marksdataSource = firebase.app('fw').database().ref('marks');

    // TODO uncomment
    this.$$('smart-map').addEventListener('country-changed', this.loadMarks.bind(this));
    this.$$('smart-map').addEventListener('publish', this.publish.bind(this));
    this.$$('smart-map').addEventListener('confirm', function(data){
      self.addOpinion('confirms', data);
    });

    this.$$('smart-map').addEventListener('complaint', function(data){
      self.addOpinion('complaints', data);
    });

  },

  _userChanged: function(newData, oldData){
    //console.log('userChanged', newData, oldData);

  },

  _transformToMarker: function(mark){
    return {
      //createdDate: moment(mark.createdDate).format('MMMM Do YYYY, h:mm:ss a'),
      name: mark.name,
      latitude: mark.lat,
      longitude: mark.lng,
      formattedAddress: mark.formattedAddress,
      confirms: this.changeToArray(mark.confirms),
      complaints: this.changeToArray(mark.complaints),
    };
  },

  _marksChanged: function(newData, oldData){
  //console.debug('marksChanged', newData, oldData);

    //var firebaseLogin  = this.$$('fw-login');
    //var optionUser = null;

    var markers = [];



    for (var i = 0; i < this.marks.length ; i++) {
      var mark = this.marks[i];

      var marker = this._transformToMarker( mark );
    //console.debug(marker, mark);
      // mark.__firebaseKey__ = propt;

      //var user = users.getUser( mark.user );
      //mark.user = user;

      /*
      if (firebaseLogin && firebaseLogin.user){
        mark.gaveOpinion = !this.userDontHaveOpinion(mark, firebaseLogin.user.id);
      }
      */

      //console.log('mark.gaveOpinion', mark.gaveOpinion);
      markers.push( mark );

    }

    this.markers = markers;

    //this.$$('smart-map').marks = this.marks;//WithUsers
  },

  changeToArray: function(obj){
    var array = [];

    if (obj){
      for(var propt in obj){
        array.push(obj[propt]);
      }
    }

    return array;
  },

  search: function(array, element){
    for (var i = 0; i < array.length; i++){
      if (array[i] === element){
        return array[i];
      }
    }

    return null;
  },

  userDontHaveOpinion: function(mark, userId){
    var found = this.search(mark.confirms, userId);

    if (!found){
      found = this.search(mark.complaints, userId);
    }

  //console.debug('found', found);
    return !found;
  },





  addOpinion: function (typeOpinion, data) {
    var message = 'Yo have to login to confirm or deny a water point';

    this.checkLogin(message).then(function(user){
        var mark = data.detail.mark;

        if (this.userDontHaveOpinion(mark, user.id)){
          var marksdataSource = firebase.app('fw').database().ref('marks/'+ mark.__firebaseKey__ );

          var array = null;
          marksdataSource.child(typeOpinion);

          if (!array){
            array = [];
          }

          array.push(user.id);
          var objectToUpdate = {};
          objectToUpdate[typeOpinion] = array;

          marksdataSource.update( objectToUpdate );
        }
      });
  },

  loadMarks: function(customEvent){

    var country = customEvent.detail.country;
  //console.debug('country', country);
    var self = this;

    this.marksdataSource.orderByChild('country').equalTo(country).on('value', function(snapshot) {
      //self.marks = snapshot.val();

        if (self.$$('.progress-panel').style.display === 'block'){
          self.hideProgressbar();
        }

      }, function (errorObject) {
      //console.debug('The read failed: ' + errorObject.code);
      });

      this.$$('.map-panel').style.height = '100%';

  },

  hideProgressbar: function(){
    this.$$('.progress-panel').style.display = 'none';
  },

  publish: function (data) {

    this.marksdataSource.push(data);

    var self = this;
    var message = 'Yo have to login to publish a water point';

    this.checkLogin(message).then(function(user){
        self.publishByLoggedUser(data, user);
      });
  },
  checkLogin: function (message) {
    var self = this;

    return new Promise(function(resolve){
        var firebaseLogin  = self.$$('firebase-login');
        firebaseLogin.message = message;
        var loginUser = firebaseLogin.user;

        if (!loginUser) {
          firebaseLogin.showLoginDialog().
            then(function(user){
              //console.debug('User', user);
                resolve(user);
              },
              function(error){
                console.error('login failed', error);
              }
            );
        }else{
          resolve(loginUser);
        }
    });
  },
  publishByLoggedUser: function(data, user){
    var mark;
  //console.debug('data.detail', data.detail);

    if (data.detail){
      mark = data.detail;
    }else{
      mark = data;
    }

    mark.user = user.id;
    this.marksdataSource.push(mark);
    this.$$('smart-map').successRegisterMessage = 'Publish successfully';
  }
});
