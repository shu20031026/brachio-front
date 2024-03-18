import { useEffect, useState } from 'react';
import * as THREE from 'three';

const useWebcamBackground = () => {
  const [videoTexture, setVideoTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.setAttribute('playsinline', ''); // iOSでフルスクリーン再生を防ぐ

    // ユーザーのWebカメラを取得、背面カメラを優先
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    }).then(stream => {
      video.srcObject = stream;
      video.play();

      // ビデオテクスチャを作成し、状態に設定
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter; // テクスチャのフィルタリングを設定
      setVideoTexture(texture);
    }).catch(console.error);

    return () => {
      video.pause();
      if (video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return videoTexture;
};
export default useWebcamBackground