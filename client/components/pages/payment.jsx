let CardsSubs = new SubsManager();

Payment = React.createClass({

  propTypes: {},

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getMeteorData() {
    const handle = CardsSubs.subscribe('Cards.all');
    return {
      loadingCards: !handle.ready(),
      cardsList: Cards.find({}, {sort: {_id: 1}}).fetch(),
    };
  },

  getStyles() {
    return {
      root: {},
    };
  },

  render() {
    const styles = this.getStyles();
    let {loadingCards, cardsList} = this.data;

    return (
      <div style={styles.root}>
        <AddCreditCard />
        <CreditCardList isLoading={loadingCards} cardsList={cardsList} />
      </div>
    );
  },

});
