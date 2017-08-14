let { Checkbox, TextField, RaisedButton, RadioButtonGroup, RadioButton } = mui;

PropertyConfiguration = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    property: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    let property = this.props.property || {};
    return {
      nickname: property.nickname,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      king: property.king || 0,
      queen: property.queen || 0,
      single: property.single || 0,
      type: property.type,
      hasVacuum: !!property.hasVacuum,
      hasMopBucket: !!property.hasMopBucket,
      link: property.link || '',
    };
  },

  componentWillReceiveProps(nextProps) {
    let { property } = nextProps;
    if (!!property) {
      this.setState({
        nickname: property.nickname,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        king: property.king || 0,
        queen: property.queen || 0,
        single: property.single || 0,
        type: property.type,
        hasVacuum: !!property.hasVacuum,
        hasMopBucket: !!property.hasMopBucket,
        link: property.link  || '',
      });
    }
  },

  shouldComponentUpdate(nextProps) {
    return !!nextProps.property;
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

  getStyles() {
    return {
      root: {},
      spacer: {
        marginTop: 40,
      },
      dropdowns: {
        marginLeft: -20,
      },
      dropdown: {
        marginLeft: 20,
      },
      radioGroup: {
        marginTop: 10,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const menuItems = this.getMenuItems();
    return (
      <DepthPaper style={styles.root}>
        <Heading title="Configuration" />
        <Content>
          <Info>
            <p>
              Your property configuration and other helpful information.
            </p>
          </Info>
          <Fieldset>
            <div>
              <TextField
                ref="nicknameTextField"
                floatingLabelText="Property nickname"
                hintText="e.g. The Beach House"
                onChange={this._textFieldChanged.bind(this, 'nickname')}
                value={this.state.nickname} />
            </div>
            <div style={styles.spacer}>
              <label>What kind of property is it?</label>
              <RadioButtonGroup
                name="type"
                valueSelected={this.state.type}
                defaultSelected={PropertyType.APARTMENT}
                onChange={this._handleTypeChange}
                style={styles.radioGroup}>
                <RadioButton
                  value={PropertyType.APARTMENT}
                  label="Apartment" />
                <RadioButton
                  value={PropertyType.HOUSE}
                  label="House" />
              </RadioButtonGroup>
            </div>
            <div style={styles.dropdowns}>
              <SelectField
                style={styles.dropdown}
                floatingLabelText="How many bedrooms?"
                menuItems={menuItems.bed}
                value={this.state.bedrooms}
                onChange={this._handleBedroomChange} />
              <SelectField
                style={styles.dropdown}
                floatingLabelText="How many bathrooms?"
                menuItems={menuItems.bath}
                value={this.state.bathrooms}
                onChange={this._handleBathroomChange}/>
            </div>
            <div>
              <PropertyBedType
                label="Number of king beds?"
                icon={<KingBed />}
                value={this.state.king}
                onChange={this._onBedTypeChange.bind(this, 'king')}/>
              <PropertyBedType
                label="Number of queen/double beds?"
                icon={<QueenBed />}
                value={this.state.queen}
                onChange={this._onBedTypeChange.bind(this, 'queen')}/>
              <PropertyBedType
                label="Number of single beds?"
                icon={<SingleBed />}
                value={this.state.single}
                onChange={this._onBedTypeChange.bind(this, 'single')}/>
            </div>
            <div style={styles.spacer}>
              <Checkbox
                checked={this.state.hasVacuum}
                label="The property has a vacuum?"
                onCheck={this._handleCheckboxChange.bind(this, 'hasVacuum')} />
            </div>
            <div>
              <Checkbox
                checked={this.state.hasMopBucket}
                label="The property has a mop and bucket?"
                onCheck={
                  this._handleCheckboxChange.bind(this, 'hasMopBucket')
                } />
            </div>
            <div>
              <TextField
                ref="linkTextField"
                fullWidth={true}
                floatingLabelText="Link to your Airbnb property listing"
                hintText="e.g. https://www.airbnb.com.au/rooms/1234567"
                onChange={this._textFieldChanged.bind(this, 'link')}
                value={this.state.link} />
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

  _handleBedroomChange(e, key, bedrooms) {
    this.setState({bedrooms});
  },

  _handleBathroomChange(e, key, bathrooms) {
    this.setState({bathrooms});
  },

  _handleTypeChange(e, type) {
    this.setState({type});
  },

  _onBedTypeChange(key, qty) {
    this.setState({[key]: qty});
  },

  _handleCheckboxChange(key, e, checked) {
    this.setState({[key]: checked});
  },

  _textFieldChanged(key, event) {
    this.setState({[key]: event.target.value});
  },

  _handleUpdateClick() {
    PropertyActions.handleConfigurationUpdate(
      this.props.propertyId,
      this.state,
      err => {
        Notifier.showMessage('Your property configuration has been updated',
          err, err && err.reason);
      });
  },
});
