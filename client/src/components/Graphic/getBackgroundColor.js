import * as routes from '../../types/routes';

/**
 * Gets graphic background color based on pathname.
 * Use similar stuff for other elements related to the SVG that will eventually be used.
 * This is just for testing purposes.
 * @param {string} pathname Current URI pathname
 * @param {object} theme    Currenct theme object
 * @returns {string} Color string.
 */
const getBackgroundColor = (pathname, theme) => {
  switch (pathname) {
    case routes.ROOT:
      return theme.palette.blue[700];
    case routes.OFFLINE:
      return '#725752';
    case routes.ONLINE_ROOT:
      return theme.palette.blue[700];
    default:
      return '#D4DFC7';
  }
};

export default getBackgroundColor;
