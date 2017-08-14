let {FlatButton, Dialog} = mui;

CreditCardEdit = React.createClass({

  propTypes: {
    card: React.PropTypes.object.isRequired,
    open: React.PropTypes.bool,
  },

  mixins: [],

  getDefaultProps() {
    return {
      open: false,
    };
  },

  getInitialState() {
    return {
      month: this.props.card.expMonth,
      year: this.props.card.expYear,
      dirty: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.refs.editDialog.show();
    } else if (this.refs.editDialog.state.open) {
      this.refs.editDialog.dismiss();
    }

    let { card } = nextProps;
    this.setState({month: card.expMonth, year: card.expYear});
  },

  getStyles() {
    return {
      root: {
        width: '50%',
        minWidth: 310,
        maxWidth: 400,
      },
      body: {
        textAlign: 'center',
        overflow: 'visible',
      },
    };
  },

  getMenuItems() {
    const thisYear = new Date().getFullYear();
    years = [];
    for (let i = 0; i < 15; i++) {
      const year = thisYear + i;
      years.push({
        payload: year,
        text: year,
      });
    }

    return {
      months: [
        {payload: 1, text: 'January'},
        {payload: 2, text: 'February'},
        {payload: 3, text: 'March'},
        {payload: 4, text: 'April'},
        {payload: 5, text: 'May'},
        {payload: 6, text: 'June'},
        {payload: 7, text: 'July'},
        {payload: 8, text: 'August'},
        {payload: 9, text: 'September'},
        {payload: 10, text: 'October'},
        {payload: 11, text: 'November'},
        {payload: 12, text: 'December'},
      ],
      years,
    };
  },

  getActions() {
    return [
      <FlatButton
        key={0}
        label="Cancel"
        onTouchTap={this._handleEditCancel} />,
      <FlatButton
        key={1}
        label="Update"
        primary={true}
        onTouchTap={this._handleEditUpdate} />,
    ];
  },

  render() {
    const styles = this.getStyles();
    const menu = this.getMenuItems();

    return (
      <Dialog
        ref="editDialog"
        title={<Heading title="Edit your credit card" />}
        contentStyle={styles.root}
        bodyStyle={styles.body}
        actions={this.getActions()}
        onDismiss={this._handleOnDismiss}>
        <Fieldset>
          <div>
            <SelectField
              floatingLabelText="Expiry month"
              menuItems={menu.months}
              value={this.state.month}
              onChange={this._handleMonthChange} />
          </div>
          <div>
            <SelectField
              floatingLabelText="Expiry year"
              menuItems={menu.years}
              value={this.state.year}
              onChange={this._handleYearChange}/>
          </div>
        </Fieldset>
      </Dialog>
    );
  },

  show() {
    this.refs.editDialog.show();
  },

  reset() {
    let { card } = this.props;
    this.replaceState({
      month: card.expMonth,
      year: card.expYear,
      dirty: false,
    });
  },

  _handleMonthChange(e, key, payload) {
    if (this.state.month !== payload) {
      this.setState({dirty: true, month: payload});
    }
  },

  _handleYearChange(e, key, payload) {
    if (this.state.year !== payload) {
      this.setState({dirty: true, year: payload});
    }
  },

  _handleEditCancel() {
    FlowRouter.setQueryParams({edit: null});
  },

  _handleEditUpdate() {
    if (this.state.dirty) {
      let { card } = this.props;
      let { month: expMonth, year: expYear } = this.state;
      CardActions.updateCreditCard(card._id, {expMonth, expYear}, err => {
        Notifier.showMessage(
          'Credit card has been updated.', err,
          'There was an error updated your credit card'
        );
      });
    }
    FlowRouter.setQueryParams({edit: null});
  },

  _handleOnDismiss() {
    this.reset();
    if (FlowRouter.getQueryParam('edit')) {
      FlowRouter.setQueryParams({edit: null});
    }
  },

});
