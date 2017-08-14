let { Styles } = mui;
let { Transitions } = Styles;

let PropertySubs = new SubsManager();

PropertyPages = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    contentElement: React.PropTypes.func.isRequired,
  },

  mixins: [ScrollMixin, ReactMeteorData],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getMeteorData() {
    PropertySubs.subscribe('Properties.byId', this.props.propertyId);
    return {
      property: Properties.findOne(this.props.propertyId),
    };
  },

  getStyles() {
    return {
      root: {},
      container: {
        transition: Transitions.easeOut(),
        marginRight: (document.body.clientWidth<800?'0px':'200px')
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { propertyId } = this.props;
    let { property } = this.data;
    return (
      <div style={styles.root}>
          <PropertyNav
            propertyId={propertyId}
            property={property} />
        <div style={styles.container}>
          {React.createElement(
            this.props.contentElement, {propertyId, property})}
        </div>
      </div>
    );
  },
});
