# Publish WeChat Miniprogram

This action builds your miniprogram project and upload it.

# Usage

<!-- start usage -->
```yaml
- uses: takashiro/publish-wechat-miniprogram@v1
  with:
    # The root directory of miniprogram project, where project.config.json exists.
    # Default: '.'
    project-path: '.'

    # Private key used to upload your miniprogram.
    # This must be generated from WeChat Platform with your administrator account.
    upload-key: ''
```
<!-- end usage -->

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
