import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useLookAtCenter = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.lookAt(new THREE.Vector3(0, child.position.y, 0));
      }
    });
  }, [scene]);
};