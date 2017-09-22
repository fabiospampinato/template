
/* IMPORT */

import * as _ from 'lodash';
import ask from 'inquirer-helpers';
import * as series from 'p-series';

/* PROMPT */

async function prompt ( files, metalsmith, next ) {

  const metadata = metalsmith.metadata (),
        variablesOrder = metadata.schema.variablesOrder || [],
        variablesNames = variablesOrder.concat ( _.sortBy ( _.difference ( Object.keys ( metadata.schema.variables ), variablesOrder ), [x => x.toLowerCase ()] ) ),
        variablesValues = await series ( variablesNames.map ( name => () => ask.input ( `${name}:`, _.get ( metadata.schema.variables[name], 'default' ) ) ) ),
        variables = _.zipObject ( variablesNames, variablesValues );

  metadata.renderVariables = variables;

  next ();

};

/* EXPORT */

export default prompt;
