import { addEntry, clearAllEntries, getAllEntries } from "./src/db/diary-service";
import { DiaryEntry } from "./src/types/types";
import { daystringToDate, getTodayDaystring } from "./src/utils/date-utils";

export const test = async () => {
  // 短日记 - 简单记录
  const entry1: DiaryEntry = {
    id: 10086,
    daystring: getTodayDaystring(),
    content: "晴天，心情不错。",
  };

  // 中等长度日记 - 日常记录
  const entry2: DiaryEntry = {
    id: 10087,
    daystring: "2025-06-03",
    content: "今天完成了React Native应用的调试版本配置，学会了如何让调试版和发布版同时安装在设备上。技术上又有了新的进步，感觉很有成就感。",
  };

  // 长日记 - 详细记录
  const entry3: DiaryEntry = {
    id: 10088,
    daystring: "2025-06-02",
    content: "今天是周末，早上睡到自然醒，感觉特别舒服。上午去了附近的公园散步，看到很多人在晨练，老人们在打太极，年轻人在跑步，小朋友们在玩耍，整个公园充满了生机和活力。\n\n下午和朋友约了咖啡，我们聊了很多关于工作和生活的话题。他最近换了新工作，薪水涨了不少，但压力也增加了。我们讨论了如何在工作和生活之间找到平衡，这个话题让我思考了很久。\n\n晚上回家后，我花了一些时间整理房间，把一些不需要的东西收拾起来。整理完后感觉心情都变得清爽了，果然环境会影响心情。最后看了一部电影《肖申克的救赎》，虽然看过很多遍，但每次都会有新的感悟。",
  };

  // 极短日记 - 一句话
  const entry4: DiaryEntry = {
    id: 10089,
    daystring: "2025-06-01",
    content: "雨天。",
  };

  // 中短日记 - 工作记录
  const entry5: DiaryEntry = {
    id: 10090,
    daystring: "2025-05-31",
    content: "项目终于上线了！虽然过程中遇到了很多bug，但团队合作很默契，最终按时完成了。庆祝一下！",
  };

  // 长日记 - 旅行记录
  const entry6: DiaryEntry = {
    id: 10091,
    daystring: "2025-05-30",
    content: "今天去了趟西湖，真的是人间天堂。早上七点就出发了，想要避开人群。到达的时候湖面上还有薄薄的雾气，远山如黛，近水如镜，美得像一幅画。\n\n沿着苏堤慢慢走，两边都是垂柳，微风吹过，柳絮飞舞。路上遇到了很多摄影爱好者，他们背着长枪短炮，专业的设备让人羡慕。我用手机也拍了不少照片，虽然技术一般，但记录下美好的瞬间就足够了。\n\n中午在楼外楼吃了正宗的杭帮菜，西湖醋鱼、龙井虾仁、叫化鸡，每一道菜都很有特色。价格虽然不便宜，但在这样的环境下用餐，也算是一种享受。\n\n下午租了一条小船，在湖中央静静地划行。从湖心看岸边的景色又是另一番风味，雷峰塔在夕阳下显得格外庄严。船夫是个老杭州人，给我讲了很多关于西湖的传说故事，白娘子和许仙的爱情故事在这样的环境下听来特别有韵味。",
  };

  // 短日记 - 心情记录
  const entry7: DiaryEntry = {
    id: 10092,
    daystring: "2025-05-29",
    content: "有点累，但很充实。明天继续加油！",
  };

  // 中等日记 - 学习记录
  const entry8: DiaryEntry = {
    id: 10093,
    daystring: "2025-05-28",
    content: "今天学习了TypeScript的高级类型，泛型、映射类型、条件类型等概念终于理解了。编程语言真的很神奇，每掌握一个新概念就感觉打开了一扇新的门。练习了几个小项目，代码写得越来越优雅了。",
  };

  await addEntry(entry1.content, entry1.daystring);
  await addEntry(entry2.content, entry2.daystring);
  await addEntry(entry3.content, entry3.daystring);
  await addEntry(entry4.content, entry4.daystring);
  await addEntry(entry5.content, entry5.daystring);
  await addEntry(entry6.content, entry6.daystring);
  await addEntry(entry7.content, entry7.daystring);
  await addEntry(entry8.content, entry8.daystring);

  console.log("示例日记已添加 - 包含长短不同的8篇日记");

  const allEntries = await getAllEntries();
  console.log(`总共添加了 ${allEntries.length} 篇日记`);
};
