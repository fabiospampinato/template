
/* IMPORT */

import {describe} from 'fava';
import Utils from '../dist/utils.js';

/* MAIN */

describe ( 'Template', it => {

  describe ( 'getEndpoint', it => {

    it ( 'gets a git endpoint from a string', async t => {

      const tests = [
        ['http://foo.com/bar.git', 'http://foo.com/bar.git'],
        ['https://foo.com/bar.git', 'https://foo.com/bar.git'],
        ['https://github.com/owner/repo', 'https://github.com/owner/repo.git'],
        ['https://github.com/owner/repo/', 'https://github.com/owner/repo.git'],
        ['https://github.com/owner/repo.git', 'https://github.com/owner/repo.git'],
        ['https://github.com/owner/repo#foo', 'https://github.com/owner/repo.git'],
        ['http://www.github.com/owner/repo', 'https://github.com/owner/repo.git'],
        ['https://www.github.com/owner/repo#foo', 'https://github.com/owner/repo.git'],
        ['owner/repo', 'https://github.com/owner/repo.git'],
        ['/', '/']
      ];

      for ( const [repository, endpoint] of tests ) {

        t.is ( await Utils.repository.getEndpoint ( repository ), endpoint );

      }

    });

  });

});
