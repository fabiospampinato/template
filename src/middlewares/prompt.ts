
/* IMPORT */

import * as _ from 'lodash';
import * as inquirer from 'inquirer';

/* PROMPT */

async function prompt ( files, metalsmith, next ) {

  function validate ( x ) {
    return !( _.isUndefined ( x ) || ( _.isString ( x ) && !x.trim () ) );
  }

  function makeQuestion ( prompt ) {
    const obj = metadata.schema.variables[prompt];
    return _.extend ( {
      name: prompt,
      message: `${prompt}:`,
      validate: _.isUndefined ( obj.default ) ? validate : () => true
    }, obj );
  }

  const metadata = metalsmith.metadata (),
        promptsOrder = metadata.schema.variablesOrder || [],
        prompts = promptsOrder.concat ( _.sortBy ( _.difference ( Object.keys ( metadata.schema.variables ), promptsOrder ), [x => x.toLowerCase ()] ) ),
        questions = prompts.map ( makeQuestion ),
        variables = await inquirer.prompt ( questions );

  metadata.renderVariables = variables;

  next ();

};

/* EXPORT */

export default prompt;
