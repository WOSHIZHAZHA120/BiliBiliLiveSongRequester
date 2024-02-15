import { BetterNCM } from '@/types/betterNCM'
import { isDefined } from 'remeda'

export const search = async (value: string, document: Document = window.document) => {
    return await new Promise<BetterNCM.SimpleSongInfo>(resolve => {
        const getWrapperElement = () => {
            return document.querySelector<HTMLElement>('.container-searchtrack ul li')
        }

        const observer = new MutationObserver(() => {
            const wrapperElement = getWrapperElement()

            if (!isDefined(wrapperElement)) {
                return
            }

            observer.disconnect()
            returnResult()
        })

        const returnResult = () => {
            const wrapperElement = getWrapperElement()

            if (!isDefined(wrapperElement)) {
                return
            }

            const titleElement = wrapperElement.querySelector<HTMLElement>('.title')

            if (!isDefined(titleElement)) {
                return
            }

            const artistElement = wrapperElement.querySelector<HTMLElement>('[data-bi-json*=artist]')

            if (!isDefined(artistElement)) {
                return
            }

            resolve({
                id: Number(wrapperElement.getAttribute('data-res-id')),
                name: titleElement.innerText.trim(),
                artist: artistElement.innerText.trim()
            })

            observer.disconnect()
        }

        const resultElement = document.querySelector<HTMLElement>('#page_pc_search_result')

        if (isDefined(resultElement)) {
            const currentSearchElement = resultElement.querySelector<HTMLElement>('.keyword span')

            if (isDefined(currentSearchElement)) {
                if (currentSearchElement.innerText === value) {
                    returnResult()
                    return
                }
            }
        }

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })

        const searchInputElement = document.querySelector<HTMLInputElement>('.j-search-input')

        if (!isDefined(searchInputElement)) {
            return
        }

        const searchButtonElement = document.querySelector<HTMLElement>('.sch-btn')

        if (!isDefined(searchButtonElement)) {
            return
        }

        searchInputElement.value = value
        searchButtonElement.click()
    })
}

export const play = (id: number, target: Window = window) => {
    //@ts-ignore
    const nativeFunction = betterncm.ncm.findNativeFunction(target.ctl.actionManager, ['.logSource=', '.action'])

    //@ts-ignore
    target.ctl.actionManager[nativeFunction]({
        id,
        type: '4',
        action: 'play',
        from: 0,
        href: '',
        data: {}
    })
}