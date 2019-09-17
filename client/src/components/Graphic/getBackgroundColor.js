import * as routes from '../../types/routes';

/**
 * Gets graphic background color based on pathname.
 * Use similar stuff for other elements related to the SVG that will eventually be used.
 * This is just for testing purposes.
 */
const getBackgroundColor = pathname => {
  switch (pathname) {
    case routes.ROOT:
      return '#878E88';
    case routes.OFFLINE:
      return '#725752';
    case routes.ONLINE_ROOT:
      return '#96C0B7';
    default:
      return '#D4DFC7';
  }
};

export default getBackgroundColor;
