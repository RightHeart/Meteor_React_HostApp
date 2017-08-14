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

phoneRow = React.createClass({

  propTypes: {
    phone: React.PropTypes.object.isRequired,
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
      phone: {},
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

  getMdieData() {
    return {};
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
      phoneContainer: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
      },
      phoneAvatarContainer: {
        flex: '1 0 auto',
        marginLeft: 5,
        maxWidth: 100,
        textAlign: 'center',
      },
      phoneAvatar: {
        height: 60,
        width: 60,
      },
      phoneTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2 1 auto',
        marginLeft: 15,
        marginRight: 25,
        fontSize: 14,
      },
      phoneName: {
        fontSize: 16,
        fontWeight: 500,
      },
      phoneAddressStreet: {
        marginTop: 5,
      },
      phoneAddressSuburb: {
        marginBottom: 5,
      },
      phoneRooms: {
        display: 'flex',
      },
      phoneRoomsIcon: {
        fontSize: 14,
        color: palette.primary3Color,
        marginRight: 5,
      },
      phoneRoomsNumber: {
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
        <phoneRemove
          ref={c => this._removeDialog = c}
          phone={this.props.phone} />
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    let { _id, nickname, street, suburb, postcode,
      access, bedrooms, bathrooms } = this.props.phone;
    return (
      <DepthPaper style={styles.root}>
        <div style={styles.phoneContainer}>
          <div style={styles.phoneAvatarContainer}>
            <Avatar 
              src={this.getMapSrc()}
              size={80} 
              style={styles.phoneAvatar} />
          </div>
          <div style={styles.phoneTextContainer}>
            <div style={styles.phoneName}>
              {nickname}
            </div>
            <div style={styles.phoneAddressStreet}>
              {`${street}`}
            </div>
            <div style={styles.phoneAddressSuburb}>
              {`${suburb} ${postcode}`}
            </div>
            <div style={styles.phoneRooms}>
              <FontIcon 
                style={styles.phoneRoomsIcon}
                className={`fa fa-bed`} />
              <div style={styles.phoneRoomsNumber}>
                {`${bedrooms}`}
              </div>
              <FontIcon 
                style={styles.phoneRoomsIcon}
                className={`fa fa-bath`} />
              <div style={styles.phoneRoomsNumber}>
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
            <phoneOrders
              guestUser={this.props.guestUser}
              phone={this.props.phone}
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
            <phoneOrders
              guestUser={this.props.guestUser}
              phone={this.props.phone}
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
          phoneId={_id} />
      </DepthPaper>
    );
  },

  _handleNoAccess() {
    if (this.refs.noAccessDialog) {
      this.refs.noAccessDialog.show();
    }
  },


  _handleOnRemoveSelected() {
    this._removeDialog.show();
  },

  _handleShowAllOrders() {
    this.state.showAllOrders 
    ? this.setState({showAllOrders: false}) 
    : this.setState({showAllOrders: true});
  },

});
