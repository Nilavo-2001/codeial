
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import rev from 'gulp-rev'
import debug from 'gulp-debug';
import uglify from 'gulp-uglify-es';
const minjs = uglify.default;
import imagemin from 'gulp-imagemin';
import { deleteSync } from 'del';

gulp.task('css', function (done) {
    console.log("Minifying css...");
    gulp.src('./assets/scss/**/*.scss')
        .pipe(debug())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/css/**/*.css')
        .pipe(debug())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'))
    done();
});
gulp.task('js', function (done) {
    console.log('minifying js...');
    gulp.src('./assets/js/**/*.js')
        .pipe(minjs())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets/js'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done()
});

gulp.task('images', function (done) {
    // this task is not tested ...test it after inserting an image in asset folder
    console.log('compressing images...');
    gulp.src('./assets/images/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
    done();
});
gulp.task('clean:assets', async function (done) {
    await deleteSync('./public/**')
    done();
});
gulp.task('build', gulp.series('css', 'js', 'images'), function (done) {
    console.log('Building assets');
    done();
});