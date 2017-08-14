let { RaisedButton } = mui;

const defaultText = '' +
  '<p>' +
    '<b>Edit this text</b> for any special instructions you want ' +
    'Hometime Housekeepers to follow.' +
  '</p>' +
  '<p>' +
    'Examples of useful information are:' +
  '</p>' +
  '<p>' +
    '<ul>' +
      '<li>Please water the plants</li>' +
      '<li>' +
        'Extra supplies are located in the chest under the stairs' +
      '</li>' +
      '<li>Refill the tea and coffee containers</li>' +
      '<li>Place fresh bottles of water in fridge x2</li>' +
    '</ul>' +
  '</p>';

InstructionExtra = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    onUpdate: React.PropTypes.func,
  },

  mixins: [],

  getDefaultProps() {
    return {
      onUpdate: () => {},
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {},
      content: {
        paddingTop: 24,
        paddingBottom: 24,
      },
      textArea: {
        width: '100%',
        minHeight: 300,
        outline: 0,
        padding: 10,
      },
    };
  },

  getInstructions() {
    let { value } = this.props;
    if (!!value && value.length > 0) return value;
    return defaultText;
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Any special instructions?" />
        <Content style={styles.content}>
          <TextEdit
            ref="textEdit"
            onFocus={this._handleFocus}
            html={this.getInstructions()} />
        </Content>
        <Actions>
          <RaisedButton
            ref="updateButton"
            label="Update"
            primary={true}
            onClick={this._handleUpdateClick} />
        </Actions>
      </DepthPaper>
    );
  },

  _handleFocus() {
    if (this.getInstructions() === defaultText) {
      this.refs.textEdit.selectAll();
    }
  },

  _handleUpdateClick() {
    let html = this.refs.textEdit.getHtml();
    if (html !== defaultText) {
      this.props.onUpdate({extra: html});
    }
  },
});
