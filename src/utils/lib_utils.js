import shapeConstants from '../constants/shape_constants';

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

  /**
   * Given a shape object from the main model, return a shape spec ready to go into 3Dmol.js
   * @param shape {Object}
   * @returns {Object}
   */
  getShapeSpec(shape, callback) {
    let color;
    if (shape.color) {
      color = libUtils.colorStringToNumber(shape.color);
    }

    const shapeSpec = Object.assign({}, {
      alpha: 0.8,
      callback,
      clickable: false,
      color: 0x00FE03,
      radius: shape.radius,
    }, shape, { color });

    if (shape.type === shapeConstants.ARROW) {
      shapeSpec.start = shape.start;
      shapeSpec.end = shape.end;
    } else if (shape.type === shapeConstants.SPHERE) {
      shapeSpec.center = shape.center;
    } else if (shape.type === shapeConstants.CYLINDER) {
      shapeSpec.fromCap = true;
      shapeSpec.toCap = true;
      shapeSpec.start = shape.start;
      shapeSpec.end = shape.end;
    } else {
      throw new Error('Invalid shape type.');
    }

    return shapeSpec;
  },
};

export default libUtils;
