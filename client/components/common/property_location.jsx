let { TextField, RaisedButton } = mui;

let validator = new SimpleSchema({
  street: {
    type: String,
  },
  suburb: {
    type: String,
  },
  postcode: {
    type: String,
  },
}).newContext();

PropertyLocation = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    property: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      street: null,
      suburb: null,
      postcode: null,
      state: null,
      ready: false,
    };
  },

  componentWillMount() {
    if (!!this.props.property) {
      this._updateState(this.props.property);
    }
  },

  componentDidMount() {
    const i = setInterval(() => {
      if (GoogleMaps.loaded) {
        clearInterval(i);
        this._geocoder = new google.maps.Geocoder();
        this.setState({ready: true});
      }
    }, 200);
  },

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.property) {
      this._updateState(nextProps.property);
    }
  },

  componentWillUpdate(nextProps, nextState) {
    let { property } = nextProps;
    let { ready, lat, lng } = nextState;
    if (ready && !!property && !lat && !lng) {
      this._geoCodeAddress();
    }
  },

  getStyles() {
    const palette = this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
    return {
      root: {},
      map: {
        height: 150,
        borderBottom: `1px solid ${palette.borderColor}`,
      },
    };
  },

  getErrorMessage(key) {
    return validator.keyErrorMessage(key);
  },

  getMenuItems() {
    return {
      states: [
        {payload: '', text: ''},
        {payload: 'NSW', text: 'New South Wales'},
        {payload: 'VIC', text: 'Victoria'},
        {payload: 'WA', text: 'Western Australia'},
      ],
    };
  },

  render() {
    const styles = this.getStyles();
    const menuItems = this.getMenuItems();
    return (
      <div style={styles.root}>
        <DepthPaper>
          <Heading title="Location" />
          <MapView
            zoom={17}
            lat={this.state.lat}
            lng={this.state.lng}
            style={styles.map} />
          <Content>
            <Info>
              <p>
                The location of your property.<br />
                We don't want Hometime Housekeepers to get lost;
                help them find the way.
              </p>
            </Info>
            <Fieldset>
              <div>
                <TextField
                  ref="streetTextField"
                  floatingLabelText="Street address"
                  hintText="e.g. 8/123 Bondi Road"
                  errorText={this.getErrorMessage('street')}
                  onChange={this._textFieldChanged.bind(this, 'street')}
                  onBlur={this._textFieldBlur.bind(this, 'street')}
                  value={this.state.street} />
              </div>
              <div>
                <TextField
                  ref="suburbTextField"
                  floatingLabelText="Suburb"
                  hintText="e.g. Bondi Beach"
                  errorText={this.getErrorMessage('suburb')}
                  onChange={this._textFieldChanged.bind(this, 'suburb')}
                  onBlur={this._textFieldBlur.bind(this, 'suburb')}
                  value={this.state.suburb} />
              </div>
              <div>
                <TextField
                  ref="postcodeTextField"
                  floatingLabelText="Postcode"
                  hintText="e.g. 2026"
                  errorText={this.getErrorMessage('postcode')}
                  onChange={this._textFieldChanged.bind(this, 'postcode')}
                  onBlur={this._textFieldBlur.bind(this, 'postcode')}
                  value={this.state.postcode} />
              </div>
              <div>
                <SelectField
                  floatingLabelText="State"
                  menuItems={menuItems.states}
                  value={this.state.state}
                  onChange={this._handleStateChange}/>
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
      </div>
    );
  },

  _geoCodeAddress() {
    if (!this._geocoder) return;
    let {street, suburb, postcode, state } = this.state;
    this._geocoder.geocode({
      address: `${street}, ${suburb} ${postcode} ${state}`,
    }, (res) => {
      if (res && res.length > 0) {
        const place = res[0];

        let state = null;
        for (let component of place.address_components) {
          if(component.types[0] === 'administrative_area_level_1') {
            state = component.short_name;
            break;
          }
        }

        this.setState({
          state,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          zoom: 17,
        });
      }
    });
  },

  _updateState(property) {
    let {street, suburb, postcode, state, loc} = property;
    this.setState({
      street,
      suburb,
      postcode,
      state,
    });
    if (!!loc && !!loc.coordinates) {
      this.setState({
        lat: loc.coordinates[1],
        lng: loc.coordinates[0],
      });
    }
  },

  _textFieldChanged(key, event) {
    this.setState({
      [key]: _.isEmpty(event.target.value) ? null : event.target.value});
  },

  _handleStateChange(e, _, selected) {
    this.setState({state: selected});
  },

  _textFieldBlur(key) {
    let { street, suburb, postcode } = this.state;
    validator.validateOne({ street, suburb, postcode }, key);
    this._geoCodeAddress();
    this.forceUpdate();
  },

  _handleUpdateClick() {
    let { street, suburb, postcode, state, lat, lng } = this.state;
    if (validator.validate({ street, suburb, postcode })) {
      PropertyActions.handleLocationUpdate(
        this.props.propertyId,
        {
          street, suburb, postcode, state, lat, lng,
        }, err => {
          Notifier.showMessage(
            'Your property location has been updated',
            err, err && err.reason);
        });
    } else {
      this.forceUpdate();
    }
  },

});
