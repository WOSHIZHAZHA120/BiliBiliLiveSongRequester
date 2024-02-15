export interface DynamicLyricWord {
    time: number;
    duration: number;
    flag: number;
    word: string;
    isCJK?: boolean;
    endsWithSpace?: boolean;
    trailing?: boolean;
}

export interface LyricLine {
    time: number;
    duration: number;
    originalLyric: string;
    translatedLyric?: string;
    romanLyric?: string;
    rawLyric?: string;
    dynamicLyricTime?: number;
    dynamicLyric?: DynamicLyricWord[];
}

export interface LyricPureLine {
    time: number;
    lyric: string;
    originalLyric?: string;
    translatedLyric?: string;
    romanLyric?: string;
    rawLyric?: string;
    unsynced?: boolean;
}