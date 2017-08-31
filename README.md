# Template

A super-simple way to create new projects based on templates.

## Install

```shell
$ npm install -g @fabiospampinato/template
```

## Documentation

- [Template](https://github.com/fabiospampinato/template/blob/master/docs/template): What's a template and how to make one.
- [Schema](https://github.com/fabiospampinato/template/blob/master/docs/schema): What's a schema and how to use it to improve your templates.
- [API](https://github.com/fabiospampinato/template/blob/master/docs/api): How to use the API.
- [CLI](https://github.com/fabiospampinato/template/blob/master/docs/cli): How to use the CLI.

## Usage

First of all you've got to install a template, for example let's install [fabiospampinato/template-typescript-package](//TODO):

```shell
$ template install fabiospampinato/template-typescript-package typescript-package
```

Now you should have that downloaded locally under your `~/.template` directory. You may also put templates there manually, if you don't feel like creating an online repository for them.

It's time to use the newly installed template to create a new project:

```shell
$ template create typescript-package my-package
```

Now it will ask you to provide values for the placeholders found inside the template:

```shell
//TODO
         name: ware
        owner: segmentio
  description: Easily create your own middleware layer.
```

And that's it, inside the `my-package` directory you'll have everything you need to get you started.

## How it works

This program simply takes a folder containing some files as input, those files are parsed using [handlebars](//TODO), and then just outputted to your desired folder. The file structure inside the template folder is left untouched.

Read more about templates [here](https://github.com/fabiospampinato/template/blob/master/docs/template).

## License

MIT © Fabio Spampinato
