export declare namespace BetterNCM {
    interface ConfigTools {
        makeBtn(text: string, callback: Function): HTMLButtonElement

        makeInput(text: string, props: Record<string, unknown>): HTMLInputElement
    }

    export interface SimpleSongInfo {
        readonly id: number
        readonly name: string
        readonly artist: string
    }

    export interface SongInfo {
        readonly data: {
            readonly id: number
            readonly name: string
            readonly transNames: string[]

            readonly artists: {
                readonly name: string
            }[]

            readonly album: {
                readonly name: string
                readonly picUrl: string
            }
        }
    }
}

declare global {
    const BETTERNCM_FILES_PATH: string

    const plugin: {
        readonly pluginPath: string

        onConfig(creator: (tools: BetterNCM.ConfigTools) => HTMLElement): void
    }

    const betterncm: {
        readonly ncm: {
            findApiFunction<T>(nameOrChecker: string | ((func: Function) => boolean), root?: T, currentPath?: string[], checkedPath?: string[]): [Function, T, string[]]
            findNativeFunction<T>(target: T, identifiers: string[]): string
            getPlayingSong(): BetterNCM.SongInfo
        }
    }

    const dom: (tag: string, props: Record<string, unknown>, ...children: HTMLElement[]) => HTMLElement
}

export {}