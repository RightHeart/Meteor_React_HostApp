let { TransitionSpring } = motion;

CreditCardList = React.createClass({

  propTypes: {
    cardsList: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
  },

  mixins: [],

  getDefaultProps() {
    return {
      isLoading: true,
      cardsList: [],
    };
  },

  getInitialState() {
    return {
      isLoading: this.props.isLoading,
      cardsList: this.props.cardsList,
    };
  },

  componentWillReceiveProps(props) {
    this.setState(props);
  },

  getEndValue() {
    let {cardsList} = this.state;

    const configs = {};
    for (let card of cardsList) {
      configs[card._id] = {
        height: {val: '100%'},
        opacity: {val: 1},
      };
      this._cardsListCache[card._id] = card;
    }
    return configs;
  },

  getStyles() {
    return {
      root: {

      },
      noData: {
        textAlign: 'center',
        padding: 15,
      },
    };
  },

  getNoDataMessage() {
    const styles = this.getStyles();
    return (
      <div style={styles.noData}>
        <p>You currently have no cards on your account.</p>
      </div>
    );
  },

  getContent() {
    let {cardsList} = this.state;

    if (cardsList.length === 0) {
      return this.getNoDataMessage();
    }

    return (
      <TransitionSpring
        defaultValue={{}}
        endValue={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {currentValue =>
          <div>
            {Object.keys(currentValue).map(key => {
              let style = {
                height: currentValue[key].height.val,
                opacity: currentValue[key].opacity.val,
              };
              return (
                <div key={key} style={style}>
                  <CreditCardRow card={this._cardsListCache[key]} />
                </div>
              );
            })}
          </div>
        }
      </TransitionSpring>
    );
  },

  render() {
    let {isLoading} = this.state;

    return (
      <DepthPaper>
        <Heading title="Credit cards on your account" />
        { isLoading ? <LinearLoading /> : this.getContent()}
      </DepthPaper>
    );
  },

  willEnter() {
    return {
      height: {val: 0},
      opacity: {val: 0},
    };
  },

  willLeave() {
    return {
      height: {val: 0},
      opacity: {val: 0},
    };
  },

  _cardsListCache: {},

});
