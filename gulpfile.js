var gulp = require( 'gulp' );

var rename = require( 'gulp-rename' );
var pug = require( 'gulp-pug-3' );
var scss = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var autoprefixer = require( 'gulp-autoprefixer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var browserify = require( 'browserify' );
var babelify = require( 'babelify' );
var notify = require('gulp-notify');
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var browserSync = require( 'browser-sync' ).create();
// var reload = browserSync.reload;

var pugSRC = './src/**/*.pug';
var htmlDIST = './dist/';

var styleSRC = './src/scss/main.scss';
var styleDIST = './dist/css/';

var jsSRC = './src/js/script.js';
var jsDIST = './dist/js';

function browser_sync(){
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
}

function reload(done) {
    browser_sync.reload;

    done();
}

function html(done) {
    gulp.src( pugSRC )
        .pipe( pug( {pretty: true} ) )
        .pipe( gulp.dest( htmlDIST ) )
        .pipe(browserSync.stream());
    
    done();
}

function style(done) {
    gulp.src( styleSRC )
        .pipe( scss({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }) )
        .on( 'error', console.error.bind( console ) )
        .pipe( autoprefixer( { 
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        } ))
        .pipe( rename( 'main.css' ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( styleDIST ) )
        .pipe( browserSync.stream() );
    
    done();
}

// function js(done) {
//     browserify(jsSRC)
//     // .transform("babelify", {plugins: ["transform-runtime"],presets: [["env"]]})     //babel processing
//     .bundle()       //Processing module dependencies
//     .pipe(source("script.js"))      //Convert to vinyl file object
//     .pipe(buffer())          //Convert to buffer for code compression
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/js'))
    
//     done();
// }



function watch_files() {
    gulp.watch( './src/**/*.pug' , gulp.series(html, reload));
    gulp.watch( './src/scss/**/*.scss' , gulp.series(style, reload));
    // gulp.watch( './src/js/**/*.js' , gulp.series(js, reload));
}

gulp.task('html', html);
gulp.task('style', style);
// gulp.task('js', js);
// gulp.task('default', gulp.parallel(html, style, js));
gulp.task('watch', gulp.parallel(browser_sync, watch_files));