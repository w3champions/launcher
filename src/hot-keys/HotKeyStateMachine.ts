import store from '../globalState/vuex-store'

export abstract class HotKeyState {
    abstract enterGame(): HotKeyState;
    abstract exitGame(): HotKeyState;
    abstract toggle(): HotKeyState;
    abstract pressEnter(): HotKeyState;
    abstract pressEscape(): HotKeyState;
    public keysActivated() {
        return this.constructor.name === "InGameState";
    }
}

export class InChatState extends HotKeyState {
    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    toggle(): HotKeyState {
        return this;
    }

    pressEnter(): HotKeyState {
        store.dispatch.hotKeys.activateHotKeys();
        return new InGameState();
    }

    pressEscape(): HotKeyState {
        store.dispatch.hotKeys.activateHotKeys();
        return new InGameState();
    }
}

export class InGameState extends HotKeyState {
    enterGame(): HotKeyState {
        return this;
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    toggle(): HotKeyState {
        console.log("turn Off HotKeys manually")
        store.dispatch.hotKeys.disbleHotKeys();
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        store.dispatch.hotKeys.disbleHotKeys();
        return new InChatState();
    }

    pressEscape(): HotKeyState {
        return this;
    }
}

export class NotInGameState extends HotKeyState {
    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return this;
    }

    toggle(): HotKeyState {
        console.log("turn On HotKeys manually")
        store.dispatch.hotKeys.activateHotKeys();
        return new InGameState();
    }

    pressEnter(): HotKeyState {
        return this;
    }

    pressEscape(): HotKeyState {
        return this;
    }
}

