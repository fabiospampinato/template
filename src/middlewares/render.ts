
/* IMPORT */

import * as consolidate from 'consolidate';
import * as pify from 'pify';

/* RENDER */

async function render ( files, metalsmith, next ) {

  const render = pify ( consolidate.handlebars.render ),
        paths = Object.keys ( files ),
        metadata = metalsmith.metadata ();

  for ( let path of paths ) {

    const template = files[path].contents.toString (),
          rendered = await render ( template, metadata );

    files[path].contents = new Buffer ( rendered );

  }

  next ();

}

/* EXPORT */

export default render;
