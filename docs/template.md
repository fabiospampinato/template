
# Template

A template is what this program uses to generate new projects.

## File Structure

Let's take as an example the [fabiospampinato/template-typescript-package](//TODO) template, it's file structure is like this:

```
.
├── template
│   └── <anything>
├── LICENSE.md
└── README.md
```

It's basically just a folder with a `template` folder in it, that's the actual template that will be used. Anything else will just be ignored.

## Handlebars

Every file inside the `template` folder will be processed by [handlebars](//TODO), which means you can put placeholders, if/else blocks, and everything else supported by handlebars, in them, anywhere you like.

For instance if you have a file like this:

```js
{
  "name": "{{name}}",
  "description": "{{description}}"
}
```

The program will notice that you have 2 placeholders, `name` and `description`. It will ask you to provide values for them and then it will create this new file:

```js
{
  "name": "The name I provided",
  "description": "Some description"
}
```

## Custom Helpers

//TODO: eval, lodash

## Templates

You can find a list of templates you can use in the [awesome-template](//TODO) repository. If you create a new template, it would be awesome if you publish it to GitHub and add a link to it in that repository, so that anyone can use it.
