let { TextField, FontIcon, RaisedButton, Styles, Mixins } = mui;
let { StylePropable } = Mixins;
let { Transitions } = Styles;

let validator = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
}).newContext();

ForgotPasswordForm = React.createClass({

  propTypes: {},

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  componentWillMount() {
    validator.resetValidation();
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      email: null,
      success: false,
      loading: false,
    };
  },

  getErrorMessage(key) {
    return validator.keyErrorMessage(key);
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        textAlign: 'left',
      },
      content: {

      },
      success: {
        paddingTop: this.state.success ? 20 : 0,
        textAlign: 'center',
        overflow: 'hidden',
        transition: Transitions.easeOut(),
        height: this.state.success ? 46 : 0,
      },
      icon: {
        display: 'inline-block',
        color: palette.accent1Color,
        marginRight: 10,
      },
    };
  },

  getFormContent() {
    const styles = this.getStyles();
    return (
      <div>
        <Content style={styles.content}>
          <Fieldset>
            <div>
              <TextField
                ref="emailTextField"
                hintText="e.g. john.smith@kayla.com.au"
                floatingLabelText="Email address"
                autoCapitalize="off"
                fullWidth={true}
                errorText={this.getErrorMessage('email')}
                onChange={this._textFieldChanged.bind(this, 'email')}
                onFocus={this._textFieldFocus}
                onBlur={this._textFieldBlur.bind(this, 'email')}
                value={this.state.email} />
            </div>
          </Fieldset>
        </Content>
        <Actions>
          <RaisedButton
            ref="updateButton"
            label="Reset your password"
            fullWidth={true}
            primary={true}
            onClick={this._handleForgotPasswordClick} />
        </Actions>
      </div>
    );
  },

  getSuccessMessage() {
    const styles = this.getStyles();
    return (
      <Content style={styles.success}>
        <FontIcon className="notifications icon" style={styles.icon} />
        <span>Almost there... just check your inbox.</span>
      </Content>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Oh dear, you've forgotten?" />
        {this.state.loading ? <LinearLoading /> : ''}
        {this.getSuccessMessage()}
        {this.getFormContent()}
      </DepthPaper>
    );
  },

  _handleForgotPasswordClick() {
    if (validator.validate({email: this.state.email})) {
      this.setState({loading: true});
      UserActions.handlePasswordRequest(this.state.email, err => {
        this.setState({loading: false});
        if (err) {
          Notifier.showError(err.reason);
          if (err.error === 404) {
            validator.addInvalidKeys([
              {name: 'email', type: 'wrongEmail'},
            ]);
          }
          this.forceUpdate();
        } else {
          this.setState({success: true, email: null});
        }
      });
    } else {
      this.forceUpdate();
    }
  },

  _textFieldChanged(key, event) {
    this.setState({[key]: event.target.value});
  },

  _textFieldBlur(key) {
    validator.validateOne(this.state, key);
    this.forceUpdate();
  },

  _textFieldFocus() {
    this.setState({success: false});
  },
});
