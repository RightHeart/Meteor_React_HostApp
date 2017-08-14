let { CircularProgress } = mui;

let PropertySubs = new SubsManager();
let OrderSubs = new SubsManager();

PropertiesPage = React.createClass({

  propTypes: {},

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getMeteorData() {
    const pHandle = PropertySubs.subscribe('Properties.all');
    const ocHandle = OrderSubs.subscribe('Orders.byStatus',
      OrderStatus.COMPLETE, {sort: {serviceDate: -1}, limit: 6});
    const oHandle = OrderSubs.subscribe('Orders.byStatus',
      OrderStatus.ORDERED);
    const oaHandle = OrderSubs.subscribe('Orders.byStatus',
      OrderStatus.ASSIGNED);

    const user = Meteor.user();

    return {
      newBooking: FlowRouter.getQueryParam('new-booking'),
      newProperty: FlowRouter.getQueryParam('new-property'),
      loadingProperties: !pHandle.ready(),
      loadingCompletedOrders: !ocHandle.ready(),
      loadingUpcomingOrders: !oHandle.ready() || !oaHandle.ready(),
      propertyList: Properties.find(
        {removed: {$ne: true}}, {sort: {nickname: 1}}).fetch(),
      completedOrdersList:
        Orders.find({status: OrderStatus.COMPLETE},
          {sort: {serviceDate: -1}}).fetch(),
      upcomingOrdersList:
        Orders.find({status:
          {$nin: [OrderStatus.CANCELED, OrderStatus.COMPLETE]}},
          {sort: {serviceDate: 1}}).fetch(),
      guestUser: user && user.profile.guest,
    };
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
      loading: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { guestUser, propertyList, completedOrdersList, newProperty,
      upcomingOrdersList, newBooking, loadingProperties,
      loadingCompletedOrders, loadingUpcomingOrders} = this.data;

    return (
      <div style={styles.root}>
        <PropertyRowNew />
        <PropertyList
          guestUser={guestUser}
          propertyList={propertyList}
          completedOrdersList={completedOrdersList}
          upcomingOrdersList={upcomingOrdersList}
          loadingOrders={loadingCompletedOrders || loadingUpcomingOrders} />
        {loadingProperties ? <CircularProgress style={styles.loading} /> : ''}
        <PropertyNew open={!!newProperty} />
        <OrderNewData propertyId={newBooking} />
      </div>
    );
  },
});
