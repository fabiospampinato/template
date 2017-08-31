
/* IMPORT */

import * as _ from 'lodash';
import * as inquirer from 'inquirer';

/* PROMPT */

async function prompt ( files, metalsmith, next ) {
  console.log(metalsmith.metadata());
  const prompts = ['author', 'name', 'instanceName', 'owner'],
        questions = prompts.map ( prompt => ({
          type: 'input',
          name: prompt,
          message: `${prompt}:`
        })),
        answers = await inquirer.prompt ( questions ),
        metadata = metalsmith.metadata ();

  _.extend ( metadata, answers );

  next ();

};

/* EXPORT */

export default prompt;
