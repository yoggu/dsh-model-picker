# dsh-model-picker

Searchable DSH Web composer model picker with a **Plugins → Model Picker** page to hide, pin and reorder models, set a persistent default reasoning effort per model, and refresh provider catalogs. Per-model effort defaults are applied whenever you select that model in a session. This plugin does not set the default model for newly created sessions; configure that separately in DSH's `agent-default-model` plugin settings.

## Requirements

DSH 0.1.7 or newer, the `web` profile, and Node.js `^22.19.0` or `>=24.0.0` for source development.

## Install

Install the tagged GitHub release into your DSH Web profile:

```sh
dsh plugin --profile web add 'https://github.com/yoggu/dsh-model-picker.git#v0.1.0'
```

Or download the source and link the local checkout. Install its dependencies first; a linked package resolves them from its own directory:

```sh
git clone --branch v0.1.0 --depth 1 https://github.com/yoggu/dsh-model-picker.git
cd dsh-model-picker
pnpm install
dsh plugin --profile web add "link:$(pwd)"
```

Keep a linked checkout in place while the plugin is installed. Use the profile you actually run if it is not `web`.

Restart DSH Web if necessary and reload the page. Open **Plugins → Model Picker** to curate the available models. Configure model providers and credentials in DSH separately; this plugin does not supply them.

To uninstall: `dsh plugin --profile web remove dsh-model-picker`.

## Provider refresh

**Refresh providers** reloads DSH's catalog and can query the configured `baseURL` of active providers for model IDs. It can append discovered models to those providers' settings; review provider endpoints before invoking it. It does not create providers, credentials or inference routes. Models only appear in the composer when the running DSH session catalog serves them. Refresh can warn that a provider requires a DSH restart.

## Development

```sh
pnpm install
pnpm test
```

Tests use mocked services and do not query live providers.

## License

MIT; see [LICENSE](LICENSE).
