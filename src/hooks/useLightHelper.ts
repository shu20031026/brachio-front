import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

export const useLightHelper = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null);

  useHelper(
    directionalLight as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
  );

  return { directionalLight };
};