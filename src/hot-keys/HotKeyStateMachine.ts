export abstract class HotKeyState {
    abstract enterGame(): HotKeyState;
    abstract exitGame(): HotKeyState;
    abstract toggle(): HotKeyState;
    public keysActivated() {
        return this.constructor.name === "InGameState";
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
        return new NotInGameState();
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
        return new InGameState();
    }
}

