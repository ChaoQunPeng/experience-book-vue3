/*
 * @Date: 2023-08-27 23:32:56
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-08 12:34:39
 * @FilePath: /experience-book-vue3/src/utils/subject.ts
 * @Description: 通用的发布订阅
 */

/**
 *
   //  发布事件
    click() {
        this.$qf.Subject.publish('事件名', '额外参数，任意类型');
    }

    // 订阅
    this.$qf.Subject.subscribe('事件名', this.fn1);

    this.$qf.Subject.subscribe('事件名', data => {
      console.log(2, data);
    });
    
    // 取消订阅
    this.$qf.Subject.unsubscribe('事件名');
 */

/**
 * @description: 目标者类
 */
export class Subject {
  subjectMaps: any = {};

  constructor() {
    // this.subjectMaps = {};
  }

  /**
   * @description: 添加订阅
   * @param {*} observer
   * @return {*}
   */
  subscribe(eventName: string, fn: Function) {
    if (!this.subjectMaps[eventName]) {
      this.subjectMaps[eventName] = [];
    }

    this.subjectMaps[eventName].push(fn);
  }

  /**
   * @description: 取消订阅
   * @param {*} observer
   * @return {*}
   */
  unsubscribe(eventName: string, observer?: object) {
    if (observer) {
      let idx = this.subjectMaps[eventName].findIndex((item: any) => item === observer);
      idx > -1 && this.subjectMaps[eventName].splice(idx, 1);
    } else {
      this.subjectMaps[eventName] = [];
    }
  }

  /**
   * @description: 发布
   * @return {*}
   */
  publish(eventName: string, data?: object) {
    if (!this.subjectMaps[eventName]) {
      return;
    }

    this.subjectMaps[eventName].forEach((fn: Function) => {
      fn(data);
    });
  }
}

const subject = new Subject();

export { subject };
