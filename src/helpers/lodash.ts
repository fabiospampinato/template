
/* IMPORT */

import * as _ from 'lodash';

/* HELPER */

function helper ( fn, ...args ) {

  return _[fn]( ...args );

}

/* EXPORT */

export default helper;
