var TestUtils = React.addons.TestUtils;
var ThemeManager = new mui.Styles.ThemeManager();

renderComponent = function(comp, props) {

  props.ref = 'comp';

  var stub = React.createClass({

    childContextTypes: {
      muiTheme: React.PropTypes.object
    },


    getChildContext: function() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      }
    },

    getComponent: function() {
      return this.refs.comp;
    },

    render: function() {
      return React.createElement('div', null,
        React.createElement(comp, props));
    }

  });

  return TestUtils.renderIntoDocument(
    React.createElement(stub, null)
  );
};

// Singletons
renderComponent(Notifier, {});

// Avoid Stripe throwing an error
Stripe = {
  setPublishableKey: function() {}
};



