# Jekyll Remote Theme

Jekyll plugin for building Jekyll sites with any public GitHub-hosted theme

[![Gem Version](https://badge.fury.io/rb/jekyll-remote-theme.svg)](https://badge.fury.io/rb/jekyll-remote-theme) [![CI](https://github.com/benbalter/jekyll-remote-theme/workflows/CI/badge.svg)](https://github.com/benbalter/jekyll-remote-theme/actions?query=workflow%3ACI) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)


## Usage

1. Add the following to your Gemfile

  ```ruby
  gem "jekyll-remote-theme"
  ```

  and run `bundle install` to install the plugin

2. Add the following to your site's `_config.yml` to activate the plugin

  ```yml
  plugins:
    - jekyll-remote-theme
  ```
  Note: If you are using a Jekyll version less than 3.5.0, use the `gems` key instead of `plugins`.
