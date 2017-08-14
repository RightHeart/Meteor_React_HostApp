let { Styles, Utils } = mui;
let { Spacing, Colors } = Styles;
let { ColorManipulator } = Utils;

KaylaTheme = {

  spacing: Spacing,
  contentFontFamily: 'Source Sans Pro, sans-serif',
  getPalette() {
    return {
      primary1Color: '#39B0A4',
      primary2Color: '#FF4965',
      primary3Color: '#E6AB6D',
      accent1Color: '#19A698',
      accent2Color: '#FF4965',
      accent3Color: '#E6AB6D',
      kaylaBlackColor: '#0A1724',
      textColor: '#3A2E3A',
      canvasColor: 'transparent', //Colors.grey200,
      greyColor: '#E1E1E1',
      borderColor: '#E1E1E1',
      errorColor: '#FF4965',
      disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    };
  },
  getComponentThemes(palette, space) {
    const spacing = space || Spacing;
    let obj = {
      appBar: {
        color: palette.primary1Color,
        textColor: Colors.darkWhite,
        height: spacing.desktopKeylineIncrement,
      },
      avatar: {
        borderColor: 'rgba(0, 0, 0, 0.08)',
      },
      button: {
        height: 36,
        minWidth: 88,
        iconButtonSize: spacing.iconSize * 2,
      },
      checkbox: {
        boxColor: palette.textColor,
        checkedColor: palette.primary1Color,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor,
      },
      datePicker: {
        color: '#FF7280',
        textColor: Colors.white,
        calendarTextColor: palette.textColor,
        selectColor: palette.primary2Color,
        selectTextColor: Colors.white,
      },
      dropDownMenu: {
        accentColor: palette.borderColor,
      },
      flatButton: {
        color: Colors.white,
        textColor: palette.textColor,
        primaryTextColor: palette.primary1Color,
        secondaryTextColor: palette.accent1Color,
      },
      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: palette.primary1Color,
        iconColor: Colors.white,
        secondaryColor: palette.accent1Color,
        secondaryIconColor: Colors.white,
      },
      leftNav: {
        width: spacing.desktopKeylineIncrement * 3,
        color: palette.canvasColor,
      },
      listItem: {
        nestedLevelDepth: 18,
      },
      menu: {
        backgroundColor: Colors.white,
        containerBackgroundColor: Colors.white,
      },
      menuItem: {
        dataHeight: 32,
        height: 48,
        hoverColor: 'rgba(0, 0, 0, .035)',
        padding: spacing.desktopGutter,
        selectedTextColor: palette.accent1Color,
      },
      menuSubheader: {
        padding: spacing.desktopGutter,
        borderColor: palette.borderColor,
        textColor: palette.primary1Color,
      },
      paper: {
        backgroundColor: Colors.white,
      },
      radioButton: {
        borderColor: palette.textColor,
        backgroundColor: Colors.white,
        checkedColor: palette.primary1Color,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor,
        size: 24,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor,
      },
      raisedButton: {
        color: Colors.white,
        textColor: palette.textColor,
        primaryColor: palette.primary1Color,
        primaryTextColor: Colors.white,
        secondaryColor: palette.accent1Color,
        secondaryTextColor: Colors.white,
      },
      refreshIndicator: {
        strokeColor: Colors.grey300,
        loadingStrokeColor: palette.primary1Color,
      },
      slider: {
        trackSize: 2,
        trackColor: Colors.minBlack,
        trackColorSelected: Colors.grey500,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleColorZero: Colors.grey400,
        handleFillColor: Colors.white,
        selectionColor: palette.primary3Color,
        rippleColor: palette.primary1Color,
      },
      snackbar: {
        textColor: Colors.white,
        errorColor: Colors.red500,
        backgroundColor: '#323232',
        actionColor: palette.accent1Color,
      },
      table: {
        backgroundColor: Colors.white,
      },
      tableHeader: {
        borderColor: palette.borderColor,
      },
      tableHeaderColumn: {
        textColor: Colors.lightBlack,
        height: 56,
        spacing: 28,
      },
      tableFooter: {
        borderColor: palette.borderColor,
        textColor: Colors.lightBlack,
      },
      tableRow: {
        hoverColor: Colors.grey200,
        stripeColor: ColorManipulator.lighten(palette.primary1Color, 0.55),
        selectedColor: Colors.grey300,
        textColor: Colors.darkBlack,
        borderColor: palette.borderColor,
      },
      tableRowColumn: {
        height: 48,
        spacing: 28,
      },
      timePicker: {
        color: Colors.white,
        textColor: Colors.grey600,
        accentColor: palette.primary1Color,
        clockColor: Colors.black,
        selectColor: palette.primary2Color,
        selectTextColor: Colors.white,
      },
      toggle: {
        thumbOnColor: palette.primary1Color,
        thumbOffColor: Colors.grey50,
        thumbDisabledColor: Colors.grey400,
        thumbRequiredColor: palette.primary1Color,
        trackOnColor: ColorManipulator.fade(palette.primary1Color, 0.5),
        trackOffColor: Colors.minBlack,
        trackDisabledColor: Colors.faintBlack,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor,
      },
      toolbar: {
        backgroundColor: ColorManipulator.darken('#eeeeee', 0.05),
        height: 56,
        titleFontSize: 20,
        iconColor: 'rgba(0, 0, 0, .40)',
        separatorColor: 'rgba(0, 0, 0, .175)',
        menuHoverColor: 'rgba(0, 0, 0, .10)',
      },
      tabs: {
        backgroundColor: palette.primary1Color,
      },
      textField: {
        textColor: palette.textColor,
        hintColor: Colors.grey700,
        floatingLabelColor: palette.textColor,
        disabledTextColor: palette.disabledColor,
        errorColor: Colors.red500,
        focusColor: palette.primary1Color,
        backgroundColor: 'transparent',
        borderColor: palette.borderColor,
      },
    };

    // Properties based on previous properties
    obj.flatButton.disabledTextColor = ColorManipulator.fade(
      obj.flatButton.textColor, 0.3);
    obj.floatingActionButton.disabledColor = ColorManipulator.darken(
      Colors.white, 0.1);
    obj.floatingActionButton.disabledTextColor = ColorManipulator.fade(
      palette.textColor, 0.3);
    obj.raisedButton.disabledColor = ColorManipulator.darken(
      obj.raisedButton.color, 0.1);
    obj.raisedButton.disabledTextColor = ColorManipulator.fade(
      obj.raisedButton.textColor, 0.3);
    obj.slider.handleSizeActive = obj.slider.handleSize * 2;
    obj.toggle.trackRequiredColor = ColorManipulator.fade(
      obj.toggle.thumbRequiredColor, 0.5);

    return obj;
  },

};
