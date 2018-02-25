var gulp = require('gulp');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var pxtoviewport = require('postcss-px-to-viewport');
var atImport = require('postcss-import');
var mqpacker = require('css-mqpacker');
var htmlmin = require('gulp-htmlmin');
var border = require('postcss-write-svg');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dest'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./dest"
    });
});

// gulp.task('ptv', function() {
//   return gulp.src('src/**/*.css')
//     .pipe(pxtoviewport({
//       viewportWidth: 750,
//       viewportHeight: 1334,
//       unitPrecision: 5,
//       viewportUnit: 'vw',
//       selectorBlackList: [],
//       minPixelValue: 1,
//       mediaQuery: false
//     }))
//     .pipe(gulp.dest('dest'));
// });

gulp.task('css', function() {
  var processors = [
    atImport,
    mqpacker,
    pxtoviewport({
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    }),
    border,
    cssnano,
    cssnext,
    precss
  ];
  return gulp.src('src/**/*.css')
    .pipe(postcss(processors))
    // .pipe(rename('all.min.css'))
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dest'));
});

gulp.task('jsmin', function() {
  gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(babel({
            presets: ['env']
        }))
    // .pipe(rename('.min.js'))
    .pipe(gulp.dest('dest'));
});

gulp.task('jsconcat', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('all.js')) //合并后的文件名
    .pipe(gulp.dest('dest/jsconcat'));
});

gulp.task('imagemin', function() {
  gulp.src('src/img/**/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      use: [imageminPngquant()], //对 PNG 使用 PNG 量化，量化是有损压缩，但失真率很低，基本无碍。压缩达不到一定质量要求的，imageminPngquant 会选择退出压缩
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dest/img'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.js', ['jsmin']);
  gulp.watch('src/img/*.{png,jpg,gif,ico}', ['imagemin']);
  gulp.watch("dest/css/*.css").on('change', reload);
  gulp.watch("dest/*.html").on('change', reload);
});

gulp.task('default', ['html', 'css', 'jsmin', 'watch', 'serve']);
