let { RaisedButton } = mui;

const defaultText = '' +
  '<p>' +
    '<b>Edit this text</b> to give instructions on how Hometime ' +
    'Housekeepers can find parking close by.' +
  '</p>' +
  '<p>' +
    'Searching for parking can sometimes delay your Housekeeper which ' +
    'affects ' +
    'their schedule. Any parking suggestions/tips you are able to share are ' +
    'always appreciated.' +
  '</p>' +
  '<p>' +
    'Examples of useful information are:' +
  '</p>' +
  '<p>' +
    '<ul>' +
      '<li>There is free parking on the back lane of the property</li>' +
      '<li>' +
        'The fob in the lockbox will let you into the garage. ' +
        'Please park in a visitor spot' +
      '</li>' +
      '<li>On street parking: 4P</li>' +
    '</ul>' +
  '</p>';

InstructionParking = React.createClass({

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
        <Heading title="Available parking" />
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
      this.props.onUpdate({parking: html});
    }
  },
});
