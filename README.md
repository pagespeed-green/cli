# PageSpeed Green official Command Line Client (CLI)

The CLI is for integration with [PageSpeed Green service](https://pagespeed.green). It can be used for integration with CD/CI pipeline that automatically tracks the code changes for web performance degradations.

Version 1.0.x has two features:

- sending task for running audit for a specific webpage that is already added to [PageSpeed Green](https://pagespeed.green)

- sending multiple tasks for running audit for all webpages that are already added to [PageSpeed Green](https://pagespeed.green)

## Installation

`npm i -g pagespeed-green`

### Usage

`pagespeed-green <cmd> [options]`

### Commands

  `pagespeed-green audit` ( run audit for a page or all in a specific region )

### Options

  `--token, -t`    ( access token for your pagespeed.green account [required] )

  `--region, -r`   ( region code for running audit in [required] [choices: "AU-SYD", "EU-WEST", "US-WEST"] )

  `--url`         ( URL of a Page for audit. Eg. --url=test.com/about or --url=https://test.com/about )

  `--all`         ( run audit for all pages in specified region )

  `-h, --help`    ( show help )

  `--version, -v` ( show version number )

### Examples

#### Run an audit for all webpages in a region

  `pagespeed-green audit --token=90416a72-0925-11ea-8514-0242ac130002 --region=AU-SYD --all`

#### Run an audit for a webpage in a region

  `pagespeed-green audit --token=90416a72-0925-11ea-8514-0242ac130002 --region=AU-SYD --url=https://pagespeed.green/web-performance-blog`
