const colors = {
  blueGreen: '#1C5E5E',
  lightBlueGreen: '#DEF3F3',
  darkBlueGreen: '#173540',
  green: '#84B026',
  lightGreen: '#D4E8A9',
  brown: '#635142',
  white: '#FFF',
  grey: '#89858B',
  black: '#252422',
  red: '#E40808',
  bronze: '#FF7A00',
  silver: '#89858B',
  gold: '#FFC700',
};

const shadows = {
  fineShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
  heavyShadow: '0px 0px 20px 20px rgba(0, 0, 0, 0.25)',
  blueGreenShadow: '0px 0px 0px 10px rgba(28, 94, 94, 0.5)',
  redShadow: '0px 0px 0px 10px rgba(255, 0, 0, 0.5)',
};

const fonts = {
  openSans: `'Open Sans', sans-serif`,
  comfortaa: `'Comfortaa', sans-serif`,
};

const theme = {
  colors: {
    primaryColor: colors.blueGreen,
    primaryHighlightColor: colors.lightBlueGreen,
    primaryShadeColor: colors.darkBlueGreen,
    secondaryColor: colors.green,
    secondaryHighlightColor: colors.lightGreen,
    tertiaryColor: colors.brown,
    brightWhite: colors.white,
    placeholderColor: colors.grey,
    darkFontColor: colors.black,
    errorColor: colors.red,
  },
  statusColors: {
    adminColor: colors.blueGreen,
    novisColor: colors.green,
    bronzeColor: colors.bronze,
    silverColor: colors.silver,
    goldColor: colors.gold,
  },
  text: {
    paragraphFont: fonts.openSans,
    headingFont: fonts.comfortaa,
  },
  effects: {
    cardShadow: shadows.fineShadow,
    modalShadow: shadows.heavyShadow,
    defaultButtonShadow: shadows.blueGreenShadow,
    dangerButtonShadow: shadows.redShadow,
  },
};

export default theme;
