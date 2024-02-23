<template>
  <div class="app-explain">
    <p>
      玩游戏容易上瘾的其中一个原因就是反馈快。当我们击杀怪物后，马上就能获得装备、获得经验提升升级，非常直观。
    </p>

    <p>
      而学习的话需要长时间积累才能看到成果，每次学习完一个知识点之后我们不能像玩游戏一样感受到“打了怪，赚了经验,升了级”。
      也无法直观的对自己的能力有一个“认识”。不知道自己属于哪一个“级别”。
    </p>

    <p class="font-bold">
      经验本（Exp-Book）就是想做这件事，希望尽可能的把所学的知识经验可视化。其实际上是一个笔记应用，但增加了一个等级设定。理论上借鉴了
      <a target="_blank" href="https://zhuanlan.zhihu.com/p/458527504"> 德雷福斯模型 </a>
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
        href="https://baike.baidu.com/item/%E9%81%97%E5%BF%98%E6%9B%B2%E7%BA%BF/7278665?fr=ge_ala"
      >
        艾宾浩斯遗忘曲线
      </a>
      。
    </p>

    <h3 class="mb-15 mt-20">等级划分</h3>

    <div>
      <p>
        <span class="bg-blue text-white px-6 py-4 rounded">新手</span>
        （novice）
      </p>
      <p>分为<b>1星</b>到<b>5星</b>。总共经验为1000exp，每个等级200点经验</p>

      <ul class="pl-15 text-black-65">
        <li>严格遵守规则或计划</li>
        <li>几乎无法感知情境</li>
        <li>无法酌情判断</li>
      </ul>
    </div>

    <div class="mt-30">
      <p>
        <span class="bg-green text-white px-6 py-4 rounded">熟练者</span>
        （advanced beginner）
      </p>
      <p>分为<b>1星</b>到<b>5星</b>。总共经验为2000exp，每个等级400点经验</p>

      <ul class="pl-15 text-black-65">
        <li>依赖基于属性或不同侧面的行动准则</li>
        <li>情境感知依然有限</li>
        <li>对工作的不同方面，分开处理并且给予同等重要性</li>
      </ul>
    </div>

    <div class="mt-30">
      <p>
        <span class="bg-red text-white px-6 py-4 rounded">胜任者</span>
        （competent）
      </p>
      <p>分为<b>1星</b>到<b>5星</b>。总共经验为3000exp，每个等级600点经验</p>

      <ul class="pl-15 text-black-65">
        <li>能应对多线程活动或丰富的信息量</li>
        <li>能从长期目标角度（至少部分）审视行动</li>
        <li>有意识、刻意地制定计划</li>
        <li>将流程标准化和常规化</li>
      </ul>
    </div>

    <div class="mt-30">
      <p>
        <span class="bg-purple text-white px-6 py-4 rounded">精通者</span>
        （proficient）
      </p>
      <p>分为<b>1星</b>到<b>5星</b>。总共经验为4000exp，每个等级800点经验</p>

      <ul class="pl-15 text-black-65">
        <li>从整体把握全局，而不是观察各个方面</li>
        <li>了解情境中最重要的事</li>
        <li>感知情境与正常模式的偏差</li>
        <li>决策越来越轻松</li>
        <li>使用原则（maxims）指导行动，其含义因情况而异</li>
      </ul>
    </div>

    <div class="mt-30">
      <p>
        <span class="bg-black text-white px-6 py-4 rounded">专家</span>
        （expert）
      </p>
      <p>无等级，此App的尽头 ヽ(ー_ー)ノ</p>

      <ul class="pl-15 text-black-65">
        <li>不再依赖规则、行动准则、原则</li>
        <li>基于深刻、潜默的直觉把握情境</li>
        <li>出现新情况或发生问题才使用分析法</li>
        <li>不再依赖规则、行动准则、原则</li>
        <li>看到未来可能的愿景</li>
      </ul>
    </div>

    <h3 class="mt-30">最后</h3>

    <div>
      <p>
        每1个小时对应1点经验，10000个小时就是10000点经验。按照一万小时定律，这正是成为一个专家级人物需要的至少时间(经验)。
      </p>

      <p class="leading-7">
        当然也不用每个技能都往专家升，人的精力是有限的。根据
        <a href="https://zhuanlan.zhihu.com/p/458527504" target="_blank"> 德雷福斯模型 </a>
        ，大多数人都处于熟练者和胜任者之间，在这个等级范围内就能处理日常工作中的内容了。即
        <span class="bg-blue text-white px-6 py-4 rounded"> 熟练者 </span>
        2-3星左右。大多数时间只专精一到两个技能。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.app-explain {
  line-height: 1.5;
  font-size: 14px;
}

p {
  margin-bottom: 10px;
}
</style>
