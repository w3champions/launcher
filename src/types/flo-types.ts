export interface IFloNodeNetworkInfo {
    id: number;
    address: string;
    port: number;
    proxies: IFloNodeProxy[];
}

export interface IFloNodeProxy {
    id: string;
    nodeId: number;
    isDns: boolean;
    port: number;
    address: string;
}

export interface INetworkTestResult {
    avgPing: number;
    packetLoss: number;
}

export interface IFloNodeProxyNetworkTestResult extends INetworkTestResult {
    proxyId: string;
}

export interface IFloNodeNetworkTestResult extends INetworkTestResult {
    nodeId: number;
    proxyResults: IFloNodeProxyNetworkTestResult[];
}

export interface IFloNetworkTest {
    nodesPingTests: IFloNodeNetworkTestResult[];
    date: Date;
    duration: number;
    isComplete: boolean;
}