
<p align="center">
  <img src="resources/logo.png" width=500 alt="Logo">
</p>

A super-simple way to create new projects based on templates.

A list of known active templates for this program can be found [here](https://github.com/fabiospampinato/awesome-template).

## Install

```sh
npm install -g @fabiospampinato/template
```

## Usage

https://github.com/fabiospampinato/template/assets/1812093/4c53bf75-eb08-49c2-8b7f-8dae6dfa04eb

<details>
<summary>Overview</summary>

At a high level a template looks like this:

1. A template is just a folder installed locally simply by `git clone`-ing it into `~/.templates`, or you can copy it manually there.
2. Each template has a folder named "template" inside it, which is what will be used for creating projects.
3. Each template has a "template.json" file inside it, which lists all variables used by files inside the "template" folder.
4. Each template may optionally have a folder named "hooks" inside it, containing files that will be executed at the appropriate times.

When creating a project from a template this happens:

1. The user is asked to provide a value for each variable listed by the template inside its "template.json" file.
2. The entire "template" folder inside the template is duplicated.
3. Each non-binary file inside this folder is rendered with [`picolate`](https://github.com/fabiospampinato/picolate) using the provided variables.
4. All rendered and binary files are copied in a newly created folder that has the name of the project you want to create.
5. The postinstall hook, if present, is executed.
6. That's it.

</details>

<details>
<summary>Command Line Interface</summary>

The following commands are available:

```sh
# Show help for the entire program
template --help

# Show help for a specific command
template install --help

# List all installed templates
template ls

# CD into an installed template
template cd my-template

# Install a template using a custom git endpoint
template install https://gitlab.com/some-user/some-repo.git my-template

# Install a template using a GitHub url
template install https://github.com/fabiospampinato/template-typescript-package typescript-package

# Install a template using a GitHub shorthand
template install fabiospampinato/template-typescript-package typescript-package

# Install a template from a local path
template install ./work-in-progress-template wip-template

# Automatically update all templates backed by git
template update

# Automatically update a specific template
template update my-template

# Uninstall a template
template uninstall my-template

# Create a new project from a template
template new typescript-package my-package
```

</details>

<details>
<summary>Template Folder</summary>

As mentioned in the "Overview" section a template must have this structure on disk:

```
.
├── hooks (optional)
│   └── postinstall.js (optional)
├── template
│   └── <anything>
└── template.json
```

- You can put any files and folders you want under the "template" folder.
- Everything inside it will be copied when creating a new project from it, and non-binary files will be rendered with [`picolate`](https://github.com/fabiospampinato/picolate) before saving them to disk.
- Syntax highlighting for those files in your editor will probably be broken, but if you change the language to "Handlebars" it should look nice again.
- Hooks are optional, each of them must export a function, that this program will call at the right times. Inside hooks `process.cwd ()` will return the path of the new project.
- The following hooks are supported:
  - `postinstall.js`: it will be called right after a new project has been created. It will receive the object of variables used to render the project.

The "template.json" file should look somewhat like this:

```jsonc
{
  "delimiters": [ // This is optional
    "start": "[[",
    "end": "]]"
  ],
  "variables": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "version": {
      "type": "string",
      "default": "1.0.0"
    },
    "author": {
      "type": "string"
    },
    "owner": {
      "type": "string"
    },
    "scoped": {
      "type": "boolean"
    },
    "tested": {
      "type": "boolean"
    }
  }
}
```

- Custom template delimiters that [`picolate`](https://github.com/fabiospampinato/picolate) will use can be provided, if you need them.
- The user will be prompted to provide a value for each variable you list here.
- You should list every single variable referenced by any of your template files.
- A variable can either be of type "string" or of type "boolean".
- A variable can also provide a default value, to allow the user to use that value quickly just by pressing enter.

</details>

<details>
<summary>Template Overrides</summary>

As we saw in the "Templates Folder" section each template must provide a metadata "template.json" file, listing all the variables it uses, and optionally providing some default values for them.

There's also a way to override this metadata, by having a file at `~/.templates/templates.json` that looks like this:

```json
{
  "typescript-package": {
    "variables": {
      "author": {
        "default": "Fabio Spampinato"
      },
      "owner": {
        "default": "fabiospampinato"
      }
    }
  },
  "some-other-template": {
    "variables": {
      "someOtherVariable": {
        "default": "Some default value"
      }
    }
  }
}
```

This is very useful because:

- In order for a template to be usable by a wide range of people it makes no sense to specify for example a default value for the "author" variable.
- Still, once you install a template you probably know who the author is going to be, and you don't want to type out that informattion a million times, so this way you can override defaults for a template.

</details>

## License

MIT © Fabio Spampinato
