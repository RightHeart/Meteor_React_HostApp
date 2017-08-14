let { 
  Avatar, 
  FontIcon, 
  IconButton, 
  ClearFix,
  RaisedButton, 
  Mixins, 
  Styles,
  Tabs,
  Tab
} = mui;
let { StylePropable } = Mixins;
let { Transitions } = Styles;
let { Spring } = motion;
let { OnResize } = win;

PropertyRow = React.createClass({

  propTypes: {
    property: React.PropTypes.object.isRequired,
    completeOrders: React.PropTypes.array,
    upcomingOrders: React.PropTypes.array,
    guestUser: React.PropTypes.bool,
    onShowNoAccount: React.PropTypes.func,
    onShowNotServiceable: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable, ReactMeteorData, OnResize],

  getDefaultProps() {
    return {
      property: {},
      guestUser: false,
      completeOrders: [],
      upcomingOrders: [],
      onShowNoAccount: () => {},
      onShowNotServiceable: () => {},
    };
  },

  getInitialState() {
    return {
      showAllOrders: false,
    };
  },

  getMeteorData() {
    return {};
  },

  getMapSrc() {
    let { street, suburb, postcode } = this.props.property;
    return 'https://maps.googleapis.com/maps/api/staticmap?center=' +
      `${street}+${suburb}+${postcode}` +
      '&zoom=18&scale=2&' +
      'size=160x160&maptype=roadmap' +
      `&format=jpg&key=${Meteor.settings.public.googleAPIKey}`;
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        marginTop: 24,
        marginRight: 24,
        position: 'relative',
        flex: '1 0 100%',
        transition: Transitions.easeOut(),
      },
      propertyContainer: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
      },
      propertyAvatarContainer: {
        flex: '1 0 auto',
        marginLeft: 5,
        maxWidth: 100,
        textAlign: 'center',
      },
      propertyAvatar: {
        height: 60,
        width: 60,
      },
      propertyTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2 1 auto',
        marginLeft: 15,
        marginRight: 25,
        fontSize: 14,
      },
      propertyName: {
        fontSize: 16,
        fontWeight: 500,
      },
      propertyAddressStreet: {
        marginTop: 5,
      },
      propertyAddressSuburb: {
        marginBottom: 5,
      },
      propertyRooms: {
        display: 'flex',
      },
      propertyRoomsIcon: {
        fontSize: 14,
        color: palette.primary3Color,
        marginRight: 5,
      },
      propertyRoomsNumber: {
        fontWeight: 400,
        marginRight: 15,
      },
      menu: {
        position: 'absolute',
        top: 20,
        right: 40,
      },
      menuButton: {
        position: 'absolute',
        top: 0,
        right: -5,
      },
      ordersTabsContainer: {
        backgroundColor: '#E1E1E1',
      },
      ordersTab: {
        color: '#3A2E3A',
      },
    };
  },

  getMenu() {
    const styles = this.getStyles();
    const menuItems = [
      {
        text: 'Edit',
        onSelected: this._handleOnEditSelected,
      },
      {
        text: 'Remove',
        onSelected: this._handleOnRemoveSelected,
      },
    ];
    return (
      <div>
        <IconButton
          iconClassName='icon menu'
          onTouchTap={this._handleMenuTouchTap}
          style={styles.menuButton} />
        <Menu 
          ref='menu'
          items={menuItems} 
          style={styles.menu} />
        <PropertyRemove
          ref={c => this._removeDialog = c}
          property={this.props.property} />
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    let { _id, nickname, street, suburb, postcode,
      access, bedrooms, bathrooms } = this.props.property;
    return (
      <DepthPaper style={styles.root}>
        <div style={styles.propertyContainer}>
          <div style={styles.propertyAvatarContainer}>
            <Avatar 
              src={this.getMapSrc()}
              size={80} 
              style={styles.propertyAvatar} />
          </div>
          <div style={styles.propertyTextContainer}>
            <div style={styles.propertyName}>
              {nickname}
            </div>
            <div style={styles.propertyAddressStreet}>
              {`${street}`}
            </div>
            <div style={styles.propertyAddressSuburb}>
              {`${suburb} ${postcode}`}
            </div>
            <div style={styles.propertyRooms}>
              <FontIcon 
                style={styles.propertyRoomsIcon}
                className={`fa fa-bed`} />
              <div style={styles.propertyRoomsNumber}>
                {`${bedrooms}`}
              </div>
              <FontIcon 
                style={styles.propertyRoomsIcon}
                className={`fa fa-bath`} />
              <div style={styles.propertyRoomsNumber}>
                {`${bathrooms}`}
              </div>
            </div>
          </div>
        </div>
        <Tabs
          tabItemContainerStyle={styles.ordersTabsContainer}>
          <Tab
            style={styles.ordersTab}
            label='Upcoming'
            onActive={this._handleOrdersTabSelected}>
            <PropertyOrders
              guestUser={this.props.guestUser}
              property={this.props.property}
              orders={this.props.upcomingOrders}
              orderType={'Upcoming'}
              showAll={this.state.showAllOrders}
              onShowAllOrders={() => this._handleShowAllOrders}
              onShowNoAccount={this.onShowNoAccount}
              onShowNotServiceable={this.props.onShowNotServiceable}
              onShowNoAccess={this._handleNoAccess}
            />
          </Tab>
          <Tab
            style={styles.ordersTab}
            label='Completed'
            onActive={this._handleCompletedOrdersSelected}>
            <PropertyOrders
              guestUser={this.props.guestUser}
              property={this.props.property}
              orders={this.props.completeOrders}
              orderType={'Completed'}
              showAll={this.state.showAllOrders}
              onShowAllOrders={() => this._handleShowAllOrders}
              onShowNoAccount={this.onShowNoAccount}
              onShowNotServiceable={this.props.onShowNotServiceable}
              onShowNoAccess={this._handleNoAccess}
            />
          </Tab>
        </Tabs>
        {this.getMenu()}
        <NoAccessDialog 
          ref="noAccessDialog"
          access={access}
          propertyId={_id} />
      </DepthPaper>
    );
  },

  _handleNoAccess() {
    if (this.refs.noAccessDialog) {
      this.refs.noAccessDialog.show();
    }
  },

  _handleMenuTouchTap() {
    this.refs.menu.show();
  },

  _handleOnEditSelected() {
    FlowRouter.go(
      'propertyConfiguration',
      {propertyId: this.props.property._id}
    );
  },

  _handleOnRemoveSelected() {
    this._removeDialog.show();
  },

  _handleOrdersTabSelected() {
    this.setState({
      showAllOrders: false,
    });
  },

  _handleShowAllOrders() {
    this.state.showAllOrders 
    ? this.setState({showAllOrders: false}) 
    : this.setState({showAllOrders: true});
  },

});
