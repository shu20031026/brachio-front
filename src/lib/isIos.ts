export const isIos = () => {
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.indexOf("iphone") >= 0 ||
    ua.indexOf("ipad") >= 0 ||
    ua.indexOf("ipod") >= 0
  );
};
