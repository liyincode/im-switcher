import * as vscode from 'vscode';
import { exec } from 'child_process';

let outputChannel: vscode.OutputChannel;
let englishIMEIdentifier: string | undefined = undefined;
let obtainIMCommand: string | undefined = undefined;
let switchIMCommand: string | undefined = undefined;
let enableDebugLog = false;

// 记录函数
function log(message: string) {
    if (enableDebugLog && outputChannel) {
        outputChannel.appendLine(`[IMSwitch] ${message}`);
    }
}

// 执行输入法命令
function runImSelect(arg?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let command: string;
        
        if (!arg) {
            // 获取当前输入法
            command = obtainIMCommand || 'im-select';
        } else {
            // 切换输入法
            if (switchIMCommand) {
                // 替换 {im} 占位符
                command = switchIMCommand.replace('{im}', arg);
            } else {
                command = `im-select ${arg}`;
            }
        }
        
        log(`Executing: ${command}`);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                log(`Error executing command: ${error.message}`);
                if (error.message.includes('command not found') || (error as any).code === 127) {
                    vscode.window.showErrorMessage(`Command not found. Please ensure the input method command is installed and in your system PATH.`);
                } else {
                    vscode.window.showErrorMessage(`Failed to run command: ${error.message}. Check Output channel.`);
                }
                reject(error);
            } else if (stderr) {
                log(`Command stderr: ${stderr}`);
                resolve(stdout.trim());
            } else {
                const result = stdout.trim();
                log(`Command result: ${result}`);
                resolve(result);
            }
        });
    });
}

// 切换输入法
async function switchToEnglishIME() {
    if (!englishIMEIdentifier) {
        log("Switch attempt skipped: englishIMEIdentifier is not set.");
        return;
    }
    
    try {
        // 获取当前输入法，避免不必要的切换
        const currentIME = await runImSelect();
        if (currentIME === englishIMEIdentifier) {
            log(`Switch skipped: Already using ${englishIMEIdentifier}`);
            return;
        }
        
        log(`Switching IME to: ${englishIMEIdentifier}`);
        await runImSelect(englishIMEIdentifier);
    } catch (error) {
        log(`Failed to switch IME to ${englishIMEIdentifier}: ${error}`);
    }
}

// 加载配置
function loadConfig() {
    const config = vscode.workspace.getConfiguration('imSwitch');
    enableDebugLog = config.get<boolean>('debugLog', false);
    
    // 只从自身配置中获取
    englishIMEIdentifier = config.get<string>('englishIME');
    obtainIMCommand = config.get<string>('obtainIMCmd');
    switchIMCommand = config.get<string>('switchIMCmd');

    if (!englishIMEIdentifier) {
        vscode.window.showWarningMessage('IM Switcher: English IME identifier is not set. Please configure "imSwitch.englishIME" in your settings.');
        log("Configuration incomplete: englishIMEIdentifier is missing.");
    } else {
        log(`Config loaded: English IME = ${englishIMEIdentifier}, obtainIMCmd = ${obtainIMCommand || 'default'}, switchIMCmd = ${switchIMCommand || 'default'}`);
    }
}

// 扩展激活函数
export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel("IM Switcher");
    log("Activating IM Switcher Extension.");

    // 加载初始配置
    loadConfig();
    
    // 配置变更时重新加载
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('imSwitch')) {
            log("Configuration changed, reloading...");
            loadConfig();
        }
    }));

    // 主要功能：VS Code 窗口获得焦点时切换到英文输入法
    context.subscriptions.push(vscode.window.onDidChangeWindowState(async (state) => {
        log(`Window focus changed: focused = ${state.focused}`);
        if (state.focused && englishIMEIdentifier) {
            await switchToEnglishIME();
        }
    }));

    // 初次启动时如果窗口已有焦点，也执行切换
    if (vscode.window.state.focused && englishIMEIdentifier) {
        log("Window initially focused, performing initial IME switch.");
        switchToEnglishIME();
    }
}

// 扩展释放函数
export function deactivate() {
    log("Deactivating IM Switcher.");
    if (outputChannel) {
        outputChannel.dispose();
    }
}
