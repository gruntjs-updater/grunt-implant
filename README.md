# grunt-implant

> Insert switchable Script and Style tags into your HTML that automatically link to Local or CDN resources.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-implant --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-implant');
```

## The "implant" task

### Overview

With `grunt-implant`, you can replace `<!-- HTML Comment Blocks -->` with implanted content. This could be plain text, or links to files such as JavaScript or CSS.

For example: the following `<!--implant:javascript-->` can be replace with a list of

`<script>` tags.

#### Before

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<!--implant:javascript-->
</body>
</html>
```

#### After

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<script src="angular.min.js"></script>
<script src="angular-animate.js"></script>
<script src="angular-ui-router.min.js"></script>
</body>
</html>
```


#### Basic Wrap Config

Use a configuration like this when you want to wrap implants in surround content, like a `<script>` tag.

This configuration will:

 1. Replace the HTML comment block with `<script>` tags linking to the resources specified in the `implant` array.

**Config:**

```javascript
grunt.initConfig({
  implant: {
    'basic-config': {
      files: {
        'dest/basic/basic-config.html': ['test/fixtures/basic-config.html']
      },
      options: {
        target: {
          'javascript': {
            wrap: '<script src="{{implant}}" type="text/javascript"></script>',
            implant: [
              'angular.min.js',
              'angular-animate.js',
              'angular-ui-router.min.js',
            ],
          },
        }
      }
    },
  },
});
```

**Output:**

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<script src="angular.min.js"></script>
<script src="angular-animate.js"></script>
<script src="angular-ui-router.min.js"></script>
</body>
</html>
```



### Options


#### options.target.`[name]`

When invoked, grunt-implant looks for HTML Comment Blocks, for example: `<!--implant:javascript-->` and will replace this block with the implanted content that you specify. You can have as many target names as you wish.

Typically you might see one for JavaScript and one for CSS, like this:


```javascript
grunt.initConfig({
  implant: {
    'basic-config': {
      files: {
        'dest/basic/basic-config.html': ['test/fixtures/basic-config.html']
      },
      options: {
        target: {
          javascript: {
            wrap: '<script src="{{implant}}" type="text/javascript"></script>',
            inplant: [
              'http://cdn.com/resource.min.js',
            ]
          },
          css: {
            wrap: '<link href="{{implant}}" rel="stylesheet" />',
            implant: [
              'http://cdn.com/resource.min.css',
            ]
          },
        }
      }
    }
  }
});
```

#### options.target.`[name]`.wrap
Type: `String`
Default value: 'null`

This string represents a fragment that will wrap the link to your resource. For example: where `options.wrap` is `'<bread>{{implant}}</bread>'`, the text `{{wrap}}` will be replaced by either the implant content, say: `['sandwich1', 'sandwich2']`.

Thus the output would be:

```html
<bread>sandwich1</bread><bread>sandwich2</bread>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
