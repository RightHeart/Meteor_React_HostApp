let { Mixins, ClearFix, Utils, Styles, TransitionGroups } = mui;
let { CalendarMonth, CalendarYear, CalendarToolbar, DateDisplay } = mui;
let { StylePropable, WindowListenable } = Mixins;
let { DateTime, KeyCode } = Utils;
let { Transitions } = Styles;
let { SlideInTransitionGroup } = TransitionGroups;

Calendar = React.createClass({

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    shouldShowMonthDayPickerFirst: React.PropTypes.bool,
    shouldShowYearPickerFirst: React.PropTypes.bool,
    showYearSelector: React.PropTypes.bool,
    onDayTouchTap: React.PropTypes.func,
    onSelectedDayChange: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['landscape', 'portrait']),
    style: React.PropTypes.object,
  },

  mixins: [StylePropable, WindowListenable],

  getDefaultProps() {
    return {
      initialDate: new Date(),
      minDate: DateTime.addYears(new Date(), -100),
      maxDate: DateTime.addYears(new Date(), 100),
      hideToolbarYearChange: false,
      shouldShowMonthDayPickerFirst: true,
      shouldShowYearPickerFirst: false,
      showYearSelector: false,
    };
  },

  getInitialState() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      displayMonthDay:
      this.props.shouldShowMonthDayPickerFirst ||
      this.props.shouldShowYearPickerFirst || true,
      transitionEnter: true,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      let d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }

    if (nextProps.shouldShowMonthDayPickerFirst) {
      this.setState({displayMonthDay: nextProps.shouldShowMonthDayPickerFirst});
    }
  },

  getSelectedDate() {
    return this.state.selectedDate;
  },

  getStyles() {
    return {
      root: {},
    };
  },

  render() {
    let yearCount =
      DateTime.yearDiff(this.props.maxDate, this.props.minDate) + 1;
    let weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    let toolbarInteractions = this._getToolbarInteractions();
    let hideYearChangeButtons =
      this.props.hideToolbarYearChange || !this.props.showYearSelector;
    let isMultiYearRange = yearCount > 2;
    let styles = {
      root: {
        fontSize: 12,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
      },
      calendarContainer: {
        flex: '0 0 280px',
        height: 312,
        transition: Transitions.easeOut('150ms', 'height'),
        overflow: 'hidden',
        margin: '0px 5px',
      },
      yearContainer: {
        flex: '0 0 280px',
        overflow: 'hidden',
        height: 308,
      },
      dateDisplay: {
        flex: '0 0 280px',
        height: '100%',
        margin: '0px 5px',
      },
      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: 12,
        fontWeight: '500',
        margin: 0,
      },
      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: 32,
        textAlign: 'center',
        margin: '0 2px',
      },
    };

    if (this.state.displayMonthDay || !this.props.showYearSelector) {
      styles.yearContainer.display = 'none';
    } else {
      styles.calendarContainer.display = 'none';
    }

    return (
      <div style={this.mergeAndPrefix(styles.root, this.props.style)}>

        <DateDisplay
          style={styles.dateDisplay}
          selectedDate={this.state.selectedDate}
          handleMonthDayClick={this._handleMonthDayClick}
          handleYearClick={this._handleYearClick}
          yearSelectionAvailable=
            {this.props.showYearSelector && isMultiYearRange}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          weekCount={weekCount} />

        <div style={styles.calendarContainer}>
          <CalendarToolbar
            displayDate={this.state.displayDate}
            onMonthChange={this._handleMonthChange}
            onYearChange={this._handleYearChange}
            prevMonth={toolbarInteractions.prevMonth}
            nextMonth={toolbarInteractions.nextMonth}
            prevYear={toolbarInteractions.prevYear}
            nextYear={toolbarInteractions.nextYear}
            hideYearChangeButtons={hideYearChangeButtons} />

          <ClearFix
            elementType="ul"
            style={styles.weekTitle}>
            <li style={styles.weekTitleDay}>S</li>
            <li style={styles.weekTitleDay}>M</li>
            <li style={styles.weekTitleDay}>T</li>
            <li style={styles.weekTitleDay}>W</li>
            <li style={styles.weekTitleDay}>T</li>
            <li style={styles.weekTitleDay}>F</li>
            <li style={styles.weekTitleDay}>S</li>
          </ClearFix>

          <SlideInTransitionGroup
            direction={this.state.transitionDirection}>
            <CalendarMonth
              key={this.state.displayDate.toDateString()}
              ref="calendar"
              displayDate={this.state.displayDate}
              onDayTouchTap={this._handleDayTouchTap}
              selectedDate={this.state.selectedDate}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              shouldDisableDate={this.props.shouldDisableDate} />
          </SlideInTransitionGroup>
        </div>

        <div style={styles.yearContainer}>
          {this._yearSelector()}
        </div>

      </div>
    );
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown',
  },

  isSelectedDateDisabled() {
    return this.refs.calendar.isSelectedDateDisabled();
  },

  _yearSelector() {
    if (this.props.showYearSelector) {
      return (
        <CalendarYear
          key={'years'}
          displayDate={this.state.displayDate}
          onYearTouchTap={this._handleYearTouchTap}
          selectedDate={this.state.selectedDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate} />
      );
    }
  },

  _addSelectedDays(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _addSelectedYears(years) {
    this._setSelectedDate(DateTime.addYears(this.state.selectedDate, years));
  },

  _setDisplayDate(d, newSelectedDate) {
    let newDisplayDate = DateTime.getFirstDayOfMonth(d);
    let direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
      if (this.props.onSelectedDayChange) {
        this.props.onSelectedDayChange(
          newSelectedDate || this.state.selectedDate);
      }
    }
  },

  _setSelectedDate(date) {
    let adjustedDate = date;
    if (DateTime.isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (DateTime.isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    let newDisplayDate = DateTime.getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
      if (this.props.onSelectedDayChange) {
        this.props.onSelectedDayChange(adjustedDate);
      }
    }
  },

  _handleDayTouchTap(e, date) {
    this._setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },

  _handleMonthChange(months) {
    this._addSelectedMonths(months);
  },

  _handleYearChange(years) {
    this._addSelectedYears(years);
  },

  _handleYearTouchTap(e, year) {
    let date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, e);
  },

  _getToolbarInteractions() {
    return {
      prevMonth:
      DateTime.monthDiff(this.state.selectedDate, this.props.minDate) > 0,
      nextMonth:
      DateTime.monthDiff(this.state.selectedDate, this.props.maxDate) < 0,
      prevYear:
      DateTime.yearDiff(this.state.selectedDate, this.props.minDate) > 0,
      nextYear:
      DateTime.yearDiff(this.state.selectedDate, this.props.maxDate) < 0,
    };
  },

  _handleMonthDayClick() {
    this.setState({displayMonthDay: true});
  },

  _handleYearClick() {
    this.setState({displayMonthDay: false});
  },

  _handleWindowKeyDown(e) {
    if (this.props.isActive) {
      switch (e.keyCode) {

      case KeyCode.UP:
        if (e.altKey && e.shiftKey) {
          this._addSelectedYears(-1);
        } else if (e.shiftKey) {
          this._addSelectedMonths(-1);
        } else {
          this._addSelectedDays(-7);
        }
        break;

      case KeyCode.DOWN:
        if (e.altKey && e.shiftKey) {
          this._addSelectedYears(1);
        } else if (e.shiftKey) {
          this._addSelectedMonths(1);
        } else {
          this._addSelectedDays(7);
        }
        break;

      case KeyCode.RIGHT:
        if (e.altKey && e.shiftKey) {
          this._addSelectedYears(1);
        } else if (e.shiftKey) {
          this._addSelectedMonths(1);
        } else {
          this._addSelectedDays(1);
        }
        break;

      case KeyCode.LEFT:
        if (e.altKey && e.shiftKey) {
          this._addSelectedYears(-1);
        } else if (e.shiftKey) {
          this._addSelectedMonths(-1);
        } else {
          this._addSelectedDays(-1);
        }
        break;

      default:
        break;
      }
    }
  },
});
