import { useMediaQuery } from '@uidotdev/usehooks';

export const useDevices = () => {
  const isHandheldDevice = useMediaQuery('only screen and (max-width:1023px)');

  return { isHandheldDevice };
};
