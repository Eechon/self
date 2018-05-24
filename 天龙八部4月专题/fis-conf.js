var version = '';
var path = '/zt2018/tlbb04/';

fis.set('project.files', ['*.html', 'map.json']);
fis.set('project.exclude', ['tpl/**.tmpl', '_dest/**']);

fis.hook('commonjs', {
    baseUrl: './src/modules',
    extList: ['.js']
});

// 开启同名依赖
fis.match('/src/modules/**', {
    useSameNameRequire: true
});

// fis.match('/lib/**.js', {
//     release: version + '/$1',
//     packTo: 'lib.js'
// });

// 允许你在 js 中直接 require css+文件
// fis.match('*.{js,es}', {
//     preprocessor: [
//         fis.plugin('js-require-file'),
//         fis.plugin('js-require-css', {
//             mode: 'dependency'
//         })
//     ]
// });

/*设置发布路径*/
fis.match(/^\/src\/(.*)/i, {
    release: version + '/$1', 
    // url: version + '/$1'
});

// 配置图片压缩
fis.match('**.png', {
    optimizer: fis.plugin('png-compressor', {
        type: 'pngquant'
    })
});

/*Sprite背景图移到staticPub/images*/
fis.match(/^\/sass\/(.*\.(png|jpg|gif|jpeg))$/i, {
    release: 'img/sprite/$1',
    url: 'img/sprite/$1'
});

fis.match(/^\/src\/sass\/((.*)\.(css|less|scss|sass))$/i, {
    rExt: '.css',
    useSprite: true,
    parser: fis.plugin('node-sass'),
    postprocessor: fis.plugin('autoprefixer', {
        browsers: ['> 1%', 'last 2 versions'],
        cascade: true
    }),
    release: version + '/css/$1', 
    url: './css/$1'
}).match('_*.scss', {
    release: false
})

/*对CSS中的图片进行合并，包括html中的内联样式*/
fis.match('*.{css,html,tpl}', {
    useSprite: true,
});

fis.match('*.tmpl', {
    isJsLike: true,
    release: false,
    parser: fis.plugin('utc')
})

fis.match(/^\/src\/modules\/(.*\.js)$/i, {
    isMod: true
});

/*css压缩*/
fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});


/*启用 fis-spriter-csssprites 插件*/
fis.match('::package', {
    spriter: fis.plugin('csssprites',{
        margin: 20,
        htmlUseSprite: true,/*开启模板内联css处理*/
        styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig
    }),
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
});

/*图片文件域名配置*/
fis.media('dev').match('*.{jpg,png,jpeg,gif,css,js}', {
    domain: '../../',
});

fis.media('prod').match('*.{jpg,png,jpeg,gif,css,scss,js,woff,ttf,svg,eot}', {
    domain: '//pub.dwstatic.com' + path,
}).match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: {
            resourceType: 'mod',
            js: function (file) {
                return version + 'js/' + file.filename + ".js";
            },
            css: function (file) {
                return version + 'css/' + file.filename + ".css";
            }
        },
        resoucemap: version + 'js/${filepath}_map.js',
    })
}).match('*.js', {
    optimizer: fis.plugin('uglify-js',{
        mangle: {
            except: 'exports, module, require, define'
        }
    })
}).match(/^\/src\/sass\/((.*)\.(css|less|scss|sass))$/i, {
    url: version + 'css/$1',
    optimizer: fis.plugin('clean-css'),
    useHash: true
}).match('sass/(**.png)', {
    release: version + 'img/sprite/$1'
});