import { transform } from 'lightningcss';

let { code, map } = transform({
  filename: 'style.css',
  code: Buffer.from('.foo { text-shadow: 0 2px 0 rgba(0, 0, 0, 0.05); }'),
  minify: true,
  sourceMap: true,
  targets:  {
    android: 6,
    ios_saf: 12,
  },
  visitor: {
    Length(len) {
      if (len.unit === 'px') {
        return {
          unit: 'rem',
          value: len.value / 100,
        };
      }
    },
  },
});

console.log(code.toString());

// .foo{text-shadow:0 .02rem 0 0 rgba(0,0,0,.05)}
