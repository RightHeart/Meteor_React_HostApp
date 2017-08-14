let { Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Colors } = Styles;
let { Transitions } = Styles;

let ProductSubs = new SubsManager();
let CardsSubs = new SubsManager();

OrderNewData = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },


  mixins: [StylePropable, ReactMeteorData],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      scrollable: true,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.propertyId && !this.props.propertyId) {
      this._handleScrollTop();
    }
  },

  getMeteorData() {
    let user = Meteor.user();
    let premium = user && !!user.profile.premium;

    if (this.props.propertyId) {
      ProductSubs.subscribe('Products.forProperty',
        this.props.propertyId, premium);
    }
    const handle = CardsSubs.subscribe('Cards.all');
    let property = Properties.findOne(this.props.propertyId) || {};
    return {
      property,
      cleanProduct: Products.findOne({
        type: ProductType.CLEAN,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size: property.type,
        premium,
      }) || {},
      kingProduct: Products.findOne({
        type: ProductType.BED_LINEN,
        size: BedLinenSize.KING,
      }) || {},
      queenProduct: Products.findOne({
        type: ProductType.BED_LINEN,
        size: BedLinenSize.QUEEN,
      }) || {},
      singleProduct:
      Products.findOne({
        type: ProductType.BED_LINEN,
        size: BedLinenSize.SINGLE,
      }) || {},
      bathProduct: Products.findOne({
        type: ProductType.BATH_LINEN,
        size: BathLinenSize.BATH,
      }) || {},
      towelsProduct: Products.findOne({
        type: ProductType.BATH_LINEN,
        size: BathLinenSize.TOWELS,
      }) || {},
      toiletriesProduct: Products.findOne({
        type: ProductType.TOILETRIES,
      }) || {},
      surchargeProduct: Products.findOne({
        type: ProductType.EXTRAS,
        code: 'KDSURC',
      }) || {},
      timeSlotDiscount: Products.findOne({
        type: ProductType.EXTRAS,
        code: 'KDTIME',
      }) || {},
      priceList: PriceLists.current(),
      loadingCards: !handle.ready(),
      cardsList: Cards.find({}, {sort: {_id: 1}}).fetch(),
      defaultCard: Cards.findOne({isDefault: true}) || {},
    };
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        zIndex: 90,
        backgroundColor: Colors.white,
        position: 'fixed',
        left: 0,
        top: '100%',
        width: '100%',
        height: '100%',
        willChange: 'opacity',
        overflow: 'hidden',
        opacity: 0,
        // transform: 'translateY(100%)',
        transition: Transitions.easeOut(),
      },
      rootWhenShow: {
        opacity: 1,
        top: 0,
       // transform: 'translateY(0)',
      },
      rootWhenScrollable: {
        overflow: 'auto',
      },
      scrollOverride: {
        overflow: 'hidden',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let show = !!this.data.property._id;
    let { scrollable } = this.state;
    return (
      <div style={this.mergeAndPrefix(
                      styles.root,
                      show && styles.rootWhenShow,
                      scrollable && styles.rootWhenScrollable,
                      !show && styles.scrollOverride
                      )} >
        <OrderNew
          ref="orderNew"
          onSetScrolling={this._setScrolling}
          onScrollTop={this._handleScrollTop}
          {...this.data} />
      </div>
    );
  },

  _setScrolling(scrollable) {
    this.setState({scrollable});
  },

  _handleScrollTop() {
    const node = React.findDOMNode(this);
    node.scrollTop = 0;
  },

});
