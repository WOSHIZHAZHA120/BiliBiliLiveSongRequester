import { LyricLine } from '@/types/LibLyric'

export interface CurrentLyricInfo {
    readonly hash: string
    readonly lyrics: LyricLine[]
}