
# API

You can use the provided API for creating new projects or listing/installing/uninstalling/updating templates.

## Usage

```js
import Template from '@fabiospampinato/template';
```

### `.create ( template: string, project: string )`

Create a project using the provided template, and write it to the destination path.

### `.list ()`

Get all the templates currently installed.

### `.install ( repository: string, template?: string )`

Install a template, given a git endpoint, a local path or a github shorthand.

### `.uninstall ( template?: string )`

Uninstall a template, given it's name.

### `.update ( template?: string )`

Updated a template, given it's name.
