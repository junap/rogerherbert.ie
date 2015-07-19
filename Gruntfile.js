module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            www: {
                src: ['dest/']
            }
        },

        copy: {
            html: {
                nonull: true,
                expand: true,
                cwd: 'src/html/',
                src: '**',
                dest: 'dest/'
            },

            images: {
                nonull: true,
                expand: true,
                cwd: 'src/images/',
                src: '**',
                dest: 'dest/images/'
            }
        },

        less: {
            options: {
                ieCompat: false,
                plugins: [
                    new (require('less-plugin-clean-css'))()
                ],
            },

            www: {
                src: [
                    'bower_components/normalize.css/normalize.css',
                    'src/less/styles.less'
                ],
                dest: 'dest/css/styles.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['clean', 'copy', 'less']);
};
