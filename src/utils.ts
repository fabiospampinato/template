
/* IMPORT */

import * as _ from 'lodash';
import * as absolute from 'absolute';
import * as handlebars from 'handlebars';
import * as finder from 'fs-finder';
import * as inquirer from 'inquirer';
import * as isDirectory from 'is-directory';
import * as isUrl from 'is-url';
import * as path from 'path';
import Config from './config';
import * as Helpers from './helpers';
import * as Middlewares from './middlewares';

/* UTILS */

const Utils = {

  useHelpers () {

    handlebars.registerHelper ( 'eval', Helpers.eval );
    handlebars.registerHelper ( '_', Helpers.lodash );

  },

  useMiddlewares ( metalsmith ) {

    metalsmith.use ( Middlewares.prompt );
    metalsmith.use ( Middlewares.render );

  },

  repository: {

    getEndpoint ( repository: string ) {

      if ( isUrl ( repository ) ) {

        /* GIT ENDPOINT */

        if ( repository.match ( /\.git$/ ) ) return repository;

        /* GITHUB REPOSITORY */

        const repo = repository.match ( /.+github\.com\/([^\s\/.]+)\/([^\s\/]+)(?:$|\/)/ );

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

      return finder.in ( Config.directory ).findDirectories ();

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

    guessName ( repository: string ) {

      const lastPart = _.last ( repository.split ( '/' ) );

      if ( !lastPart ) return;

      return lastPart.trim ()
                     .replace ( /^template-/, '' )
                     .replace ( /\.git$/, '' );

    }

  },

  prompt: {

    async confirmation ( message: string, fallback = false ) {

      const {result} = await inquirer.prompt ({
        type: 'confirm',
        name: 'result',
        message,
        default: fallback
      });

      return !!result;

    }

  }

};

/* EXPORT */

export default Utils;
