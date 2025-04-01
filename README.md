# VSCode Input Method Switcher

<img src="./icon.png" alt="VSCode Input Method Switcher icon" width="128" height="128">

A simple yet practical VSCode extension that automatically switches to English input method when VSCode window gains focus.

[中文](./README.zh-CN.md)

## Features

- **Automatic Input Method Switching**: Automatically switches to English input method when you switch from other applications to VSCode
- **Activation on Startup**: Also switches input method when VSCode starts and gains focus
- **Highly Configurable**: Customizable input method identifier and command paths
- **Lightweight and Efficient**: Performs only a single task with minimal system resource usage

## Prerequisites

This extension depends on the [im-select](https://github.com/daipeihust/im-select) tool, which you need to install first:

### macOS

```bash
brew install im-select
```

### Windows

Download [im-select](https://github.com/daipeihust/im-select) and add it to your system PATH.

## Configuration Guide

1. After installing the extension, open VSCode settings (press `Ctrl+,` or `Cmd+,`)
2. Search for "imSwitch" to find the extension settings
3. Configure the following options:

- `imSwitch.englishIME`: **(Required)** The identifier for your English input method
  - macOS example: `com.apple.keylayout.ABC` or `com.apple.keylayout.US`
  - Windows example: `1033` (US English)
- `imSwitch.obtainIMCmd`: Command to get the current input method (default: `im-select`)
- `imSwitch.switchIMCmd`: Command to switch input method (default: `im-select {im}`)
- `imSwitch.debugLog`: Enable debug logging (default: `false`)

### Finding Your Input Method Identifier

To find the correct input method identifier:

1. Switch to English input method
2. Open terminal or command prompt
3. Run the `im-select` command
4. Copy the output value as your `imSwitch.englishIME` setting

### settings.json Example

```json
{
  "imSwitch.englishIME": "com.apple.keylayout.ABC",
  "imSwitch.obtainIMCmd": "/opt/homebrew/bin/im-select",
  "imSwitch.switchIMCmd": "/opt/homebrew/bin/im-select {im}",
  "imSwitch.debugLog": false
}
```

## Troubleshooting

If the extension isn't working correctly:

1. Confirm that im-select is properly installed and runnable from terminal
2. Enable debug logging: set `imSwitch.debugLog` to `true`
3. Check the output panel (View > Output, select "IM Switcher")
4. Ensure your `englishIME` setting value is correct
5. If using custom paths, make sure the command paths are accurate

## Usage Tips

- This extension runs automatically in the background and doesn't require manual triggering
- It only switches when the current input method is not English, avoiding unnecessary operations
- If you frequently switch between multiple applications, this extension can significantly improve your input efficiency

## Important Note

This extension only changes the input method state when VSCode gains focus, it doesn't interfere with input method settings in other applications.

## License

MIT

## Contribution

Issues and Pull Requests to improve this extension are welcome!
