let { TextField, Paper, Styles, Mixins, Utils } = mui;
let { Colors, Transitions } = Styles;
let { StylePropable } = Mixins;
let { KeyCode } = Utils;

GeoSuggestTextField = React.createClass({

  propTypes: {
    floatingLabelText: React.PropTypes.string,
    hintText: React.PropTypes.string,
    onSelected: React.PropTypes.func,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      onSelected: () => {},
    };
  },

  getInitialState() {
    return {
      open: false,
      textValue: '',
      selectedPlace: {},
      ready: false,
      suggestList: [],
    };
  },

  componentDidMount() {
    const i = setInterval(() => {
      if (GoogleMaps.loaded) {
        clearInterval(i);
        this.setState({ready: true});
      }
    }, 1000);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.ready || nextState.ready;
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.ready && nextState.ready) {
      let {places, Geocoder, LatLngBounds, LatLng } = google.maps;
      this._autocompleteService = new places.AutocompleteService();
      this._geocoder = new Geocoder();
      // Set bias to Sydney
      this._bounds = new LatLngBounds(
        new LatLng(-34.052660032128145, 150.79696616210936),
        new LatLng(-33.71063288469741, 151.34628256835936)
      );
    }
  },

  getStyles() {
    return {
      root: {
        display: 'inline-block',
        width: '100%',
        position: 'relative',
      },
      container: {
        maxHeight: 0,
        width: '100%',
        position: 'absolute',
        top: 64,
        overflow: 'auto',
        backgroundColor: Colors.white,
        transition: Transitions.easeOut(),
        zIndex: 9,
        textAlign: 'left',
      },
      containerWhenOpen: {
        maxHeight: 220,
      },
      list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
    };
  },

  getSuggestItems() {
    let { suggestList, selectedPlace } = this.state;
    return suggestList.map(place => {
      let isActive = place.place_id === selectedPlace.place_id;
      return (
        <GeoSuggestItem
          key={place.place_id}
          place={place}
          isActive={isActive}
          onSelected={this._handlePlaceSelect} />
      );
    });
  },

  render() {
    const styles = this.getStyles();
    let { floatingLabelText, hintText, onSelected, ...other} = this.props;
    let { open, textValue, suggestList } = this.state;
    return (
      <div style={styles.root}>
        <TextField
          floatingLabelText={floatingLabelText}
          hintText={hintText}
          value={textValue}
          onKeyDown={this._handleKeyDown}
          onChange={this._handleTextChange}
          onFocus={this._handleOnFocus}
          onBlur={this._handleOnBlur} {...other} />
        <Paper style={this.mergeAndPrefix(
          styles.container,
          open && suggestList.length > 0 && styles.containerWhenOpen)}>
          <ul style={styles.list}>
            {this.getSuggestItems()}
          </ul>
        </Paper>
      </div>
    );
  },

  _search() {
    let {ready, textValue } = this.state;
    if (ready && textValue.length > 0) {
      this._autocompleteService.getPlacePredictions(
        {
          input: textValue,
          bounds: this._bounds,
          componentRestrictions: {country: 'au'},
          types: ['geocode'],
        }, list => {
          const suggestList = list || [];
          this.setState({suggestList});
        });
    } else {
      this.setState({suggestList: []});
    }
  },

  _geocode() {
    let {ready, textValue, selectedPlace } = this.state;
    if (ready && textValue.length > 0) {
      const params =
        !!selectedPlace.place_id
        ? {placeId: selectedPlace.place_id}
        : {address: textValue};
      this._geocoder.geocode(params, (res) => {
        if (res && res.length > 0) {
          const rtn = {};
          const place = res[0];
          rtn.street = place.formatted_address.split(',')[0];
          for (let component of place.address_components) {
            switch (component.types[0]) {
            case 'locality':
              rtn.suburb = component.short_name;
              break;
            case 'postal_code':
              rtn.postcode = component.short_name;
              break;
            case 'administrative_area_level_1':
              rtn.state = component.short_name;
              break;
            default:
              break;
            }
          }
          rtn.lat = place.geometry.location.lat();
          rtn.lng = place.geometry.location.lng();
          this.props.onSelected(rtn);
        }
      });
    }
  },

  _setSelection(direction) {
    let { suggestList, selectedPlace } = this.state;
    if (suggestList.length === 0) return;

    const next = direction === 'next';
    let index = 0;
    suggestList.forEach((place, i) => {
      if (place.place_id === selectedPlace.place_id) {
        index = Math.max(
          Math.min((next ? i + 1 : i - 1), suggestList.length - 1),
          0);
      }
    });
    const place = suggestList[index];
    this.setState({textValue: place.description, selectedPlace: place});
  },

  _handleOnFocus() {
    this.setState({open: true});
  },

  _handleOnBlur() {
    this.setState({open: false}, () => {
      this._geocode();
    });
  },

  _handleTextChange(event) {
    this.setState({
      textValue: event.target.value,
      selectedPlace: {}, open: true}, () => {
        this._search();
      });
  },

  _handlePlaceSelect(selectedPlace) {
    this.setState({
      textValue: selectedPlace.description,
      selectedPlace,
      open: false,
    });
  },

  _handleKeyDown(event) {
    if (this.state.open) {
      switch (event.keyCode) {
      case KeyCode.DOWN:
        event.preventDefault();
        this._setSelection('next');
        break;
      case KeyCode.UP:
        event.preventDefault();
        this._setSelection('prev');
        break;
      case KeyCode.ENTER:
      case KeyCode.TAB:
      case KeyCode.ESC:
        event.preventDefault();
        this.setState({open: false});
        break;
      default:
        break;
      }
    }
  },

});
