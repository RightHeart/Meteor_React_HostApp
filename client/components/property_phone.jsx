propertyPhone = React.createClass({

  propTypes: {
    guestUser: React.PropTypes.bool,
    propertyPhone: React.PropTypes.array,
    completedOrdersList: React.PropTypes.array,
    upcomingOrdersList: React.PropTypes.array,
    loadingOrders: React.PropTypes.bool,
  },

  mixins: [],

  getDefaultProps() {
    return {
      propertyPhone: [],
      completedOrdersList: [],
      upcomingOrdersList: [],
    };
  },

  getInitialState() {
    return {};
  },

  getCompletedOrders(_id) {
    return _.filter(this.props.completedOrdersList, order => {
      return order.propertyId === _id;
    }) || [];
  },

  getUpcomingOrders(_id) {
    return _.filter(this.props.upcomingOrdersList, order => {
      return order.propertyId === _id;
    }) || [];
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        {
          this.props.propertyPhone.map(property => {
            return (
              <PropertyRow
                key={property._id}
                guestUser={this.props.guestUser}
                onShowNoAccount={this._handleShowNoAccount}
                onShowNotServiceable={this._handleShowNotServiceable}
                property={property}
                completeOrders={this.getCompletedOrders(property._id)}
                upcomingOrders={this.getUpcomingOrders(property._id)} />
            );
          })
        }
        {this.props.guestUser ? <NoAccountDialog ref="noAccountDialog" /> : ''}
        <NotServiceableDialog ref="notServiceableDialog" />
      </div>
    );
  },

  _handleShowNoAccount() {
    if (this.refs.noAccountDialog) {
      this.refs.noAccountDialog.show();
    }
  },

  _handleShowNotServiceable() {
    if (this.refs.notServiceableDialog) {
      this.refs.notServiceableDialog.show();
    }
  },

});
