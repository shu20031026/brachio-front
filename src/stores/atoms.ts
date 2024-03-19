import { FetchedData, Pet } from '@/interfaces/types'
import { atom } from 'jotai'

export const USER_DATA_ATOM = atom<FetchedData|null>(null)
export const CURRENT_MODAL = atom<Pet|null>(null)