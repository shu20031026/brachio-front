import { FC, useState, useEffect } from "react"
import { Html} from "@react-three/drei"
import { GLTFLoader, GLTF, GLTFParser } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';


const CatModel: FC = () => {
  const [gltf, setGltf] = useState<GLTF>()
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (!gltf) {
      const loader = new GLTFLoader()
      loader.register((parser: GLTFParser) => {
        return new VRMLoaderPlugin(parser)
      })

      loader.load(
        "/bananaCat.vrm",
        (tmpGltf: GLTF) => {
          setGltf(tmpGltf)
          console.log("loaded")
        },
        // called as loading progresses
        (xhr) => {
          setProgress((xhr.loaded / xhr.total) * 100)
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
        },
        // called when loading has errors
        (error) => {
          console.log("An error happened")
          console.log(error)
        }
      )
    }
  }, [gltf])

  return (
    <>
      {gltf ? (
        <primitive object={gltf.scene} />
      ) : (
        <Html center>{progress} % loaded</Html>
      )}
    </>
  )
}

export default CatModel
