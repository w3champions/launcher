jest.mock('@/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
}));

jest.mock('@/game/ingame-bridge', () => ({
    ingameBridge: {
        sendFloConnected: jest.fn(),
        sendFloDisconnected: jest.fn(),
        sendPingUpdates: jest.fn(),
        sendWatchGameError: jest.fn(),
        sendWatchGameSuccess: jest.fn(),
    },
}));

function installWindowRequire() {
    (window as any).require = (moduleName: string) => {
        if (moduleName === 'electron') {
            return {
                globalShortcut: {
                    register: jest.fn(),
                    unregister: jest.fn(),
                }
            };
        }

        return require(moduleName);
    };
}

describe('FloWorkerInstance', () => {
    beforeEach(() => {
        jest.resetModules();
        installWindowRequire();
    });

    test('clears stale in-game state on game exit so the worker can stop', () => {
        const { FloWorkerInstance } = require('@/flo-integration/flo-worker.instance');
        const worker = new FloWorkerInstance({
            floWorkerFolderPath: '',
            floWorkerExePath: '',
            wc3FolderPath: '',
            floControllerHostUrl: 'mock-controller',
            ptr: false,
        });
        const close = jest.fn();
        const kill = jest.fn();

        (worker as any).playerSession = {
            type: 'PlayerSession',
            player: { id: 1, name: 'Tester' },
            status: 'InGame',
            game_id: 1,
        };
        (worker as any).floWorkerWs = {
            readyState: WebSocket.OPEN,
            close,
        };
        (worker as any).floWorkerProcess = {
            kill,
        };
        (worker as any).isWorkerStarted = true;

        worker.gameExited();
        worker.stopWorker();

        expect(close).toHaveBeenCalled();
        expect(kill).toHaveBeenCalled();
    });
});
