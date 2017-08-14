let { Snackbar, Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Colors } = Styles;

let instance = null;

Notifier = React.createClass({

  propTypes: {},

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  statics: {
    showMessage(regularMessage, err, errorMessage) {
      if (instance) {
        let message = err ? errorMessage : regularMessage;
        instance.setState({message, isError: !!err});
        instance.refs.snackBar.show();
      }
    },
    showError(message) {
      if (instance) {
        instance.setState({message, isError: true});
        instance.refs.snackBar.show();
      }
    },
    getInstance() {
      return instance;
    },
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      message: '',
      autoHideDuration: 3000, // 3s
      isError: false,
    };
  },

  componentDidMount() {
    if (instance === null) {
      instance = this;
    } else {
      throw new Error('Notifier is a singleton, and is already mounted.');
    }
  },

  componentWillUnmount() {
    instance = null;
  },

  getTheme() {
    return this.context.muiTheme.snackbar
      || this.context.muiTheme.component.snackbar;
  },

  getStyles() {
    return {
      root: {
        minWidth: 'auto',
        zIndex: 99,
      },
      rootIfError: {
        color: this.getTheme().errorColor || Colors.red500 + '!important',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    return (
      <Snackbar
        ref="snackBar"
        message={this.state.message}
        autoHideDuration={this.state.autoHideDuration}
        style={
        this.mergeAndPrefix(
          styles.root,
          this.state.isError && styles.rootIfError
          )}
        onClick={this._handleClick} />
    );
  },

  _handleClick() {
    this.refs.snackBar.dismiss();
  },

});
