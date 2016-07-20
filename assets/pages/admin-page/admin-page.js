Polymer({
  is: 'admin-page',

  attached: function(){
    this.controller = this.$.mainController.getControllers();
    this.init();
  },

  init: function(){
    this.getTeachers();
  },

  onAddTap: function(){
    this.$.addTeacherDialog.open();
    //this.fire('showPanel', {title: 'New Teacher', body: this.$.addTeacherDialogBody});
  },

  onConfirmTap: function(){
    this.$.spinner.style.opacity = 1;
    var self = this
    this.controller.teacherController.create(this.newTeacherName).done(
      function(result){
        self.$.spinner.style.opacity = 0;
        self.toastMessage = "Teacher '" + self.newTeacherName + "' was created successfully";
        self.$.toast.center();
        self.$.toast.open();
        self.newTeacherName = "";
        self.getTeachers();
      }
    );
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
    this.selectedTeacher = this.$.teacherRepeat.itemForElement(event.target).teacher_id;
    $('#teacherContainer').css('right', '25%');
    var skillsContainer = $('#skillsContainer');
    setTimeout(function(){
      skillsContainer.css('height', '100px');
      skillsContainer.css('opacity', 1);
    }, 1000)
  },

  isActive: function(selectedTeacher, item){
    if(item.teacher_id === selectedTeacher){
      return 'active';
    }
    return '';
  }
});
