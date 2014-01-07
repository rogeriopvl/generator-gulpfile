'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var GulpfileGenerator = module.exports = function GulpfileGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    if (this.createPkgFile) {
        this.installDependencies({ skipInstall: options['skip-install'] });
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GulpfileGenerator, yeoman.generators.Base);

GulpfileGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
      {
        type: 'list',
        name: 'appType',
        message: 'What kind of app are you building?',
        choices: [
            { name: 'Browser App', value: 'browser' },
            { name: 'Node App', value: 'node' }
        ],
        default: 'browser'
      },
      {
        type: 'confirm',
        name: 'createPkgFile',
        message: [
            'Do you want me to create a package.json file ',
            'with all the dependencies?\n',
            '(if you dont, you will need to add the gulp plugins to yours)'
        ].join('')
      }
  ];

  this.prompt(prompts, function (props) {
    this.appType = props.appType;
    this.createPkgFile = props.createPkgFile;

    cb();
  }.bind(this));
};

GulpfileGenerator.prototype.app = function app() {
  if (this.createPkgFile) {
      this.copy('_package.json', 'package.json');
  }
  this.template('_Gulpfile.js', 'Gulpfile.js');
};
