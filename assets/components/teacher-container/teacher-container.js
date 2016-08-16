Polymer({
  is: 'teacher-container',

  properties: {
    selectedTeacher: {
      type: Object,
      notify: true
    }
  },

  attached: function(){
    this.controller = this.$.mainController.getControllers();
    this.getTeachers();
  },

  onAddTap: function(){
    this.$.addTeacherDialog.open();
    //this.fire('showPanel', {title: 'New Teacher', body: this.$.addTeacherDialogBody});
  },

  onConfirmTap: function(){
    this.$.spinner.style.opacity = 1;
    var self = this
    this.controller.teacherController.create(this.newTeacherName, function(result){
      self.$.spinner.style.opacity = 0;
      self.showToast("Teacher '" + self.newTeacherName + "' was created successfully");
      self.newTeacherName = "";
      self.getTeachers();
    });
  },

  getTeachers: function(){
    this.$.spinner.style.opacity = 1;
    var self = this;
    this.controller.teacherController.get().done(
      function(result){
        self.teachers = result;
        self.fire();
        self.$.spinner.style.opacity = 0
    });
  },

  onTeacherTap: function(event){
    this.selectedTeacher = this.$.teacherRepeat.itemForElement(event.target);
    $('#teacherContainer').css('right', '25%');
    var skillsContainer = $('#skillsContainer');
    setTimeout(function(){
      skillsContainer.css('height', '500px');
      skillsContainer.css('opacity', 1);
    }, 400)
  },

  isActive: function(selectedTeacher, item){
    if(item.teacher_id === selectedTeacher.teacher_id){
      return 'active';
    }
    return '';
  },

  onDeleteTap: function(){
    this.$.spinner.style.opacity = 1;
    var self = this;
    this.controller.teacherController.delete(this.selectedTeacher.teacher_id, function(){
      self.$.spinner.style.opacity = 0;
      self.showToast("Teacher '" + self.selectedTeacher.nickname + "' was deleted.");
      self.getTeachers();
    });
  },

  onMenuTap: function(event){
    this.selectedTeacher = this.$.teacherRepeat.itemForElement(event.target);
    var target = event.target,
        self   = this;
    event.stopPropagation();
    while(!target.classList.contains('listItem') && target){
      target = target.parentElement;
    }
    $('html').click(function(){
      if(self.$.menuContainer.style.display !== 'none'){
        $('#menuContainer').css('display', 'none');
      }
    });
    if(target){
      this._showMenu(target)
    }
  },

  _showMenu: function(target){
    $('#menuContainer').css('display', 'flex');
    $('#menuContainer').css('top', target.offsetTop);
    $('#menuContainer').css('left', target.offsetWidth - this.$.menuContainer.offsetWidth);
  },

  showToast: function(message){
    this.toastMessage = message;
    this.$.toast.open();
  }
});
