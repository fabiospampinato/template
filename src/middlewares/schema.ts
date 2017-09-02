
/* IMPORT */

import * as _ from 'lodash';
import * as isBinary from 'isbinaryfile';
import * as path from 'path';
import Config from '../config';
import Utils from '../utils';

/* SCHEMA */

async function schema ( files, metalsmith, next ) {

  /* VARIABLES */

  const source = metalsmith.source (),
        templatePath = path.dirname ( source ),
        template = path.basename ( templatePath );

  /* FILES SCHEMA */

  const filesVariables = {},
        filesSchema = { variables: filesVariables };

  _.forOwn ( files, file => {

    const {contents} = file;

    if ( isBinary.sync ( contents, contents.length ) ) return;

    const fileSchema = Utils.handlebars.getSchema ( contents.toString () );

    _.extend ( filesVariables, fileSchema );

  });

  /* TEMPLATE SCHEMA */

  const templateSchema = await Utils.loadJSON ( path.join ( templatePath, Config.templateConfigName ) );

  /* COMPUTER SCHEMA */

  const computerConfig = await Utils.loadJSON ( path.join ( Config.directory, Config.templateConfigName ) ),
        computerSchema = _.get ( computerConfig, `templates.${template}` );

  /* SCHEMA */

  const metadata = metalsmith.metadata (),
        schema = _.merge ( filesSchema, templateSchema, computerSchema );

  metadata.schema = schema;

  next ();

};

/* EXPORT */

export default schema;
