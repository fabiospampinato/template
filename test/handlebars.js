
/* IMPORT */

import {describe} from 'ava-spec';
import * as handlebars from 'handlebars';
import Utils from '../dist/src/utils';

/* HANDLEBARS */

describe ( 'Handlebars', it => {

  Utils.handlebars.useHelpers ();

  describe ( 'getSchema', it => {

    it ( 'Extracts the schema from a template', t => {

      const INPUT = { type: 'input' },
            CONFIRM = { type: 'confirm' };

      const templates = [
        ['foo', {}],
        ['{{foo}}', { foo: INPUT }],
        ['{{{foo}}}', { foo: INPUT }],
        ['{{foo.bar}}', { 'foo.bar': INPUT }],
        ['{{foo.bar}}{{foo.baz}}', { 'foo.bar': INPUT, 'foo.baz': INPUT }],
        ['{{#check}}{{/check}}', { check: CONFIRM }],
        ['{{#if check}}asd{{/if}}', { check: CONFIRM }],
        ['{{!-- comment --}}', {}],
        ['{{!comment}}', {}],
        ['{{#check}}{{nested}}{{/check}}', { check: CONFIRM, nested: INPUT }],
        ['{{#check}}{{nested}}/{{/check}}{{foo}}', { check: CONFIRM, nested: INPUT, foo: INPUT }],
        ['{{eval "${a}" a=1}}', {}],
        ['{{eval "${a} + ${b}" a=1 b=2}}', {}],
        ['{{eval "${a}" a=foo}}', { foo: INPUT }],
        ['{{eval "${a} + ${b}" a=foo b=bar}}', { foo: INPUT, bar: INPUT }],
        ['{{_ "upperCase" "foo"}}', {}],
        ['{{_ "upperCase" foo}}', { foo: INPUT }],
        ['{{_ "sum" foo bar}}', { foo: INPUT, bar: INPUT }]
      ];

      templates.forEach ( ([ template, schema ]) => {
        t.deepEqual ( Utils.handlebars.getSchema ( template ), schema, template );
      });

    });

  });

});
