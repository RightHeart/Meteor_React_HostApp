let { Mixins } = mui;
let { StylePropable } = Mixins;
let { TransitionSpring } = motion;

InvoiceSection = React.createClass({

  propTypes: {
    isFirst: React.PropTypes.bool,
    ordersList: React.PropTypes.array,
    heading: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      isFirst: false,
      ordersList: [],
      heading: '',
    };
  },

  getInitialState() {
    return {};
  },

  getEndValue() {
    let { ordersList } = this.props;

    const configs = {};
    for (let order of ordersList) {
      configs[order._id] = {
        height: {val: 52},
        opacity: {val: 1},
      };
    }
    return configs;
  },

  getStyles() {
    return {
      root: {
        marginTop: 20,
      },
      rootWhenFirst: {
        marginTop: 40,
      },
    };
  },

  getContent() {
    const palette = this.context.muiTheme.palette;
    return (
      <TransitionSpring
        defaultValue={{}}
        endValue={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {currentValue =>
          <div>
            {
              Object.keys(currentValue).map(key => {
                let style = {
                  height: currentValue[key].height.val,
                  opacity: currentValue[key].opacity.val,
                  overflow: 'hidden',
                  borderBottom: '1px solid ' + palette.borderColor,
                };
                return (
                  <div key={key} style={style}>
                    <InvoiceRow order={Orders.findOne(key)} />
                  </div>
                );
              })
            }
          </div>
        }
      </TransitionSpring>
    );
  },

  render() {
    const styles = this.getStyles();
    let { heading, isFirst } = this.props;
    return (
      <DepthPaper
        heading={heading}
        style={this.mergeAndPrefix(
                styles.root,
                isFirst && styles.rootWhenFirst )}>
        {this.getContent()}
      </DepthPaper>
    );
  },

  willEnter() {
    return {
      height: {val: 0},
      opacity: {val: 0},
    };
  },

  willLeave() {
    return {
      height: {val: 0},
      opacity: {val: 0},
    };
  },

});
