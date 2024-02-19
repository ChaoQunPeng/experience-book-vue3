/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-19 13:52:45
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-19 14:40:06
 * @FilePath: /experience-book-vue3/src/layout/use-app.ts
 * @Description: 应用hook
 */

/**
 * @description: 应用本地存储通用函数
 * @return {*}
 */
export const useAppStorage = () => {
  const EB_THEME_KEY = 'eb-theme';

  type Theme = 'dark-theme' | 'light-theme';

  const initTheme = () => {
    if (localStorage.getItem(EB_THEME_KEY) == undefined) {
      localStorage.setItem(EB_THEME_KEY, 'dark-theme');
    } else {
      const local = getTheme() as string;

      document.documentElement.classList.replace(document.documentElement.className, local);
    }
  };

  const getTheme = () => {
    return localStorage.getItem(EB_THEME_KEY);
  };

  const setTheme = (theme: Theme) => {
    const oldCurrent = getTheme() as string;

    const newCurrent = oldCurrent == 'dark-theme' ? 'light-theme' : 'dark-theme';

    document.documentElement.classList.replace(oldCurrent, newCurrent);

    localStorage.setItem(EB_THEME_KEY, theme);
  };

  return {
    /**
     * 初始化
     */
    initTheme,
    /**
     * 获取
     */
    getTheme,
    /**
     * 设置
     */
    setTheme
  };
};
