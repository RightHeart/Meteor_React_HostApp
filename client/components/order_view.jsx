let { 
  Dialog, 
  FlatButton, 
  FontIcon, 
  Table, 
  TableHeader, 
  TableRow,
  TableHeaderColumn, 
  TableBody, 
  TableFooter,
  TableRowColumn, 
  Styles, 
  Mixins 
} = mui;
let { StylePropable } = Mixins;
let { Colors } = Styles;

let OrdersSubs = new SubsManager();

OrderView = React.createClass({

  propTypes: {
    orderId: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [ReactMeteorData, StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  componentWillReceiveProps(nextProps) {
    let { orderDialog } = this.refs;
    if (nextProps.orderId) {
      this.previousTitle = DocHead.getTitle();
      orderDialog.show();
    } else if (orderDialog.state.open) {
      orderDialog.dismiss();
    }
  },

  getMeteorData() {
    let { orderId } = this.props;
    const handle = OrdersSubs.subscribe('Orders.byId', orderId);
    const order = Orders.findOne(this.props.orderId);
    const property = order ? order.fetchProperty() : {};
    return {
      loading: !handle.ready(),
      order,
      property,
    };
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        width: '90%',
        maxWidth: 500,
      },
      header: {
        fontWeight: 600,
      },
      body: {
        padding: 0,
      },
      content: {
        paddingTop: 20,
        paddingBottom: 20,
      },
      strikeThrough: {
        textDecoration: 'line-through',
      },
      done: {
        color: palette.accent1Color,
        position: 'absolute',
        top: 20,
        right: 20,
        fontSize: 36,
      },
      table: {
        marginTop: 20,
        borderBottom: `2px solid ${palette.borderColor}`,
      },
      row: {
        display: 'flex',
      },
      descColumn: {
        flex: 7,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      qtyColumn: {
        flex: 1,
        textAlign: 'center',
        overflow: 'inherit',
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      priceColumn: {
        flex: 2,
        textAlign: 'right',
        overflow: 'inherit',
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      totalRow: {
        display: 'flex',
        color: palette.primary1Color,
        fontWeight: 500,
        padding: 0,
      },
      totalDescColumn: {
        flex: 1,
        fontSize: 16,
        height: 36,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      totalPriceColumn: {
        flex: 1,
        fontSize: 16,
        height: 36,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'right',
      },
      gstRow: {
        display: 'flex',
        padding: 0,
        borderBottom: 'none',
        borderTop: 'none',
      },
      gstDescColumn: {
        flex: 1,
        height: 20,
        paddingLeft: 0,
        paddingRight: 0,
      },
      gstPriceColumn: {
        flex: 1,
        height: 20,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'right',
      },
      rowWhenDiscount: {
        color: Colors.red400,
        display: 'flex',
        borderBottom: `1px solid ${palette.borderColor}`,
      },
      cancelButton: {
        color: Colors.red600,
      },
    };
  },

  getFormattedPrice(price) {
    let rtn;
    if (price < 0) {
      rtn = `-$${(price * -1).toFixed(2)}`;
    } else {
      rtn = `$${price.toFixed(2)}`;
    }
    return rtn;
  },

  getContent() {
    const styles = this.getStyles();
    let { order, property } = this.data;
    if (order && property) {
      const complete = order.status === OrderStatus.COMPLETE;
      const canceled = order.status === OrderStatus.CANCELED;

      DocHead.setTitle(`Booking for ${property.nickname}`);

      return (
        <Content style={styles.content}>
          <h2>{property.nickname}</h2>
          <h3 style={this.mergeAndPrefix(canceled && styles.strikeThrough)}>
            <DateLabel date={order.serviceDate} />
          </h3>
          <div style={this.mergeAndPrefix(canceled && styles.strikeThrough)}>
            <TimeSlotLabel timeSlot={order.timeSlot} />
          </div>
          {complete
            ? <FontIcon className="icon checkmark" style={styles.done} />
            : ''}
          <div style={styles.table}>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow style={styles.row}>
                  <TableHeaderColumn style={this.mergeAndPrefix(styles.header,styles.descColumn)}>
                    Description
                  </TableHeaderColumn>
                  <TableHeaderColumn style={this.mergeAndPrefix(styles.header,styles.qtyColumn)}>
                    Qty
                  </TableHeaderColumn>
                  <TableHeaderColumn style={this.mergeAndPrefix(styles.header,styles.priceColumn)}>
                    Price
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {order.items.map(item => {
                  let isDiscount = !!item.discountId || item.totalPrice < 0;
                  return (
                    <TableRow
                      key={item.productId || item.discountId}
                      style={this.mergeAndPrefix(styles.row,
                        isDiscount && styles.rowWhenDiscount,
                        canceled && styles.strikeThrough)}>
                      <TableRowColumn style={styles.descColumn}>
                        {item.description}
                      </TableRowColumn>
                      <TableRowColumn style={styles.qtyColumn}>
                        {item.quantity}
                      </TableRowColumn>
                      <TableRowColumn style={styles.priceColumn}>
                        {this.getFormattedPrice(item.totalPrice)}
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter adjustForCheckbox={false}>
                <TableRow
                  style={this.mergeAndPrefix(styles.totalRow,
                  canceled && styles.strikeThrough)}>
                  <TableRowColumn colSpan="2" style={styles.totalDescColumn}>
                    Total
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.totalPriceColumn}>
                    {this.getFormattedPrice(order.totalPrice)}
                  </TableRowColumn>
                </TableRow>
                <TableRow style={this.mergeAndPrefix(styles.gstRow,
                  canceled && styles.strikeThrough)}>
                  <TableRowColumn colSpan="2" style={styles.gstDescColumn}>
                    GST
                  </TableRowColumn>
                  <TableRowColumn
                    style={styles.gstPriceColumn}>
                    {this.getFormattedPrice(order.tax)}
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Content>
      );
    }
    return '';
  },

  getActions() {
    const styles = this.getStyles();
    let { order } = this.data;
    const rtn = [];
    if (order &&
      (order.status === OrderStatus.ORDERED ||
        order.status === OrderStatus.ASSIGNED)) {
      rtn.push(<FlatButton
        key={1}
        label="Cancel Order"
        style={styles.cancelButton}
        hoverColor={Colors.red50}
        rippleColor={Colors.red300}
        onTouchTap={this._handleCancelOrder} />);
    }
    rtn.push(
      <FlatButton
        key={0}
        label="Close"
        onTouchTap={this._handleViewClose} />
    );
    return rtn;
  },

  render() {
    const styles = this.getStyles();
    let { loading, order } = this.data;
    return (
      <div>
        <Dialog
          ref="orderDialog"
          title={loading ? <Heading title="Your booking" /> : ''}
          contentStyle={styles.root}
          bodyStyle={styles.body}
          actions={this.getActions()}
          onDismiss={this._handleOnDismiss} >
          {loading ? <LinearLoading /> : this.getContent()}
        </Dialog>
        <OrderCancel
          ref="cancelDialog"
          orderId={order ? order._id : ''}
          onOrderCanceled={this._handleViewClose} />
      </div>
    );
  },

  _handleOnDismiss() {
    if (FlowRouter.getQueryParam('booking')) {
      FlowRouter.setQueryParams({booking: null});
    }
    DocHead.setTitle(this.previousTitle);
  },

  _handleViewClose() {
    this.refs.orderDialog.dismiss();
  },

  _handleCancelOrder() {
    this.refs.cancelDialog.show();
  },

});
