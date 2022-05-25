"use strict";

module.exports = {
  extension: ["ts"], // 该项目使用 typescript 来编写，只需要关注 ts
  spec: ["src/**/*.spec.ts"], // mocha 会将这些文件当作测试文件
  "watch-files": ["src/**/*.ts"], // mocha 会在 watch 模式下检察这些文件，一时变量就会重新跑测试用例
  require: "ts-node/register",
};
