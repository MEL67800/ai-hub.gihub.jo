import { getDb } from "./db";

// 先清空再重填，确保数据是最新的
console.log("Clearing existing data...");
const db = getDb();
db.prepare("DELETE FROM ratings").run();
db.prepare("DELETE FROM news").run();
db.prepare("DELETE FROM products").run();
console.log("  Done.\nSeeding 2026 AI models...");

const products = [
  // ==================== 国际旗舰 ====================
  {
    slug: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    logo_url: "/icons/chatgpt.svg",
    website_url: "https://chat.openai.com",
    release_date: "2022-11-30",
    summary: "OpenAI 旗舰 AI 助手，GPT-5.5 支持 Agent 终端自动化与多模态推理",
    description: `ChatGPT 是 OpenAI 开发的大型语言模型对话产品，2026 年已迭代至 **GPT-5.5** 系列。

## 最新版本：GPT-5.5（2026 年 4 月）

GPT-5.5 在 Agent 终端自动化领域全面领先，Terminal-Bench 2.0 得分 **82.7%**，OSWorld-Verified **78.7%**，SWE-bench Verified ~88.7%。

## 核心能力
- **Agent 自动化最强**：终端操作、浏览器 Agent、函数调用生态最成熟
- **原生多模态**：文本 + 视觉 + 语音输入（首款支持原生语音的旗舰模型）
- **GPT-5.5 Pro**：支持并行测试时计算，FrontierMath Tier 4 达 39.6%
- **函数调用**：业界最成熟的工具链和插件生态
- **AIME 2025**：100%（数学推理满分）

## 适用场景
代码开发、OS 级自动化、Agent 工作流、数学推理、函数调用密集型应用`,
    category: "chat,code,image,voice",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["GPT-5.5 mini", "有限次数", "基础功能"] },
      { name: "Plus", price: "$20/月", features: ["GPT-5.5", "更高额度", "DALL·E 绘图", "优先体验"] },
      { name: "Pro", price: "$200/月", features: ["GPT-5.5 Pro", "并行测试时计算", "最高优先", "无限使用"] },
      { name: "API", price: "$5/$30 per 1M token", features: ["输入/输出", "函数调用", "流式输出"] },
    ]),
    pros: "Agent 终端自动化业界第一\n函数调用生态最成熟\n原生语音+视觉多模态\n数学推理 AIME 满分\nOS 级操作能力最强",
    cons: "长文本幻觉率较高（86%）\n输出价格最贵（$30/M token）\n敏感行业合规不如 Claude\n免费版限制较多",
    status: "active",
  },
  {
    slug: "claude",
    name: "Claude",
    company: "Anthropic",
    logo_url: "/icons/claude.svg",
    website_url: "https://claude.ai",
    release_date: "2023-03-14",
    summary: "Anthropic 安全优先 AI，Claude Opus 4.7 多文件代码推理业界第一",
    description: `Claude 是 Anthropic 开发的安全 AI 助手，2026 年旗舰为 **Claude Opus 4.7**。

## 最新版本：Claude Opus 4.7（2026 年 4 月）

Opus 4.7 在多文件代码推理和 Agent 可靠性上保持领先，SWE-bench Verified **87.6%**（量产模型第 1），SWE-bench Pro **64.3%**（防污染基准第 1）。

## 核心能力
- **多文件代码推理**业界最强，适合大型代码库重构
- **Agent 长期稳定性**最高，长链工具调用不跑偏
- **安全合规**最完善（28 项认证），适合金融/医疗/法律
- **写作质量**最佳，长文本事实性幻觉率仅 36%（GPT-5.5 为 86%）
- **Claude Mythos Preview** 存在但受限（SWE-bench 93.9%，仅 50 家合作方）

## 适用场景
代码审查与架构评审、多文件重构、长篇写作、合规要求高的行业`,
    category: "chat,code,image",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["Sonnet 模型", "每日限额", "基础功能"] },
      { name: "Pro", price: "$20/月", features: ["Opus 模型", "更高额度", "优先访问", "Artifacts"] },
      { name: "Max", price: "$100/月", features: ["Opus 长任务", "200K上下文", "最高优先"] },
      { name: "API", price: "$5/$25 per 1M token", features: ["输入/输出", "1M beta上下文"] },
    ]),
    pros: "多文件代码推理业界第一\nAgent 长期稳定性最高\n写作质量最佳，幻觉率低\n安全合规认证最完善\n长文本理解优秀",
    cons: "上下文仅 200K（1M 仍在 beta）\n多模态不如 Gemini\n价格偏高\n无语音交互",
    status: "active",
  },
  {
    slug: "gemini",
    name: "Gemini",
    company: "Google DeepMind",
    logo_url: "/icons/gemini.svg",
    website_url: "https://gemini.google.com",
    release_date: "2023-12-06",
    summary: "Google DeepMind 多模态 AI，Gemini 3.1 Pro 推理与长上下文综合最强",
    description: `Gemini 是 Google DeepMind 开发的多模态 AI 模型，2026 年旗舰为 **Gemini 3.1 Pro**。

## 最新版本：Gemini 3.1 Pro（2026 年 2 月）

Gemini 3.1 Pro 在推理能力上登顶，GPQA Diamond **94.3%**，是美国云厂商中最便宜的旗舰模型。

## 核心能力
- **推理能力第一**：GPQA Diamond 94.3%（发布时业界最高）
- **1M Token 上下文**稳定可用（2M beta），唯一真正的生产级百万上下文窗口
- **原生多模态最完整**：图片 + 音频 + 视频 + 代码一站式处理
- **性价比高**：$2/$12 per 1M token（美国最便宜旗舰）
- Google 生态深度整合（Workspace、搜索、云服务）

## 适用场景
长文档处理、多模态流水线、视频理解、Google 生态集成`,
    category: "chat,code,image,voice,video",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["Gemini 3.1 Flash", "基础功能"] },
      { name: "Advanced", price: "$19.99/月", features: ["Gemini 3.1 Pro", "1M 上下文", "Google One 权益"] },
      { name: "API（≤200K）", price: "$2/$12 per 1M token", features: ["输入/输出", "多模态API"] },
    ]),
    pros: "GPQA Diamond 推理业界第一\n1M token 生产级上下文\n原生多模态最完整\n美国云最便宜旗舰\nGoogle 生态深度整合",
    cons: "纯代码能力略逊于 Claude/GPT\nGoogle Cloud 绑定较深\n中文支持待加强\n部分地区不可用",
    status: "active",
  },
  {
    slug: "grok",
    name: "Grok",
    company: "xAI (Elon Musk)",
    logo_url: "/icons/grok.svg",
    website_url: "https://grok.x.ai",
    release_date: "2024-11-01",
    summary: "xAI 多智能体辩论架构，Grok 4.20 幻觉率最低，实时接入 X 平台数据",
    description: `Grok 是 xAI（Elon Musk 旗下）开发的 AI 助手，2026 年最新为 **Grok 4.20 Multi-Agent Beta**。

## 最新版本：Grok 4.20 Multi-Agent Beta（2026 年 3 月）

首创 **4-16 个 Agent 并行辩论**架构，每个答案经多个智能体验证后输出，幻觉率业界最低（AA-Omniscience **78%**）。

## 核心能力
- **多智能体辩论**：生产级多 Agent 默认架构，大幅降低幻觉
- **2M 上下文窗口** + 267 tok/s 推理速度
- **AIME 数学** 93.3%，数学推理强
- **X 平台实时数据**：唯一接入 X/Twitter 全量数据
- **性价比极高**：$1.25/$2.50 per 1M token

## 适用场景
研究分析、数学推理、实时信息查询、低幻觉需求`,
    category: "chat,code,image",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["Grok 基础模型", "X 平台集成"] },
      { name: "API", price: "$1.25/$2.50 per 1M token", features: ["2M 上下文", "267 tok/s"] },
    ]),
    pros: "多 Agent 辩论架构，幻觉率最低\n性价比极高（$1.25/$2.50）\n2M 超长上下文\nX 平台实时数据独家接入\n数学推理突出",
    cons: "代码能力不如 Claude/GPT\n生态年轻，工具集成有限\n国内访问受限\n品牌认知度不足",
    status: "active",
  },
  {
    slug: "llama",
    name: "Llama 4",
    company: "Meta",
    logo_url: "/icons/llama.svg",
    website_url: "https://llama.meta.com",
    release_date: "2025-04-01",
    summary: "Meta 开源模型，Llama 4 Maverick 支持 10M 超长上下文",
    description: `Llama 4 是 Meta 推出的开源大模型系列，Maverick 版本以 **10M token 上下文**窗口刷新开源纪录。

## 核心能力
- **10M Token 上下文**：开源模型中最长，可处理整本书级别内容
- **400B MoE 架构**：总参数 400B，高效推理
- **开源可商用**（Llama License）
- Meta 生态支持（Instagram、WhatsApp 集成）

## 适用场景
极端长上下文应用、开源研究、本地部署`,
    category: "chat,code",
    pricing_json: JSON.stringify([
      { name: "开源", price: "免费下载", features: ["自部署", "Llama License"] },
    ]),
    pros: "10M token 开源最长上下文\n400B MoE 架构高效\nMeta 生态集成\n免费可商用（有限制）",
    cons: "代码能力不及闭源旗舰\n多模态能力较弱\nLlama License 有限制\n中文能力一般",
    status: "active",
  },
  {
    slug: "mistral",
    name: "Mistral Large 3",
    company: "Mistral AI",
    logo_url: "/icons/mistral.svg",
    website_url: "https://mistral.ai",
    release_date: "2026-02-01",
    summary: "欧洲最强开源模型，675B MoE，Apache 2.0 许可",
    description: `Mistral Large 3 是法国 Mistral AI 的旗舰开源模型，于 2026 年发布。

## 核心能力
- **675B/41B MoE**：非中国开源模型中综合最强
- **Apache 2.0 许可**：真正自由商用
- **256K 上下文** + 多模态支持
- 欧洲数据合规（GDPR）

## 适用场景
非中国开源首选、欧洲合规部署、多语言场景`,
    category: "chat,code,image",
    pricing_json: JSON.stringify([
      { name: "开源", price: "免费下载", features: ["Apache 2.0", "自部署"] },
      { name: "API", price: "$2/$8 per 1M token", features: ["256K 上下文", "多模态"] },
    ]),
    pros: "非中国开源模型综合最强\nApache 2.0 真正自由商用\n欧洲数据合规（GDPR）\n多语言支持好",
    cons: "代码能力不如 DeepSeek\n中国市场知名度低\nAPI 服务不如美国厂商成熟",
    status: "active",
  },

  // ==================== 国产旗舰 ====================
  {
    slug: "deepseek",
    name: "DeepSeek V4",
    company: "深度求索 (DeepSeek)",
    logo_url: "/icons/deepseek.svg",
    website_url: "https://www.deepseek.com",
    release_date: "2024-01-05",
    summary: "国产开源之光，V4-Pro MIT 开源，极致性价比仅为 GPT 的 1/400",
    description: `DeepSeek V4 是深度求索推出的开源大模型，2026 年 4 月发布 **V4-Pro** 和 **V4-Flash** 两个版本。

## 最新版本：DeepSeek V4-Pro / V4-Flash（2026 年 4 月）

混合注意力架构（CSA + HCA），1M+ 上下文，MIT 开源可私有化部署。

## 核心能力
- **极致性价比**：V4-Flash 仅 $0.07/M token 输出（GPT-5.5 的 **1/400**）
- **MIT 开源**：1.6T/49B MoE，可下载权重自部署
- **混合注意力**：CSA + HCA 架构，长上下文效率最高
- **Codeforces Elo 3,206**：竞赛编程能力强
- **1M+ Token 上下文**：长文本处理出色

## 适用场景
高并发线上服务、预算敏感、私有化部署、中文场景、竞赛编程`,
    category: "chat,code",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["V4-Flash", "Web/App"] },
      { name: "V4-Flash API", price: "$0.04/$0.07 per 1M token", features: ["1M 上下文", "极致低价"] },
      { name: "V4-Pro API", price: "$0.435/$0.87 per 1M token", features: ["49B 活跃参数", "更强推理"] },
      { name: "开源", price: "MIT 免费", features: ["自部署", "1.6T 权重下载"] },
    ]),
    pros: "极致性价比，API 仅 GPT 1/400\nMIT 开源可私有化部署\n1M+ 超长上下文\n竞赛编程能力强\n中文场景优化",
    cons: "SWE-bench Pro（防污染）仅 55.4%\nAgent 稳定性不如 Claude\n海外部署节点少\n多模态能力有限",
    status: "active",
  },
  {
    slug: "qwen",
    name: "通义千问",
    company: "阿里云 (Alibaba)",
    logo_url: "/icons/qwen.svg",
    website_url: "https://tongyi.aliyun.com",
    release_date: "2023-04-11",
    summary: "阿里云全能旗舰，Qwen 3.6 Max 多项编码/Agent 基准同时第一",
    description: `通义千问（Qwen）是阿里云推出的大模型系列，2026 年 4 月发布 **Qwen 3.6** 系列。

## 最新版本：Qwen 3.6 Max / Qwen 3.6-72B（2026 年 4 月）

MMLU **92.3**（国产第 1，全球第 3），多项编码和 Agent 基准同时登顶。

## 核心能力
- **多项基准同时 #1**：编码/Agent 基准全面领先
- **"截图写前端"**：上传 UI 设计稿直接生成 HTML/CSS/JS 代码
- **智能 PPT Agent**：1-3 分钟自动生成可编辑 PPT
- **1M Token 上下文** + 原生多模态
- **Qwen 3.6-72B 开源**（Apache 2.0），全球下载超 10 亿次
- **科学推理**：GPQA Diamond 90.4%

## 适用场景
前端开发、全栈编码、PPT 办公、中文创作、多模态应用`,
    category: "chat,code,image,voice,video",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["Qwen 基础模型", "Web/App"] },
      { name: "API", price: "¥2/¥12 per 1M token", features: ["1M 上下文", "多模态"] },
      { name: "开源 72B", price: "Apache 2.0 免费", features: ["自部署", "可商用"] },
    ]),
    pros: "多项编码/Agent 基准同时第一\n[截图写前端] 独门绝技\nPPT Agent 办公效率神器\nMMLU 国产第一全球第三\nApache 2.0 开源生态最强",
    cons: "Qwen 3.6 Max 闭源转向\n海外品牌认知度不如 Claude/GPT\n部分 Agent 任务稳定性待验证\n旗舰闭源限制私有化",
    status: "active",
  },
  {
    slug: "ernie",
    name: "文心一言",
    company: "百度 (Baidu)",
    logo_url: "/icons/ernie.svg",
    website_url: "https://yiyan.baidu.com",
    release_date: "2023-03-16",
    summary: "百度知识增强大模型，ERNIE 6.0 中文理解 C-Eval 96 分国产第一",
    description: `文心一言（ERNIE）是百度推出的知识增强大模型，2026 年迭代至 **ERNIE 6.0**。

## 最新版本：ERNIE 6.0（2026 年）

凭借百度知识图谱（百万级中文知识实体），在中文理解领域继续保持领先。

## 核心能力
- **中文理解最强**：C-Eval **96 分**（国产第 1）
- **知识图谱双引擎**：百万级中文知识实体 + 大模型
- **120+ 领域专家库**：金融、医疗、法律、政务覆盖最广
- **可解释决策**：政企合规场景首选
- MMLU 91.7（全球第 5）

## 适用场景
中文知识问答、政企公文、金融合规、百科查询、可解释 AI`,
    category: "chat,image",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["5 万 Token/月", "永久免费"] },
      { name: "API", price: "¥5/¥15 per 1M token", features: ["128K 上下文"] },
    ]),
    pros: "C-Eval 96 分中文理解国产第一\n百度知识图谱加持准确性高\n120+ 领域专家库覆盖最广\n政企合规可解释性最好\n永久免费额度",
    cons: "上下文仅 128K 远落后主流\n多模态能力较弱\n代码能力非强项\n闭源价格偏高",
    status: "active",
  },
  {
    slug: "kimi",
    name: "Kimi",
    company: "月之暗面 (Moonshot AI)",
    logo_url: "/icons/kimi.svg",
    website_url: "https://kimi.moonshot.cn",
    release_date: "2023-10-09",
    summary: "月之暗面长文本专家，Kimi K2.6 开源综合评测 AA Intelligence Index 第一",
    description: `Kimi 是月之暗面推出的 AI 助手，以超长文本处理闻名，2026 年发布 **Kimi K2.6**。

## 最新版本：Kimi K2.6（2026 年）

1.1T MoE 架构，Modified MIT 许可，AA Intelligence Index 开源模型排名第 1。

## 核心能力
- **AA Intelligence Index 开源第 1**
- **1.1T MoE**：编码 + Agent 稳定性出色
- **长文本处理**：继承 Kimi 品牌基因，超长文档分析
- Modified MIT 许可可商用

## 适用场景
长文档分析、开源代码开发、Agent 工作流`,
    category: "chat,code",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["K2.6 基础", "长文本"] },
      { name: "API", price: "按量计费", features: ["1.1T MoE"] },
    ]),
    pros: "AA Intelligence Index 开源第一\n长文本处理基因强大\n编码+Agent 稳定性好\nModified MIT 可商用",
    cons: "知名度不如 DeepSeek/Qwen\n第三方生态较小\n多模态能力有限",
    status: "active",
  },
  {
    slug: "glm",
    name: "GLM-5.1",
    company: "智谱 AI (Zhipu AI)",
    logo_url: "/icons/glm.svg",
    website_url: "https://open.bigmodel.cn",
    release_date: "2025-01-01",
    summary: "智谱 AI 旗舰，754B MoE MIT 开源，128K 最大输出业界最长",
    description: `GLM-5.1 是智谱 AI 推出的开源大模型，于 2026 年发布。

## 最新版本：GLM-5.1（2026 年）

754B MoE 架构，MIT 开源许可，200K 上下文 + **128K 最大输出**（业界最长单次输出）。

## 核心能力
- **128K 最大输出**：业界最长单次生成长度
- **754B MoE MIT 开源**：完全可商用自部署
- **长程 Agent 编程**：复杂任务规划与执行
- 200K 上下文窗口

## 适用场景
长文生成、Agent 编程、开源部署`,
    category: "chat,code",
    pricing_json: JSON.stringify([
      { name: "API", price: "按量计费", features: ["200K 上下文", "128K 输出"] },
      { name: "开源", price: "MIT 免费", features: ["754B MoE", "自部署"] },
    ]),
    pros: "128K 输出业界最长\n754B MoE MIT 开源\n长程 Agent 编程\n自主技术路线",
    cons: "综合能力距一线有差距\n多模态不如通义千问\n生态和社区较小",
    status: "active",
  },
  {
    slug: "doubao",
    name: "豆包",
    company: "字节跳动 (ByteDance)",
    logo_url: "/icons/doubao.svg",
    website_url: "https://www.doubao.com",
    release_date: "2024-05-15",
    summary: "字节跳动 C 端 AI 助手，深度整合飞书/抖音/剪映生态",
    description: `豆包（Doubao）是字节跳动推出的 AI 助手，聚焦 C 端用户体验与字节生态整合。

## 核心能力
- **字节生态深度整合**：飞书、抖音、剪映无缝联动
- **C 端体验精细**：交互打磨用心，语音/多模态流畅
- **内容创作**：视频脚本、文案、图片生成一站式

## 适用场景
办公协作（飞书）、内容创作（抖音/剪映）、日常 AI 助手`,
    category: "chat,image,voice,video",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["基础功能", "字节生态"] },
    ]),
    pros: "字节生态深度集成\nC 端体验打磨精细\n语音多模态流畅\n飞书办公场景强",
    cons: "开发者 API 生态不如通义/DeepSeek\n技术细节公开少\n开源能力弱\n国际化不够",
    status: "active",
  },
];

const productIds: Record<string, number> = {};

for (const p of products) {
  const result = db
    .prepare(
      `INSERT INTO products (slug, name, company, logo_url, website_url, release_date, summary, description, category, pricing_json, pros, cons, status)
       VALUES (@slug, @name, @company, @logo_url, @website_url, @release_date, @summary, @description, @category, @pricing_json, @pros, @cons, @status)`
    )
    .run(p);
  productIds[p.slug] = result.lastInsertRowid as number;
  console.log(`  [${p.company}] ${p.name}`);
}
console.log(`\n${Object.keys(productIds).length} products created.\n`);

// ==================== 种子资讯（2025-2026 真实动态） ====================
const newsList = [
  // ChatGPT / OpenAI
  { slug: "chatgpt", title: "OpenAI 发布 GPT-5.5：Agent 终端自动化全面领先", content: "2026 年 4 月 23 日，OpenAI 正式发布 GPT-5.5 系列。Terminal-Bench 2.0 得分 82.7% 业界第一，OSWorld-Verified 78.7%，SWE-bench Verified ~88.7%。GPT-5.5 Pro 支持并行测试时计算，FrontierMath Tier 4 达 39.6%。首次在旗舰模型中支持原生语音输入。", source_url: "https://openai.com/index/gpt-5-5/", published_at: "2026-04-23" },
  { slug: "chatgpt", title: "GPT-5.2 数学推理 AIME 2025 满分", content: "OpenAI 宣布 GPT-5.2 在 AIME 2025 数学竞赛中取得 100% 正确率，成为首个在该基准取得满分的模型。", source_url: "https://openai.com/index/gpt-5-2-aime/", published_at: "2026-03-01" },
  // Claude / Anthropic
  { slug: "claude", title: "Anthropic 发布 Claude Opus 4.7：多文件代码推理新标杆", content: "2026 年 4 月 16 日，Anthropic 发布 Claude Opus 4.7，SWE-bench Verified 87.6% 量产模型第一，SWE-bench Pro 64.3% 防污染基准第一。长文本事实性幻觉率仅 36%，远低于 GPT-5.5 的 86%。", source_url: "https://www.anthropic.com/news/claude-opus-4-7", published_at: "2026-04-16" },
  { slug: "claude", title: "Claude Mythos 内部测试成绩曝光：SWE-bench 93.9%", content: "Anthropic 确认 Claude Mythos Preview 存在但仅限 Project Glasswing 约 50 家合作方使用。该模型 SWE-bench 达 93.9%，但因其能力过强（发现大量零日漏洞）而被限制发布。", source_url: "https://www.anthropic.com/news/project-glasswing", published_at: "2026-05-01" },
  // Gemini / Google
  { slug: "gemini", title: "Google 发布 Gemini 3.1 Pro：GPQA Diamond 推理第一", content: "2026 年 2 月 19 日，Google DeepMind 发布 Gemini 3.1 Pro，GPQA Diamond 94.3% 业界最高。1M token 生产级上下文窗口，$2/$12 per 1M token 美国最便宜旗舰。3 月 6 日起成为 API 默认版本。", source_url: "https://blog.google/technology/ai/gemini-3-1-pro/", published_at: "2026-02-19" },
  { slug: "gemini", title: "Gemini 3.1 Pro 在 Terminal-Bench 2.0 达 78.4%", content: "配合 Forge Code harness，Gemini 3.1 Pro 在 Terminal-Bench 2.0 取得 78.4%，展现出色的 Agent 终端能力。", source_url: "https://deepmind.google/blog/gemini-agent-benchmarks/", published_at: "2026-03-15" },
  // Grok / xAI
  { slug: "grok", title: "xAI 发布 Grok 4.20：多智能体辩论架构重新定义低幻觉", content: "2026 年 3 月 9 日，xAI 发布 Grok 4.20 Multi-Agent Beta。首创 4-16 个 Agent 并行辩论架构，AA-Omniscience 78% 幻觉率业界最低。2M 上下文 + 267 tok/s，AIME 93.3%。", source_url: "https://x.ai/blog/grok-4-20", published_at: "2026-03-09" },
  // DeepSeek
  { slug: "deepseek", title: "DeepSeek 发布 V4 系列：MIT 开源，API 仅为 GPT 的 1/400", content: "2026 年 4 月 23-24 日，DeepSeek 连续发布 V4-Pro 和 V4-Flash。V4-Pro 1.6T/49B MoE，混合注意力架构 CSA+HCA，1M+ 上下文。V4-Flash 输出仅 $0.07/M token，是 GPT-5.5 的 1/400。", source_url: "https://www.deepseek.com/blog/v4-series", published_at: "2026-04-24" },
  { slug: "deepseek", title: "DeepSeek V4 开源冲击波：全球下载量一周破百万", content: "DeepSeek V4 系列 MIT 开源一周内，模型权重全球下载量突破百万次，引发新一轮 AI 民主化讨论。", source_url: "https://www.deepseek.com/blog/v4-open-source", published_at: "2026-05-05" },
  // 通义千问 / 阿里
  { slug: "qwen", title: "阿里发布通义千问 Qwen 3.6：多项基准同时登顶", content: "2026 年 4 月，阿里云发布 Qwen 3.6 系列。Max 版 MMLU 92.3 国产第一全球第三，多项编码和 Agent 基准同时 #1。推出[截图写前端]和[智能 PPT Agent]两大杀手级功能。", source_url: "https://tongyi.aliyun.com/blog/qwen-3-6", published_at: "2026-04-25" },
  { slug: "qwen", title: "Qwen 3.6-72B 开源，Apache 2.0 可商用", content: "Qwen 3.6-72B 以 Apache 2.0 许可开源，全球下载量累计超 10 亿次，成为最受欢迎的开源中文大模型。", source_url: "https://github.com/QwenLM/Qwen3.6", published_at: "2026-04-28" },
  // 文心一言 / 百度
  { slug: "ernie", title: "百度发布 ERNIE 6.0：C-Eval 96 分中文理解新高度", content: "2026 年，百度推出 ERNIE 6.0，C-Eval 得分 96 分国产第一，依托百万级中文知识图谱和 120+ 领域专家库，在政企、金融、医疗等垂直领域保持领先。", source_url: "https://yiyan.baidu.com/blog/ernie-6", published_at: "2026-03-20" },
  // Kimi / 月之暗面
  { slug: "kimi", title: "Kimi K2.6 发布：AA Intelligence Index 开源第一", content: "月之暗面发布 Kimi K2.6，1.1T MoE 架构，Modified MIT 许可，在 AA Intelligence Index 开源模型中排名第一，编码与 Agent 稳定性出色。", source_url: "https://www.moonshot.cn/blog/k2-6", published_at: "2026-04-15" },
  // GLM / 智谱
  { slug: "glm", title: "智谱发布 GLM-5.1：128K 最大输出业界最长", content: "智谱 AI 发布 GLM-5.1，754B MoE MIT 开源，200K 上下文 + 128K 最大输出，是业界单次输出最长的模型，面向长程 Agent 编程场景。", source_url: "https://open.bigmodel.cn/blog/glm-5-1", published_at: "2026-05-10" },
  // Llama / Meta
  { slug: "llama", title: "Meta 发布 Llama 4 Maverick：10M 上下文开源新纪录", content: "Meta 推出 Llama 4 Maverick，400B MoE 架构，10M token 上下文窗口创开源模型新纪录，可处理整本书级别的内容。", source_url: "https://ai.meta.com/blog/llama-4/", published_at: "2026-01-15" },
  // Mistral
  { slug: "mistral", title: "Mistral AI 发布 Mistral Large 3：欧洲最强开源模型", content: "法国 Mistral AI 发布 Mistral Large 3，675B/41B MoE，Apache 2.0 许可，256K 上下文 + 多模态支持，是非中国开源模型中的综合最强。", source_url: "https://mistral.ai/news/mistral-large-3", published_at: "2026-02-10" },
  // 豆包
  { slug: "doubao", title: "豆包深度整合飞书/抖音/剪映生态", content: "字节跳动旗下豆包大模型全面接入飞书、抖音、剪映等产品线，打造办公协作+内容创作一站式 AI 体验。", source_url: "https://www.doubao.com/blog/ecosystem", published_at: "2026-01-20" },
];

for (const n of newsList) {
  const { slug, ...newsData } = n;
  const productId = productIds[slug];
  if (!productId) {
    console.log(`  WARN: product not found for slug "${slug}", skipping news "${n.title}"`);
    continue;
  }
  db.prepare(
    `INSERT INTO news (product_id, title, content, source_url, published_at)
     VALUES (@product_id, @title, @content, @source_url, @published_at)`
  ).run({ ...newsData, product_id: productId });
  console.log(`  News: ${n.published_at} — ${n.title}`);
}
console.log(`\n${newsList.length} news items created.\n`);

// ==================== 种子评分（模拟用户评价） ====================
const ratings: { slug: string; score: number; comment: string }[] = [
  { slug: "chatgpt", score: 5, comment: "GPT-5.5 的 Agent 终端自动化确实强，直接操作终端完成任务，省了我大量时间" },
  { slug: "chatgpt", score: 4, comment: "函数调用生态最成熟，但 API 价格确实让人肉疼" },
  { slug: "chatgpt", score: 5, comment: "数学推理 AIME 满分不是吹的，复杂公式推导非常准确" },
  { slug: "chatgpt", score: 3, comment: "长文本有时候会瞎编，幻觉问题还是比较明显" },
  { slug: "claude", score: 5, comment: "Opus 4.7 做多文件重构太强了，理解整个代码库上下文，给出的方案直接能用" },
  { slug: "claude", score: 5, comment: "写长篇技术文档的首选，逻辑连贯、风格统一、事实准确" },
  { slug: "claude", score: 4, comment: "代码审查必用，但上下文只有 200K 有时不够用" },
  { slug: "claude", score: 5, comment: "安全和合规做得最好，金融项目我用它最放心" },
  { slug: "gemini", score: 5, comment: "1M 上下文是真正的生产级，处理几百页的 PDF 毫不费力" },
  { slug: "gemini", score: 4, comment: "多模态能力最全面，视频理解很出色，但代码不如 Claude" },
  { slug: "gemini", score: 4, comment: "Google Workspace 集成太好用了，直接在 Gmail/Docs 里用" },
  { slug: "gemini", score: 3, comment: "中文回答有时候差点意思，对国内场景理解不够深" },
  { slug: "grok", score: 5, comment: "多 Agent 辩论架构确实有效，幻觉少了很多，研究分析用它最放心" },
  { slug: "grok", score: 4, comment: "X 平台实时数据是独门优势，做热点分析太及时了" },
  { slug: "grok", score: 3, comment: "代码能力还有差距，不适合做开发主力模型" },
  { slug: "deepseek", score: 5, comment: "MIT 开源+极致性价比，我们公司整个 AI 服务都迁移到 V4 了，成本降到原来的 1%" },
  { slug: "deepseek", score: 5, comment: "私有化部署文档清晰，半小时就搞定了，1M 上下文体验很好" },
  { slug: "deepseek", score: 4, comment: "竞赛编程能力确实强，Codeforces 级别的题都能搞定" },
  { slug: "deepseek", score: 3, comment: "Agent 长链任务有时会断，稳定性还需要加强" },
  { slug: "deepseek", score: 4, comment: "国内用体验最好，海外部署节点太少了" },
  { slug: "qwen", score: 5, comment: "截图写前端太惊艳了！对着设计稿拍照直接出代码，前端开发效率翻倍" },
  { slug: "qwen", score: 5, comment: "PPT Agent 1 分钟生成可编辑 PPT，汇报利器，同事都震惊了" },
  { slug: "qwen", score: 4, comment: "Qwen 3.6-72B 开源版部署简单，Apache 2.0 商用无忧" },
  { slug: "qwen", score: 4, comment: "综合能力国产最强，但 Max 版闭源有点遗憾" },
  { slug: "ernie", score: 5, comment: "中文理解太准了，成语、古诗、古文信手拈来，写公文必备" },
  { slug: "ernie", score: 4, comment: "120+ 领域专家库覆盖广，医疗和金融咨询非常专业" },
  { slug: "ernie", score: 3, comment: "代码能力确实不是强项，上下文 128K 也有点跟不上时代" },
  { slug: "kimi", score: 4, comment: "长文档分析能力很强，几十万字的报告能精准提炼要点" },
  { slug: "kimi", score: 4, comment: "K2.6 开源后的 Agent 稳定性比上一代好很多" },
  { slug: "kimi", score: 3, comment: "知名度不够，跟同行推荐他们都没听过" },
  { slug: "glm", score: 4, comment: "128K 输出的单次生成能力太猛了，写长文不需要分段拼接" },
  { slug: "glm", score: 3, comment: "综合能力跟 DeepSeek/Qwen 还有差距，多模态基本没有" },
  { slug: "doubao", score: 4, comment: "飞书+豆包组合办公效率超高，会议纪要自动生成非常准" },
  { slug: "doubao", score: 4, comment: "剪映里直接用豆包写视频脚本，内容创作流太顺畅了" },
  { slug: "doubao", score: 3, comment: "API 生态不如通义千问，开发者友好度有待提升" },
  { slug: "llama", score: 4, comment: "10M 上下文是开源的重大突破，处理整本书级别的分析非常好用" },
  { slug: "llama", score: 3, comment: "代码和多模态能力一般，胜在开源自由度" },
  { slug: "mistral", score: 4, comment: "欧洲数据合规首选 Apache 2.0 开源，GDPR 场景下没有替代品" },
  { slug: "mistral", score: 3, comment: "中文能力有限，不适合国内场景" },
];

for (const r of ratings) {
  const productId = productIds[r.slug];
  if (!productId) continue;
  db.prepare(
    `INSERT INTO ratings (product_id, score, comment) VALUES (@product_id, @score, @comment)`
  ).run({ product_id: productId, score: r.score, comment: r.comment });
}
console.log(`${ratings.length} ratings created.\n`);
console.log("Seeding complete!");
