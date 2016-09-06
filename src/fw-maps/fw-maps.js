function changeToArray(obj){
  var array = [];

  if (obj){
    for(var propt in obj){
      array.push(obj[propt]);
    }
  }

  return array;
}

function search(array, element){
  for (var i = 0; i < array.length; i++){
    if (array[i] === element){
      return array[i];
    }
  }

  return null;
}

function  userDontHaveOpinion(mark, userId){
  console.log('mark.confirms', mark.confirms);
  console.log('mark.complaints', mark.complaints);
  console.log('userId', userId);

  var found = search(mark.confirms, userId);

  if (!found){
    found = search(mark.complaints, userId);
  }

  console.log('found', found);
  return !found;
}

Polymer({
  is: 'fw-maps',
  properties:{
    usersReady: Boolean,
    marks: {
      type: Array,
      observer: 'loadMarksToMap'
    }
  },
  observers: [
    'loadMarksToMap(marks, usersReady)'
  ],
  ready: function(){
    console.log('ready fw-map');
    var self =  this;

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

    /*
    this.$$('freewater-users').addEventListener('users-ready', function(){
      self.usersReady = true;
    });
    */
  },
  addOpinion: function (typeOpinion, data) {
    var message = 'Yo have to login to confirm or deny a water point';

    this.checkLogin(message).then(function(user){
        var mark = data.detail.mark;

        if (userDontHaveOpinion(mark, user.id)){
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
    console.log('country', country);
    var self = this;

    this.marksdataSource.orderByChild('country').equalTo(country).on('value', function(snapshot) {
      self.marks = snapshot.val();

        if (self.$$('.progress-panel').style.display === 'block'){
          self.hideProgressbar();
        }

      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      });

      this.$$('.map-panel').style.height = '100%';

  },
  hideProgressbar: function(){
    this.$$('.progress-panel').style.display = 'none';
  },
  loadMarksToMap: function(){
    var firebaseLogin  = this.$$('fw-login');

    // TODO: change
    var users = this.$$('freewater-users');
    var marksWithUsers = [];

    for(var propt in this.marks){
        var mark = this.marks[propt];
        mark.__firebaseKey__ = propt;

        mark.createdDate = moment(mark.createdDate)
          .format('MMMM Do YYYY, h:mm:ss a');
        mark.confirms = changeToArray(mark.confirms);
        mark.complaints = changeToArray(mark.complaints);

        var user = users.getUser( mark.user );
        mark.user = user;

        if (firebaseLogin && firebaseLogin.user){
          mark.gaveOpinion = !userDontHaveOpinion(mark, firebaseLogin.user.id);
        }

        console.log('mark.gaveOpinion', mark.gaveOpinion);
        marksWithUsers.push( this.marks[propt] );

    }

    this.$$('smart-map').marks = marksWithUsers;
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
                console.log('User', user);
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
    console.log('data.detail', data.detail);

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
