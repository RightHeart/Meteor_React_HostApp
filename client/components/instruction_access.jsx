let { RaisedButton } = mui;

const defaultText = '' +
  '<p>' +
    '<b>Edit this text</b> to give instructions on how Hometime ' +
    'Housekeepers can gain access to your property.' +
  '</p>' +
  '<p>' +
    'Examples of useful information are:' +
  '</p>' +
  '<p>' +
    '<ul>' +
      '<li>I\'ll meet the Housekeeper at the property; or</li>' +
      '<li>There is a lockbox inside the letterbox, number 23</li>' +
      '<li>The lockbox code is 8882</li>' +
      '<li>' +
        'Please leave the key on the dining table, ' +
        '<u>NOT</u> the lockbox' +
      '</li>' +
    '</ul>' +
  '</p>';

InstructionAccess = React.createClass({

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
        <Heading title="Access to your property" />
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
      this.props.onUpdate({access: html});
    }
  },
});
