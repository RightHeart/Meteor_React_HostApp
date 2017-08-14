let { TextField, RaisedButton } = mui;

let validator = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  password: {
    type: String,
  },
}).newContext();

SignInForm = React.createClass({

  propTypes: {},

  mixins: [],

  componentWillMount() {
    validator.resetValidation();
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      email: null,
      password: null,
    };
  },

  getErrorMessage(key) {
    return validator.keyErrorMessage(key);
  },

  getStyles() {
    return {
      root: {
        textAlign: 'left',
      },
      content: {

      },
      forgot: {
        textAlign: 'right',
        marginTop: 20,
        marginBottom: -10,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Hey there. Welcome back." />
        <Content style={styles.content}>
          <Fieldset>
            <div>
              <TextField
                ref="emailTextField"
                hintText="e.g. john.smith@hometime.io"
                floatingLabelText="Email address"
                autoCapitalize="off"
                fullWidth={true}
                errorText={this.getErrorMessage('email')}
                onChange={this._textFieldChanged.bind(this, 'email')}
                onBlur={this._textFieldBlur.bind(this, 'email')}
                value={this.state.email} />
            </div>
            <div>
              <TextField
                ref="passwordTextField"
                type="password"
                floatingLabelText="Password"
                autoCapitalize="off"
                fullWidth={true}
                errorText={this.getErrorMessage('password')}
                onChange={this._textFieldChanged.bind(this, 'password')}
                onBlur={this._textFieldBlur.bind(this, 'password')}
                value={this.state.password} />
            </div>
            <div style={styles.forgot}>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          </Fieldset>
        </Content>
        <Actions>
          <RaisedButton
            ref="updateButton"
            label="Sign in"
            fullWidth={true}
            primary={true}
            onClick={this._handleSignInClick} />
        </Actions>
      </DepthPaper>
    );
  },

  _handleSignInClick() {
    if (validator.validate(this.state)) {
      UserActions.handleLogin(this.state, err => {
        if (err) {
          Notifier.showError(err.reason);
          if (err.reason === 'User not found') {
            validator.addInvalidKeys([
              {name: 'email', type: 'wrongEmail'},
            ]);
          }
          if (err.reason === 'Incorrect password') {
            validator.addInvalidKeys([
              {name: 'password', type: 'wrongPassword'},
            ]);
          }
          this.forceUpdate();
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
