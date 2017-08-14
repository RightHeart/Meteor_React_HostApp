let { Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Transitions } = Styles;

TextEdit = React.createClass({

  propTypes: {
    html: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      onChange: () => {},
      onFocus: () => {},
      onBlur: () => {},
      html: '<p></p>',
    };
  },

  getInitialState() {
    return {
      hasFocus: false,
      html: this.props.html,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.html && nextProps.html.length > 0) {
      this.setState({html: nextProps.html});
    }
  },

  getHtml() {
    return this.state.html;
  },

  getStyles() {
    const palette = this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
    return {
      root: {
        position: 'relative',
      },
      textArea: {
        width: '100%',
        minHeight: 250,
        outline: 0,
        padding: 10,
      },
      underline: {
        border: 'none',
        borderBottom: `solid 1px ${palette.borderColor}`,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        margin: 0,
        MozBoxSizing: 'content-box',
        boxSizing: 'content-box',
        height: 0,
      },
      underlineFocus: {
        borderBottom: 'solid 2px',
        borderColor: palette.primary1Color,
        transform: 'scaleX(0)',
        transition: Transitions.easeOut(),
      },
    };
  },

  render() {
    const styles = this.getStyles();
    styles.focusUnderline =
      this.mergeStyles(styles.underline, styles.underlineFocus);

    if (this.state.hasFocus) {
      styles.focusUnderline.transform = 'scaleX(1)';
    }
    return (
      <div style={styles.root}>
        <TextToolbar onAction={this._handleToolbarAction}/>
        <ContentEditable
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          html={this.state.html}
          onChange={this._handleTextChange}
          style={styles.textArea} />
        <hr style={this.mergeAndPrefix(styles.underline)}/>
        <hr style={this.mergeAndPrefix(styles.focusUnderline)} />
      </div>
    );
  },

  selectAll() {
    if (this.state.hasFocus) {
      setTimeout(() => {
        document.execCommand('selectAll', false, null);
      }, 1);
    }
  },

  _handleFocus() {
    this.setState({hasFocus: true}, this.props.onFocus);
  },

  _handleBlur() {
    this.setState({hasFocus: false}, this.props.onBlur);
  },

  _handleToolbarAction(action, value = null) {
    if (this.state.hasFocus) {
      document.execCommand(action, false, value);
    }
  },

  _handleTextChange(html) {
    if (this.state.hasFocus) {
      this.setState({html});
      this.props.onChange(html);
    }
  },

});
