import { useMediaQuery } from '@uidotdev/usehooks';

export const useDevices = () => {
  const isHandheldDevice = useMediaQuery('only screen and (max-width:1023px)');
  const isMobile = useMediaQuery('only screen and (max-width:767px)');
  const isSmallMobile = useMediaQuery('only screen and (max-width:639px)');

  return { isHandheldDevice, isMobile, isSmallMobile };
};
