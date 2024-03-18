import { ModalContent } from '@/interfaces/types'
import { atom } from 'jotai'

export const MODAL_CONTENT_ATOM = atom<ModalContent|null>(null)