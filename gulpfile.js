var gulp = require('gulp'),
    minCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'); // Подключаем библиотеку для удаления файлов и папок

   
   
   
    gulp.task('sass', function() { // Создаем таск Sass
        return gulp.src('app/sass/**/*.sass') // Берем источник
            .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
            .pipe(gulp.dest('app/css')) // Выгружаем результатs в папку app/css
            .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });
    
    gulp.task('browser-sync', function() { // Создаем таск browser-sync
        browserSync({ // Выполняем browserSync
            server: { // Определяем параметры сервера
                baseDir: 'app' // Директория для сервера - app
            },
            notify: false // Отключаем уведомления
        });
    });
    
    
    gulp.task('code', function() {
        return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
    });

    gulp.task('mincss', function() {
        return gulp.src('app/css/**/*.css')
        .pipe(minCSS())
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/css/'));
    });

    gulp.task('clean', async function() {
        return del.sync('dist'); // Удаляем папку dist перед сборкой
    });
    


    gulp.task('watch', function() {
        gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')), // Наблюдение за sass файлами
        gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    });
    
    gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));

    // - очистка папки
    // - минификация (css, js)
    // - перемещение
    
