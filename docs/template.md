
# Template

A template is what this program uses to generate new projects.

## File Structure

Let's take as an example the [fabiospampinato/template-typescript-package](https://github.com/fabiospampinato/template-typescript-package) template, it's file structure looks like this:

```
.
├── template
│   └── <anything>
├── template.json
├── LICENSE.md
└── README.md
```

The `template` folder is the actual template that will be used. This program simply copies all files inside it, parses them using [handlebars](http://handlebarsjs.com) and then outputs them to your `project` directory. The file structure inside the template is left untouched.

## Handlebars

Every non-binary file inside the template will be processed by [handlebars](http://handlebarsjs.com), which means you can put placeholders, if/else blocks, and everything else supported by handlebars, in them, anywhere you like.

For instance if you have a file that looks like this:

```js
{
  "name": "{{name}}",
  "description": "{{description}}"
}
```

The program will notice that you have defined 2 placeholders, `name` and `description`. It will ask you to provide values for them and then it will create this new file:

```js
{
  "name": "The name I provided",
  "description": "The description I provided"
}
```

It's that simple!

## Custom Helpers

We provide a couple of custom handlebars helpers that you will find useful:

### lodash

You can call any of [lodash](https://lodash.com/docs)'s functions inside your template, this is particularly useful when you want to change the case of variables. For instance you may define a file that looks like this:

```js
/* {{_ "upperCase" name}} */
import {{_ "camleCase" name}} from '{{name}}';
```

And, provided `my-package` as `name`, it will be saved as:

```js
/* MY PACKAGE */
import myPackage from 'my-package';
```

### eval

Using this helper you can insert the result of arbitrary javascript code inside a placeholder. For instance this is useful when you want to insert a date inside your templates:

```md
Copyright (c) {{eval "new Date ().getFullYear ()"}}
```

Will be saved as:

```md
Copyright (c) 2017
```

Given that the current year is 2017, of course :)

## Schema

You may enhance a template with a [schema](https://github.com/fabiospampinato/template/blob/master/docs/schema.md), learn more about it.

## More Templates

You can find a list of available templates in the [awesome-template](https://github.com/fabiospampinato/awesome-template) repository. If you create a new template, it would be awesome if you could publish it to GitHub and add a link to it in that repository, so that anyone can use it.
