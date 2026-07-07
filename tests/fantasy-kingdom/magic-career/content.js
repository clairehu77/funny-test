const questions = [
  {
    text: "毕业分流前夜，学院要求每个见习法师提交一份“未来方向申请”。你看着空白表格，第一反应是：",
    options: {
      A: "申请前线实战训练，真正的危险不会等人慢慢准备。",
      B: "申请结界与防护方向，先让事故没有机会发生。",
      C: "申请治疗院实习，至少先学会把人从糟糕结果里拉回来。",
      D: "申请古代符文研究，答案往往藏在旧纸堆里。",
      E: "申请城市魔法工程，咒语最好能照亮街道、烧开热水、修好屋顶。",
      F: "暂时不填，想先看看有没有表格以外的路。"
    }
  },
  {
    text: "实验课上，一个同学的召唤阵失控，半透明的火鹿冲进走廊。导师还没赶到，你会：",
    options: {
      A: "直接拦在走廊口，用最快的压制咒把它逼停。",
      B: "先展开临时结界，把其他学生和火鹿隔开。",
      C: "检查有没有人受伤，优先处理被灼伤的同学。",
      D: "观察召唤阵残留纹路，判断失控原因。",
      E: "注意到火鹿像是在躲避什么，尝试用低声安抚让它停下。",
      F: "留下一小段异常火焰样本，之后追查它为什么能穿过防护线。"
    }
  },
  {
    text: "你的导师问：“你觉得一个法师最该学会什么？”你会回答：",
    options: {
      A: "在危险来临时比别人更快做决定。",
      B: "在所有人慌乱之前，看见风险从哪里来。",
      C: "记住每个咒语落到人身上是什么感觉。",
      D: "不满足于会用，还要知道它为什么能用。",
      E: "把复杂咒语变成普通人也能使用的东西。",
      F: "看懂人心和局势，很多灾难从误会开始。"
    }
  },
  {
    text: "你在图书馆深处发现一本没有编号的书。它没有诱惑你，只在封面浮出一句话：“我可以解释学院删掉的那一页。”你会：",
    options: {
      A: "立刻交给封印员，未登记的书不该被擅自打开。",
      B: "先记录外观、纸张和魔力波动，再决定是否上报。",
      C: "查阅借阅记录，看谁曾经试图隐藏它。",
      D: "打开第一页，但准备好隔离咒和反制符。",
      E: "记下它出现的位置，晚上再回来确认是否有人跟踪。",
      F: "问它：“你解释完以后，希望我做什么？”"
    }
  },
  {
    text: "一个朋友因为天赋不稳定，被学院建议转去低阶辅助岗位。你知道他其实只是缺少训练资源。你会：",
    options: {
      A: "帮他争取一次公开重测，让所有人看到结果。",
      B: "私下陪他练习，先把失控问题降下来。",
      C: "研究他的魔力结构，找出学院测试忽略的部分。",
      D: "找几个同学一起给他做临时训练计划。",
      E: "带他去城里接几个小委托，用真实问题证明能力。",
      F: "问他还想不想留在这套分流体系里。"
    }
  },
  {
    text: "王国魔法署来学院招人，承诺资源、头衔和最快晋升。代价是毕业后必须服从调派。你会：",
    options: {
      A: "接受，前线和危机现场最能磨练法师。",
      B: "接受，但要求被分到灾害防护或民生项目。",
      C: "先询问调派对象和拒绝条款，不把名字随便交出去。",
      D: "代表同学和魔法署谈条件，至少把不公平条款改掉。",
      E: "拒绝，力量一旦和征召绑定，就很难只救自己想救的人。",
      F: "表面不签，私下调查魔法署为什么突然扩招。"
    }
  },
  {
    text: "学院外的森林要修新路，施工队说附近魔兽“阻碍发展”。你被派去评估风险。你会：",
    options: {
      A: "判断魔兽攻击能力，先准备驱离方案。",
      B: "标出巢穴、幼兽路线和施工高危区，要求暂停部分工程。",
      C: "和施工队、村民、魔兽饲育员一起重新规划路线。",
      D: "设计一套低干扰警戒装置，让人和魔兽都能提前避开。",
      E: "询问附近村民过去是否依赖这些魔兽维持生态。",
      F: "调查这条路是否真的必要，还是某个贵族想缩短去猎场的时间。"
    }
  },
  {
    text: "城西旧区的供暖符文老化，学院只愿意派人做一次“象征性维护”。居民已经开始自己乱接魔力管线。你会：",
    options: {
      A: "先封掉最危险的管线，避免整条街爆掉。",
      B: "组织治疗和临时安置，老人和孩子不能等预算审批。",
      C: "重新设计供暖符文，让它以后可以低成本维护。",
      D: "把旧区问题写成报告，逼学院和市政厅公开预算。",
      E: "找民间工匠合作，用可用材料先做出能撑过冬天的方案。",
      F: "追查符文老化是否和某个被封存实验有关。"
    }
  },
  {
    text: "你在星象课上发现一组不该出现的暗星。教授说那只是观测误差，要求你别在毕业评审前添乱。你会：",
    options: {
      A: "接受教授判断，先不影响毕业流程。",
      B: "继续观测三晚，用数据证明它是否存在。",
      C: "找不同学派的老师交叉验证，避免自己看错。",
      D: "先把观测结果交给结界部门，万一是真的至少能提前准备。",
      E: "怀疑学院早就知道，去查被删改的星图档案。",
      F: "如果所有人都不愿听，就把预警刻到钟楼能看见的地方。"
    }
  },
  {
    text: "分流评审开始前，学院给你几个实习名额。你只能优先选择两个方向。你会选：",
    options: {
      A: "前线法师团和风暴边境驻守点。",
      B: "治疗院和灾后重建署。",
      C: "古代符文研究室和禁书区。",
      D: "外交署和宫廷顾问处。",
      E: "魔兽迁徙办公室和民间巡回法师站。",
      F: "影雾调查部和自由实习许可。"
    }
  },
  {
    text: "毕业典礼当天，学院地下封印突然松动，魔法署要求所有毕业生按分流结果集合，等待统一调派。你会：",
    options: {
      A: "立刻去前线集合点，先把外溢魔力压回去。",
      B: "去结界核心，哪怕名单上没有你的名字。",
      C: "去救护区，伤员会比命令更早抵达。",
      D: "冲进档案室找封印原始记录，现场一定有人忘了关键条件。",
      E: "去通知城里居民撤离，学院内部流程已经太慢。",
      F: "公开拒绝按分流集合，带走几个明显会被错误调派的人。"
    }
  },
  {
    text: "危机结束后，院长把最终分流书递给你。上面有学院、王国和导师的印章，也有一行空白处允许你写下自己的选择。你会：",
    options: {
      A: "写下“前线与危机处理”，接受危险也接受责任。",
      B: "写下“防护、重建与公共事务”，把魔法落到具体生活里。",
      C: "写下“治疗与民间巡回”，去需要你的地方，不等正式邀请。",
      D: "写下“研究、封印与禁书管理”，继续追问危险知识的边界。",
      E: "写下“外交、宫廷与调查”，进入制度内部拆解问题。",
      F: "没有写职业，只写：“我拒绝把未来交给这张表。”"
    }
  }
];

const labels = {
  battle: "直接行动",
  protect: "防护预案",
  heal: "治疗照护",
  research: "研究追问",
  craft: "实用制造",
  prophecy: "星象预判",
  diplomacy: "沟通调停",
  wild: "魔兽生态",
  storm: "边境风暴",
  court: "制度权力",
  shadow: "隐秘调查",
  forbidden: "危险知识",
  folk: "民间实务",
  freedom: "拒绝分流"
};

const endings = {
  battleMage: {
    type: "普通结局",
    tag: "前线分流 / 快速压制",
    title: "战斗法师结局：火球先到，理由后补",
    text: "你被分到王国前线法师团。你的施法速度很快，判断也很快，有时快到检讨书还没写完，新的任务已经来了。大家都承认你可靠，只是不太敢站在你施法方向的前方。\n\n几年后，你的名字会出现在边境战报里，通常伴随着“局势已控制”和“需重建半座哨塔”。新兵们把你当成传说，老兵们只提醒他们一件事：听见你开始念第三个音节，就趴下。",
    reason: "你多次选择直接处理危险、压制风险，并在后期接受前线或危机处理方向。"
  },
  wardKeeper: {
    type: "普通结局",
    tag: "结界分流 / 预防事故",
    title: "守护结界师结局：你负责让别人别出事",
    text: "你成了一名结界师，负责给城门、仓库、贵族婚礼和危险实验室上锁。你的工作不够华丽，却总在灾难发生前被需要。你渐渐发现，最强的魔法有时会安静到没人注意，因为事情已经没有机会坏到那一步。\n\n很多年后，学院会把一次重大事故写成“结界系统稳定运行”。报告里没有你的名字，只有一串维护编号。你看完很满意，因为没人被写进伤亡名单，这比署名重要得多。",
    reason: "你的选择持续偏向隔离风险、建立防护和优先保证公共安全。"
  },
  healer: {
    type: "普通结局",
    tag: "治疗分流 / 具体的人",
    title: "治愈师结局：伤口会愈合，账单不会",
    text: "你进入治疗院，成为治愈师。你能让骨折的人重新站起来，也能让装病逃课的人当场露馅。大家都说你温柔，只有你知道，温柔和把病人按回床上并不冲突。\n\n后来，王国最忙的季节不再是战争结束后，最忙的时候来自所有人终于发现你真的能治好旧伤。你会在凌晨给陌生人接骨，也会在清晨拒绝贵族插队。你的手很稳，脾气也越来越稳，只是账单永远没有伤口愈合得快。",
    reason: "你反复把受伤者、同伴和具体的人放在制度流程之前。"
  },
  researcher: {
    type: "普通结局",
    tag: "研究分流 / 旧纸堆里有答案",
    title: "学院研究员结局：你终于拥有了自己的灰尘",
    text: "你留在学院研究古代符文和失控咒式。你的房间越来越像一座纸堆遗迹，导师每次进门都要先确认地面是否还存在。你没有成为传奇，但你可能会在某个脚注里改变整个魔法史。\n\n十年后，有学生会在旧论文里看到你的名字，旁边标着一句不起眼的注释：此处推翻旧体系。那天之后，三门课程被重写，七位教授假装自己早就同意，而你正在地下档案室追一张会逃跑的手稿。",
    reason: "你持续选择观察、记录、查证和追问魔法原理。"
  },
  alchemyContractor: {
    type: "普通结局",
    tag: "城市实务 / 炼金承包",
    title: "城市炼金承包人结局：这瓶应该能通过验收",
    text: "你离开学院最体面的实验室，接下城市炼金承包项目：供暖管道、净水药剂、自动路灯，还有贵族们总想插队的美容魔药。你的作品有时能救人，有时能清洁锅底，有时能让整栋楼闻起来像焦糖味的雷暴。\n\n几年后，人们已经忘了第一盏稳定魔法路灯是谁做的，只知道夜路终于没那么黑了，你还在和市政厅争下一季度预算。",
    reason: "你的路线强调实用制造、城市问题和能落地维护的魔法。"
  },
  astrologer: {
    type: "普通结局",
    tag: "预言分流 / 不受欢迎的提醒",
    title: "占星预言师结局：你说得很准，但没人爱听",
    text: "你成为预言师，负责看星象、读水镜、提醒大家不要在满月签合同。问题是，你越准确，别人越想假装没听见。你学会了把灾难预警写得委婉一点，比如“近期不宜发动战争”。\n\n未来某天，国王会在签署远征令前偷偷派人来问你天气。你看完星盘，只递过去一把伞和一封辞职建议。远征取消后，史书称那是陛下的审慎，你只在水镜旁补了一觉。",
    reason: "你多次选择观测异常、验证预兆，并愿意承担不被相信的提醒工作。"
  },
  diplomat: {
    type: "普通结局",
    tag: "外交分流 / 先别炸",
    title: "魔法外交官结局：你把咒语翻译成人话",
    text: "你进入王国外交署，负责和精灵、矮人、龙裔商会以及脾气很差的图书馆幽灵谈判。你很少施展大法术，却经常阻止别人施展。你的法杖上刻着一句话：先别炸，我们谈谈。\n\n多年后，一份和平协议会被称为王国最昂贵的纸。它避免了三场战争、两次贸易封锁和一次疑似由甜点引发的龙裔决斗。你没有在签字席中央，只站在门边，确认所有人把火球术留在了门外。",
    reason: "你习惯协调各方、谈条件，并把冲突降到可处理范围。"
  },
  beastMigrator: {
    type: "普通结局",
    tag: "生态分流 / 魔兽也有路线",
    title: "魔兽迁徙协调员结局：它不咬人，只是不同意规划",
    text: "你被派去处理王国扩张和魔兽栖地之间的冲突。你的同学还在研究高级咒文时，你已经能从狮鹫的尾巴摆动判断它今天是否想上班。你身上常有草屑、鳞片和不明牙印，但你过得意外开心。\n\n后来，地图上多了一条绕开巢穴的商路，商人抱怨路远了三里，魔兽少烧了七辆车，你觉得这笔账很划算。",
    reason: "你的选择反复照顾非人对象、生态路线和人与魔兽的边界。"
  },
  courtAdvisor: {
    type: "普通结局",
    tag: "宫廷分流 / 真话包起来",
    title: "宫廷顾问结局：你学会了把真话包起来",
    text: "你被选入宫廷，成为国王和贵族们的魔法顾问。你不只是解读咒文，还要解读眼色、预算和谁不想负责。你说话越来越圆滑，但口袋里一直放着一张辞职信，只是日期还没填。\n\n后来你会学会一种高级法术：让一句真话听起来像赞美。它救过项目，也救过人。偶尔深夜离开议事厅时，你会摸到那张没填日期的辞职信，确认自己还记得门在哪里。",
    reason: "你愿意进入制度内部处理权力、条款和难听的真话。"
  },
  archiveWarden: {
    type: "普通结局",
    tag: "封印分流 / 禁书管理",
    title: "图书馆封印员结局：请勿借阅会反过来读你的书",
    text: "你负责管理禁书区和危险卷轴。这里的书会低语，书架会移动，借书卡偶尔会写遗嘱。你每天都在阻止知识逃跑，也阻止人类太快追上它。\n\n几年后，学生们会传说禁书区深处有一位管理员，能用眼神让恶魔索引自己归架。传说不完全准确，你主要靠登记表、封印蜡和耐心。可当一本书第三次试图诱惑新生时，你确实会把它倒扣三个月。",
    reason: "你接近危险知识，但更偏向管理、封存和建立边界。"
  },
  folkMage: {
    type: "普通结局",
    tag: "民间路线 / 小镇记得你",
    title: "民间巡回法师结局：修屋顶、找猫、顺便驱魔",
    text: "你绕开了高塔和宫廷，成为巡回法师。你修过漏雨屋顶，找过会隐身的猫，也驱散过酒馆地下室的小型诅咒。吟游诗人不太歌颂你，但每个村子都记得你来过。\n\n几年后，你的名字会出现在很多奇怪的地方：磨坊墙上的感谢信、酒馆账本里的欠款、某个孩子法杖柄上刻歪的签名。你没有固定头衔，也没有固定住址，可每当某个小镇的钟楼突然倒着走，人们总知道该往哪条路上找你。",
    reason: "你持续选择普通人的问题、民间委托和绕开高塔的路线。"
  },
  rebuilder: {
    type: "普通结局",
    tag: "重建分流 / 魔法要能住人",
    title: "灾后重建法师结局：咒语要落地，最好还能住人",
    text: "你把魔法用在桥梁、灯塔、供暖和倒塌街区的重建上。传统法师嫌你不够神秘，工匠嫌你图纸太会发光。你不介意，因为当第一座临时避难塔在暴雨夜亮起来时，所有人都安静地走了进去。\n\n很多年后，没人记得那场事故的官方通报，但城西孩子们会指着屋顶的蓝色符文说，这是让房子不再害怕风的咒。",
    reason: "你的路线同时偏向实用制造、防护和灾后修复。"
  },
  stormWarden: {
    type: "普通结局",
    tag: "边境分流 / 和天气签约",
    title: "风暴边境驻守者结局：你和天气签了长期合约",
    text: "你被派往风暴边境，那里每年有三个月的雨横着下，雷会敲门，河流偶尔想改名换道。你擅长平衡元素，处理火太急、水太委屈、风太自由、土太固执的问题。你的工作听起来像高级魔法，其实很像调解四个性格很差的室友。\n\n后来边境居民用你的名字称呼一段稳定季风，虽然它只稳定了六天，你还是把这当成表扬。",
    reason: "你选择了边境、元素失衡、恶劣环境和长期驻守。"
  },
  shadowAgent: {
    type: "普通结局",
    tag: "影雾分流 / 暗处止损",
    title: "影雾侦查员结局：你知道得太多，也站得太暗",
    text: "你进入影雾部门，负责调查魔法犯罪、失踪物品和贵族不承认的事故。你习惯从门缝、账本和沉默里找线索。你的名字很少出现在公告里，但很多案件因为你没有变成灾难。\n\n未来某个雨夜，你会从一枚被擦得太干净的戒指里查出整条走私线。王国第二天照常醒来，报纸只写市场供应恢复稳定。你把剪报收进抽屉，和其他没人知道被阻止过的灾难放在一起。",
    reason: "你多次选择调查隐秘线索、追查动机和处理不公开的事故。"
  },
  freeAdventurer: {
    type: "普通结局",
    tag: "自由路线 / 课程表外面",
    title: "自由冒险法师结局：学院给不了你地图",
    text: "你拒绝固定分配，带着法杖和一只总是迷路的背包出发。你见过会唱歌的沼泽、会讲价的宝箱和坚持要收门票的古代遗迹。你没有稳定编制，但你拥有很多不能报销的故事。\n\n几年后，学院会收到一张没有署名的地图，标出三处失落遗迹和一家味道可疑但能救命的旅店。导师看着地图叹气，把它锁进档案柜。第二天，档案柜自己长出一行字：外面的世界比课程表大。",
    reason: "你拒绝固定分配，追求课程表之外的道路，但没有触发反制度隐藏线。"
  },
  problemMentor: {
    type: "普通结局",
    tag: "导师分流 / 问题学生",
    title: "问题学生收容导师结局：你终于理解导师为什么叹气",
    text: "你留校任教，但没有被分到最乖的班，接手的是那些“天赋过高、纪律过低、事故频率惊人”的学生。第一年你满怀热情，第二年你开始收藏止痛茶，第三年你能仅凭脚步声判断哪个学生又要炸坩埚。你没有失去理想，只是学会了先让大家戴好护目镜。\n\n多年后，最让学院头疼的几位法师都会在信末写一句：老师，我这次真的先看了安全手册。",
    reason: "你的选择持续偏向帮助同伴、训练失控天赋，并愿意承担麻烦的成长过程。"
  },
  thirteenthMentor: {
    type: "隐藏结局",
    tag: "★★ 封印自身 / 地下导师室",
    title: "被封印的第十三位导师",
    text: "你的名字被写进学院地下第十三间导师室的门牌。白天，它从所有毕业名单上消失；夜里，最危险的学生会被带到你门前。你不再教人如何施法，只教他们如何在力量醒来之前，先学会害怕自己。",
    reason: "你持续追问禁书和封印真相，并在最终危机中选择承接危险知识。"
  },
  movingShop: {
    type: "隐藏结局",
    tag: "★ 无证经营 / 城市传说",
    title: "会移动的无证魔法店",
    text: "你开了一家没有固定地址的小店。它今天在城南巷口，明天在雨后的桥洞，后天可能出现在某个孩子最需要护身符的窗台下。魔法署永远找不到你，普通人却总能在最糟糕的一天，看见门铃旁那块小牌子：修扫帚、补护符、坏心情半价。",
    reason: "你反复选择民间实务、实用制造和脱离登记系统的自由路线。"
  },
  starError: {
    type: "隐藏结局",
    tag: "★★ 星图变量 / 命运误差",
    title: "星坠预言的误差本人",
    text: "你发现学院上空的星图正在倒计时；所有计算里唯一对不上的误差，就是你。第一颗星坠下前，你走上钟楼，改写了自己的名字。后来预言师们说灾难被避免了。只有你知道，星空少了一颗星，也多了一条不会被任何人验证的命运。",
    reason: "你沿着预言线持续追踪异常，并在后期把自己作为预言变量介入。"
  },
  zeroSchool: {
    type: "隐藏结局",
    tag: "★★ 无院徽 / 第零学院",
    title: "无院徽学派创始人",
    text: "你拒绝了这套分配职业的制度，带走一批不想被贴标签的学生，在旧风车里办起没有院徽的课堂。王国称你叛逃，学院称你事故，学生称你老师。多年后，人们把这间旧风车叫作第零学院，因为它不承认任何排名，只承认一个人可以重新开始。",
    reason: "你多次质疑分流制度、保护他人的选择，并在最终节点公开拒绝官方职业分配。"
  }
};

const endingMeta = {
  battleMage: { rarity: "常见结局", percent: 8, epilogue: "前线法师团后来给你单独配了一本检讨书模板。模板第一行已经印好：本人确认施法方向曾经有建筑物。" },
  wardKeeper: { rarity: "常见结局", percent: 7, epilogue: "你维护的结界很少登上新闻，因为新闻通常只报道坏事。你开始喜欢这种没有消息的日子。" },
  healer: { rarity: "常见结局", percent: 7, epilogue: "治疗院门口后来多了一块牌子：插队者不予治疗心虚。大家都说这不是正式规定，但没人敢试。" },
  researcher: { rarity: "常见结局", percent: 7, epilogue: "你的研究室门口贴着三张警告：不要移动纸堆，不要喂食手稿，不要问教授地板在哪里。" },
  alchemyContractor: { rarity: "常见结局", percent: 7, epilogue: "市政厅终于承认魔法路灯项目成功，只是把你的预算砍成了维护建议。你回信附了一瓶会尖叫的墨水。" },
  astrologer: { rarity: "少见结局", percent: 6, epilogue: "你后来学会在预言旁边附赠天气、花粉和贵族脾气指数。这样大家比较愿意打开信封。" },
  diplomat: { rarity: "少见结局", percent: 6, epilogue: "外交署把你的法杖列为谈判辅助工具。它没有攻击力，只会在有人撒谎时发出很失礼的咳嗽声。" },
  beastMigrator: { rarity: "少见结局", percent: 6, epilogue: "商路绕远以后，沿途多了三家旅店和一个魔兽观察点。抱怨最多的商人后来投资了第二家旅店。" },
  courtAdvisor: { rarity: "少见结局", percent: 6, epilogue: "你的辞职信被你改了十二版。第十三版开头写得很漂亮，只是又被你夹回了会议记录里。" },
  archiveWarden: { rarity: "少见结局", percent: 5, epilogue: "禁书区的书后来开始怕你。它们不怕封印，只怕你拿着逾期登记表站在书架前。" },
  folkMage: { rarity: "少见结局", percent: 5, epilogue: "你没有固定住址，只有一串越来越长的感谢名单。名单背面还写着欠款，这很公平。" },
  rebuilder: { rarity: "少见结局", percent: 5, epilogue: "你修好的第一座避难塔后来成了地标。情侣们在塔下约会，完全不知道它的地基里有你熬夜写的三十七版稳定咒。" },
  stormWarden: { rarity: "少见结局", percent: 5, epilogue: "风暴边境每年给你寄一封感谢信。信通常湿透，还带一点雷声，但字迹很真诚。" },
  shadowAgent: { rarity: "少见结局", percent: 5, epilogue: "影雾部门给你的勋章是黑色的，别在内衬上。你第一次拿到时差点以为他们忘了发。" },
  freeAdventurer: { rarity: "少见结局", percent: 5, epilogue: "学院后来禁止学生把你的地图当毕业路线参考。于是那张地图被抄得更多了。" },
  problemMentor: { rarity: "少见结局", percent: 4, epilogue: "你的学生们长大后仍然麻烦，只是终于学会在制造麻烦前先清场。你觉得这已经是教育成功。" },
  thirteenthMentor: { rarity: "传说级隐藏", percent: 2, epilogue: "地下第十三间导师室没有课程表。它只在学生最危险的夜晚亮灯，灯光像一只安静睁开的眼睛。" },
  movingShop: { rarity: "隐藏稀有", percent: 1.5, epilogue: "魔法署查封了你的小店七次。每次封条第二天都会出现在他们自己办公室门上，附赠一张修门账单。" },
  starError: { rarity: "传说级隐藏", percent: 1.5, epilogue: "星图后来恢复正常，只在每年同一天多出一格空白。预言师们不解释它，只会在那晚少说一句话。" },
  zeroSchool: { rarity: "传说级隐藏", percent: 1, epilogue: "第零学院没有入学考试。门口只有一个问题：如果没人替你命名，你还愿意学习什么？" }
};

const scoreMap = [
  { A: ["battle"], B: ["protect"], C: ["heal"], D: ["research"], E: ["craft"], F: ["freedom"] },
  { A: ["battle"], B: ["protect"], C: ["heal"], D: ["research"], E: ["wild"], F: ["forbidden"] },
  { A: ["battle"], B: ["protect"], C: ["heal"], D: ["research"], E: ["craft"], F: ["diplomacy"] },
  { A: ["protect"], B: ["research"], C: ["court"], D: ["forbidden"], E: ["shadow"], F: ["forbidden", "prophecy"] },
  { A: ["court"], B: ["heal"], C: ["research"], D: ["diplomacy"], E: ["folk"], F: ["freedom"] },
  { A: ["battle"], B: ["protect", "craft"], C: ["court"], D: ["diplomacy"], E: ["freedom"], F: ["shadow"] },
  { A: ["battle"], B: ["wild", "protect"], C: ["diplomacy"], D: ["craft"], E: ["folk"], F: ["court", "shadow"] },
  { A: ["protect"], B: ["heal", "folk"], C: ["craft"], D: ["court"], E: ["folk", "craft"], F: ["forbidden", "research"] },
  { A: ["court"], B: ["prophecy", "research"], C: ["diplomacy", "prophecy"], D: ["protect"], E: ["forbidden", "shadow"], F: ["prophecy", "freedom"] },
  { A: ["battle", "storm"], B: ["heal", "craft"], C: ["research", "forbidden", "prophecy"], D: ["diplomacy", "court"], E: ["wild", "folk"], F: ["shadow", "freedom"] },
  { A: ["battle", "storm"], B: ["protect"], C: ["heal"], D: ["research", "forbidden"], E: ["folk", "diplomacy"], F: ["freedom"] },
  { A: ["battle", "storm"], B: ["protect", "craft"], C: ["heal", "folk"], D: ["research", "forbidden"], E: ["diplomacy", "court", "shadow"], F: ["freedom", "prophecy"] }
];

function countTags(tags) {
  let count = 0;
  state.answers.forEach((answer, questionIndex) => {
    answer.forEach((letter) => {
      const optionTags = scoreMap[questionIndex][letter] || [];
      if (tags.some((tag) => optionTags.includes(tag))) count += 1;
    });
  });
  return count;
}

function topTag(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "craft";
}

function chooseEnding(scores) {
  const forbiddenCount = countTags(["forbidden"]);
  const prophecyCount = countTags(["prophecy"]);
  const folkCraftFreedom = countTags(["folk", "craft", "freedom"]);
  const freedomCount = countTags(["freedom"]);
  const socialRescueCount = countTags(["diplomacy", "heal"]);

  if (forbiddenCount >= 5 && scores.research >= 3 && (has(10, "D") || has(11, "D"))) return endings.thirteenthMentor;
  if (folkCraftFreedom >= 8 && scores.folk >= 3 && scores.craft >= 3 && has(11, "C")) return endings.movingShop;
  if (prophecyCount >= 5 && scores.freedom >= 2 && (has(8, "F") || has(11, "F"))) return endings.starError;
  if (freedomCount >= 5 && socialRescueCount >= 3 && has(11, "F")) return endings.zeroSchool;

  if (scores.battle >= 5 && (has(9, "A") || has(10, "A") || has(11, "A"))) return endings.battleMage;
  if (scores.protect >= 5 && scores.craft < 4 && (has(10, "B") || has(11, "B"))) return endings.wardKeeper;
  if (scores.heal >= 5 && scores.folk < 4 && (has(10, "C") || has(11, "C"))) return endings.healer;
  if (scores.research >= 5 && scores.forbidden < 4) return endings.researcher;
  if (scores.craft >= 5 && scores.protect < 4 && scores.folk < 4) return endings.alchemyContractor;
  if (scores.prophecy >= 4) return endings.astrologer;
  if (scores.diplomacy >= 5 && scores.court < 4) return endings.diplomat;
  if (scores.wild >= 3 && scores.folk >= 2) return endings.beastMigrator;
  if (scores.court >= 5 && scores.shadow < 4) return endings.courtAdvisor;
  if (scores.forbidden >= 4 && (scores.protect >= 2 || scores.research >= 3)) return endings.archiveWarden;
  if (scores.folk >= 5 && scores.craft < 4) return endings.folkMage;
  if (scores.craft >= 4 && (scores.protect >= 3 || scores.heal >= 3)) return endings.rebuilder;
  if (scores.storm >= 2 && (scores.battle >= 3 || scores.protect >= 3)) return endings.stormWarden;
  if (scores.shadow >= 4) return endings.shadowAgent;
  if (scores.freedom >= 4) return endings.freeAdventurer;
  if (scores.heal >= 3 && (scores.research >= 3 || scores.diplomacy >= 3)) return endings.problemMentor;

  const fallback = {
    battle: endings.battleMage,
    protect: endings.wardKeeper,
    heal: endings.healer,
    research: endings.researcher,
    craft: endings.alchemyContractor,
    prophecy: endings.astrologer,
    diplomacy: endings.diplomat,
    wild: endings.beastMigrator,
    storm: endings.stormWarden,
    court: endings.courtAdvisor,
    shadow: endings.shadowAgent,
    forbidden: endings.archiveWarden,
    folk: endings.folkMage,
    freedom: endings.freeAdventurer
  };
  return fallback[topTag(scores)] || endings.rebuilder;
}
