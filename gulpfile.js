/**
 * node的module遵循commonJS规范
 * 
 * gulp 通过文件筛选, 得到一批文件, 进行管道传输, 运往目的地
 * 
 */
const gulp = require("gulp");
const { task, src, dest, watch, series, parallel, } = gulp;
const del = require("del");
const rev = require("gulp-rev"); // 给资源文件加上md5命名
const revReplace = require("gulp-rev-replace"); // 解密md5命名
const livereload = require("gulp-livereload"); // 自动刷新页面
const webserver = require("gulp-webserver");

// 目录地址
const outputDir = "./build";
const outputStaticDir = "static/";
const outputJsDir = outputDir + "/static";
const outputImagesDir = outputDir + "/static/images";
const outputScrampDir = outputDir + "/_srcmap";
const outputScrampJsDir = outputScrampDir + "/_rev/js";
const outputScrampStyleDir = outputScrampDir + "/_rev/style";
const outputScrampImagesDir = outputScrampDir + "/_rev/images";

// globs 通配符
const exlucdeFiles = ["**/*", "!**/node_modules{,/**}", "!./node_modules", "!gulpfile.js", "!.gitignore", "!package.json"];
const jsSourceFiles = outputStaticDir + "/**/*.js";
const styleSourceFiles = outputStaticDir + "/**/*.css";
const imagesSourceFiles = [outputStaticDir + "/**/*.jpg", outputStaticDir + "/**/*.png", outputStaticDir + "/**/*.gif"];
const htmlSourceFiles = ["./**/*.html", "!**/node_modules/**/*.html"];

task("exclude", function() {
    return src(exlucdeFiles);
});

// 修改了node-modules/gulp-rev/index.js
// mainfest增加了一个参数配置, pwd_base, 给目标映射路径增加目录前缀
task("js", function() {
    return src(jsSourceFiles)
        .pipe(rev())
        .pipe(dest(outputJsDir))
        .pipe(rev.manifest())
        .pipe(dest(outputScrampJsDir));
});

task("style", function() {
    return src(styleSourceFiles)
        .pipe(rev())
        .pipe(dest(outputJsDir))
        .pipe(rev.manifest())
        .pipe(dest(outputScrampStyleDir));
});

task("images", function() {
    return src(imagesSourceFiles)
        .pipe(rev())
        .pipe(dest(outputImagesDir))
        .pipe(rev.manifest())
        .pipe(dest(outputScrampImagesDir));
});

task("revHtml", function() {
    let manifestFile = src(["build/_srcmap/**/*.json"]);

    // modifyUnreved 和 modifyReved 是根据 manifestFile 获取到的值

    // 获取在html中引入的资源文件名子
    // 例如: 在json文件中 "demo/01/index.js": "demo/01/index-2dbf12fa66.js"
    // 则filename="demo/01/index.js"
    // 通过filenmae.split("/")将字符串转为数组, 且返回最后一个项index.js
    // 获取键
    let modifyUnreved = function(filename) {
        filename = filename.split("/");
        filename = filename[filename.length - 1];
        return filename;
    };

    // 获取文件名
    // 例如: 在json文件中 "demo/01/index.js": "demo/01/index-2dbf12fa66.js"
    // 要返回的就是index-2dbf12fa66.js
    // 从而将html<script src="./demo/01/index.js"></script>修改为
    // <script src="./demo/01/index-2dbf12fa66.js"></script>
    // 获取值
    let modifyReved = function(filename) {
        filename = filename.split("/");
        filename = filename[filename.length - 1];
        return filename;
    }

    return src(htmlSourceFiles)
        .pipe(revReplace({
            manifest: manifestFile,
            modifyUnreved: modifyUnreved, // 更改在html中引入的资源文件名
            modifyReved: modifyReved,
        }))
        .pipe(dest(outputDir));
});

task("watch", function() {
    livereload.listen();
    const watchFn = function(files) {
        // console.log(files);
        watch(files, function(event) {
            if(event.type == "changed") {
                livereload.changed(event.path);
            }
        });
    };
    [jsSourceFiles, styleSourceFiles, htmlSourceFiles].forEach(function(files) {
        watchFn(files);
    });
});

task("webServer", function() {
    return src("./")
        .pipe(webserver({
            host: 'localhost',
            port: '8900',
            livereload: true,
            open: './index.html',
            directoryListing: {
                enable: true,
                path: './'
            },
        }));
});

task("clean", function() {
    return del([outputDir]);
});

// production
task("build", 
    series("clean",
        parallel("exclude", "js", "style",),
        "revHtml",
    )
);

// development
// parallel 是并联, 同时进行
// series 是串联, 相继执行
task("default", 
    series("clean", "exclude", 
        parallel("js", "style",),
        "webServer", "revHtml",
    )
);