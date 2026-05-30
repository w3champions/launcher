import fs from 'fs';
import os from 'os';
import path from 'path';

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

function createMockFloWorker() {
    const workerDir = fs.mkdtempSync(path.join(os.tmpdir(), 'flo-worker-'));
    const workerPath = path.join(workerDir, 'flo-worker');
    const wsModulePath = require.resolve('ws');

    fs.writeFileSync(workerPath, `#!/usr/bin/env node
const WebSocket = require(${JSON.stringify(wsModulePath)});
const wss = new WebSocket.Server({ port: 0 }, () => {
  const startup = JSON.stringify({ version: "mock-worker", port: wss.address().port });
  process.stdout.write(startup.slice(0, 12));
  setTimeout(() => process.stdout.write(startup.slice(12) + "\\n"), 20);
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    if (message.type === "Connect") {
      ws.send(JSON.stringify({
        type: "PlayerSession",
        player: { id: 1, name: "Tester" },
        status: "Idle",
        game_id: 1
      }));
    }
  });
});

process.on("SIGTERM", () => {
  wss.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 100);
});
`, { mode: 0o755 });

    return { workerDir, workerPath };
}

async function waitFor(expectation: () => void) {
    const startedAt = Date.now();
    let lastError: unknown;

    while (Date.now() - startedAt < 1000) {
        try {
            expectation();
            return;
        }
        catch (e) {
            lastError = e;
            await new Promise((resolve) => setTimeout(resolve, 25));
        }
    }

    throw lastError;
}

describe('FloWorkerInstance', () => {
    const testOnUnix = process.platform === 'win32' ? test.skip : test;

    beforeEach(() => {
        jest.resetModules();
        installWindowRequire();
    });

    testOnUnix('starts from split stdout startup data and connects through the local worker websocket', async () => {
        const { workerDir, workerPath } = createMockFloWorker();
        const { ingameBridge } = require('@/game/ingame-bridge');
        const { FloWorkerInstance } = require('@/flo-integration/flo-worker.instance');
        const worker = new FloWorkerInstance({
            floWorkerFolderPath: workerDir,
            floWorkerExePath: workerPath,
            wc3FolderPath: workerDir,
            floControllerHostUrl: 'mock-controller',
            ptr: false,
        });

        const playerInstance = {
            player: {
                battleTag: 'Tester#123',
                toonName: 'Tester',
                gateway: 20,
                gatewayPing: 0,
            },
            readyState: WebSocket.OPEN,
            sendMessage: jest.fn(),
            isDisconnected: jest.fn(() => false),
        };

        try {
            await worker.connect(playerInstance as any, {
                token: 'mock-token',
                nodeOverrides: [],
            });

            await waitFor(() => {
                expect(ingameBridge.sendFloConnected).toHaveBeenCalledWith(playerInstance, 'mock-worker');
            });
        }
        finally {
            worker.stopWorker();
            await new Promise((resolve) => setTimeout(resolve, 100));
            fs.rmSync(workerDir, { recursive: true, force: true });
        }
    });
});
