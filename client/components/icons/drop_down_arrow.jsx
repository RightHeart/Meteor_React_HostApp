let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

DropDownArrow = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 10l5 5 5-5z" />
      </SvgIcon>
    );
  },

});
