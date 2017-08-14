let { TextField, RaisedButton } = mui;

let validator = new SimpleSchema({
  isPrefilled: {
    type: Boolean,
    optional: true,
  },
  name: {
    type: String,
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
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

SignUpForm = React.createClass({

  propTypes: {
    action: React.PropTypes.func.isRequired,
    showInfo: React.PropTypes.bool,
    buttonFullWidth: React.PropTypes.bool,
    showSuccess: React.PropTypes.bool,
    prefilledEmail: React.PropTypes.string
  },

  mixins: [],

  getDefaultProps() {
    return {
      showInfo: false,
      buttonFullWidth: false,
      showSuccess: false,
    };
  },

  getInitialState() {
    return {
      isPrefilled: !!this.props.prefilledEmail,
      name: null,
      phone: null,
      email: this.props.prefilledEmail || null,
      password: null,
      confirmPassword: null,
    };
  },

  componentWillMount() {
    validator.resetValidation();
  },

  getErrorMessage(key) {
    return validator.keyErrorMessage(key);
  },

  getStyles() {
    return {
      root: {
        textAlign: 'left',
      },
      info: {
        fontSize: 14,
        textAlign: 'center',
      },
      terms: {
        marginTop: 10,
        fontSize: 14,
      },
    };
  },

  getInfo() {
    return null;
    if (this.props.showInfo) {
      const styles = this.getStyles();
      return (
        <Info style={styles.info}>
          {'… or setup your account later and '}
          <Link href="#"
             onClick={this._handleSkipClick}>skip&nbsp;this&nbsp;step</Link>
        </Info>
      );
    }
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title={!this.state.isPrefilled ? "Creating an account is easy." : "You're almost ready..."} />
        <Content style={styles.content}>
          {this.getInfo()}
          <Fieldset>
            <div>
              <TextField
                ref="emailTextField"
                hintText="e.g. john.smith@hometime.io"
                floatingLabelText="Email address"
                type="email"
                autoCapitalize="off"
                errorText={this.getErrorMessage('email')}
                onChange={this._textFieldChanged.bind(this, 'email')}
                onBlur={this._textFieldBlur.bind(this, 'email')}
                value={this.state.email} />
            </div>
            <div>
              <TextField
                ref="nameTextField"
                hintText="e.g. John Smith"
                floatingLabelText="Full name"
                autoCapitalize="words"
                onChange={this._textFieldChanged.bind(this, 'name')}
                value={this.state.name} />
            </div>
            <div>
              <TextField
                ref="phoneTextField"
                type="tel"
                hintText="e.g. 0412345678"
                floatingLabelText="Phone number"
                onChange={this._textFieldChanged.bind(this, 'phone')}
                value={this.state.phone} />
            </div>
            <div>
              <TextField
                ref="passwordTextField"
                type="password"
                hintText="8 characters min."
                errorText=""
                floatingLabelText="Password"
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
                errorText={this.getErrorMessage('confirmPassword')}
                onChange={this._textFieldChanged.bind(this, 'confirmPassword')}
                onBlur={this._textFieldBlur.bind(this, 'confirmPassword')}
                value={this.state.confirmPassword} />
            </div>
            <p style={styles.terms}>
              By creating an account you agree to the <br/>
            <Link href="http://hometime.io/terms-and-conditions/" target="_blank">
                  terms of use
                </Link>
            </p>
          </Fieldset>
        </Content>
        <Actions>
          <RaisedButton
            ref="updateButton"
            label="Sign up"
            fullWidth={this.props.buttonFullWidth}
            primary={true}
            onClick={this._handleSignUpClick} />
        </Actions>
      </DepthPaper>
    );
  },

  _handleSkipClick(e) {
    e.preventDefault();
    UserActions.handleGuestLogin();
  },

  _handleSignUpClick() {
    if (validator.validate(this.state)) {
      this.props.action(this.state, err => {
        if (err) {
          Notifier.showError(err.reason);
        } else if (this.props.showSuccess) {
          Notifier.showMessage('Account successfully created');
          fbq && fbq('track', 'Lead');
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

});
