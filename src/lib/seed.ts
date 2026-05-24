import { getDb, createProduct, createNews } from "./db";

const products = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    website_url: "https://chat.openai.com",
    release_date: "2022-11-30",
    summary: "OpenAI 推出的旗舰 AI 助手，支持多模态对话与推理",
    description: `ChatGPT 是 OpenAI 开发的大型语言模型对话产品。

## 核心特性
- 多模态：文本、图像、语音、代码
- 插件生态丰富
- GPT Store 可定制`,
    category: "chat,code,image,voice",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["GPT-4o mini", "有限次数", "基础功能"] },
      { name: "Plus", price: "$20/月", features: ["GPT-4o", "更高额度", "DALL·E 绘图", "优先体验"] },
      { name: "Pro", price: "$200/月", features: ["无限使用", "GPT-4o Pro", "最高优先"] },
    ]),
    pros: "生态丰富，插件多\n多模态能力全面\n响应速度快\n持续更新频繁",
    cons: "免费版限制较多\n隐私政策有争议\n高峰期可能排队",
    status: "active",
  },
  {
    slug: "claude",
    name: "Claude",
    company: "Anthropic",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Anthropic_logo.svg",
    website_url: "https://claude.ai",
    release_date: "2023-03-14",
    summary: "Anthropic 的安全优先 AI 助手，长文本处理能力突出",
    description: `Claude 是 Anthropic 开发的安全 AI 助手。

## 核心特性
- 超长上下文窗口
- 安全对齐设计
- Artifacts 交互式内容`,
    category: "chat,code,image",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["Sonnet 模型", "每日限额", "基础功能"] },
      { name: "Pro", price: "$20/月", features: ["Opus 模型", "更高额度", "优先访问"] },
    ]),
    pros: "长文本理解优秀\n安全性高，偏见少\nArtifacts 交互好\n代码能力出色",
    cons: "多模态能力不如竞品\n免费额度较低\n无语音交互",
    status: "active",
  },
  {
    slug: "gemini",
    name: "Gemini",
    company: "Google",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Google_Gemini_logo.svg",
    website_url: "https://gemini.google.com",
    release_date: "2023-12-06",
    summary: "Google DeepMind 的多模态 AI，深度整合 Google 生态",
    description: `Gemini 是 Google DeepMind 开发的多模态 AI 模型。

## 核心特性
- 原生多模态（文本+图像+音频+视频）
- Google 生态深度整合
- 超大上下文窗口`,
    category: "chat,code,image,voice,video",
    pricing_json: JSON.stringify([
      { name: "免费版", price: "免费", features: ["Gemini 2.0 Flash", "基础功能"] },
      { name: "Advanced", price: "$19.99/月", features: ["Gemini Ultra", "Google One 权益", "优先新功能"] },
    ]),
    pros: "多模态原生支持\n与 Google 生态整合\n搜索能力强\n上下文窗口大",
    cons: "部分地区不可用\n中文支持待加强\n产品线较分散",
    status: "active",
  },
];

console.log("Seeding database...");
const db = getDb();

for (const p of products) {
  const existing = db.prepare("SELECT id FROM products WHERE slug = ?").get(p.slug);
  if (!existing) {
    createProduct(p as any);
    console.log(`  Created: ${p.name}`);
  } else {
    console.log(`  Skipped: ${p.name} (already exists)`);
  }
}

function getProductId(slug: string): number {
  const row = db.prepare("SELECT id FROM products WHERE slug = ?").get(slug) as { id: number } | undefined;
  if (!row) throw new Error(`Product not found: ${slug}`);
  return row.id;
}

const newsList = [
  { slug: "chatgpt", title: "GPT-4o 正式发布", content: "OpenAI 发布 GPT-4o 多模态模型...", source_url: "https://openai.com/index/hello-gpt-4o/", published_at: "2024-05-13" },
  { slug: "claude", title: "Claude 3.5 Sonnet 发布", content: "Anthropic 发布 Claude 3.5 Sonnet...", source_url: "https://www.anthropic.com/news/claude-3-5-sonnet", published_at: "2024-06-20" },
  { slug: "gemini", title: "Gemini 2.0 Flash 发布", content: "Google 推出 Gemini 2.0 Flash...", source_url: "https://blog.google/technology/ai/google-gemini-ai/", published_at: "2025-02-05" },
];

for (const n of newsList) {
  const { slug, ...newsData } = n;
  createNews({ ...newsData, product_id: getProductId(slug) });
  console.log(`  Created news: ${n.title}`);
}

console.log("Seeding complete!");
