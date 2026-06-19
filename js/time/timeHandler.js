class TimeHandler extends Handler {
  /**
   * Create a new Time handler.
   */
  constructor() {
    super('Time', []);
    
    this.success();
    this.initialized();

    this.days = this.getLocalDayNames();
    this.months = this.getLocalMonthNames();
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  handleData = async (triggerData) => {
    var date = new Date();
    var action = Parser.getAction(triggerData, 'Time');
    switch (action) {
      case 'ampm':
        return { ampm: date.getHours < 12 ? "AM" : "PM" };
      case 'date':
        return { date: date.toLocaleDateString() };
      case 'day':
        return { day: date.getDate() };
        break;
      case 'dayoftheweek':
      case 'dotw':
        return { weekday: this.days[date.getDay()] };
        break;
      case 'format':
        var { format } = Parser.getInputs(triggerData, ['action', 'format']);
        return { day: date.getDate() };
        break;
      case 'hour':
        var { use24Hour } = Parser.getInputs(triggerData, ['action', 'use24Hour'], false, 1);
        var hour = date.getHours()
        if (use24Hour && use24Hour.toLowerCase() === 'true') {
          return { hour };
        }
        if (hour == 12 || hour == 0) {
          return { hour: 12 }
        }
        return { hour: hour % 12 };
        break;
      case 'minutes':
        return { minutes: date.getMinutes() };
        break;
      case 'month':
        return { month: this.months[date.getMonth()] };
        break;
      case 'seconds':
        return { seconds: date.getSeconds() };
        break;
      case 'time':
        return { time: date.toLocaleTimeString() };
        break;
      case 'timestamp':
        return { timestamp: date.toLocaleString() };
      case 'year':
        return { year: date.getFullYear() };
        break;
      default:
        console.error(`Unexpected Time action (${action}). Check your event code.`);
        break;
    }
  }

  getLocalDayNames = () => {
    let d = new Date(2000,0,2); // Monday
    let days = [];
    for (let i=0; i<7; i++) {
      days.push(d.toLocaleString('default', { weekday: 'long' }));
      d.setDate(d.getDate() + 1);
    }
    return days;
  }

  getLocalMonthNames = () => {
    let d = new Date(2000,0); // January
    let months = [];
    for (let i=0; i<12; i++) {
      months.push(d.toLocaleString('default',{month:'long'}));
      d.setMonth(i + 1);
    }
    return months;
  }
}

/**
 * Create a handler
 */
function timeHandlerExport() {
  var time = new TimeHandler();
}
timeHandlerExport();
