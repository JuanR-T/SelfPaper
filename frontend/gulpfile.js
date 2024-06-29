import gulp from "gulp";
import sass from "gulp-dart-sass";
import rename from "gulp-rename";
import postcss from 'gulp-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

function compileSass() {
    return gulp
        .src("./src/styles/main.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(postcss([tailwindcss, autoprefixer]))
        .pipe(rename("main.css"))
        .pipe(gulp.dest("./src/styles/"));
}

gulp.task("default", gulp.series(compileSass));
gulp.task("watch", function () {
    gulp.watch("./src/styles/**/*.scss", compileSass);
});