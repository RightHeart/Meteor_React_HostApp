
let OrderSubs = new SubsManager();

Invoices = React.createClass({

  propTypes: {
    limit: React.PropTypes.number,
  },

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {
      limit: 25,
    };
  },

  getInitialState() {
    return {};
  },

  getMeteorData() {
    let { limit } = this.props;
    const handle =
      OrderSubs.subscribe('Orders.byStatus',
        OrderStatus.COMPLETE, {sort: {serviceDate: -1}, limit});
    return {
      loadingOrders: !handle.ready(),
      ordersList:
        Orders.find(
          {status: OrderStatus.COMPLETE, isPaid: true},
          {sort: {serviceDate: -1}, limit}).fetch(),
    };
  },

  getStyles() {
    return {
      root: {},
    };
  },

  render() {
    const styles = this.getStyles();
    let {loadingOrders, ordersList} = this.data;
    let { limit } = this.props;

    return (
      <div style={styles.root}>
        <InvoiceList
          limit={limit}
          pageCount={25}
          isLoading={loadingOrders}
          ordersList={ordersList} />
      </div>
    );
  },

});
