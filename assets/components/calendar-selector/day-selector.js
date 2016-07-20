Polymer({
  is: 'day-selector',

  properties: {
    startTime: {
      type: Object
    },
    endTime: {
      type: Object
    }
  },

  attached: function(){
    this._initGrid();
  },

  _initGrid: function(){
    var startTime = moment().hour(0).minute(0).second(0),
        endTime   = moment().hour(24).minute(0).second(0),
        timeGrid  = [];

    while(endTime.isAfter(startTime)){
      timeGrid.push(moment(startTime));
      startTime.add(30, 'minutes');
    }
    this.fullTimeGrid = timeGrid;
  },

  getFormattedTime: function(moment){
    //Only want to return full hours
    if(moment.minute() === 0){
      return moment.format('h mm a');
    }
  },

  onGridItemTap: function(event){
    var selectedTime = this.$.gridRepeat.itemForElement(event.target);
    if(!this.startTime){
      this._selectStartTime(event.target, selectedTime);
      this.startTime = selectedTime;
    }
    else if(selectedTime.isBefore(this.startTime)){
      this.resetSelectedGrid();
      this._selectStartTime(event.target, selectedTime);
      this.startTime = selectedTime;
    }
    else{
      this._selectEndTime(event.target, selectedTime);
      this.endTime = selectedTime;
    }

    this._fireTimeUpdate(this.day, this.startTime, this.endTime);
  },

  _fireTimeUpdate: function(day, startTime, endTime){
    this.fire('timeChanged',
      {
        day: day,
        startTime: startTime,
        endTime: endTime ? moment(endTime).add(30, 'minutes') : moment(startTime).add(30, 'minutes')
      })
  },

  _selectStartTime: function(targetGrid, selectedTime){
    var createLocationTop  = targetGrid.offsetTop + 'px',
        createLocationLeft = targetGrid.offsetLeft + 65 + 'px',
        createWidth        = targetGrid.offsetWidth - 85 + 'px',
        createHeight       = targetGrid.offsetHeight + 'px';

    var gridElement = this._getGridElement(),
        self        = this;
    gridElement.css('top', createLocationTop);
    gridElement.css('left', createLocationLeft);
    gridElement.css('width', createWidth);
    gridElement.css('height', createHeight);
    gridElement.css('position', 'absolute');
    gridElement.css('padding', '5px');
    gridElement.css('display', 'flex');
    gridElement.css('flex-direction', 'row');
    gridElement.css('align-items', 'flex-start');
    gridElement.css('justify-content', 'center');
    $('#grid').append(gridElement);
    this._initFillerElement();
    setTimeout(function(){
      self._expandFillerElement();
    }, 200);
  },

  _selectEndTime: function(targetGrid, selectedTime){
    var gridElement  = this._getGridElement(),
        bottomOfGrid = targetGrid.offsetTop + targetGrid.offsetHeight,
        newHeight    = bottomOfGrid - parseInt(gridElement.css('top')) + 'px';

    gridElement.css('height', newHeight);
    this._expandFillerElement();
  },

  _getGridElement: function(){
    var self = this;
    if(!this.gridElement){
      this.gridElement = $('<div></div>').attr('id', 'selectedGridOutline').attr('class', "selected-grid-outline");
      this.fillerElement = $('<div></div>');
      this.fillerElement.css('width', '1px');
      this.fillerElement.css('height', '1px');
      this.fillerElement.css('box-sizing', 'border-box');
      this.fillerElement.css('background-color', 'lightblue');
      this.fillerElement.css('border-radius', '15px');
      this.fillerElement.css('transition', 'all 0.5s ease');
      this.fillerElement.css('box-shadow', '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4)');
      this.fillerElement.css('opacity', '0.6');
      this.gridElement.append(this.fillerElement);
      this.gridElement.on('click', this.resetSelectedGrid.bind(self));
    }
    return this.gridElement;
  },

  _initFillerElement: function(){
    this.fillerElement.css('width', parseInt(this.gridElement.css('height')) - 10 + 'px' );
    this.fillerElement.css('height', parseInt(this.gridElement.css('height')) - 10 + 'px' );
  },

  _expandFillerElement: function(){
    this.fillerElement.css('width', this.gridElement.css('width'));
    this.fillerElement.css('height', parseInt(this.gridElement.css('height')) - 10 + 'px' );
  },

  resetSelectedGrid: function(){
    this.startTime = null;
    this.endTime = null;
    this.gridElement.remove();
    this.gridElement = null;
    this._fireTimeUpdate(this.day, this.startTime, this.endTime);
  }
});
