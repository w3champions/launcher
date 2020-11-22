import store from '../../globalState/vuex-store'
import logger from "@/logger";
const { ipcRenderer } = window.require('electron');

ipcRenderer.on('fab-clicks', () => {
    logger.info("received");
})

export abstract class HotKeyState {
    abstract enterGame(): HotKeyState;
    abstract exitGame(): HotKeyState;
    abstract pressEnter(): HotKeyState;
    abstract pressEscape(): HotKeyState;
    abstract pressF10(): HotKeyState;
    abstract pressF12(): HotKeyState;
    abstract toggleManualMode(): HotKeyState;
    abstract toggle(): HotKeyState;

    public isManual() {
        return this.constructor.name === ManualHotkeyMode.name;
    }

    protected turnOffHotkeys() {
        logger.info("turn Off HotKeys manually")
        ipcRenderer.send('fab-clicks-response', 'off');
        const audio = new Audio('/sound/PeonDeath.mp3');
        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.play();
        return new NotInGameState();
    }

    protected turnOnHotKeys() {
        const audio = new Audio('/sound/PeonReady1.mp3');
        ipcRenderer.send('fab-clicks-response', 'on');

        audio.currentTime = 0.3;
        audio.volume = 0.5;
        audio.play();


        logger.info("turn on HotKeys manually")
        return new InGameState();
    }
}

export class ChatState extends HotKeyState {
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

    toggleManualMode(): HotKeyState {
        return new ManualHotkeyMode();
    }

    toggle(): HotKeyState {
        return this.turnOnHotKeys();
    }
}

export class ManualHotkeyMode extends HotKeyState {
    constructor() {
        super();
        store.dispatch.hotKeys.disbleHotKeys();
    }

    public keysActivatedInManualMode = false;

    enterGame(): HotKeyState {
        store.dispatch.hotKeys.enableHotKeys();
        this.keysActivatedInManualMode = true;
        return this;
    }

    exitGame(): HotKeyState {
        store.dispatch.hotKeys.disbleHotKeys();
        this.keysActivatedInManualMode = false;
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

    toggleManualMode(): HotKeyState {
        return new NotInGameState();
    }

    toggle(): HotKeyState {
        if (this.keysActivatedInManualMode) {
            this.turnOffHotkeys()
            this.keysActivatedInManualMode = false;
        } else {
            this.turnOnHotKeys();
            this.keysActivatedInManualMode = true;
        }

        return this;
    }
}

class MenuState extends HotKeyState {
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

    toggleManualMode(): HotKeyState {
        return new ManualHotkeyMode();
    }

    toggle(): HotKeyState {
        return this.turnOnHotKeys();
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

    toggleManualMode(): HotKeyState {
        return new ManualHotkeyMode();
    }

    toggle(): HotKeyState {
        return this.turnOnHotKeys();
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
        return new ChatState();
    }

    pressEscape(): HotKeyState {
        return this;
    }

    pressF10(): HotKeyState {
        return new MenuState();
    }

    pressF12(): HotKeyState {
        return new InChatLogState();
    }

    toggleManualMode(): HotKeyState {
        return new ManualHotkeyMode();
    }

    toggle(): HotKeyState {
        return this.turnOffHotkeys();
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

    toggleManualMode(): HotKeyState {
        return new ManualHotkeyMode();
    }

    toggle(): HotKeyState {
        return this.turnOnHotKeys();
    }
}

