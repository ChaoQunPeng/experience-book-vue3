<template>
  <div class="app-explain">
    <p>
      我们会喜欢玩游戏其中一个原因就是反馈快。当我们击杀怪物后，马上就能获得装备，经验或者是升级，非常直观。
    </p>

    <p>
      而学习的话需要一个长时间的积累才能看到成果，而且每次学习完之后我们不能感觉到像玩游戏一样“打了怪，赚了经验,升了级”。
      也无法直观的对自己的能力有一个“认识”。不知道自己属于哪一个“级别”。
    </p>

    <p class="font-bold">
      经验本（Exp-Book）就是想做这件事，其实际上是一个笔记应用，但增加了一个等级设定，希望尽可能的把所学的知识经验可视化。理论上借鉴了
      <a target="_blank" href="https://www.zybuluo.com/flysmart/note/213521"> 德雷福斯模型 </a>
      和
      <a
        href="https://baike.baidu.com/item/%E4%B8%80%E4%B8%87%E5%B0%8F%E6%97%B6%E5%AE%9A%E5%BE%8B/8255848?fr=aladdin"
        target="_blank"
      >
        一万小时定律
      </a>
      以及后续可能会加入的
      <a
        target="_blank"
        href="https://zh.wikipedia.org/zh-hans/%E9%81%97%E5%BF%98%E6%9B%B2%E7%BA%BF"
      >
        艾宾浩斯记忆曲线
      </a>
      。
    </p>

    <h3 class="mb-15">等级划分</h3>

    <div>
      <p>
        <span class="bg-black-85 text-white px-6 py-4 rounded">新手</span>
        （novice）
      </p>
      <p>分为1星到5星。总共经验为1000exp，每个等级200点经验</p>
      <p>黑色上蒙着一个浅白色，象征着一个小白要在深不见底的知识中探索了。</p>
    </div>

    <div>
      <p>
        <span class="bg-blue text-white px-6 py-4 rounded">高级新手</span>
        （advanced beginner）
      </p>
      <p>分为1星到5星。总共经验为2000exp，每个等级400点经验</p>
    </div>

    <div>
      <p>
        <span class="bg-red text-white px-6 py-4 rounded">胜任者</span>
        （competent）
      </p>
      <p>分为1星到5星。总共经验为3000exp，每个等级600点经验</p>
      
    </div>

    <div>
      <p>
        <span class="bg-purple text-white px-6 py-4 rounded">精通者</span>
        （proficient）
      </p>
      <p>分为1星到5星。总共经验为4000exp，每个等级800点经验</p>
    </div>

    <div>
      <p>
        <span class="bg-black text-white px-6 py-4 rounded">专家</span>
        （expert）
      </p>
      <p>无等级，此App的尽头 ヽ(ー_ー)ノ</p>
    </div>

    <h3>最后</h3>

    <div>
      <p>
        每1个小时对应1点经验，10000个小时就是10000点经验。按照一万小时定律，这正是成为一个专家级人物需要的至少时间(经验)。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// const colorMaps = {
//   新手: 'black-85',
//   熟练者: 'blue',
//   胜任者: 'red',
//   精通者: 'purple',
//   专家: 'black'
// };
</script>

<style lang="less">
.app-explain {
  line-height: 1.5;
  font-size: 14px;
}
</style>
