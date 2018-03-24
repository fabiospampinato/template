
/* IMPORT */

import * as _ from 'lodash';
import * as absolute from 'absolute';
import ask from 'inquirer-helpers';
import * as del from 'del';
import * as handlebars from 'handlebars';
import * as finder from 'fs-finder';
import * as fs from 'fs';
import * as isDirectory from 'is-directory';
import * as isUrl from 'is-url';
import * as loadJSON from 'load-json-file';
import * as multimatch from 'multimatch';
import * as path from 'path';
import Config from './config';
import * as Helpers from './helpers';
import * as Middlewares from './middlewares';

/* UTILS */

const Utils = {

  async loadJSON ( path, fallback = {} ) {

    try {

      return await loadJSON ( path );

    } catch ( e ) {

      return fallback;

    }

  },

  delete ( path ) {

    return del ( path, { force: true } );

  },

  exists ( path ) {

    try {
      fs.accessSync ( path );
      return true;
    } catch ( e ) {
      return false;
    }

  },

  repository: {

    getEndpoint ( repository: string ) {

      if ( isUrl ( repository ) ) {

        /* GIT ENDPOINT */

        if ( repository.match ( /\.git$/ ) ) return repository;

        /* GITHUB REPOSITORY */

        const repo = repository.match ( /.+github\.com\/([^\s\/.]+)\/([^\s\/#]+)(?:$|\/|#)/ );

        if ( repo ) return `https://github.com/${repo[1]}/${repo[2]}.git`;

      } else {

        /* GITHUB SHORTHAND */

        const shorthand = repository.match ( /^([^\s\/.]+)\/([^\s\/]+)$/ );

        if ( shorthand ) return `https://github.com/${shorthand[1]}/${shorthand[2]}.git`;

        /* PATH */

        if ( absolute ( repository ) ) {

          if ( isDirectory.sync ( repository ) ) return repository;

        } else {

          const fullPath = path.join ( process.cwd (), repository );

          if ( isDirectory.sync ( fullPath ) ) return fullPath;

        }

      }

      return;

    }

  },

  templates: {

    getPaths () {

      return _.sortBy ( finder.in ( Config.directory ).findDirectories (), [p => p.toLowerCase ()] ) as string[];

    },

    getNames () {

      const paths = Utils.templates.getPaths ();

      return paths.map ( p => path.basename ( p ) );

    }

  },

  template: {

    getPath ( name, checkExistence = false ) {

      const templatePath = path.join ( Config.directory, name );

      return checkExistence ? isDirectory.sync ( templatePath ) && templatePath : templatePath;

    },

    guessName ( endpoint: string ) {

      const lastPart = _.last ( endpoint.split ( '/' ) );

      if ( !lastPart ) return;

      return lastPart.trim ()
                     .replace ( /^template-/, '' )
                     .replace ( /\.git$/, '' );

    },

    isFileSkipped ( filepath, globs ) {

      return globs && !multimatch ( filepath, globs, { dot: true } ).length;

    }

  },

  prompt: {

    command () {

      const commands = ['create', 'list', 'install', 'uninstall', 'update'];

      return ask.list ( 'What command to you want to execute?', commands );

    },

    template () {

      const templates = Utils.templates.getNames ();

      return ask.list ( 'What template to you want to use?', templates );

    }

  },

  handlebars: {

    useHelpers () {

      handlebars.registerHelper ({
        eval: Helpers.eval,
        _: Helpers.lodash
      });

    },

    getSchema ( template ) {

      const body = _.isString ( template ) ? handlebars.parse ( template ).body : template,
            schema = {},
            schemaTypes = {
              BlockStatement: 'confirm',
              MustacheStatement: 'input'
            };

      body.forEach ( obj => {

        const {type, params, path, program} = obj,
              schemaType = schemaTypes[type],
              objSchema = { type: schemaType };

        if ( !schemaType ) return;

        if ( params.length ) {

          params.forEach ( param => {

            const {type, parts} = param;

            if ( type !== 'PathExpression' ) return;

            schema[parts.join ( '.' )] = objSchema;

          });

        } else if ( path ) {

          schema[path.parts.join ( '.' )] = objSchema;

        }

        if ( obj.hash ) {

          obj.hash.pairs.forEach ( pair => {

            const {original} = pair.value;

            if ( !_.isString ( original ) || !original.match ( /[^\s;.]+/) ) return;

            schema[original] = objSchema;

          });

        }

        if ( program ) {

          _.extend ( schema, Utils.handlebars.getSchema ( program.body ) );

        }

      });

      return schema;

    }

  },

  metalsmith: {

    useMiddlewares ( metalsmith ) {

      metalsmith.use ( Middlewares.schema )
                .use ( Middlewares.prompt )
                .use ( Middlewares.render );

    }

  }

};

/* EXPORT */

export default Utils;
