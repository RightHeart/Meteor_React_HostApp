
let { TextField, Mixins } = mui;
let { StylePropable } = Mixins;

SelectField = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    fullWidth: React.PropTypes.bool,
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.string,
    underlineStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    errorStyle: React.PropTypes.object,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    floatingLabelStyle: React.PropTypes.object,
    autoWidth: React.PropTypes.bool,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      fullWidth: false,
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    let styles = {
      root: {
        height: 46,
        position: 'relative',
        width: '100%',
        top: 16,
        fontSize: 16,
      },
      label: {
        paddingLeft: 0,
        top: 4,
        width: '100%',
      },
      icon: {
        top: 20,
        right: 0,
      },
      underline: {
        borderTop: 'none',
      },
      input: {},
      error: {},
    };

    if (!this.props.floatingLabelText) {
      if (this.props.hintText) {
        styles.root.top = -5;
        styles.label.top = 1;
        styles.icon.top = 17;
      }  else {
        styles.root.top = -8;
      }
    } else {
      styles.error.bottom = -15;
    }

    return styles;
  },

  render() {
    const styles = this.getStyles();
    let {
      style,
      labelStyle,
      iconStyle,
      underlineStyle,
      errorStyle,
      selectFieldRoot,
      menuItems,
      disabled,
      floatingLabelText,
      hintText,
      fullWidth,
      errorText,
      ...other,
      } = this.props;

    let textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: (!hintText && !floatingLabelText) ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
    };
    let dropDownMenuProps = {
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline),
      autoWidth: false,
    };

    return (
      <TextField {...textFieldProps}>
        <DropDownList {...dropDownMenuProps} {...other} />
      </TextField>
    );
  },

});
