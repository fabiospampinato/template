
/* IMPORT */

import os from 'node:os';
import path from 'node:path';

/* MAIN */

const METADATA_GLOBAL_NAME = 'templates.json';
const METADATA_LOCAL_NAME = 'template.json';

const TEMPLATES_PATH = path.join ( os.homedir (), '.template' );

/* EXPORT */

export {METADATA_GLOBAL_NAME, METADATA_LOCAL_NAME, TEMPLATES_PATH};
