
Link = React.createClass({

  propTypes: {},

  getDefaultProps() {
    return {
      style: {},
    };
  },

  render() {

    return (
      <a {...this.props}>
        {this.props.children}
      </a>
    );
  },
});
