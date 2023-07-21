#!/usr/bin/env node

/* IMPORT */

import {bin} from 'specialist';
import Template from '.';

/* MAIN */

bin ( 'template', 'A super-simple way to create new projects based on templates' )
  /* DEFAULT */
  .action ( () => { //TODO: Make this into a wizard instead, or show the help menu
    console.log ( 'Execute "template --help" for help' );
  })
  /* CD */
  .command ( 'cd', 'CD into a local template' )
  .argument ( '<template>', 'The template to CD into' )
  .action ( ( options, args ) => {
    return Template.cd ( args[0] );
  })
  /* LS */
  .command ( 'ls', 'List installed templates' )
  .action ( () => {
    return Template.ls ();
  })
  /* NEW */
  .command ( 'new', 'Create a p roject from a template' )
  .argument ( '<template>', 'Template name' )
  .argument ( '<project>', 'Project name' )
  .action ( ( options, args ) => {
    return Template.new ( args[0], args[1] );
  })
  /* INSTALL */
  .command ( 'install', 'Install a template from a repository' )
  .argument ( '<repository>', 'Git endpoint url, GitHub shorthand, or local path' )
  .argument ( '<template>', 'Template name' )
  .action ( ( options, args ) => {
    return Template.install ( args[0], args[1] );
  })
  /* UNINSTALL */
  .command ( 'uninstall', 'Uninstall a template' )
  .argument ( '<template>', 'Template name' )
  .action ( ( options, args ) => {
    return Template.uninstall ( args[0] );
  })
  /* UPDATE */
  .command ( 'update', 'Update one or all templates' )
  .argument ( '[template]', 'Template name' )
  .action ( ( options, args ) => {
    return Template.update ( args[0] );
  })
  /* RUN */
  .run ();
