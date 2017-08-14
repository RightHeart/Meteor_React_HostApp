let { 
  FlatButton,
  FontIcon,
  List, 
  ListDivider,
  ListItem,
  RaisedButton
} = mui;

PropertyOrders = React.createClass({

  propTypes: {
    guestUser: React.PropTypes.bool.isRequired,
    property: React.PropTypes.object.isRequired,
    orders: React.PropTypes.array.isRequired,
    orderType: React.PropTypes.string.isRequired,
    showAll: React.PropTypes.bool.isRequired,
    onShowAllOrders: React.PropTypes.func.isRequired,
    onShowNoAccount: React.PropTypes.func.isRequired,
    onShowNotServiceable: React.PropTypes.func.isRequired,
    onShowNoAccess: React.PropTypes.func.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {
      guestUser: false,
      property: {},
      orders: [],
      orderType: '',
      showAll: false,
      onShowAllOrders: () => {},
      onShowNoAccount: () => {},
      onShowNotServiceable: () => {},
      onShowNoAccess: () => {},
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {},
      statusItem: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        color: palette.textColor,
        borderBottom: `1px solid ${palette.borderColor}`,
      },
      ordersList: {
        paddingBottom: 0,
        paddingTop: 0,
      },
      orderAvatar: {
        marginTop: 10,
        color: palette.primary1Color,
      },
      orderDate: {
        fontWeight: 500,
        marginBottom: 5,
      }
    };
  },

  getNewOrder() {
    const styles = this.getStyles();
    return (
      <div>
        <ListItem
          primaryText={<span style={styles.orderDate}>New Booking</span>}
          onTouchTap={this._handleNewOrderTouchTap}
          leftAvatar={
            <FontIcon 
              className='icon tasks'
              style={styles.orderAvatar} />
          } />
      </div>
    )
  },

  getStatus() {
    const styles = this.getStyles();
    let size = this.props.showAll ? 'Less' : 'More';
    if (this.props.orders.length === 0) {
      return (
        <FlatButton
         style={styles.statusItem}
         disabled={true}>
            No&nbsp;{this.props.orderType}&nbsp;Bookings
        </FlatButton>
      ) 
    } else if (this.props.orders.length < 3) {
      return null;
    } 
    return (
      <FlatButton 
        style={styles.statusItem} 
        onTouchTap={this.props.onShowAllOrders()}>
          Show&nbsp;{size}&nbsp;Bookings
      </FlatButton>
    );
  },

  render() {
    const styles = this.getStyles();
    let orders = this.props.showAll ? this.props.orders : this.props.orders.slice(0,2)
    return (
      <List style={styles.ordersList}>
        {orders.map(order => {
          let m = moment(order.serviceDate).tz('Australia/Sydney');
          return (
            <div>
              <ListItem
                key={order._id}
                leftAvatar={
                  <FontIcon 
                    className='icon calendar'
                    style={styles.orderAvatar} />
                }
                primaryText={
                  <div style={styles.orderDate}>
                    {`${m.format('dddd')} ${m.format('DD')} ${m.format('MMMM')}`}
                  </div>
                }
                secondaryText={<TimeSlotLabel timeSlot={order.timeSlot} />}
                onTouchTap={() => this._handleViewOrderTouchTap(order._id)}
                rightAvatar={
                  <FontIcon 
                    className='icon edit'
                    style={styles.orderAvatar} />
                } 
              />
              <ListDivider />
            </div>
          );
        })}
        {this.getStatus()}
        {this.getNewOrder()}
      </List>
    );
  },

  _handleViewOrderTouchTap(orderId) {
    FlowRouter.setQueryParams({booking: orderId});
  },

  _handleNewOrderTouchTap() {
    if (this.props.guestUser) {
      this.props.onShowNoAccount();
    } else {
      let { _id, suburb, postcode, access } = this.props.property;
      LocationActions.isServiceable(suburb, postcode, (err, isServiceable) => {
        if (err || !isServiceable) {
          this.props.onShowNotServiceable();
        } else {
          if (!access || access.length === 0) {
            this.props.onShowNoAccess();
          } else {
            FlowRouter.setQueryParams({'new-booking': _id});
          }
        }
      });
    }
  },

});
