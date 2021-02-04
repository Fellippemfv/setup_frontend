const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const { task } = require("gulp");

//Functions
function compilaSass() {//function for sass
    return gulp
    .src("Develop/scss/*.scss")
    .pipe(sass({
        outputStyle: "compressed" 
    }))
    .pipe(autoprefixer({ 
        cascade: false
    }))
    .pipe(gulp.dest("Product/css/"))
    .pipe(browserSync.stream());
}

function gulpJS() {//function for js
    return gulp
    .src("Develop/js/*.js")
    .pipe(concat("main.js")) 
    .pipe(babel({
        presets: ["@babel/env"] 
    }))
    .pipe(uglify())
    .pipe(gulp.dest("Product/js/"))
    .pipe(browserSync.stream());
}

function browser() {//function for browser
    browserSync.init({
        server: {
            baseDir: "./product"
        }
    });
}

function watch() {//Automation function
    gulp.watch("css/scss/*.scss", compilaSass);
    gulp.watch("js/main/*.js", gulpJS);
    gulp.watch("*.html").on("change", browserSync.reload);
}

//Tasks
gulp.task("sass", compilaSass);//compile sass/css

gulp.task("mainjs", gulpJS);//compile js

gulp.task("browser-sync", browser);//creates server and updates browser

gulp.task("watch", watch);//notes any update

gulp.task("default", gulp.parallel("watch", "browser-sync", "sass", "mainjs"));//set default task