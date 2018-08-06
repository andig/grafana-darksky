module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: ['README.md'],
        dest: 'dist'
      }
    },

    watch: {
      files: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/img/*.*', 'src/plugin.json', 'README.md'],
      tasks: ['default'],
      options: {
        debounceDelay: 250,
      },
    },

    typescript: {
      build: {
        src: ['dist/**/*.ts', "!src/spec/**/*", "!**/*.d.ts"],
        dest: 'dist/',
        // options: {
          // module: 'system', //or commonjs
          // target: 'es3', //or es5
          // rootDir: 'dist/',
          // keepDirectoryHierarchy: false,
          // declaration: true,
          // emitDecoratorMetadata: true,
          // experimentalDecorators: true,
          // sourceMap: true,
          // noImplicitAny: false,

        options: {
          module: 'system',
          target: 'es5',
          rootDir: 'dist/',
          declaration: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          sourceMap: true,
          noImplicitAny: false,
        }
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ['es2015']
      },
      dist: {
        options: {
          plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of']
        },
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      }
    },
  });

  grunt.registerTask('default', [
    'clean', 
    'copy:src_to_dist', 
    'copy:pluginDef', 
    // 'babel', 
    'typescript:build',
  ]);
};
