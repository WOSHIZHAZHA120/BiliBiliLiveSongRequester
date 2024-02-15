declare global {
    const ctl: {
        readonly actionManager: Record<string, unknown>
    }

    const legacyNativeCmder: {
        appendRegisterCall(event: string, module: string, callback: Function)
    }
}

export {}