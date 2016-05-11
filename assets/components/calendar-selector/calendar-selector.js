Polymer({
  is: 'calendar-selector',

  properties: {
    days: {
      type: Array,
      value: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  },

  attached: function(){
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  }
});
