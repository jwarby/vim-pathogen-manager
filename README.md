# Vim Pathogen Manager
> A CLI utility for managing Vim Pathogen plugins

## Installation

Install globally using `npm`:

```bash
npm install -g jwarby/vim-pathogen-manager
```

After installation, you should have the command `vpm` available:

```bash
which vpm
```

## Usage

Use `-h`/`--help` to output usage and help information.

### `vpm install <plugin>`

Installs a plugin. `<plugin>` can be a GitHub username/repository combination,
or the path to a directory on the local disk.  For local installs, a symlink
will be created (behaving in a similar way to [npm's link command](https://docs.npmjs.com/cli/link)).

#### Examples

```bash
# Install syntastic from GitHub
vpm install vim-syntastic/syntastic

# Install a plugin from local disk
vpm install $HOME/vim-my-wip-plugin
```

### `vpm remove <plugin>`

Removes a plugin.  If the specified plugin is installed locally with a symlink
(see `install` above), the symlink is removed; otherwise, the plugin directory
is removed entirely.

#### Examples

```bash
# Remove synatstic plugin
vpm remove syntastic

# Remove local plugin
vpm remove vim-my-wip-plugin
```

### `vpm update <?plugin>`

Updates all plugins, or a single plugin.

#### Examples

```bash
# Update syntastic plugin
vpm update syntastic

# Updates all plugins
vpm update
```

### `vpm list`

Lists all installed plugins.

```bash
# List installed plugins
vpm list
```

## Requirements

- Git must already be installed on the target machine

## Roadmap

- [ ] Implement search command (GitHub API?)
- [ ] Offer to install plugin if user tries to update a non-installed plugin
- [ ] Offer to update a plugin if user tries to install already installed plugin
- [ ] Improve `update` command output/UI
- [ ] Improve `list` command output - included version/author/etc
- [ ] Abstract actual repository management code into separate package
