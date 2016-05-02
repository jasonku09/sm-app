Polymer({
  is: 'sm-navbar',

  properties: {
    drawerWidth: {
      type: Object,
      value: {
        opened:'180px',
        closed: '40px'
      }
    },
    open: {
      type: Boolean
    }
  },

  attached: function(){
    this.open = false;
    this.closeDrawer();
    this.menuItems = smAppConfig.navbarItems;
    var self = this;
    setTimeout(function(){
      self.toggleOpen();
    }, 900);
  },

  toggleOpen: function(){
    this.open ? this.closeDrawer() : this.openDrawer();
    this.open = !this.open;
  },

  closeDrawer: function(){
    $('.body').width(this.drawerWidth.closed);
    $('.menuBody').css('opacity', 0);
  },

  openDrawer: function(){
    $('.body').width(this.drawerWidth.opened);
    var self = this;
    setTimeout(function(){
      $('.menuBody').css('opacity', 1)
    }, 200)
  },

  getIconClass: function(icon){
    return 'fa fa-' + icon;
  }

});
