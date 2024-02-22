/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-22 12:45:21
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-22 13:19:24
 * @FilePath: /experience-book-vue3/src/utils/exp-helper.ts
 * @Description:
 */

/**
 * @description: 将当前经验解析成各类信息
 * @param {number} totalExp
 * @return {*}
 */
export const getExpPhaseInfo = (totalExp: number) => {
  if (totalExp >= 0 && totalExp < 1000) {
    const expRange = [
      [0, 199],
      [200, 399],
      [400, 599],
      [600, 799],
      [800, 999]
    ];
    return getLevelInfo(totalExp, expRange, '新手');
  } else if (totalExp >= 1000 && totalExp < 3000) {
    const expRange = [
      [1000, 1399],
      [1400, 1799],
      [1800, 2199],
      [2200, 2599],
      [2600, 2999]
    ];
    return getLevelInfo(totalExp, expRange, '熟练者');
  } else if (totalExp >= 3000 && totalExp < 6000) {
    const expRange = [
      [3000, 3599],
      [3600, 4199],
      [4200, 4799],
      [4800, 5399],
      [5400, 5999]
    ];
    return getLevelInfo(totalExp, expRange, '胜任者');
  } else if (totalExp >= 6000 && totalExp < 10000) {
    const expRange = [
      [6000, 6799],
      [6800, 7599],
      [7600, 8399],
      [8400, 9199],
      [9200, 9999]
    ];
    return getLevelInfo(totalExp, expRange, '精通者');
  } else if (totalExp > 10000) {
    const expRange = [[10000, 99999]];

    return getLevelInfo(totalExp, expRange, '专家');
  }
};

/**
 * @description:
 * @param {*} totalExp
 * @param {*} expRange
 * @param {*} levelName
 * @param {*} levelExp 每个等级之间的经验间隔
 * @return {*}
 */
const getLevelInfo = (totalExp: number, expRange: Array<any>, levelName: string) => {
  const data = {
    name: levelName,
    level: 0, // 当前阶段的等级
    // 当前等级的经验。 例如：总经验200，当前等级经验就是200-199=1
    currentExp: 0,
    // 当前经验范围
    range: [],
    // 当前等级经验上限
    levelExpCap: 0,
    color: ''
  };

  interface SkillLevels {
    新手: string;
    熟练者: string;
    胜任者: string;
    精通者: string;
    专家: string;
    [key: string]: string; // 索引签名，允许使用任意字符串作为键
  }

  const colorMaps: SkillLevels = {
    新手: 'blue',
    熟练者: 'green',
    胜任者: 'red',
    精通者: 'purple',
    专家: 'black'
  };

  for (let i = 0; i < expRange.length; i++) {
    if (totalExp >= expRange[i][0] && totalExp <= expRange[i][1]) {
      data.level = i + 1;
      data.range = expRange[i];
      data.color = colorMaps[levelName];

      if (i == 0) {
        data.currentExp = totalExp - expRange[i][0];
      } else {
        data.currentExp = totalExp - (expRange[i][0] - 1);
      }

      if (levelName == '专家') {
        data.levelExpCap = 99999;
      } else {
        data.levelExpCap = data.range[1] - data.range[0];
      }
    }
  }

  return data;
};

/**
 * @description: 根据总经验获取颜色色值
 * @param { number } totalExp 总经验值
 * @return {*}
 */
export const resolveColorValue = (totalExp: number) => {
  const info = getExpPhaseInfo(totalExp);
  const root = getComputedStyle(document.documentElement);

  const colorMaps: any = {
    black: root.getPropertyValue('--eb-color-black'),
    'black-85': root.getPropertyValue('--eb-color-black-85'),
    blue: root.getPropertyValue('--eb-color-blue'),
    red: root.getPropertyValue('--eb-color-red'),
    green: root.getPropertyValue('--eb-color-green'),
    purple: root.getPropertyValue('--eb-color-purple')
  };

  return colorMaps[info?.color as string];
};

// function identity<T>(arg: T): T {
//   return arg;
// }

// // 使用泛型函数
// let result = identity<string>('Hello');
// console.log(result); // 输出："Hello"

// let result2 = identity(123);
// console.log(result2); // 输出：123