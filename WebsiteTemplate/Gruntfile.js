module.exports =
  function(grunt) {
    grunt.initConfig({
      srcfolder: 'src',
      distfolder: 'dist',
      pkg: grunt.file.readJSON('package.json'),
      bowercopy: {
        libs: {
          options: {
            destPrefix: '<%=distfolder%>/js/libs'
          },
          files: {
            'jquery.min.js': 'jquery/<%=distfolder%>/jquery.min.js'
          },
        },
      },
      copy: {
        html: {
          src: ['<%=srcfolder%>/html'],
          dest: '<%=distfolder%>/html',
        },
        index: {
          src: ['<%=srcfolder%>/index.html'],
          dest: '<%=distfolder%>/index.html',
        }
      },
      concat: {
        dist: {
          src: ['<%=srcfolder%>/js/*.js', '<%=srcfolder%>/js/**/*.js'],
          dest: '<%=distfolder%>/js/<%= pkg.name %>.js',
        },
      },
      jsbeautifier: {
        files: ['Gruntfile.js', '<%=srcfolder%>/js/**/*.js', '<%=srcfolder%>/js/*.js'],
        options: {
          js: {
            braceStyle: 'collapse',
            breakChainedMethods: false,
            e4x: false,
            evalCode: false,
            indentChar: ' ',
            indentLevel: 0,
            indentSize: 2,
            indentWithTabs: false,
            jslintHappy: false,
            keepArrayIndentation: false,
            keepFunctionIndentation: false,
            maxPreserveNewlines: 10,
            preserveNewlines: true,
            spaceBeforeConditional: true,
            spaceInParen: false,
            unescapeStrings: false,
            wrapLineLength: 0
          }
        }

      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            '<%=distfolder%>/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },
      jshint: {
        files: ['Gruntfile.js', '<%=srcfolder%>/js/**/*.js', 'test/js/**/*.js'],
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          undef: true,
          unused: true,
          quotmark: 'single',
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true,
          }
        }
      },
      watch: {
        css: {
          files: ['<%=srcfolder%>/styles/styles.less'],
          tasks: ['less']
        },
        jsbeautifier: {
          files: ['<%=jsbeautifier.files %>'],
          tasks: ['jsbeautifier']
        },
        jshint: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint']
        },
        jsconcat: {
          files: ['<%= concat.dist.src %>'],
          tasks: ['concat']
        },
        minimize: {
          files: ['<%= concat.dist.dest %>'],
          tasks: ['uglify']
        },
        copy: {
          files: ['<%= copy.html.src %>', '<%= copy.index.src %>'],
          tasks: ['copy']
        }
      },
      clean: {
        build: ['<%=distfolder%>']
      },
      less: {
        development: {
          options: {
            compress: false,
            yuicompress: false,
            optimization: 2
          },
          files: {
            '<%=distfolder%>/css/styles.css': '<%=srcfolder%>/styles/styles.less'
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsbeautifier');



    // grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jsbeautifier', 'copy', 'less', 'bowercopy', 'jshint', 'concat', 'uglify']);
  };
