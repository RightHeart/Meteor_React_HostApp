PropertyBedType = React.createClass({

  propTypes: {
    icon: React.PropTypes.element,
    value: React.PropTypes.number,
    onChange: React.PropTypes.func,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {
        width: 190,
        marginTop: 20,
        display: 'inline-block',
        textAlign: 'center',
      },
      label: {
        fontSize: 14,
      },
      content: {
        marginTop: 20,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <label style={styles.label}>{this.props.label}</label>
        <div style={styles.content}>
          {this.props.icon}
          <QtyButton
            qty={this.props.value}
            onChange={this.props.onChange} />
        </div>
      </div>
    );
  },

});
