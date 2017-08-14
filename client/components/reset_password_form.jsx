let { TextField, FontIcon, RaisedButton, Styles, Mixins } = mui;
let { StylePropable } = Mixins;

let validator = new SimpleSchema({
  password: {
    type: String,
    min: 8,
  },
  confirmPassword: {
    type: String,
    custom() {
      if (this.value !== this.field('password').value) {
        return 'passwordMismatch';
      }
    },
  },
}).newContext();

ResetPasswordForm = React.createClass({

  propTypes: {
    token: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool,
    valid: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  componentWillMount() {
    validator.resetValidation();
  },

  getDefaultProps() {
    return {
      loading: true,
      valid: false,
    };
  },

  getInitialState() {
    return {
      password: null,
      confirmPassword: null,
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
      error: {
        color: palette.errorColor,
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
      },
      icon: {
        display: 'inline-block',
        color: palette.errorColor,
        marginRight: 10,
        verticalAlign: 'middle',
      },
    };
  },

  getExpiredMessage() {
    const styles = this.getStyles();
    return (
      <Content style={styles.error}>
        <FontIcon className="warning icon" style={styles.icon} />
        <span>Oh no... seems this token has expired!</span>
        <div><a href="/forgot-password">Send me another one</a></div>
      </Content>
    );
  },

  getFormContent() {
    if (!this.props.valid) {
      return this.getExpiredMessage();
    }

    const styles = this.getStyles();

    return (
      <div>
        <Content style={styles.content}>
          <Fieldset>
            <div>
              <TextField
                ref="passwordTextField"
                type="password"
                hintText="8 characters min."
                errorText=""
                floatingLabelText="Password"
                fullWidth={true}
                errorText={this.getErrorMessage('password')}
                onChange={this._textFieldChanged.bind(this, 'password')}
                onBlur={this._textFieldBlur.bind(this, 'password')}
                value={this.state.password} />
            </div>
            <div>
              <TextField
                ref="confirmPasswordTextField"
                type="password"
                hintText="same as above"
                floatingLabelText="Confirm password"
                fullWidth={true}
                errorText={this.getErrorMessage('confirmPassword')}
                onChange={this._textFieldChanged.bind(this, 'confirmPassword')}
                onBlur={this._textFieldBlur.bind(this, 'confirmPassword')}
                value={this.state.confirmPassword} />
            </div>
          </Fieldset>
        </Content>
        <Actions>
          <RaisedButton
            ref="updateButton"
            label="Reset your password"
            fullWidth={true}
            primary={true}
            onClick={this._handleResetPasswordClick} />
        </Actions>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Reset your password" />
        {this.props.loading ? <LinearLoading /> : this.getFormContent()}
      </DepthPaper>
    );
  },

  _handleResetPasswordClick() {
    if (validator.validate(this.state)) {
      UserActions.handleResetPassword(
        this.props.token, this.state.password, err => {
          Notifier.showMessage('Your password has been reset',
            err, err && error.reason);
          if (err) {
            this.replaceState(this.getInitialState());
          }
        });
    }
  },

  _textFieldChanged(key, event) {
    this.setState({[key]: event.target.value});
  },

  _textFieldBlur(key) {
    validator.validateOne(this.state, key);
    this.forceUpdate();
  },

});
