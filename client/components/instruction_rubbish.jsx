let { RaisedButton } = mui;

const defaultText = '' +
  '<p>' +
    '<b>Edit this text</b> on how Hometime ' +
    'Housekeepers can dispose of any rubbish.' +
  '</p>' +
  '<p>' +
    'Examples of useful information are:' +
  '</p>' +
  '<p>' +
    '<ul>' +
      '<li>Bins are located on the lower ground level</li>' +
      '<li>' +
        'You can find extra strong garbage bags under the kitchen sink' +
      '</li>' +
      '<li>Please replace all bins with the white bin liners</li>' +
    '</ul>' +
  '</p>';

InstructionRubbish = React.createClass({

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
        <Heading title="Rubbish disposal" />
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
      this.props.onUpdate({rubbish: html});
    }
  },
});
