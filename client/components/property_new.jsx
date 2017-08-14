let { Dialog, TextField, FlatButton, RaisedButton } = mui;

PropertyNew = React.createClass({

  propTypes: {
    open: React.PropTypes.bool,
  },

  mixins: [],

  getDefaultProps() {
    return {
      open: false,
    };
  },

  getInitialState() {
    return {
      bedrooms: '',
      bathrooms: '',
      nickname: '',
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this._dialog.show();
    } else if (this._dialog.state.open) {
      this._dialog.dismiss();
    }
  },

  getStyles() {
    return {
      root: {
        width: 'auto',
        maxWidth: '560px',
        padding: '1em',
      },
      body: {},
      button: {
        marginLeft: 10,
      },
    };
  },

  getMenuItems() {
    return {
      bed: [
        {payload: 1, text: '1 Bedroom'},
        {payload: 2, text: '2 Bedrooms'},
        {payload: 3, text: '3 Bedrooms'},
        {payload: 4, text: '4 Bedrooms'},
        {payload: 5, text: '5 Bedrooms'},
        {payload: 6, text: '6 Bedrooms'},
      ],
      bath: [
        {payload: 1, text: '1 Bathroom'},
        {payload: 2, text: '2 Bathrooms'},
        {payload: 3, text: '3 Bathrooms'},
        {payload: 4, text: '4 Bathrooms'},
        {payload: 5, text: '5 Bathrooms'},
        {payload: 6, text: '6 Bathrooms'},
      ],
    };
  },

  getActions() {
    const styles = this.getStyles();
    let { address, bedrooms, bathrooms, nickname } = this.state;
    return [
      <FlatButton
        key={1}
        label="Close"
        onTouchTap={this._handleCloseClick} />,
      <RaisedButton
        key={2}
        primary={true}
        label="Add new property"
        style={styles.button}
        onTouchTap={this._handleAddNewClick}
        disabled={
          nickname.length === 0 ||
          bathrooms.length === 0 ||
          bedrooms.length === 0 ||
          !address
        } />,
    ];
  },

  render() {
    const styles = this.getStyles();
    const menuItems = this.getMenuItems();
    return (
      <Dialog
        ref={c => this._dialog = c}
        modal={true}
        title={<Heading title="Setup new property" />}
        actions={this.getActions()}
        onDismiss={this._handleOnDismiss}
        contentStyle={styles.root}
        bodyStyle={styles.body}>
        <GeoSuggestTextField
          floatingLabelText="What's the address of your property?"
          hintText="e.g. 8/123 Bondi Road, Bondi, 2026"
          fullWidth={true}
          onSelected={this._handlePlaceSelected}
          autoCapitalize="words"/>
        <SelectField
          floatingLabelText="How many bedrooms?"
          menuItems={menuItems.bed}
          fullWidth={true}
          value={this.state.bedrooms}
          onChange={this._handleBedroomChange} />
        <SelectField
          floatingLabelText="How many bathrooms?"
          menuItems={menuItems.bath}
          fullWidth={true}
          value={this.state.bathrooms}
          onChange={this._handleBathroomChange}/>
        <TextField
          floatingLabelText="Give your property a nickname"
          hintText="e.g. The Beach House"
          autoCapitalize="words"
          value={this.state.nickname}
          onChange={this._handleNicknameChange}
          fullWidth={true} />
      </Dialog>
    );
  },

  _handleOnDismiss() {
    if (FlowRouter.getQueryParam('new-property')) {
      FlowRouter.setQueryParams({'new-property': null});
    }
  },

  _handleBedroomChange(e, key, bedrooms) {
    this.setState({bedrooms});
  },

  _handleBathroomChange(e, key, bathrooms) {
    this.setState({bathrooms});
  },

  _handleNicknameChange(event) {
    this.setState({nickname: event.target.value});
  },

  _handleCloseClick() {
    this._dialog.dismiss();
  },

  _handlePlaceSelected(address) {
    this.setState({address});
  },

  _handleAddNewClick() {
    let { address, bedrooms, bathrooms, nickname } = this.state;
    PropertyActions.handleAddNew(
      address, bedrooms, bathrooms, nickname, (err, propertyId) => {
        Notifier.showMessage('New property added', err, err && err.reason);
        if (!!propertyId) {
          FlowRouter.go(`/property/${propertyId}`);
          IntercomActions.update();
        }
      });
  },
});
