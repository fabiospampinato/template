
/* IMPORT */

import * as os from 'os';
import * as path from 'path';

/* CONFIG */

const Config = {
  autoUpdate: true,
  directory: path.join ( os.homedir (), '.template' ),
  templateConfigName: 'template.json'
};

/* EXPORT */

export default Config;
