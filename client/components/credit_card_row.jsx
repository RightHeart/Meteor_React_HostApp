let { FontIcon, IconButton, Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Colors, Transitions } = Styles;

CreditCardRow = React.createClass({

  propTypes: {
    card: React.PropTypes.object.isRequired,
    isLast: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable, ReactMeteorData],

  getDefaultProps() {
    return {
      isLast: false,
    };
  },

  getInitialState() {
    return {
      xPosition: 0,
      card: this.props.card,
    };
  },

  componentWillReceiveProps(props) {
    this.setState(props);
  },

  getMeteorData() {
    return {
      edit: FlowRouter.getQueryParam('edit'),
    };
  },

  getThemePalette() {
    return this.context.muiTheme.palette;
  },

  getStyles() {
    const palette = this.getThemePalette();

    return {
      container: {
        backgroundColor: palette.canvasColor,
        borderBottom: '1px solid ' + palette.borderColor,
      },
      containerWhenLast: {
        borderBottom: 'none',
      },
      root: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 16px',
        backgroundColor: Colors.white,
        borderLeft: '2px solid ' + Colors.white,
        transition: Transitions.easeOut('0.75s', 'borderLeft'),
      },
      rootWhenDefault: {
        borderLeft: '3px solid ' + palette.accent1Color,
      },
      content: {
        flex: '1 1 100%',
        padding: '10px 0px',
      },
      icon: {
        marginRight: 15,
        verticalAlign: 'middle',
      },
      actionButtons: {
        flexShrink: 0,
      },
      actionIcon: {
        color: Colors.grey600,
        iconHoverColor: palette.primary1Color,
      },
    };
  },

  getActionButtons() {
    const styles = this.getStyles();
    const actions = [
      {
        icon: 'card',
        tooltip: 'Make default card',
        handle: this._handleSetDefaultClick,
      },
      {
        icon: 'edit',
        tooltip: 'Edit card',
        handle: this._handleEditClick,
      },
      {
        icon: 'trash',
        tooltip: 'Remove card',
        handle: this._handleRemoveClick,
      },
    ];

    return (
      <div style={styles.actionButtons}>
        {actions.map((action, i) => {
          return (
            <IconButton 
              key={i}
              iconClassName={'icon ' + action.icon}
              tooltipPosition="bottom-left"
              tooltip={action.tooltip}
              iconStyle={styles.actionIcon}
              tooltipStyles={styles.tooltip}
              onClick={action.handle} />
          );
        })}
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    let { isLast } = this.props;
    let { card } = this.state;

    return (
      <div style={this.mergeAndPrefix(
        styles.container,
        isLast && styles.containerWhenLast)}>
        <div
          style={this.mergeAndPrefix(
            styles.root, 
            card && card.isDefault && styles.rootWhenDefault
          )}>
          <div style={styles.content}>
            <FontIcon
              className={'icon creditcard ' + card.brand.toLowerCase()}
              style={styles.icon} />
            {`${card.brand} ending ${card.last4},
              expires ${card.expMonth}/${card.expYear}`}
          </div>
          {this.getActionButtons()}
        </div>
        <CreditCardEdit
          card={card}
          open={this.data.edit === card._id} />
      </div>
    );
  },

  _handleSetDefaultClick() {
    let { card } = this.props;
    if (!card.isDefault) {
      CardActions.setDefaultCard(card._id, err => {
        if (err) {
          Notifier.showError('Unable to change default credit card.');
        } else {
          Notifier.showMessage('Default credit card changed.');
        }
      });
    }
  },

  _handleEditClick() {
    FlowRouter.setQueryParams({edit: this.props.card._id});
  },

  _handleRemoveClick() {
    let { card } = this.props;
    if (!card.isDefault) {
      CardActions.removeCreditCard(card._id, err => {
        if (err) {
          Notifier.showError('Unable to remove credit card.');
        } else {
          Notifier.showMessage('Credit card has been removed.');
        }
      });
    } else {
      // TODO: Should this be a dialog with more info?
      Notifier.showError('Cannot remove your default credit card.');
    }
  },
});
