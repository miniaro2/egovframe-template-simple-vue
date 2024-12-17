const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: true, // 배포 환경에서도 Source Map 활성화
  css: {
    extract: true, // CSS를 별도 파일로 추출
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 배포 환경 설정
      config.devtool = 'source-map'; // Source Map 활성화
      config.optimization = {
        minimize: true, // 코드 압축 활성화
      };
    } else {
      // 개발 환경 설정 // eval, source-map, inline-source-map, cheap-module-source-map, hidden-source-map
      config.devtool = 'inline-source-map'; // 빠른 Source Map 사용 'eval-source-map'
      config.optimization = {
        minimize: true, // 코드 압축 비활성화
      };
    }
  },
  chainWebpack: config => {
    // Source Map 디버깅을 위한 추가 설정
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env'] = JSON.stringify({
        ...process.env,
        NODE_ENV: process.env.NODE_ENV,
      });
      return definitions;
    });
  },
});
