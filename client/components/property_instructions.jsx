
PropertyInstructions = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    property: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    let property = this.props.property || {};
    return {
      access: markdown.render(property.access),
      parking: markdown.render(property.parking),
      rubbish: markdown.render(property.rubbish),
      extra: markdown.render(property.extra),
    };
  },

  componentWillReceiveProps(nextProps) {
    let { property } = nextProps;
    if (!!property) {
      this.setState({
        access: markdown.render(property.access),
        parking: markdown.render(property.parking),
        rubbish: markdown.render(property.rubbish),
        extra: markdown.render(property.extra),
      });
    }
  },

  getStyles() {
    return {
      root: {},
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <InstructionAccess
          value={this.state.access}
          onUpdate={this._handleUpdate} />
        <InstructionParking
          value={this.state.parking}
          onUpdate={this._handleUpdate} />
        <InstructionRubbish
          value={this.state.rubbish}
          onUpdate={this._handleUpdate} />
        <InstructionExtra
          value={this.state.extra}
          onUpdate={this._handleUpdate} />
      </div>
    );
  },

  _handleUpdate(options) {
    Object.keys(options).map(key => {
      options[key] = toMarkdown(options[key], {converters: [
        {
          filter: ['div', 'p', 'span'],
          replacement(content) {
            return content + '\n\n';
          },
        },
        {
          filter: ['u', 'ins'],
          replacement(content) {
            return '++' + content + '++';
          },
        },
        {
          filter: ['i'],
          replacement(content) {
            return '*' + content + '*';
          },
        },
        {
          filter: ['b'],
          replacement(content) {
            return '**' + content + '**';
          },
        },
      ]});
    });
    PropertyActions.handleInstructionsUpdate(
      this.props.propertyId, options, err => {
        Notifier.showMessage(
          'Instructions have been updated',
          err, err && err.reason);
      });
  },

});
