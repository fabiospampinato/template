
/* IMPORT */

import * as consolidate from 'consolidate';
import * as isBinary from 'isbinaryfile';
import * as pify from 'pify';
import Utils from '../utils';

/* RENDER */

async function render ( files, metalsmith, next ) {

  const metadata = metalsmith.metadata (),
        render = pify ( consolidate.handlebars.render ),
        paths = Object.keys ( files );

  for ( let path of paths ) {

    const {contents} = files[path];

    if ( isBinary.sync ( contents, contents.length ) ) continue;
    if ( Utils.template.isFileSkipped ( path, metadata.schema.filter ) ) continue;

    const template = contents.toString (),
          rendered = await render ( template, metadata.renderVariables );

    files[path].contents = new Buffer ( rendered );

  }

  next ();

}

/* EXPORT */

export default render;
