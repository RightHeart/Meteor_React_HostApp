let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

JCB = React.createClass({

  propTypes: {
    size: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  mixins: [StylePropable, PureRenderMixin],

  getDefaultProps() {
    return {
      size: 48,
    };
  },

  getStyles() {
    return {
      root: {
        width: 'auto',
        height: this.props.size,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <SvgIcon  viewBox="0 0 48 48" style={rootStyles}>
        <path fill="#CFD8DC"
              d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,
                1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
        <path fill="#3F51B5"
              d="M10.669,13C8.58,13,7,14.324,7,16.617V35h6.483C15.114,35,17,
                33.469,17,31.483V13H10.669z"/>
        <path fill="#E53935"
              d="M22.669,13C20.58,13,19,14.324,19,16.617V35h6.483C27.114,35,29,
                33.469,29,31.483V13H22.669z"/>
        <path fill="#388E3C"
              d="M34.669,13C32.58,13,31,14.324,31,16.617V35h6.483C39.114,35,41,
                33.469,41,31.483V13H34.669z"/>
        <g>
          <path fill="#FAFAFA"
                d="M15.806,24.453c0,1.835-2.369,2.803-4.101,2.803c-1.884,
                  0-3.567-1.12-3.926-2.545h1.274 c0.152,0.866,1.021,1.475,1.987,
                  1.475c1.07,0,1.834-0.764,1.834-1.732v-3.311h2.931V24.453z"/>
          <path fill="#FAFAFA"
                d="M38.606,24.038c0.762,0,1.295-0.759,
                  1.295-1.519c0-0.762-0.663-1.422-1.425-1.422h-6.262v5.852h6.392
                  c0.863,0,1.522-0.757,1.523-1.519C40.129,24.671,39.47,24.038,
                  38.606,24.038z M34.651,21.707h1.979 c0.504,0,0.961,0.453,
                  0.961,0.959c0,0.509-0.457,0.967-0.961,0.967h-1.979V21.707z
                  M36.679,26.343h-2.027v-1.928h2.027 c0.508,0,0.965,0.456,0.965,
                  0.965C37.644,25.885,37.187,26.343,36.679,26.343z"/>
          <path fill="#FAFAFA"
                d="M27.811,22.176c-1.168-0.27-2.286-0.427-2.845-0.427c-1.218,
                  0-2.181,1.017-2.181,2.303 c0,1.292,0.963,2.311,2.181,
                  2.311c0.559,0,1.677-0.107,2.845-0.38v1.021h-4.875c-1.522,
                  0-2.79-1.342-2.79-2.952 c0-1.607,1.268-2.948,
                  2.79-2.948h4.875V22.176z"/>
        </g>
      </SvgIcon>
    );
  },

});
