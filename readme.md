## Kickstart

Kickstart is a simple Node.js module that creates a folder structure and adds files needed to get up and running quickly. Heavily inspired by the command line options in express, Kickstart creates a new project with some folder structure as well as jade templates and already including [YUI] in the frontend code and styling provided by [Pure CSS] project

## Install
```
$ npm install kickstart-ex
```

## Usage
```
$ kickstart myapp
$ cd myapp
$ npm install
```
## Advanced Usage
```
$ kickstart myapp -t jade -p less
$ cd myapp
$ npm install
```

This will give you a new express app with a styled layout and your first route.
[YUI]: http://yuilibrary.com/
[Pure CSS]:http://purecss.io/