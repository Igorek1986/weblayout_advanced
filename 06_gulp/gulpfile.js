import pkg from "gulp";
const { src, dest, series, parallel, watch } = pkg;
import concat from "gulp-concat";
import htmlMin from "gulp-htmlmin";
import autoprefixes from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import svgSprite from "gulp-svg-sprite";
import image from "gulp-image";
import babel from "gulp-babel";
import _uglify from "gulp-uglify-es";
const uglify = _uglify.default;
import notify from "gulp-notify";
import sourcemaps from "gulp-sourcemaps";
import { deleteAsync } from "del";
import gulpif from "gulp-if";
import _browserSync from "browser-sync";
const browserSync = _browserSync.create();
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV;

const isDev = () => env === "dev";

const isProd = () => env === "prod";

const clean = () => {
  return deleteAsync(["dist"]);
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist"));
};

const styles = () => {
  return src("src/styles/**/*.css")
    .pipe(gulpif(isDev(), sourcemaps.init()))
    .pipe(concat("main.css"))
    .pipe(
      gulpif(
        isProd(),
        autoprefixes({
          cascade: false,
        }),
      ),
    )
    .pipe(
      cleanCSS({
        level: 2,
      }),
    )
    .pipe(gulpif(isDev(), sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      gulpif(
        isProd(),
        htmlMin({
          collapseWhitespace: true,
        }),
      ),
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

const scripts = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(gulpif(isDev(), sourcemaps.init()))
    .pipe(
      gulpif(
        isProd(),
        babel({
          presets: ["@babel/preset-env"],
        }),
      ),
    )
    .pipe(concat("app.js"))
    .pipe(
      gulpif(
        isProd(),
        uglify({
          toplevel: true,
        }).on("error", notify.onError()),
      ),
    )
    .pipe(gulpif(isDev(), sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/images/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      }),
    )
    .pipe(dest("dist/images"));
};

const images = () => {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.png",
    "src/images/*.svg",
    "src/images/**/*.jpeg",
  ])
    .pipe(gulpif(isProd(), image()))
    .pipe(dest("dist/images"));
};

const watchers = (done) => {
  watch("src/**/*.html", htmlMinify);
  watch("src/styles/**/*.css", styles);
  watch("src/images/svg/**/*.svg", svgSprites);
  watch("src/images/**/*.{jpg,png,svg,jpeg}", images);
  watch("src/js/**/*.js", scripts);
  watch("src/resources/**", resources);
  done();
};

const build = series(
  clean,
  parallel(resources, htmlMinify, scripts, styles, images, svgSprites),
);

const serve = series(build, parallel(watchFiles, watchers));

export { serve, build, styles, htmlMinify, scripts, clean };
export default series(
  clean,
  resources,
  htmlMinify,
  scripts,
  styles,
  images,
  svgSprites,
  watchFiles,
);
