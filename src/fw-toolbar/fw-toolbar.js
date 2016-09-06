Polymer({
  is: 'fw-toolbar',

  behaviors: [
    Polymer.AppNetworkStatusBehavior
  ],

  properties: {
    signedIn: {
      type: Boolean,
      notify: true,
      value: false
    }
  },

  ready: function(){
    console.log('signedIn', this.signedIn, this.online);
  },

  computeLockIcon: function(signedIn) {
    return signedIn ? 'lock-open' : 'lock';
  },

  lock: function() {
    console.log('lock');
    this.fire('sign-out');
  }


});
