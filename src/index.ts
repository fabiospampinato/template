
/* IMPORT */

import * as chalk from 'chalk';
import {exec} from 'child_process';
import * as del from 'del';
import * as fs from 'fs';
import * as metalsmith from 'metalsmith';
import * as path from 'path';
import * as pify from 'pify';
import Utils from './utils';

/* TEMPLATE */

const Template = {

  async create ( template: string, project?: string ) {

    const ms = metalsmith ( __dirname );

    project = project || `my-${template}`;

    const templatePath = Utils.template.getPath ( template, true ),
          source = templatePath && path.join ( templatePath, 'template' ),
          destination = path.join ( process.cwd (), project );

    if ( !source ) return console.error ( `${template} is not a valid template` );

    Utils.useHelpers ();
    Utils.useMiddlewares ( ms );

    ms.clean ( true )
      .source ( source )
      .destination ( destination )
      .build ( err => {
        if ( err ) throw err;
      });

  },

  async list () {

    const names = await Utils.templates.getNames ();

    if ( !names.length ) {

      console.log ( 'No templates installed' );

    } else {

      names.forEach ( name => {
        console.log ( `template ${chalk.magenta ( '<command>' )} ${name}` );
      });

    }

  },

  async install ( repository: string, template?: string ) {

    const endpoint = Utils.repository.getEndpoint ( repository );

    if ( endpoint ) {

      template = template || Utils.template.guessName ( repository );

      if ( !template ) return console.error ( 'You must provide a template name' );

      const destination = Utils.template.getPath ( template );

      if ( fs.existsSync ( destination ) ) {

        const okay = await Utils.prompt.confirmation ( 'This template is already installed, do you want to overwrite it?' );

        if ( !okay ) return;

        await del ( destination );

      }

      await pify ( exec )( `git clone ${endpoint} ${destination}` );

      console.log ( `Template "${repository}" installed as "${template}"` );
      console.log ( `Run \`template create ${template} ${chalk.blue ( '<project>' )}\` to get started` );

    } else {

      console.log ( `${repository} is not a repository` );

    }

  },

  async uninstall ( template?: string ) {

    if ( !template ) { // All

      const okay = await Utils.prompt.confirmation ( 'Are you sure you want to uninstall all templates?' );

      if ( !okay ) return;

      const names = await Utils.templates.getNames ();

      if ( !names.length ) return console.error ( 'No templates installed' );

      names.forEach ( name => Template.uninstall ( name ) );

    } else { // Single

      const folderPath = Utils.template.getPath ( template, true );

      if ( !folderPath ) return console.error ( `${template} is not installed` );

      await del ( folderPath );

      console.log ( `${template} deleted` );

    }

  },

  async update ( template?: string ) {

    if ( !template ) { // All

      const names = await Utils.templates.getNames ();

      if ( !names.length ) return console.error ( 'No templates installed' );

      names.forEach ( name => Template.update ( name ) );

    } else { // Single

      const folderPath = Utils.template.getPath ( template, true );

      if ( !folderPath ) return console.error ( `${template} is not installed` );

      await pify ( exec )( 'git pull', { cwd: folderPath } );

      console.log ( `${template} has been updated` );

    }

  }

};

/* EXPORT */

export default Template;
