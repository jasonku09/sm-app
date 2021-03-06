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
    this.selectMenuItem('admin')
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
  },

  onMenuItemTap: function(event){
    var selectedItem = this.$.menuItemsRepeat.itemForElement(event.target);
    if(!selectedItem || !selectedItem.navLocation){ return; }
    this.selectMenuItem(selectedItem.navLocation);
  },

  selectMenuItem: function(item){
    this.activeItem = item;
    this.router.go('/' + item);
  },

  isActive: function(activeItem, item){
    if(item.navLocation === activeItem){
      return 'active';
    }
    return '';
  }

});
