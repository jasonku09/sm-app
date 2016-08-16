Polymer({
  is: 'admin-page',

  properties: {
    selectedTeacher: {
      type: Object,
      observer: '_onSelectedTeacherChange'
    }
  },

  attached: function(){
    this.controller = this.$.mainController.getControllers();
  },

  _onSelectedTeacherChange: function(){
    var self = this;
    if(this.selectedTeacher){
      this.availableSkills = smAppConfig.teacherSkills;
      this.controller.teacherController.getSkillsById(this.selectedTeacher.teacher_id).done(
        function(response){
          if(response){
            self.processSkills(response);
          }
        })
    }
  },

  processSkills: function(response){
    var availableSkills = smAppConfig.teacherSkills,
        skillsArray     = [];
    for(var i = 0; i < availableSkills.length; i++){
      skillsArray.push({
        name: availableSkills[i],
        hasSkill: response["skill_" + (i + 1)]
      });
    }
    this.selectedTeacherSkills = skillsArray;
  },

  onAddClick: function(){
    this.$.addSkillsDialog.open();
  },

  isEmpty: function(){
    return this.selectedTeacherSkills.length === 0;
  },

  _getSkillsForUpdate: function(){
    if(!this.selectedTeacherSkills) { return;}
    var processed = {};
    for(var i = 0; i < this.selectedTeacherSkills.length; i++){
      processed["skill_" + (i + 1)] = this.selectedTeacherSkills[i].hasSkill;
    }
    return processed;
  },

  onSkillsConfirmTap: function(){
    this.controller.teacherController.updateSkills(this.selectedTeacher.teacher_id, this._getSkillsForUpdate()).done(function(){
      alert('yay');
    })
  }
});
