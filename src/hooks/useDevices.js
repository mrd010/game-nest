import { useMediaQuery } from '@uidotdev/usehooks';

export const useDevices = () => {
  const isHandheldDevice = useMediaQuery('only screen and (max-width:1023px)');
  const isMobile = useMediaQuery('only screen and (max-width:767px)');

  return { isHandheldDevice, isMobile };
};
