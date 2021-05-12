
/* IMPORT */

import {describe} from 'ava-spec';
import Utils from '../dist/src/utils';

/* REPOSITORY */

describe ( 'Repository', it => {

  describe ( 'getEndpoint', it => {

    it ( 'Gets a git endpoint from a string', t => {

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

      tests.forEach ( ([ str, endpoint ]) => {
        t.is ( Utils.repository.getEndpoint ( str ), endpoint, str );
      });

    });

  });

});
