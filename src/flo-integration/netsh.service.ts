import logger from "@/logger";

const { exec } = window.require("child_process");

interface IExecCommandResult {
    stdOut: string;
    stdErr: string;
}

export interface IFirewallRule {
    name: string;
    enabled: string;
    direction: string;
    protocol: string;
    action: string;
}

class NetshService {
    public async getInboundRules() {
        try {
            const cmdResult = await this.execCommand(`netsh advfirewall firewall show rule name=all dir=in`);
            const parsed = this.parseFirewallRulesResult(cmdResult.stdOut);
            return parsed || [];
        }
        catch (e) {
            logger.error(e);
        }

        return [];
    }

    public async addRule(name: string, programPath: string) {
        const cmdResult = await this.execCommand(`netsh advfirewall firewall add rule name="${name}" dir=in action=allow program="${programPath}" enable=yes`);
    }

    public async deleteRule(name: string) {
        const cmdResult = await this.execCommand(`netsh advfirewall firewall delete rule name="${name}"`);
        debugger
    }

    public isRuleEnabled(rule: IFirewallRule) {
        return rule.enabled.toLowerCase() == 'yes' && rule.action.toLowerCase() == 'allow';
    }

    private execCommand(cmd: string) {
        return new Promise<IExecCommandResult>(function(resolve, reject){
            exec(cmd, function(err: any, stdOut: any, stdErr: any) {
                if (err) {
                debugger 

                    reject(err);
                    return;
                }

                const result: IExecCommandResult = {
                    stdOut,
                    stdErr
                };

                resolve(result);
            });
        });
    }

    private parseFirewallRulesResult(data: string) {
        const splitByLines = data.split('\n');
        const result: IFirewallRule[] = [];

        let current: IFirewallRule | undefined = undefined;
        for (const lineOfText of splitByLines) {
            const line = lineOfText?.trim();
            if (this.isLineField(line, 'Rule Name')) {
                current = this.createDefaultFirewallRuleResult();
                current.name = this.getFieldValueFromLine(line);
                result.push(current);
            }
            else if (this.isLineField(line, 'Enabled')) {
                const enabled = this.getFieldValueFromLine(line);
                if (current) {
                    current.enabled = this.getFieldValueFromLine(line);
                }
            }
            else if (this.isLineField(line, 'Protocol')) {
                if (current) {
                    current.protocol = this.getFieldValueFromLine(line);
                }
            }
            else if (this.isLineField(line, 'Action')) {
                if (current) {
                    current.action = this.getFieldValueFromLine(line);
                }
            }
            else if (this.isLineField(line, 'Direction')) {
                if (current) {
                    current.direction = this.getFieldValueFromLine(line);
                }
            }
        }

        return result;
    }

    private createDefaultFirewallRuleResult() {
       const result: IFirewallRule = {
            name: '',
            enabled: '',
            action: '',
            direction: '',
            protocol: ''
        } 

        return result;
    }

    private isLineField(line: string, field: string) {
        if (line && line.toLowerCase().startsWith(field.toLowerCase())) {
            return true;
        }

        return false;
    }

    private getFieldValueFromLine(line: string) {
        if (!line) {
            return '';
        }

        const columnIndex = line.indexOf(':');

        if (columnIndex != -1){
            const afterColumnString = line.substr(columnIndex + 1);
            const nonWhiteSpaceIndex = afterColumnString.search(/\S/);
            return afterColumnString.substr(nonWhiteSpaceIndex);
        }

        return '';
    }
}

export const netshService = new NetshService();