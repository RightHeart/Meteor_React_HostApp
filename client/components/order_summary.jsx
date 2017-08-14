let { Table, TableHeader, TableRow,
  TableHeaderColumn, TableBody, TableFooter,
  TableRowColumn, Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Colors } = Styles;
let settings = Meteor.settings.public;

OrderSummary = React.createClass({

  propTypes: {
    total: React.PropTypes.number,
    discount: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        borderBottom: `2px solid ${palette.borderColor}`,
      },
      table: {
      },
      header: {
        fontWeight: 600,
      },
      row: {
        display: 'flex',
      },
      rowWhenDiscount: {
        display: 'flex',
        color: Colors.red400,
        borderBottom: `1px solid ${palette.borderColor}`,
      },
      columnDesc: {
        flex: 7,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      columnQty: {
        flex: 1,
        textAlign: 'center',
        overflow: 'inherit',
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      columnPrice: {
        flex: 2,
        textAlign: 'right',
        overflow: 'inherit',
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      footerRow: {
        display: 'flex',
        color: palette.primary1Color,
        borderBottom: 'none',
        borderTop: 'none',
        fontWeight: 600,
        padding: 0,
      },
      footerColumnDesc: {
        flex: 1,
        fontSize: 16,
        height: 36,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      footerColumnPrice: {
        flex: 1,
        fontSize: 16,
        height: 36,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'right',
      },
    };
  },

  getFormattedPrice(product, qty = 1) {
    const price = (product.fetchPrice ? product.fetchPrice().price : 0) * qty;
    let rtn;
    if (price < 0) {
      rtn = `-$${(price * -1).toFixed(2)}`;
    } else {
      rtn = `$${price.toFixed(2)}`;
    }
    return rtn;
  },

  getProductRow(product, qty) {
    const styles = this.getStyles();
    if (qty > 0) {
      return (
        <TableRow
          key={product._id}
          style={styles.row} >
          <TableRowColumn style={styles.columnDesc}>
            {product.name}
          </TableRowColumn>
          <TableRowColumn style={styles.columnQty}>
            {qty}
          </TableRowColumn>
          <TableRowColumn style={styles.columnPrice}>
            {this.getFormattedPrice(product, qty)}
          </TableRowColumn>
        </TableRow>
      );
    }
  },

  getDiscount() {
    let { discount, total } = this.props;
    if (!!discount) {
      if (discount.type === DiscountType.FIXED) {
        return Math.min(discount.value, total) * -1;
      }
      return ((discount.value / 100) * total) * -1;
    }
    return 0;
  },

  getProductPrice(product, qty) {
    if (product.fetchPrice) {
      return product.fetchPrice().price * qty;
    }
    return 0;
  },

  getSurchargeRow() {
    const styles = this.getStyles();
    let {kingProduct, queenProduct, surchargeProduct,
      singleProduct, bathProduct, towelsProduct,
      kingQty, queenQty, singleQty, bathQty, towelsQty } = this.props;

    let total = 0;
    total += this.getProductPrice(kingProduct, kingQty);
    total += this.getProductPrice(queenProduct, queenQty);
    total += this.getProductPrice(singleProduct, singleQty);
    total += this.getProductPrice(bathProduct, bathQty);
    total += this.getProductPrice(towelsProduct, towelsQty);
    // Add surcharge if linen is less than $29
    if (total > 0 && total < settings.surchargeThreshold) {
      return (
        <TableRow
          key={surchargeProduct._id}
          style={styles.row} >
          <TableRowColumn style={styles.columnDesc}>
            {surchargeProduct.name} <a href=""
                                       onTouchTap={
                                        this._handleShowSurchargeInfo
                                       }>What's this?</a>
          </TableRowColumn>
          <TableRowColumn style={styles.columnQty}>
            {1}
          </TableRowColumn>
          <TableRowColumn style={styles.columnPrice}>
            {this.getFormattedPrice(surchargeProduct, 1)}
          </TableRowColumn>
        </TableRow>
      );
    }
  },

  getTimeSlotDiscount() {
    const styles = this.getStyles();
    let { timeSlot, timeSlotDiscount } = this.props;
    if (timeSlot === TimeSlot.DAY) {
      return (
        <TableRow
          key={timeSlotDiscount._id}
          style={styles.rowWhenDiscount}>
          <TableRowColumn style={styles.columnDesc}>
            {timeSlotDiscount.name}
          </TableRowColumn>
          <TableRowColumn style={styles.columnQty}/>
          <TableRowColumn style={styles.columnPrice}>
            {this.getFormattedPrice(timeSlotDiscount)}
          </TableRowColumn>
        </TableRow>
      );
    }
  },

  getDiscountRow() {
    const styles = this.getStyles();
    let { discount } = this.props;
    if (!!discount) {
      const price = this.getDiscount();
      const discountProduct = {
        fetchPrice() {
          return { price };
        },
      };
      return (
        <TableRow
          key={discount._id}
          style={styles.rowWhenDiscount}>
          <TableRowColumn style={styles.columnDesc}>
            {discount.name}
          </TableRowColumn>
          <TableRowColumn style={styles.columnQty} />
          <TableRowColumn style={styles.columnPrice}>
            {this.getFormattedPrice(discountProduct)}
          </TableRowColumn>
        </TableRow>
      );
    }
  },

  render() {
    const styles = this.getStyles();
    let {total, cleanProduct, kingProduct, queenProduct, surchargeProduct,
      singleProduct, bathProduct, towelsProduct, toiletriesProduct,
      kingQty, queenQty, singleQty,
      bathQty, towelsQty, toiletryQty } = this.props;
    return (
      <div style={styles.root}>
        <Table style={styles.table}>
          <TableHeader 
            displaySelectAll={false} 
            adjustForCheckbox={false}>
            <TableRow style={styles.row}>
              <TableHeaderColumn style={this.mergeAndPrefix(styles.header,styles.columnDesc)}>
                Description
              </TableHeaderColumn>
              <TableHeaderColumn style={this.mergeAndPrefix(styles.header,styles.columnQty)}>
                Qty
              </TableHeaderColumn>
              <TableHeaderColumn style={this.mergeAndPrefix(styles.header,styles.columnPrice)}>
                Price
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.getProductRow(cleanProduct, 1)}
            {this.getProductRow(kingProduct, kingQty)}
            {this.getProductRow(queenProduct, queenQty)}
            {this.getProductRow(singleProduct, singleQty)}
            {this.getProductRow(bathProduct, bathQty)}
            {this.getProductRow(towelsProduct, towelsQty)}
            {this.getProductRow(toiletriesProduct, toiletryQty)}
            {this.getSurchargeRow()}
            {this.getTimeSlotDiscount()}
            {this.getDiscountRow()}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow style={styles.footerRow}>
              <TableRowColumn style={styles.footerColumnDesc}>
                Total
              </TableRowColumn>
              <TableRowColumn style={styles.footerColumnPrice}>
                ${(total + this.getDiscount()).toFixed(2)}
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <ProductSurcharge
          ref="productSurcharge"
          product={surchargeProduct} />
      </div>
    );
  },

  _handleShowSurchargeInfo(event) {
    event.preventDefault();
    this.refs.productSurcharge.show();
  },

});
