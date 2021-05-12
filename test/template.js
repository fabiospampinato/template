
/* IMPORT */

import {describe} from 'ava-spec';
import Utils from '../dist/src/utils';

/* TEMPLATE */

describe ( 'Template', it => {

  describe ( 'guessName', it => {

    it ( 'Guesses a name from a git endpoint', t => {

      const endpoints = [
        'http://foo.com/repo.git',
        'https://foo.com/repo.git',
        'https://github.com/owner/repo.git',
        '/path/to/repo',
        '/path/to/repo.git',
        '/path/to/template-repo.git'
      ];

      endpoints.forEach ( endpoint => {
        t.is ( Utils.template.guessName ( endpoint ), 'repo', endpoint );
      });

    });

  });

});
