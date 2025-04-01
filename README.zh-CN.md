# VSCode Input Method Switcher

<p>   
<a href="https://marketplace.visualstudio.com/items?itemName=liyincode.im-switcher"><img src="https://img.shields.io/visual-studio-marketplace/v/liyincode.im-switcher?labelColor=18181B&color=1584FC" alt="Version"></a>  
<a href="https://marketplace.visualstudio.com/items?itemName=liyincode.im-switcher"><img src="https://img.shields.io/visual-studio-marketplace/i/liyincode.im-switcher?labelColor=18181B&color=1584FC" alt="Downloads"></a> 
  <a href="https://github.com/liyincode/im-switcher/blob/main/LICENSE"><img src="https://img.shields.io/github/license/liyincode/im-switcher?labelColor=18181B&color=1584FC" alt="License"></a> 
  </p>

一个简单而实用的 VSCode 扩展，自动在 VSCode 窗口获得焦点时切换到英文输入法。

[English](./README.md)

## 功能特点

- **自动切换输入法**: 当你从其他应用程序切换到 VSCode 时，自动切换到英文输入法
- **启动时激活**: VSCode 启动并获得焦点时，也会自动切换输入法
- **高度可配置**: 可自定义输入法标识符和命令路径
- **轻量高效**: 只执行单一任务，对系统资源占用极小

## 安装前提

此扩展依赖于 [im-select](https://github.com/daipeihust/im-select) 工具，你需要先安装它：

### macOS

```bash
brew install im-select
```

### Windows

下载 [im-select](https://github.com/daipeihust/im-select) 并将其添加到系统 PATH 中。

## 配置指南

1. 安装扩展后，打开 VSCode 设置 (按下 `Ctrl+,` 或 `Cmd+,`)
2. 搜索 "imSwitch" 找到扩展设置
3. 配置以下选项：

- `imSwitch.englishIME`: **（必填）** 英文输入法的标识符
  - macOS 示例: `com.apple.keylayout.ABC` 或 `com.apple.keylayout.US`
  - Windows 示例: `1033` (美式英语)
- `imSwitch.obtainIMCmd`: 获取当前输入法的命令 (默认: `im-select`)
- `imSwitch.switchIMCmd`: 切换输入法的命令 (默认: `im-select {im}`)
- `imSwitch.debugLog`: 启用调试日志 (默认: `false`)

### 获取输入法标识符

要找到正确的输入法标识符：

1. 切换到英文输入法
2. 打开终端或命令提示符
3. 运行 `im-select` 命令
4. 复制输出的值作为 `imSwitch.englishIME` 设置

### settings.json 示例

```json
{
  "imSwitch.englishIME": "com.apple.keylayout.ABC",
  "imSwitch.obtainIMCmd": "/opt/homebrew/bin/im-select",
  "imSwitch.switchIMCmd": "/opt/homebrew/bin/im-select {im}",
  "imSwitch.debugLog": false
}
```

## 故障排查

如果扩展不能正常工作：

1. 确认 im-select 已正确安装且可在终端中运行
2. 开启调试日志: 设置 `imSwitch.debugLog` 为 `true`
3. 检查输出面板 (View > Output，选择 "IM Switcher")
4. 确保 `englishIME` 设置值正确
5. 如果使用自定义路径，确保命令路径准确无误

## 使用技巧

- 此扩展不需要手动触发，它会自动在后台运行
- 只有当前输入法不是英文时才会切换，避免不必要的操作
- 如果你经常在多个应用间切换，此扩展可有效提高输入效率

## 重要说明

此扩展只改变 VSCode 获得焦点时的输入法状态，不会干扰其他应用的输入法设置。

## 许可证

MIT

## 贡献

欢迎提交 Issues 和 Pull Requests 来改进此扩展！
