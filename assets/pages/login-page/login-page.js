Polymer({
  is: 'login-page',

  attached: function(){
    this.router.go('/home');
    var self = this;
    $('#loginCard').css("opacity", 0)
    $('.cardContent').css("opacity", 0)
    setTimeout(function(){
      self.$.loginCard.elevation = 5;
      $('#loginCard').css("opacity", 1)
    }, 200);
    setTimeout(function(){
      $('.cardContent').css("opacity", 1)
    }, 600)
  },

  onLoginClick: function(){
    this.router.go('/home');
  }

});
