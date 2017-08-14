let { Mixins } = mui;
let { StylePropable } = Mixins;
let { OnResize } = win;

MapView = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    zoom: React.PropTypes.number,
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
  },

  mixins: [StylePropable, OnResize],

  getDefaultProps() {
  },

  getInitialState() {
    return {
      ready: GoogleMaps.loaded,
    };
  },

  componentWillMount() {
    let {lat, lng, zoom} = this.props;
    if (!!lat && !!lng) {
      this._updateState(lat, lng, zoom);
    }
  },

  componentDidMount() {
    if (!GoogleMaps.loaded) {
      const i = setInterval(() => {
        if (GoogleMaps.loaded) {
          clearInterval(i);
          this.setState({ready: true});
        }
      }, 200);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.lat && !!nextProps.lng) {
      this._updateState(nextProps.lat, nextProps.lng, nextProps.zoom);
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.state.ready || nextState.ready);
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState.ready && !this._map && !!nextState.lat && !!nextState.lng) {
        const r = window.ReactDOM || React;
      this._map = new google.maps.Map(
        r.findDOMNode(this.refs.mapContainer),
        {
          center: {lat: nextState.lat, lng: nextState.lng},
          zoom: nextState.zoom,
          disableDefaultUI: true,
          zoomControl: true,
          draggable: false,
          keyboardShortcuts: false,
        }
      );
    } else if (!!this._map) {
      this._map.setCenter({lat: nextState.lat, lng: nextState.lng});
      if (this.state.zoom !== nextState.zoom) {
        this._map.setZoom(nextState.zoom);
      }
    }
  },

  getStyles() {
    return {
      root: {
        width: '100%',
        height: 400,
        backgroundImage: 'url(/sydney.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
      map: {
        width: '100%',
        height: '100%',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <div style={rootStyles}>
        <div ref="mapContainer" style={styles.map}>
          <LinearLoading />
        </div>
      </div>
    );
  },

  _updateState(lat, lng, zoom = 12) {
    this.setState({
      lat: lat,
      lng: lng,
      zoom: zoom,
    });
  },

});
