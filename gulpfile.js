const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

//definir compilação
function compilaSass() {

    //.src("css/scss/**/*.scss") //com varias pastas
    return gulp
    .src("css/scss/*.scss")//de onde tiramos
    .pipe(sass({
        outputStyle: "compressed" //transforma em sass e comprime todo o css gerado
    }))
    .pipe(autoprefixer({ // permite usar webkits automaticamente
        cascade: false
    }))
    .pipe(gulp.dest("css/"))//para onde vai
    .pipe(browserSync.stream());
}

//task do sass
gulp.task("sass", compilaSass);// compila ao digitarmos "gup sass"

//função para unir JS
function gulpJS() {
    return gulp
    .src("js/main/*.js")
    .pipe(concat("main.js")) 
    .pipe(babel({
        presets: ["@babel/env"] 
    }))
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

//task do js
gulp.task("mainjs", gulpJS);

//função para iniciar o browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

//definir task de navegador
gulp.task("browser-sync", browser);

//definir compilamento9 automatico
function watch() {
    gulp.watch("css/scss/*.scss", compilaSass);
    gulp.watch("js/main/*.js", gulpJS);
    gulp.watch("*.html").on("change", browserSync.reload);//atualizar html
}
gulp.task("watch", watch);

//definir task padrão
gulp.task("default", gulp.parallel("watch", "browser-sync", "sass", "mainjs"));