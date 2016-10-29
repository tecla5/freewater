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
  //console.debug('signedIn', this.signedIn, this.online);
  },

  computeLockIcon: function(signedIn) {
    return signedIn ? 'lock-open' : 'lock';
  },

  lock: function() {
  //console.debug('lock');
    this.fire('sign-out');
  }


});
