require("babel/polyfill");
mui = require('material-ui');
mui.Calendar = require('material-ui/lib/date-picker/calendar');
mui.CalendarMonth = require('material-ui/lib/date-picker/calendar-month');
mui.CalendarYear = require('material-ui/lib/date-picker/calendar-year');
mui.CalendarToolbar =
  require('material-ui/lib/date-picker/calendar-toolbar');
mui.DateDisplay = require('material-ui/lib/date-picker/date-display');
mui.Utils.DateTime = require('material-ui/lib/utils/date-time');
mui.TransitionGroups = {
  SlideInTransitionGroup:
    require('material-ui/lib/transition-groups/slide-in'),
};
mui.SvgIcons = {
  NavigationMenu: require('material-ui/lib/svg-icons/navigation/menu'),
};
injectTapEventPlugin = require('react-tap-event-plugin');
motion = require('react-motion');
win = require('react-window-mixins');
toMarkdown = require('to-markdown');
Remarkable = require('remarkable');
markdown = new Remarkable('full', {
  breaks: true,
});
