import store from '../globalState/vuex-store'

export abstract class HotKeyState {
    abstract enterGame(): HotKeyState;
    abstract exitGame(): HotKeyState;
    abstract pressEnter(): HotKeyState;
    abstract pressEscape(): HotKeyState;
    abstract pressF10(): HotKeyState;
    abstract pressF12(): HotKeyState;

    public keysActivated() {
        return this.constructor.name === "InGameState";
    }

    public toggle(): HotKeyState {
        if (!this.keysActivated()) {
            console.log("turn on HotKeys manually")
            return new InGameState();
        }

        console.log("turn Off HotKeys manually")
        return new NotInGameState();
    }
}

export class InChatState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return new InGameState();
    }

    pressEscape(): HotKeyState {
        return new InGameState();
    }

    pressF10(): HotKeyState {
        return this;
    }

    pressF12(): HotKeyState {
        return this;
    }
}

class InGameMenuState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return this;
    }

    pressEscape(): HotKeyState {
        return new InGameState();
    }

    pressF10(): HotKeyState {
        return new InGameState();
    }

    pressF12(): HotKeyState {
        return this;
    }
}

class InChatLogState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return new InGameState();
    }

    pressEscape(): HotKeyState {
        return new InGameState();
    }

    pressF10(): HotKeyState {
        return this;
    }

    pressF12(): HotKeyState {
        return new InGameState();
    }
}

export class InGameState extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.enableHotKeys();
    }

    enterGame(): HotKeyState {
        return this;
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }

    pressEnter(): HotKeyState {
        return new InChatState();
    }

    pressEscape(): HotKeyState {
        return this;
    }

    pressF10(): HotKeyState {
        return new InGameMenuState();
    }

    pressF12(): HotKeyState {
        return new InChatLogState();
    }
}

export class NotInGameState extends HotKeyState {
    constructor() {
        super();
        if (store) {
            store.dispatch.hotKeys.disbleHotKeys();
        }
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return this;
    }

    pressEnter(): HotKeyState {
        return this;
    }

    pressEscape(): HotKeyState {
        return this;
    }

    pressF10(): HotKeyState {
        return this;
    }

    pressF12(): HotKeyState {
        return this;
    }
}

