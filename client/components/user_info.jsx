let { TextField, RaisedButton } = mui;

let validator = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  phone: {
    type: String,
    optional: true,
  },
}).newContext();

UserInfo = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone: React.PropTypes.string,
  },

  mixins: [UserActions],

  getDefaultProps() {
    return {
      name: '',
      email: '',
      phone: '',
    };
  },

  getInitialState() {
    return {
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
    };
  },

  componentWillMount() {
    validator.resetValidation();
  },

  componentWillReceiveProps(props) {
    this.setState(props);
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
        <Heading title="User information" />
        <Content>
          <Info>
            <p>
              Update your personal information.<br/>
              Information here is reflected in your invoices.
            </p>
          </Info>
          <Fieldset>
            <div>
              <TextField
                ref="nameTextField"
                style={styles.fullWidth}
                hintText="e.g. John Smith"
                floatingLabelText="Full name or business name"
                autoCapitalize="words"
                onChange={this._textFieldChanged.bind(this, 'name')}
                value={this.state.name} />
            </div>
            <div>
              <TextField
                ref="emailTextField"
                style={styles.fullWidth}
                hintText="e.g. john.smith@hometime.io"
                floatingLabelText="Email address"
                type="email"
                autoCapitalize="off"
                errorText={this.getErrorMessage('email')}
                onChange={this._textFieldChanged.bind(this, 'email')}
                onBlur={this._textFieldBlur}
                value={this.state.email} />
            </div>
            <div>
              <TextField
                ref="phoneTextField"
                style={styles.fullWidth}
                type="tel"
                hintText="e.g. 0412345678"
                floatingLabelText="Phone number"
                onChange={this._textFieldChanged.bind(this, 'phone')}
                value={this.state.phone} />
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
      UserActions.handleInfoUpdate(this.state, (err) => {
        if (err) {
          Notifier.showError('Unable to update your info!');
        } else {
          Notifier.showMessage('Info successfully updated.');
        }
      });
    } else {
      this.forceUpdate();
    }
  },

  _textFieldChanged(key, event) {
    this.setState({[key]: event.target.value});
  },

  _textFieldBlur() {
    validator.validate(this.state);
    this.forceUpdate();
  },

});
