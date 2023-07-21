
/* IMPORT */

import _ from 'lodash';
import {pack, visit} from 'json-archive';
import fs from 'node:fs/promises';
import path from 'node:path';
import picolate from 'picolate';
import Base64 from 'radix64-encoding';
import {color} from 'specialist';
import Utils from './utils';

/* MAIN */

//TODO: Extract needed variables automatically again, somehow

const Template = {

  /* API */

  cd: async ( template: string ): Promise<void> => {

    const templatePath = Utils.template.getPath ( template );
    const templateExists = await Utils.fs.isFolder ( templatePath );

    if ( !templateExists ) throw new Error ( `Template "${template}" is not installed` );

    Utils.shell.cd ( templatePath );

  },

  ls: async (): Promise<void> => {

    const templateNames = await Utils.templates.getNames ();

    if ( templateNames.length ) {

      console.log ( templateNames.join ( '\n' ) );

    } else {

      console.log ( 'No templates installed' );

    }

  },

  new: async ( template: string, project: string ): Promise<void> => {

    const templatePath = await Utils.template.getPath ( template );
    const templateExists = await Utils.fs.isFolder ( templatePath );

    if ( !templateExists ) throw new Error ( `Template "${template}" is not installed` );

    const inputPath = path.join ( templatePath, 'template' );
    const inputExists = await Utils.fs.isFolder ( inputPath );

    if ( !inputExists ) throw new Error ( `Template "${template}" is not a valid template` );

    const outputPath = path.join ( process.cwd (), project );
    const outputExists = await Utils.fs.isFolder ( outputPath );

    if ( outputExists ) throw new Error ( `Project "${project}" already exists` );

    await Template.update ( template ); // Auto updating

    const templatePack = await pack ( inputPath );
    const templateMetadata = await Utils.metadata.get ( template );
    const templateVariables: Record<string, unknown> = {};

    for ( const variable in templateMetadata?.variables ) {
      const variableType = templateMetadata?.variables?.[variable]?.type;
      const variableInitial = templateMetadata?.variables?.[variable]?.default;
      if ( variableType === 'string' ) {
        const initial = _.isString ( variableInitial ) ? variableInitial : undefined;
        templateVariables[variable] = await Utils.prompt.string ( variable, initial );
      } else if ( variableType === 'boolean' ) {
        const initial = _.isBoolean ( variableInitial ) ? variableInitial : undefined;
        templateVariables[variable] = await Utils.prompt.boolean ( variable, initial );
      } else {
        throw new Error ( `Unsupported variable type "${variableType}"` );
      }
    }

    const templatePackRendered = await visit ( templatePack, {
      transform: file => {
        const template = Base64.decodeStr ( file.contents );
        if ( Utils.fs.isBinary ( template ) ) return file;
        const templateTrimmed = template.replace ( /\r?\n\s+({{.*?}})\s*\r?\n/g, '\n' );
        const templateContext = { _, ...templateVariables };
        const templateRendered = picolate.render ( templateTrimmed, templateContext );
        file.contents = templateRendered;
        file.encoding = 'utf8';
        return file;
      }
    });

    await visit ( templatePackRendered, {
      visit: async ( fileRelativePath, file ) => {
        const filePath = path.join ( outputPath, fileRelativePath );
        await fs.mkdir ( path.dirname ( filePath ), { recursive: true } );
        await fs.writeFile ( filePath, file.contents, file.encoding );
      }
    });

    console.log ( `Project "${project}" created successfully` );

  },

  install: async ( repository: string, template: string ): Promise<void> => {

    const gitPath = await Utils.repository.getEndpoint ( repository );

    if ( !gitPath ) throw new Error ( `Invalid repository "${repository}"` );

    const outputPath = await Utils.template.getPath ( template );
    const outputExists = await Utils.fs.isFolder ( outputPath );

    if ( outputExists ) throw new Error ( `Template "${template}" is already installed` );

    try {

      if ( Utils.path.isUrl ( gitPath ) ) {

        await Utils.shell.exec ( `git clone "${gitPath}" "${outputPath}"` );

      } else {

        await Utils.shell.exec ( `rsync -av --exclude=*/.git "${gitPath}/" "${outputPath}"` );

      }

      console.log ( `Template "${repository}" installed as "${template}"` );
      console.log ( `Run "template new ${template} ${color.blue ( '<project>' )}" to instantiate it` );

    } catch ( error: unknown ) {

      console.error ( `Failed to install template "${template}"` );
      console.error ( error );

    }

  },

  uninstall: async ( template: string ): Promise<void> => {

    const templatePath = await Utils.template.getPath ( template );
    const templateExists = await Utils.fs.isFolder ( templatePath );

    if ( !templateExists ) throw new Error ( `Template "${template}" is not installed` );

    await Utils.fs.delete ( templatePath );

  },

  update: async ( template?: string ): Promise<void> => {

    if ( !template ) { // Updating all templates

      const templateNames = await Utils.templates.getNames ();

      if ( templateNames.length ) {

        for ( const templateName of templateNames ) {

          await Template.update ( templateName );

        }

      } else {

        console.log ( 'No templates installed' );

      }

    } else { // Updating a single template

      const templatePath = await Utils.template.getPath ( template );
      const templateExists = await Utils.fs.isFolder ( templatePath );

      if ( !templateExists ) throw new Error ( `Template "${template}" is not installed` );

      try {

        const gitPath = path.join ( templatePath, '.git' );
        const hasGit = await Utils.fs.isFolder ( gitPath );

        if ( hasGit ) {

          console.log ( '' );
          console.log ( `Updating template "${template}"` );

          await Utils.shell.exec ( 'git pull', { cwd: templatePath } );

        } else {

          console.error ( `Template "${template}" is not a git repository, so it cannot be updated` );

        }

      } catch ( error: unknown ) {

        console.error ( `Failed to update template "${template}"` );
        console.error ( error );

      }

    }

  }

};

/* EXPORT */

export default Template;
