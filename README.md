<!--
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2024-02-22 18:01:44
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2024-02-27 15:11:01
 * @FilePath: /experience-book-vue3/README.md
 * @Description:
-->

## 经验本 （exp-book）

![图片](/preview-image/1.png)
![图片](/preview-image/2.png)
![图片](/preview-image/3.png)

目前主要功能均已完成，正在迭代中

### 待办

- [ ] 缺省页
- [ ] 笔记标签
- [ ] 展开收起侧边栏
- [ ] 优化成功获取经验交互（使用图表的水波纹图）
- [ ] 回收站功能
- [ ] 路径图，技能树，预设每个笔记的经验
- [ ] 优化编辑器的字体样式展示-改为原始样式

### 已完成
- [x] 容器启动顺序 healthCheck 优化
- [x] 修改项目说明的颜色
- [x] 拖动技能
- [x] 待学习筛选展示
- [x] 优化经验统计图表柱状图颜色， 柱颜色跟随等级来
- [x] 富文本编辑器直接粘贴图片
- [x] 上传接口开发
- [x] 笔记数量统计-堆叠柱状图
- [x] 笔记改为逻辑删除
- [x] github pages 搭建
- [x] 黑白主题切换
- [x] 优化编辑详情页央视
- [x] 白色主题
- [x] 深色模式
- [x] 完善项目说明
- [x] 优化技能卡片的三个图标
- [x] 图表统计
- [x] 项目说明
- [x] 菜单图标添加
- [x] 经验转化率、总经验、笔记数量展示
- [x] 获得经验的框允许为 0，在输入框中提示相应信息

## 构建镜像命令 roamgunner
docker build -t roamgunner/exp-book-vue3-web .

## 构建正式应用
docker compose -f compose.yaml -p exp-book-app up -d
