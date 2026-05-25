// 各 AI 模型结构化规格数据
// 按 基础信息 / 核心性能 / 优势与不足 / 适用场景 / 更新动态 五维度组织

export interface ModelSpec {
  slug: string;
  // 1. 基础信息
  basic: {
    brand: string;          // 品牌归属
    latestVersion: string;  // 最新版本号
    releaseDate: string;    // 最新版发布日期
    positioning: string;    // 模型定位
  };
  // 2. 核心性能
  performance: {
    contextWindow: string;  // 上下文窗口大小
    multimodal: string[];   // 多模态支持
    codeAbility: string;    // 代码能力描述
    longTextAbility: string;// 长文本处理能力
    reasoningSpeed: string; // 推理速度
    benchmarkHighlights: string[]; // 关键基准分数
  };
  // 3. 优势与不足
  prosCons: {
    strengths: string[];
    weaknesses: string[];
  };
  // 4. 适用场景
  useCases: string[];
  // 5. 更新动态
  updates: string;
}

export const modelSpecs: Record<string, ModelSpec> = {
  chatgpt: {
    slug: "chatgpt",
    basic: {
      brand: "OpenAI",
      latestVersion: "GPT-5.5（2026年4月）",
      releaseDate: "2026-04-23",
      positioning: "Agent 终端自动化旗舰，函数调用生态最成熟的全能型 AI 助手",
    },
    performance: {
      contextWindow: "128K token（标准），Pro 版支持更长",
      multimodal: ["文本", "图像理解", "图像生成(DALL·E)", "原生语音输入"],
      codeAbility: "SWE-bench Verified ~88.7%，Terminal-Bench 2.0 82.7% 业界第一",
      longTextAbility: "支持 128K 上下文，但长文本幻觉率较高（86%）",
      reasoningSpeed: "Pro 版支持并行测试时计算，推理速度灵活可调",
      benchmarkHighlights: [
        "AIME 2025: 100%（数学推理满分）",
        "SWE-bench Verified: ~88.7%",
        "Terminal-Bench 2.0: 82.7%",
        "OSWorld-Verified: 78.7%",
        "FrontierMath Tier 4: 39.6%（GPT-5.5 Pro）",
      ],
    },
    prosCons: {
      strengths: [
        "Agent 终端自动化业界第一，可直接操作终端完成任务",
        "函数调用生态最成熟，工具链和插件生态最完善",
        "原生语音+视觉多模态，首款支持原生语音的旗舰模型",
        "数学推理 AIME 满分，复杂公式推导非常准确",
        "OS 级操作能力最强",
      ],
      weaknesses: [
        "长文本幻觉率较高（86%），事实准确性不如 Claude",
        "API 输出价格最贵（$30/M token）",
        "敏感行业合规不如 Claude",
        "免费版限制较多",
      ],
    },
    useCases: [
      "代码开发与 OS 级自动化",
      "Agent 工作流与函数调用密集型应用",
      "数学推理与科学计算",
      "多模态对话与图像生成",
    ],
    updates: "2026年4月发布 GPT-5.5 系列，Terminal-Bench 2.0 得分 82.7% 业界第一。GPT-5.5 Pro 支持并行测试时计算，FrontierMath Tier 4 达 39.6%。首次在旗舰模型中支持原生语音输入。",
  },

  claude: {
    slug: "claude",
    basic: {
      brand: "Anthropic",
      latestVersion: "Claude Opus 4.7（2026年4月）",
      releaseDate: "2026-04-16",
      positioning: "安全合规首选，多文件代码推理与长文写作质量业界第一",
    },
    performance: {
      contextWindow: "200K token（1M beta）",
      multimodal: ["文本", "图像理解", "图像生成"],
      codeAbility: "SWE-bench Verified 87.6% 量产模型第1，SWE-bench Pro 64.3% 防污染基准第1",
      longTextAbility: "长文本事实性幻觉率仅 36%（GPT-5.5 为 86%），写作质量最佳",
      reasoningSpeed: "稳定可靠，Agent 长期稳定性最高，长链工具调用不跑偏",
      benchmarkHighlights: [
        "SWE-bench Verified: 87.6%（量产模型第1）",
        "SWE-bench Pro: 64.3%（防污染基准第1）",
        "长文本幻觉率: 36%（业界最低）",
        "Claude Mythos Preview: SWE-bench 93.9%（受限版本）",
      ],
    },
    prosCons: {
      strengths: [
        "多文件代码推理业界最强，适合大型代码库重构",
        "Agent 长期稳定性最高，长链工具调用不跑偏",
        "写作质量最佳，逻辑连贯、风格统一、事实准确",
        "安全合规认证最完善（28项），适合金融/医疗/法律",
        "长文本理解优秀，幻觉率远低于竞品",
      ],
      weaknesses: [
        "上下文仅 200K（1M 仍在 beta），不如 Gemini 的百万级",
        "多模态不如 Gemini 全面",
        "价格偏高（$5/$25 per 1M token）",
        "无语音交互能力",
      ],
    },
    useCases: [
      "代码审查与架构评审",
      "多文件重构与大型代码库开发",
      "长篇技术文档与专业写作",
      "金融/医疗/法律等合规要求高的行业",
    ],
    updates: "2026年4月发布 Claude Opus 4.7，SWE-bench Verified 87.6% 量产模型第一。Claude Mythos Preview 内部测试 SWE-bench 达 93.9%，但仅限 Project Glasswing 约 50 家合作方使用。",
  },

  gemini: {
    slug: "gemini",
    basic: {
      brand: "Google DeepMind",
      latestVersion: "Gemini 3.1 Pro（2026年2月）",
      releaseDate: "2026-02-19",
      positioning: "推理能力登顶 + 1M 生产级上下文 + 最完整原生多模态，综合性价比最高",
    },
    performance: {
      contextWindow: "1M token 稳定可用（2M beta），唯一真正的生产级百万上下文",
      multimodal: ["文本", "图像理解", "图像生成", "音频处理", "视频理解", "代码"],
      codeAbility: "代码能力扎实，但纯代码略逊于 Claude/GPT",
      longTextAbility: "1M token 生产级上下文，处理数百页 PDF 毫不费力",
      reasoningSpeed: "美国云厂商中最便宜的旗舰模型，$2/$12 per 1M token",
      benchmarkHighlights: [
        "GPQA Diamond: 94.3%（发布时业界最高）",
        "Terminal-Bench 2.0: 78.4%（配合 Forge Code harness）",
        "1M token 生产级上下文窗口",
        "美国云厂商最便宜旗舰: $2/$12 per 1M token",
      ],
    },
    prosCons: {
      strengths: [
        "GPQA Diamond 推理能力业界第一",
        "1M token 生产级上下文，处理超长文档能力最强",
        "原生多模态最完整：图片+音频+视频+代码一站式",
        "美国云厂商最便宜旗舰，性价比极高",
        "Google 生态深度整合（Workspace、搜索、云服务）",
      ],
      weaknesses: [
        "纯代码能力略逊于 Claude/GPT",
        "Google Cloud 绑定较深",
        "中文支持待加强，对国内场景理解不够深",
        "部分地区不可用",
      ],
    },
    useCases: [
      "超长文档处理与分析（合同、论文、报告）",
      "多模态流水线（视频理解+音频处理+文本分析）",
      "Google Workspace 生态集成办公",
      "高性价比大规模 AI 服务部署",
    ],
    updates: "2026年2月发布 Gemini 3.1 Pro，GPQA Diamond 94.3% 业界最高。1M token 生产级上下文窗口，3月6日起成为 API 默认版本。",
  },

  grok: {
    slug: "grok",
    basic: {
      brand: "xAI (Elon Musk)",
      latestVersion: "Grok 4.20 Multi-Agent Beta（2026年3月）",
      releaseDate: "2026-03-09",
      positioning: "首创多智能体辩论架构，幻觉率业界最低，X 平台实时数据独家接入",
    },
    performance: {
      contextWindow: "2M token",
      multimodal: ["文本", "图像理解", "图像生成"],
      codeAbility: "代码能力不如 Claude/GPT，仍在追赶",
      longTextAbility: "2M 超长上下文，处理长文本能力强",
      reasoningSpeed: "267 tok/s 推理速度，配合多 Agent 验证机制",
      benchmarkHighlights: [
        "AA-Omniscience: 78%（幻觉率业界最低）",
        "AIME 2025: 93.3%",
        "2M 上下文窗口 + 267 tok/s",
        "性价比: $1.25/$2.50 per 1M token",
      ],
    },
    prosCons: {
      strengths: [
        "多 Agent 辩论架构，4-16个智能体并行验证后输出，幻觉率业界最低",
        "性价比极高（$1.25/$2.50 per 1M token）",
        "2M 超长上下文窗口",
        "X/Twitter 平台实时数据独家接入，热点分析最及时",
        "数学推理突出（AIME 93.3%）",
      ],
      weaknesses: [
        "代码能力不如 Claude/GPT",
        "生态年轻，工具集成有限",
        "国内访问受限",
        "品牌认知度不足",
      ],
    },
    useCases: [
      "研究分析与事实核查（低幻觉需求）",
      "数学推理与科学计算",
      "实时信息查询与热点分析",
      "对准确性要求高的知识问答",
    ],
    updates: "2026年3月发布 Grok 4.20 Multi-Agent Beta，首创 4-16 个 Agent 并行辩论架构，AA-Omniscience 78% 幻觉率业界最低。2M 上下文 + 267 tok/s，AIME 93.3%。",
  },

  llama: {
    slug: "llama",
    basic: {
      brand: "Meta",
      latestVersion: "Llama 4 Maverick（2026年1月）",
      releaseDate: "2026-01-15",
      positioning: "开源模型最长上下文（10M token），400B MoE 高效架构",
    },
    performance: {
      contextWindow: "10M token（开源模型中最长）",
      multimodal: ["文本"],
      codeAbility: "代码能力不及闭源旗舰",
      longTextAbility: "10M token 可处理整本书级别内容，开源最长",
      reasoningSpeed: "400B MoE 架构，高效推理",
      benchmarkHighlights: [
        "上下文窗口: 10M token（开源纪录）",
        "400B MoE 总参数，高效推理",
        "开源可商用（Llama License）",
      ],
    },
    prosCons: {
      strengths: [
        "10M token 开源最长上下文，处理整本书级别内容",
        "400B MoE 架构高效推理",
        "Meta 生态支持（Instagram、WhatsApp 集成）",
        "免费可商用（有限制）",
      ],
      weaknesses: [
        "代码能力不及闭源旗舰",
        "多模态能力较弱",
        "Llama License 有限制（非完全开源）",
        "中文能力一般",
      ],
    },
    useCases: [
      "极端长上下文应用（全书分析、超长文档）",
      "开源研究与学术用途",
      "本地私有化部署",
    ],
    updates: "2026年1月发布 Llama 4 Maverick，400B MoE 架构，10M token 上下文窗口创开源模型新纪录。",
  },

  mistral: {
    slug: "mistral",
    basic: {
      brand: "Mistral AI（法国）",
      latestVersion: "Mistral Large 3（2026年2月）",
      releaseDate: "2026-02-10",
      positioning: "欧洲最强开源模型，Apache 2.0 自由商用，GDPR 合规首选",
    },
    performance: {
      contextWindow: "256K token",
      multimodal: ["文本", "图像理解"],
      codeAbility: "代码能力不如 DeepSeek，但在欧洲模型中领先",
      longTextAbility: "256K 上下文，满足大多数长文本场景",
      reasoningSpeed: "675B/41B MoE 架构，高效推理",
      benchmarkHighlights: [
        "675B/41B MoE 架构",
        "Apache 2.0 许可（真正自由商用）",
        "256K 上下文 + 多模态",
      ],
    },
    prosCons: {
      strengths: [
        "非中国开源模型中综合最强",
        "Apache 2.0 真正自由商用，无限制",
        "欧洲数据合规（GDPR），欧洲部署首选",
        "多语言支持好",
      ],
      weaknesses: [
        "代码能力不如 DeepSeek",
        "中国市场知名度低",
        "API 服务不如美国厂商成熟",
        "中文能力有限",
      ],
    },
    useCases: [
      "欧洲合规部署（GDPR 场景）",
      "非中国开源模型首选",
      "多语言应用场景",
    ],
    updates: "2026年2月发布 Mistral Large 3，675B/41B MoE，Apache 2.0 许可，256K 上下文 + 多模态支持。",
  },

  deepseek: {
    slug: "deepseek",
    basic: {
      brand: "深度求索 (DeepSeek)",
      latestVersion: "DeepSeek V4-Pro / V4-Flash（2026年4月）",
      releaseDate: "2026-04-24",
      positioning: "国产开源之光，MIT 开源 + 极致性价比（仅为 GPT 的 1/400），私有化部署首选",
    },
    performance: {
      contextWindow: "1M+ token",
      multimodal: ["文本"],
      codeAbility: "Codeforces Elo 3,206，竞赛编程能力强；SWE-bench Pro 55.4%",
      longTextAbility: "1M+ token 上下文，混合注意力架构（CSA+HCA）长上下文效率最高",
      reasoningSpeed: "V4-Flash 输出仅 $0.07/M token，极致低价",
      benchmarkHighlights: [
        "Codeforces Elo: 3,206",
        "V4-Flash 价格: $0.04/$0.07 per 1M token（GPT-5.5 的 1/400）",
        "V4-Pro: 1.6T/49B MoE，MIT 开源",
        "1M+ 上下文，混合注意力架构 CSA+HCA",
      ],
    },
    prosCons: {
      strengths: [
        "极致性价比，API 仅为 GPT-5.5 的 1/400",
        "MIT 开源可私有化部署，文档清晰",
        "1M+ 超长上下文，混合注意力架构效率最高",
        "竞赛编程能力强（Codeforces Elo 3,206）",
        "中文场景深度优化",
      ],
      weaknesses: [
        "SWE-bench Pro（防污染）仅 55.4%，Agent 稳定性不如 Claude",
        "海外部署节点少",
        "多模态能力有限",
        "Agent 长链任务有时会断",
      ],
    },
    useCases: [
      "高并发线上服务（极致低成本）",
      "预算敏感型项目",
      "私有化部署与自托管",
      "中文场景与竞赛编程",
    ],
    updates: "2026年4月连续发布 V4-Pro 和 V4-Flash。V4-Pro 1.6T/49B MoE，混合注意力架构，MIT 开源。V4-Flash 输出仅 $0.07/M token，是 GPT-5.5 的 1/400。开源一周全球下载量突破百万次。",
  },

  qwen: {
    slug: "qwen",
    basic: {
      brand: "阿里云 (Alibaba)",
      latestVersion: "Qwen 3.6 Max / Qwen 3.6-72B（2026年4月）",
      releaseDate: "2026-04-25",
      positioning: "国产全能旗舰，多项编码/Agent 基准同时第一，Apache 2.0 开源生态最强",
    },
    performance: {
      contextWindow: "1M token",
      multimodal: ["文本", "图像理解", "图像生成", "语音交互", "视频处理"],
      codeAbility: "多项编码基准同时 #1，「截图写前端」独门绝技",
      longTextAbility: "1M token 上下文，长文本处理出色",
      reasoningSpeed: "GPQA Diamond 90.4%，科学推理能力强",
      benchmarkHighlights: [
        "MMLU: 92.3（国产第1，全球第3）",
        "GPQA Diamond: 90.4%",
        "多项编码/Agent 基准同时 #1",
        "Qwen 3.6-72B Apache 2.0 开源，全球下载超 10 亿次",
      ],
    },
    prosCons: {
      strengths: [
        "多项编码/Agent 基准同时登顶",
        "「截图写前端」独门绝技：上传 UI 设计稿直接生成代码",
        "智能 PPT Agent：1-3 分钟自动生成可编辑 PPT",
        "MMLU 国产第一全球第三",
        "Apache 2.0 开源，全球下载超 10 亿次，生态最强",
      ],
      weaknesses: [
        "Qwen 3.6 Max 旗舰闭源，限制私有化",
        "海外品牌认知度不如 Claude/GPT",
        "部分 Agent 任务稳定性待验证",
      ],
    },
    useCases: [
      "前端开发与全栈编码",
      "PPT 办公自动化",
      "中文创作与多模态应用",
      "开源私有化部署（72B 版本）",
    ],
    updates: "2026年4月发布 Qwen 3.6 系列。Max 版 MMLU 92.3 国产第一全球第三。推出「截图写前端」和「智能 PPT Agent」两大杀手级功能。Qwen 3.6-72B 以 Apache 2.0 开源。",
  },

  ernie: {
    slug: "ernie",
    basic: {
      brand: "百度 (Baidu)",
      latestVersion: "ERNIE 6.0（2026年）",
      releaseDate: "2026-03-20",
      positioning: "中文理解国产第一，百度知识图谱加持，政企合规可解释 AI 首选",
    },
    performance: {
      contextWindow: "128K token",
      multimodal: ["文本", "图像生成"],
      codeAbility: "代码能力非强项",
      longTextAbility: "128K 上下文，远落后于主流 1M 标准",
      reasoningSpeed: "知识图谱双引擎，可解释决策",
      benchmarkHighlights: [
        "C-Eval: 96 分（国产第1）",
        "MMLU: 91.7（全球第5）",
        "120+ 领域专家库覆盖",
        "百万级中文知识实体",
      ],
    },
    prosCons: {
      strengths: [
        "C-Eval 96 分中文理解国产第一",
        "百度知识图谱加持，准确性高",
        "120+ 领域专家库覆盖最广（金融、医疗、法律、政务）",
        "政企合规可解释性最好",
        "永久免费额度（5万 Token/月）",
      ],
      weaknesses: [
        "上下文仅 128K，远落后主流 1M 标准",
        "多模态能力较弱",
        "代码能力非强项",
        "闭源价格偏高（¥5/¥15 per 1M token）",
      ],
    },
    useCases: [
      "中文知识问答与百科查询",
      "政企公文写作",
      "金融合规与医疗咨询",
      "可解释 AI 决策场景",
    ],
    updates: "2026年推出 ERNIE 6.0，C-Eval 96 分国产第一。依托百万级中文知识图谱和 120+ 领域专家库，在政企、金融、医疗等垂直领域保持领先。",
  },

  kimi: {
    slug: "kimi",
    basic: {
      brand: "月之暗面 (Moonshot AI)",
      latestVersion: "Kimi K2.6（2026年）",
      releaseDate: "2026-04-15",
      positioning: "长文本处理基因强大，AA Intelligence Index 开源模型排名第一",
    },
    performance: {
      contextWindow: "超长文本（具体数值未公开）",
      multimodal: ["文本"],
      codeAbility: "编码 + Agent 稳定性出色",
      longTextAbility: "继承 Kimi 品牌基因，超长文档分析能力强大",
      reasoningSpeed: "1.1T MoE 架构",
      benchmarkHighlights: [
        "AA Intelligence Index: 开源模型排名第1",
        "1.1T MoE 架构",
        "Modified MIT 许可可商用",
      ],
    },
    prosCons: {
      strengths: [
        "AA Intelligence Index 开源第一",
        "长文本处理基因强大，超长文档分析精准",
        "编码+Agent 稳定性好",
        "Modified MIT 可商用",
      ],
      weaknesses: [
        "知名度不如 DeepSeek/Qwen",
        "第三方生态较小",
        "多模态能力有限",
      ],
    },
    useCases: [
      "超长文档分析与提炼",
      "开源代码开发",
      "Agent 工作流",
    ],
    updates: "2026年发布 Kimi K2.6，1.1T MoE 架构，Modified MIT 许可，AA Intelligence Index 开源模型排名第一。编码与 Agent 稳定性出色。",
  },

  glm: {
    slug: "glm",
    basic: {
      brand: "智谱 AI (Zhipu AI)",
      latestVersion: "GLM-5.1（2026年）",
      releaseDate: "2026-05-10",
      positioning: "自主技术路线，128K 最大输出业界最长，MIT 开源可商用",
    },
    performance: {
      contextWindow: "200K token",
      multimodal: ["文本"],
      codeAbility: "长程 Agent 编程，复杂任务规划与执行",
      longTextAbility: "200K 上下文 + 128K 最大输出（业界最长单次生成长度）",
      reasoningSpeed: "754B MoE 架构",
      benchmarkHighlights: [
        "最大输出: 128K token（业界最长）",
        "754B MoE MIT 开源",
        "200K 上下文窗口",
      ],
    },
    prosCons: {
      strengths: [
        "128K 最大输出业界最长，写长文无需分段拼接",
        "754B MoE MIT 开源，完全可商用自部署",
        "长程 Agent 编程能力强",
        "自主技术路线",
      ],
      weaknesses: [
        "综合能力距一线有差距",
        "多模态基本没有",
        "生态和社区较小",
      ],
    },
    useCases: [
      "长文生成（报告、论文、书籍）",
      "Agent 编程与复杂任务规划",
      "开源私有化部署",
    ],
    updates: "2026年5月发布 GLM-5.1，754B MoE MIT 开源，200K 上下文 + 128K 最大输出，是业界单次输出最长的模型。",
  },

  doubao: {
    slug: "doubao",
    basic: {
      brand: "字节跳动 (ByteDance)",
      latestVersion: "豆包（持续更新）",
      releaseDate: "2024-05-15",
      positioning: "字节生态深度整合，飞书/抖音/剪映一站式 AI 助手，C 端体验最佳",
    },
    performance: {
      contextWindow: "未公开",
      multimodal: ["文本", "图像生成", "语音交互", "视频处理"],
      codeAbility: "代码能力一般，非核心定位",
      longTextAbility: "基础长文本处理",
      reasoningSpeed: "C 端优化，交互流畅",
      benchmarkHighlights: [
        "飞书/抖音/剪映深度整合",
        "语音多模态流畅",
        "免费使用",
      ],
    },
    prosCons: {
      strengths: [
        "字节生态深度集成（飞书+抖音+剪映无缝联动）",
        "C 端体验打磨精细，交互流畅",
        "语音多模态流畅",
        "飞书办公场景强（会议纪要自动生成）",
        "免费使用",
      ],
      weaknesses: [
        "开发者 API 生态不如通义千问/DeepSeek",
        "技术细节公开少",
        "开源能力弱",
        "国际化不够",
      ],
    },
    useCases: [
      "办公协作（飞书集成）",
      "内容创作（抖音/剪映视频脚本）",
      "日常 AI 助手",
    ],
    updates: "字节跳动旗下豆包大模型全面接入飞书、抖音、剪映等产品线，打造办公协作+内容创作一站式 AI 体验。",
  },
};
