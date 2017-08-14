let { SvgIcon, Styles, Mixins } = mui;
let { Colors } = Styles;
let { StylePropable } = Mixins;

KaylaAnimation = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    size: React.PropTypes.number,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
      size: 50,
    };
  },

  getInitialState() {
    return {
      animate: false,
    };
  },

  getStyles() {
    return {
      root: {
        width: this.props.size * 1.7,
        height: this.props.size,
      },
      type: {
        stroke: this.props.color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 12,
        fill: 'none',
      },
      dot: {
        strokeWidth: 21,
      },
      pathK1: {
        strokeDasharray: 155.28,
        strokeDashoffset: 155.28,
      },
      pathK2: {
        strokeDasharray: 335.35,
        strokeDashoffset: 335.35,
      },
      pathA: {
        strokeDasharray: 190.40,
        strokeDashoffset: 190.40,
      },
      pathY: {
        strokeDasharray: 305.24,
        strokeDashoffset: 305.24,
      },
      pathL: {
        strokeDasharray: 207.57,
        strokeDashoffset: 207.57,
      },
      pathDot: {
        strokeDasharray: 12.73,
        strokeDashoffset: 12.73,
      },
      pathK1Animate: {
        transition: 'stroke-dashoffset 0.2s 1s ease-in-out',
        strokeDashoffset: 0,
      },
      pathK2Animate: {
        transition: 'stroke-dashoffset 0.2s 1.2s ease-in-out',
        strokeDashoffset: 0,
      },
      pathAAnimate: {
        transition: 'stroke-dashoffset 0.2s 1.4s ease-in-out',
        strokeDashoffset: 0,
      },
      pathYAnimate: {
        transition: 'stroke-dashoffset 0.2s 1.6s ease-in-out',
        strokeDashoffset: 0,
      },
      pathLAnimate: {
        transition: 'stroke-dashoffset 0.2s 1.8s ease-in-out',
        strokeDashoffset: 0,
      },
      pathA2Animate: {
        transition: 'stroke-dashoffset 0.2s 2s ease-in-out',
        strokeDashoffset: 0,
      },
      pathDotAnimate: {
        transition: 'stroke-dashoffset 0.2s 2.2s ease-in-out',
        strokeDashoffset: 0,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <SvgIcon viewBox="0 0 540 348" style={styles.root}>
        <g>
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.pathK1,
                  this.state.animate && styles.pathK1Animate)}
                d="M37.250,108.000 C37.250,108.000 15.473,
                259.283 18.250,262.000"></path>
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.pathK2,
                  this.state.animate && styles.pathK2Animate)}
                d="M174.250,91.000 C174.250,91.000 43.623,202.588 45.250,
                206.000 C46.877,209.412 97.684,235.295 171.250,244.000 C181.393,
                245.562 197.250,258.000 197.250,258.000" />
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.pathA,
                  this.state.animate && styles.pathAAnimate)}
                d="M184.250,169.000 C184.250,169.000 172.250,164.000 172.250,
                164.000 C172.250,164.000 148.955,169.813 124.250,
                194.000 C117.688,203.969 127.747,207.907 136.168,
                205.841 C144.458,203.806 185.451,182.277 195.250,
                187.000 C205.049,191.723 216.250,213.000 216.250,213.000" />
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.pathY,
                  this.state.animate && styles.pathYAnimate)}
                d="M220.250,155.000 C220.250,155.000 227.316,189.504 243.250,
                193.000 C274.885,200.515 361.360,50.511 243.250,341.000" />
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.pathL,
                  this.state.animate && styles.pathLAnimate)}
                d="M326.250,11.000 C326.250,11.000 322.250,181.000 322.250,
                181.000 C322.250,181.000 321.629,202.625 327.250,218.000" />
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.pathA,
                  this.state.animate && styles.pathA2Animate)}
                d="M406.250,170.000 C406.250,170.000 394.250,165.000 394.250,
                165.000 C394.250,165.000 370.955,170.813 346.250,
                195.000 C339.688,204.969 349.747,208.907 358.168,
                206.841 C366.458,204.806 407.451,183.277 417.250,
                188.000 C427.049,192.723 438.250,214.000 438.250,214.000" />
          <path style={
                this.mergeAndPrefix(
                  styles.type,
                  styles.dot,
                  styles.pathDot,
                this.state.animate && styles.pathDotAnimate)}
                d="M523.750,211.500 C523.750,211.500 532.750,202.500 532.750,
                202.500" />
        </g>
      </SvgIcon>
    );
  },

  componentDidAppear() {
    setTimeout(() => {
      this.setState({animate: true});
    }, 100);
  },

});