import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import useWebcamBackground from '../app/_components/videoTexture';

export const useSceneBackground = () => {
  const { scene } = useThree();
  const videoTexture = useWebcamBackground();

  useEffect(() => {
    if (videoTexture) {
      scene.background = videoTexture;
    }
  }, [videoTexture, scene]);
};