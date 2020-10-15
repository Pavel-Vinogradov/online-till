let gulp = require('gulp');
let prodjectFolder = 'dist'; //add  folder  dist
let sourceFolder = 'app'; // add folder   app
let src = require('gulp');
let dest = require('gulp');
let browserSync = require('browser-sync').create(); //add live server
let sass = require('gulp-sass'); // add sass/scss 
let gcmq = require('gulp-group-css-media-queries'); //add css-media-queries
let autoprefixer = require('gulp-autoprefixer'); //add plugin gulp-autoprefixer
let rename = require('gulp-rename'); //add rename
let cleanCSS = require('gulp-clean-css'); //add clean-css
let uglify = require('gulp-uglify-es').default; //add uglify
const htmlmin = require('gulp-htmlmin');

let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let fs = require('fs');

const imagemin = require('gulp-imagemin');

/* init folder paths */

let path = {

  build: {

    html: prodjectFolder + '/',
    css: prodjectFolder + '/css/',
    js: prodjectFolder + '/js/',
    img: prodjectFolder + '/img/',
    fonts: prodjectFolder + '/fonts/',
  },

  src: {

    html: [sourceFolder + '/*.html', ],
    css: sourceFolder + '/scss/style.scss',
    js: sourceFolder + '/js/main.js',
    img: sourceFolder + '/img/*.{jpg, png, svg, gif, ico, webp} ',
    fonts: sourceFolder + '/fonts/*.ttf',
  },

  watch: {
    html: sourceFolder + '/**/*.html',
    css: sourceFolder + '/scss/**/*.scss',
    js: sourceFolder + '/js/**/*.js',
    img: sourceFolder + '/img/*.{jpg, png, svg, gif, ico, webp} ',
  },

  clean: './' + prodjectFolder + '/'

};


/* Init Browser-Sync */

function browser_Sync() {
  browserSync.init({
    server: {
      baseDir: './' + prodjectFolder + '/'
    },

    port: 3000,
    notify: false,
  });
}

/* Init HTML files */
/* Init File inclide*/
function html() {
  return gulp.src(path.src.html)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());

}


/* init watch*/

function watchFiles() {

  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  // gulp.watch([path.watch.img], images);
}



function css() {
  return gulp.src(path.src.css)
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gcmq()) //group-css-media-queries
    .pipe(autoprefixer({ //autoprefixer
      overrideBrowserslist: [
        '> 1%',
        'ie >= 8',
        'edge >= 15',
        'ie_mob >= 10',
        'ff >= 45',
        'chrome >= 45',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4',
        'bb >= 10'
      ],
      cascade: true
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
}


/* Init JavaScript files */

function js() {
  return gulp.src(path.src.js)
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());

}


/* init file system*/

gulp.task('fontsStyle', function (params) {

    let file_content = fs.readFileSync(sourceFolder + '/scss/fonts.scss');
    if (file_content == '') {
      fs.writeFile(sourceFolder + '/scss/fonts.scss', '', cb);
      return fs.readdir(path.build.fonts, function (err, items) {
        if (items) {
          let c_fontname;
          for (let i = 0; i < items.length; i++) {
            let fontname = items[i].split('.');
            fontname = fontname[0];
            if (c_fontname != fontname) {
              fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
            }
            c_fontname = fontname;
          }
        }
      });
    }

    function cb() {}
  }


);

gulp.task('img', function () {
  gulp.src('app/img/*/*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))

    .pipe(gulp.dest(path.build.img));


});



gulp.task('fonts', () => {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
  gulp.src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.build.fonts));
  return gulp.src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts));
});

let build = gulp.parallel(css, js, html);
let watch = gulp.parallel(build, watchFiles, browser_Sync);




exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;