#!/usr/bin/env node
const argvInit = require('yargs');
const signale = require('signale');

const {
  runByPage,
  runAllByRegion,
} = require('./api/audit');

async function main() {
  const { argv } = argvInit
    .usage('Usage: $0 <cmd> [options]')
    .command('audit', 'run audit for a page or all in a specific region')
    .demandCommand(1, 1)
    .option('token', {
      alias: 't',
      demandOption: true,
      description: 'access token for your pagespeed.green account',
    })
    .option('region', {
      alias: 'r',
      demandOption: true,
      type: 'string',
      description: 'region code for running audit in',
      choices: ['AU-SYD', 'EU-WEST', 'US-WEST'],
    })
    .option('url', {
      type: 'string',
      description: 'URL of a Page for audit. Eg. --url=test.com/about or --url=https://test.com/about',
    })
    .option('all', {
      type: 'boolean',
      description: 'run audit for all pages in specified region',
    })
    .option('h', {
      alias: 'help',
      description: 'display help message',
    })
    .conflicts('url', 'all')
    .help('help')
    .strict()
    .version()
    .alias('version', 'v')
    .example('pagespeed-green audit --token=90416a72-0925-11ea-8514-0242ac130002 --region=AU-SYD --all', 'Run an audit for all webpages in a region')
    .example('pagespeed-green audit --token=90416a72-0925-11ea-8514-0242ac130002 --region=AU-SYD --url=https://pagespeed.green/about', 'Run an audit for a webpage in a region')
    .epilog('for more information visit https://github.com/pagespeed-green/cli')
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help');

  switch (argv._[0]) {
    case 'audit': {
      if (argv.all) {
        signale.pending(`===> Sending audit task for all webpages in ${argv.region} region`);
        try {
          await runAllByRegion({
            region: argv.region,
            token: argv.token,
          });
          signale.success(':::: The audit has been put to queue successfully ::::');
        } catch (e) {
          signale.error(e.message);
        }
      } else {
        try {
          signale.pending(`===> Sending audit task for webpage: ${argv.url}, in ${argv.region} region`);
          await runByPage({
            region: argv.region,
            token: argv.token,
            url: argv.url,
          });
          signale.success(':::: The audit has been put to queue successfully ::::');
        } catch (e) {
          signale.error(e.message);
        }
      }
      break;
    }

    default: {
      signale.error(`Command: ${argv._[0]} is not supported`);
    }
  }
}

main();
