import { FetchedData, Pet } from '@/interfaces/types'
import { atom } from 'jotai'
import * as THREE from 'three';

export const USER_DATA_ATOM = atom<FetchedData|null>(null)
export const IS_OPEN_MODAL = atom<boolean>(false)
export const CURRENT_MODAL = atom<Pet|null>(null)
export const NOW_FEEDING = atom<boolean>(false)
export const GRASS_VECTOR = atom<THREE.Vector3|null>(null)