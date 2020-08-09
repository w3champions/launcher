export abstract class HotKeyState {
    abstract enterGame(): HotKeyState;
    abstract exitGame(): HotKeyState;
    abstract enter(): HotKeyState;
    abstract escape(): HotKeyState;
    abstract reset(): HotKeyState;
}

export class InChatState extends HotKeyState {
    enter(): HotKeyState {
        return new NotInGameState();
    }

    escape(): HotKeyState {
        return new InGameState();
    }

    enterGame(): HotKeyState {
        return this;
    }

    reset(): HotKeyState {
        return new InGameState();
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }
}

export class InGameState extends HotKeyState {
    enter(): HotKeyState {
        return new InChatState();
    }

    escape(): HotKeyState {
        return this;
    }

    enterGame(): HotKeyState {
        return this;
    }

    reset(): HotKeyState {
        return this;
    }

    exitGame(): HotKeyState {
        return new NotInGameState();
    }
}

export class NotInGameState extends HotKeyState {
    enter(): HotKeyState {
        return this;
    }

    escape(): HotKeyState {
        return this;
    }

    enterGame(): HotKeyState {
        return new InGameState();
    }

    reset(): HotKeyState {
        return this;
    }

    exitGame(): HotKeyState {
        return this;
    }
}

