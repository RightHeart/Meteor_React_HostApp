let { TextField, RaisedButton, Mixins } = mui;
let { StylePropable } = Mixins;
let settings = Meteor.settings.public;

largeNew = React.createClass({

  propTypes: {
    property: React.PropTypes.object,
    cleanProduct: React.PropTypes.object,
    kingProduct: React.PropTypes.object,
    queenProduct: React.PropTypes.object,
    singleProduct: React.PropTypes.object,
    bathProduct: React.PropTypes.object,
    towelsProduct: React.PropTypes.object,
    toiletriesProduct: React.PropTypes.object,
    surchargeProduct: React.PropTypes.object,
    timeSlotDiscount: React.PropTypes.object,
    priceList: React.PropTypes.object,
    loadingCards: React.PropTypes.bool,
    cardsList: React.PropTypes.array,
    defaultCard: React.PropTypes.object,
    onSetScrolling: React.PropTypes.func,
    onScrollTop: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      onSetScrolling: () => {},
      onScrollTop: () => {},
    };
  },

  getInitialState() {
    return {
      show: false,
      kingQty: 0,
      queenQty: 0,
      singleQty: 0,
      bathQty: 0,
      towelsQty: 0,
      toiletryQty: 0,
    };
  },

  componentDidMount() {
    this._originalBodyOverflow =
      document.getElementsByTagName('body')[0].style.oveflow;
    this._originalPositionFixed =
      document.getElementsByTagName('body')[0].style.position;
  },

  componentWillReceiveProps(nextProps) {
    let { property, defaultCard } = nextProps;
    if (!!property &&
        !!property._id &&
        !this.state.largePlaced && !this.state.show) {
      this.setState(
        {
          show: true,
          kingQty: property.king || 0,
          queenQty: property.queen || 0,
          singleQty: property.single || 0,
          bathQty: property.bathrooms,
          toiletryQty: property.bathrooms,
          cardId: !!defaultCard ? defaultCard._id : null,
        });
    }

    if (!!defaultCard && defaultCard._id !== this.state.cardId) {
      this.setState({cardId: defaultCard._id});
    }

    if (!property || !property._id) {
      this.replaceState(this.getInitialState());
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !!nextProps.property._id || nextState.show !== this.state.show;
  },

  componentDidUpdate() {
    this.state.show
    ? this._preventScrolling()
    : this._allowScrolling();
  },

  componentWillUnmount() {
    this._allowScrolling();
  },

  getProductPrice(product, qty) {
    if (product.fetchPrice) {
      return product.fetchPrice().price * qty;
    }
    return 0;
  },

  getTotal() {
    let { cleanProduct, kingProduct, queenProduct, surchargeProduct,
      singleProduct, bathProduct, towelsProduct, timeSlotDiscount,
      toiletriesProduct } = this.props;
    let { kingQty, queenQty, singleQty,
          bathQty, towelsQty, toiletryQty, timeSlot } = this.state;
    let total = 0;
    total += this.getProductPrice(kingProduct, kingQty);
    total += this.getProductPrice(queenProduct, queenQty);
    total += this.getProductPrice(singleProduct, singleQty);
    total += this.getProductPrice(bathProduct, bathQty);
    total += this.getProductPrice(towelsProduct, towelsQty);
    // Add surcharge if linen is less than $30
    if (total > 0 && total < settings.surchargeThreshold) {
      total += this.getProductPrice(surchargeProduct, 1);
    }
    total += this.getProductPrice(cleanProduct, 1);
    total += this.getProductPrice(toiletriesProduct, toiletryQty);

    // If timeSlot is 'day' then apply discount
    if (timeSlot === TimeSlot.DAY) {
      total += this.getProductPrice(timeSlotDiscount, 1);
    }

    return total;
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 2000,
        paddingTop: 56,
        paddingBottom: 100,
      },
      calendarContainer: {
        padding: '20px 0px',
        width: '100%',
      },
      timeSlotContainer: {
        padding: '10px 24px',
      },
      itemContainer: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '10px 24px',
      },
      paymentContainer: {
        padding: 20,
        width: '100%',
      },
      infoContainer: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      },
      summaryContainer: {
        paddingTop: 24,
      },
      addCC: {
        marginTop: 15,
        marginBottom: 20,
      },
      payment: {
        width: '100%',
        paddingBottom: 20,
      },
      paymentInfo: {
        textAlign: 'center',
      },
      action: {
        paddingTop: 20,
        textAlign: 'right',
      },
      loading: {
        position: 'fixed',
        bottom: 0,
      },
    };
  },

  getlargeDetails() {
    let { serviceDate, timeSlot } = this.state;
    let { nickname, street, suburb, postcode } = this.props.property;
    return {
      serviceDate,
      timeSlot,
      nickname,
      street,
      suburb,
      postcode,
    };
  },

  getPaymentOptions() {
    const styles = this.getStyles();
    let { loadingCards, cardsList } = this.props;
    if (!loadingCards) {
      if (cardsList.length > 0) {
        return (
          <div style={styles.payment}>
            <largePayment
              cardsList={cardsList}
              value={this.state.cardId}
              onPaymentSelected={this._handlePaymentSelected} />
            <p style={styles.paymentInfo}>
              You won't be charged until the job is complete.
            </p>
          </div>
        );
      }
      return (<AddCreditCard style={styles.addCC} />);
    }
  },

  render() {
    const styles = this.getStyles();
    let { property, cardsList } = this.props;
    let minDate = new Date();
    minDate.setHours(minDate.getHours() + 48);

    return (
      <div style={styles.root} key={property._id}>
        <largeTotal
          ref="largeTotal"
          title={`New booking for ${property.nickname}`}
          total={this.getTotal()}
          discount={this.state.discount} />
        <div style={styles.container}>
          <largeStep
            step={1}
            height={375}
            text="Choose the date you want a\u00a0service" />
          <Content style={styles.calendarContainer}>
            <Calendar
              onSelectedDayChange={this._handleSelectedDayChange}
              mode="landscape"
              shouldDisableDate={this._filterDate}
              minDate={minDate} />
          </Content>
          <largeStep
            step={2}
            height={405}
            text="Select a housekeeping time\u00a0slot" />
          <Content style={styles.timeSlotContainer}>
            <largeTimeSlot
              onChange={this._handleTimeSlotChange}
              value={this.state.timeSlot} />
          </Content>
          <largeStep
            step={3}
            height={240}
            text="Customise your bed linen requirements (includes\u00a0towels)" />
          <Content style={styles.itemContainer}>
            <largeItem
              product={this.props.kingProduct}
              icon={<KingBed />}
              helpDialogType={ProductLinen}
              onHelpDialogDismiss={this._setScrolling.bind(this, true)}
              onHelpDialogShow={this._setScrolling.bind(this, false)}
              qty={this.state.kingQty}
              onQtyChange={this._onItemQtyChange.bind(this, 'kingQty')} />
            <largeItem
              product={this.props.queenProduct}
              icon={<QueenBed />}
              helpDialogType={ProductLinen}
              onHelpDialogDismiss={this._setScrolling.bind(this, true)}
              onHelpDialogShow={this._setScrolling.bind(this, false)}
              qty={this.state.queenQty}
              onQtyChange={this._onItemQtyChange.bind(this, 'queenQty')} />
            <largeItem
              product={this.props.singleProduct}
              icon={<SingleBed />}
              helpDialogType={ProductSingle}
              onHelpDialogDismiss={this._setScrolling.bind(this, true)}
              onHelpDialogShow={this._setScrolling.bind(this, false)}
              qty={this.state.singleQty}
              onQtyChange={this._onItemQtyChange.bind(this, 'singleQty')} />
          </Content>
          <largeStep
            step={4}
            height={240}
            text="Select bath sets, towel sets and toiletry\u00a0packs" />
          <Content style={styles.itemContainer}>
            <largeItem
              product={this.props.bathProduct}
              icon={<Towel />}
              helpDialogType={ProductBath}
              onHelpDialogDismiss={this._setScrolling.bind(this, true)}
              onHelpDialogShow={this._setScrolling.bind(this, false)}
              qty={this.state.bathQty}
              onQtyChange={this._onItemQtyChange.bind(this, 'bathQty')} />
            <largeItem
              product={this.props.towelsProduct}
              icon={<Towels />}
              helpDialogType={ProductTowels}
              onHelpDialogDismiss={this._setScrolling.bind(this, true)}
              onHelpDialogShow={this._setScrolling.bind(this, false)}
              qty={this.state.towelsQty}
              onQtyChange={this._onItemQtyChange.bind(this, 'towelsQty')} />
            <largeItem
              product={this.props.toiletriesProduct}
              icon={<Soap />}
              helpDialogType={ProductToiletry}
              onHelpDialogDismiss={this._setScrolling.bind(this, true)}
              onHelpDialogShow={this._setScrolling.bind(this, false)}
              qty={this.state.toiletryQty}
              onQtyChange=
                {this._onItemQtyChange.bind(this, 'toiletryQty')} />
          </Content>
          <largeStep
            step={5}
            height={cardsList.length > 0 ? 155 : 435}
            text="Secure\u00a0payment" />
          <Content style={styles.paymentContainer}>
            {this.getPaymentOptions()}
          </Content>
          <largeStep
            step={6}
            height={this.state.step6Height || 140}
            text="Anything else you need to let us\u00a0know?" />
          <Content ref={c => this._commentsTextField = c} style={styles.infoContainer}>
            <TextField
              floatingLabelText="Add any additional information\u00a0here"
              multiLine={true}
              fullWidth={true}
              onKeyUp={this._onCommentsKeyUp}
              onChange={this._handleCommentsChange}
              value={this.state.comments} />
          </Content>
          <largeStep
            step={7}
            text="Summary" />
          <Content style={styles.summaryContainer}>
            <largeSummary
              total={this.getTotal()} {...this.props} {...this.state} />
            <largePromoCode onValidDiscount={this._handleValidDiscount} />
          </Content>
          <Content>
            <div style={styles.action}>
              <RaisedButton
                primary={true}
                onTouchTap={this._handlePlacelarge}
                disabled={
                      !this.state.serviceDate ||
                      !this.state.timeSlot ||
                      !this.state.cardId }
                label="Place Booking" />
            </div>
          </Content>
        </div>
        <largeComplete
          ref={c => this._largeComplete = c}
          largeDetails={this.getlargeDetails()}
          onFinish={this._handleFinish}
          onAddAnother={this._handleAddAnother}
          onDismiss={this._setScrolling.bind(this, true)}
          onShow={this._setScrolling.bind(this, false)} />
        {this.state.loading ? <LinearLoading style={styles.loading} /> : ''}
      </div>
    );
  },

  _setScrolling(scrollable) {
    this.props.onSetScrolling(scrollable);
  },

  _preventScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
  },

  _allowScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = this._originalBodyOverflow || '';
    body.style.position = this._originalPositionFixed || '';
  },

  _onCommentsKeyUp(e) {
    if (e.keyCode === 13 || e.keyCode === 8) {
      setTimeout(()=> {
        const node = React.findDOMNode(this._commentsTextField);
        this.setState({step6Height: node.scrollHeight + 40});
      }, 100);
    }
  },

  _onItemQtyChange(key, qty) {
    this.setState({[key]: qty});
  },

  _handleSelectedDayChange(serviceDate) {
    this.setState({serviceDate});
  },

  _handleTimeSlotChange(timeSlot) {
    this.setState({timeSlot});
  },

  _handlePaymentSelected(cardId) {
    this.setState({cardId});
  },

  _handleCommentsChange(event) {
    this.setState({comments: event.target.value});
  },

  _handleValidDiscount(discount) {
    this.setState({discount});
  },

  _handlePlacelarge() {
    if (this.state.loading) return;
    let { property } = this.props;
    let { discount, serviceDate, timeSlot, cardId, comments } = this.state;
    let { kingQty, queenQty, singleQty,
          bathQty, towelsQty, toiletryQty } = this.state;
    this.setState({largePlaced: true, loading: true});

    largeActions.handleCreatelarge(
      {
        propertyId: property._id,
        serviceDate,
        timeSlot,
        cardId,
        comments,
      },
      {
        kingQty,
        queenQty,
        singleQty,
        bathQty,
        towelsQty,
        toiletryQty,
      },
      !!discount ? discount._id : undefined,
        (err, large) => {
          this.setState({loading: false});
          if (err) {
            Notifier.showError(err.reason);
            this.setState({largePlaced: false});
          } else {
            this._largeComplete.show();
            this._sendData(large);
          }
        }
    );
  },

  _handleFinish() {
    FlowRouter.setQueryParams({'new-booking': null});
    this._allowScrolling();
  },

  _handleAddAnother() {
    this.setState({
      discount: null,
      serviceDate: null,
    });
    this.props.onScrollTop();
  },

  _disabledDates: [
    {d: 25, m: 12},
  ],

  _filterDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    for (dDate of this._disabledDates) {
      if (dDate.d === day && dDate.m === month) {
        return true;
      }
    }
  },

  _sendData(large) {
    let { property } = this.props;
    let { discount, serviceDate, timeSlot } = this.state;
    let largeTotal = this.refs.largeTotal;
    if (!!discount) {
      let discountMeta = {
        code: discount.code,
        description: discount.name,
        value: {
          currency: 'aud',
          amount: largeTotal.getDiscount().toFixed(2) * 100,
        },
      };
      IntercomActions.trackEvent('Used Discount', discountMeta);
    }
    IntercomActions.trackEvent('Placed Booking', largeMeta);
    IntercomActions.update();
  },

});
