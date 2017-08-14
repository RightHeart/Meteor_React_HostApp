let { TextField, RaisedButton } = mui;

let validator = new SimpleSchema({
  password: {
    type: String,
  },
  newPassword: {
    type: String,
    min: 8,
  },
  confirmPassword: {
    type: String,
    custom() {
      if (this.value !== this.field('newPassword').value) {
        return 'passwordMismatch';
      }
    },
  },
}).newContext();

ChangePassword = React.createClass({

  propTypes: {},

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      password: null,
      newPassword: null,
      confirmPassword: null,
    };
  },

  componentWillMount() {
    validator.resetValidation();
  },

  getStyles() {
    return {
      root: {
      },
      fullWidth: {
          width: '100%'
      }
    };
  },

  getErrorMessage(key) {
    return validator.keyErrorMessage(key);
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Change password" />
        <Content>
          <Info>
            <p>
              Update your password.<br/>
              Hometime encrypts your password so it's stored securely.
            </p>
          </Info>
          <Fieldset>
            <div>
              <TextField
                ref="passwordTextField"
                style={styles.fullWidth}
                type="password"
                floatingLabelText="Current password"
                errorText={this.getErrorMessage('password')}
                onChange={this._textFieldChanged.bind(this, 'password')}
                onBlur={this._textFieldBlur.bind(this, 'password')}
                value={this.state.password} />
            </div>
            <div>
              <TextField
                ref="newPasswordTextField"
                style={styles.fullWidth}
                type="password"
                hintText="8 characters min."
                errorText=""
                floatingLabelText="New password"
                errorText={this.getErrorMessage('newPassword')}
                onChange={this._textFieldChanged.bind(this, 'newPassword')}
                onBlur={this._textFieldBlur.bind(this, 'newPassword')}
                value={this.state.newPassword} />
            </div>
            <div>
              <TextField
                ref="confirmPasswordTextField"
                style={styles.fullWidth}
                type="password"
                hintText="same as above"
                floatingLabelText="Confirm password"
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
            label="Update"
            primary={true}
            onClick={this._handleUpdateClick} />
        </Actions>
      </DepthPaper>
    );
  },

  _handleUpdateClick() {
    if (validator.validate(this.state)) {
      UserActions.handlePasswordChange(this.state, (err) => {
        if (err) {
          Notifier.showError('Your current password is incorrect');
          validator.addInvalidKeys([{name: 'password', type: 'wrongPassword'}]);
          this.forceUpdate();
        } else {
          Notifier.showMessage('Your password has been changed.');
          this.replaceState(this.getInitialState());
        }
      });
    } else {
      this.forceUpdate();
    }
  },

  _textFieldChanged(key, event) {
    this.setState({
      [key]: _.isEmpty(event.target.value) ? null : event.target.value});
  },

  _textFieldBlur(key) {
    validator.validateOne(this.state, key);
    this.forceUpdate();
  },
});
