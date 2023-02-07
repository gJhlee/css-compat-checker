# css-compat-checker

css 브라우저 버전 호환성 체크 툴입니다.

데이터는 하드코딩 되어있습니다.

## 파일 구성

```
- index.js    // 메인스크립트
- compat.csv  // 호환성 데이터
- test.css    // 테스트 css
```

## 설치 및 실행

```bash
$ git clone https://github.com/gJhlee/css-compat-checker.git
$ cd css-compat-checker
$ npm i
$ npm start


** Check 1278 rules. 115 properties

** Supported properties **
        |  support version  |     property
--------+-------------------|----------------
edge    |   79              |  resize
firefox |   69              |  user-select
chrome  |   57              |  align-items
safari  |   12.1            |  text-decoration-line
opera   |   44              |  align-items

** Not supported properties **
> src
> text-rendering
> -webkit-border-radius
> -moz-border-radius
> -o-border-radius
> -webkit-box-shadow
> -moz-box-shadow
> -webkit-transition
> -moz-transition
> -o-transition
> -webkit-text-fill-color
```

# 데모사이트

Svelte로 만들어졌습니다 :)

https://rory0v.csb.app/