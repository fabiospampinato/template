
# Schema

A template can be enhanced by providing an optional schema.

## Template-specific Schema

Taking as an example the following file structure of our hypothetical template:

```
.
├── template
│   └── <anything>
└── template.json
```

The template-specific schema is the `template.json` file, and this is what it might look like:

```json
{
  "filter": ["**/*", "!**/*.html"],
  "variablesOrder": ["name", "description", "version", "author"],
  "variables": {
    "version": {
      "default": "1.0.0"
    }
  }
}
```

It defines:

- Some filtering globs, used for avoid parsing particular files with [handlebars](http://handlebarsjs.com).

- A fixed variables order, that's basically the order in which values for those variables will be asked for.

- A default value for the `version` variable.

Each variable maps to an object used by [inquirer](https://www.npmjs.com/package/inquirer#question) to prompt you for a value for that variable. You may define any other key used by inquirer, like a custom "message" string.

## Computer-specific Schema

Other than the aformentioned `template.json` file, which is template-specific, you may also define a computer-specific schema under `~/.template/template.json`.

This is what it might look like:

```json
{
  "templates": {
    "my-first-template": {
      "variables": {
        "author": {
          "default": "Fabio Spampinato"
        }
      }
    },
    "my-second-template": {
      "variables": {
        "npm-user": {
          "default": "fabiospampinato"
        }
      }
    }
  }
}
```

Basically if you are going to create a project based on the `my-first-template` template, it's template-specific schema will be merged with the one found inside this file.

The reasoning behind it is that template-specific schemas should be generic, they shouldn't have any hard-coded names or emails, but once you install them locally you can customize their default values,  by writing them inside your computer-specific schema. Doing this you won't have to type them everytime, while still making a general enough template that can be [shared](https://github.com/fabiospampinato/awesome-template) with others.

Default values can still be overwritten when creating a project.
