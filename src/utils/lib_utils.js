/**
 * Utils for working with the 3dmol.js library
 */
const libUtils = {
  /**
   * Given a color string (like #abcdef), return its Number representation
   * If invalid input given, return the input
   * @param colorString {String}
   * @returns {Number}
   */
  colorStringToNumber(colorString) {
    if (colorString.length !== 4 && colorString.length !== 7) {
      return colorString;
    }
    if (colorString[0] !== '#') {
      return colorString;
    }

    const colorInt = parseInt(colorString.substr(1, colorString.length - 1), 16);

    if (isNaN(colorInt)) {
      return colorString;
    }

    return colorInt;
  },
};

export default libUtils;
