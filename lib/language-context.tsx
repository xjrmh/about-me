'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Profile Section
    'profile.name': 'Li Zheng',
    'profile.title': 'Data Science | Product | AI',
    'profile.experience': 'Experience',
    'profile.education': 'Education',
    'profile.projects': 'Projects',

    // Mobile tabs
    'tab.experience': 'Experience',
    'tab.projects': 'Projects',

    // Experience
    'exp.meta.title': 'Lead Data Scientist, Tech Lead',
    'exp.meta.company': 'Meta (Instagram / Messenger)',
    'exp.meta.date': 'Sep 2021 - Jan 2026',
    'exp.meta.desc': 'Led IG Search × MetaAI integration by enabling LLM-based query understanding and personalized ranking; drove the global launch of E2EE on Messenger.',
    'exp.meta.bullet1': '0→1: drove and unblocked the integration of AI search into Instagram',
    'exp.meta.bullet2': '1→100: rebuilt the search flow (query understanding, retrieval, ranking, personalization & model evaluation) from data foundation to directions',
    'exp.meta.bullet3': 'Led a cross-functional analytics team improving IG search quality while enabling MetaAI features such as AI summarization and content recognition',
    'exp.meta.bullet4': 'Drove product go/no-go launch decisions by designing experiments, defining goals/metrics, designing rollout plans, & iterating with causal studies',
    'exp.meta.bullet5': 'Designed customized A/B test frameworks for cluster/network experiments, later became standard practice across Org',
    'exp.meta.bullet6': 'Set team roadmaps by identifying user frictions, sizing/prioritizing opportunities, and estimating timeline; supported DS and engineering hiring',
    'exp.meta.link1.text': 'IG Search × MetaAI',
    'exp.meta.link1.url': 'https://about.instagram.com/blog/announcements/instagram-meta-ai',
    'exp.meta.link2.text': 'E2EE',
    'exp.meta.link2.url': 'https://about.fb.com/news/2023/12/default-end-to-end-encryption-on-messenger/',

    'exp.cofounder': 'Co-Founder',
    'exp.cofounder.company': 'Flat Strategy',
    'exp.cofounder.date': 'Mar 2025 - Present',
    'exp.cofounder.desc': 'Empowering modern homebuyers with expert transaction services, leveraging in-house agentic AI to deliver unmatched transparency, speed, and financial clarity.',
    'exp.cofounder.link1.text': 'Check us out!',
    'exp.cofounder.link1.url': 'https://www.closewithflat.com',

    'exp.pwc.title': 'Senior Associate, Data & Analytics Insights',
    'exp.pwc.company': 'PwC',
    'exp.pwc.date': 'Jun 2018 - Sep 2021',
    'exp.pwc.desc': 'Led top banks developing measurable insights, testing and implementing new ideas, mitigating risks, and reducing frictions through advanced quantitative analytics.',
    'exp.pwc.bullet1': 'Led analytics engagements for major banks to test/implement new ideas, mitigate risk, and reduce operational friction through quantitative modeling',
    'exp.pwc.bullet2': 'Developed and tuned financial risk models and classifiers; ran hypothesis testing and monitoring, saving 100+ hours/week in manual review',
    'exp.pwc.bullet3': 'Built an NLP transaction screening system in Python (spaCy, scikit-learn, TensorFlow) and supported deployment across multiple clients',

    'exp.duke.title': 'Summer Data Analyst',
    'exp.duke.company': 'Duke Health',
    'exp.duke.date': 'Mar 2018 - Jun 2018',
    'exp.duke.desc': 'Optimized fraudulent identification workflow for one of the largest hospital groups in North America, reducing false positive rate from 37% to less than 10%.',
    'exp.duke.bullet1': 'Designed and implemented fraud and anomalies detection workflow',
    'exp.duke.bullet2': 'Built ETL data pipelines, performed DQ analysis, and drafted data dictionaries',

    'exp.her.title': 'Data Analyst',
    'exp.her.company': 'HER Realtors',
    'exp.her.date': 'Aug 2015 - Dec 2016',
    'exp.her.desc': 'Developed a real estate price prediction and recommendation system to help investor clients, leading to $5.3M combined deals.',
    'exp.her.bullet1': 'Delivered model outputs via Tableau dashboards and iterated models/features with stakeholders',
    'exp.her.bullet2': 'Built and trained machine learning models based on past transaction data',

    // Education
    'edu.duke.degree': 'M.S., Data Science (Financial Fraud Analytics)',
    'edu.duke.school': 'Duke University',
    'edu.duke.date': '2017 - 2018',

    'edu.osu.degree': 'B.S., Accounting & MIS',
    'edu.osu.school': 'The Ohio State University',
    'edu.osu.date': '2012 - 2016',

    // Activity
    'profile.activity': 'Activity',
    'activity.pilot.title': 'Private Pilot License (PPL)',
    'activity.pilot.org': 'FAA • #3877290',

    // Projects
    'proj.flat': 'Close with Flat',
    'proj.flat.desc': 'Modern home buying experience with reduced cost through flat-fee transaction services',
    'proj.aterminal': 'Alpha Terminal',
    'proj.aterminal.desc': 'AI-powered financial intelligence dashboard that uses LLMs and real-time data to run modular analyses',
    'proj.gomoku': 'Gomoku Game',
    'proj.gomoku.desc': 'iOS game featuring AI opponent and local multiplayer',
    'proj.timer': 'Work Focus Timer',
    'proj.timer.desc': 'Minimalist productivity timer for focused work sessions',
    'proj.lastFetched': 'Last fetched:',
    'proj.experimentdesigner': 'Experiment Designer',
    'proj.experimentdesigner.desc': 'Data science tool for designing and running statistical experiments',
    'proj.experimentdesigner.skill': 'Also available as a Claude Code skill',
    'proj.northstar': 'NorthStar',
    'proj.northstar.desc': 'Metrics creation, management, and reporting platform with native AI integration evolved from Meta\'s internal toolkit: QE, Deltoid, and M360',

    // Chat Section
    'chat.header': 'Chat',
    'chat.placeholder': 'Ask me anything...',
    'chat.welcome': "Hi, I'm Li. Ask me anything about my work.",
    'chat.error': 'Sorry, something went wrong. Please try again.',
    'chat.btn.technologies': 'Technologies',
    'chat.btn.projects': 'Projects',
    'chat.btn.whatsNext': "Next Steps",
    'chat.btn.collaborate': 'Collaborate',
    'chat.q.technologies': 'What technologies do you work with?',
    'chat.q.projects': 'Tell me about your recent projects',
    'chat.q.whatsNext': "What are your next steps?",
    'chat.q.collaborate': 'Can we collaborate on a great idea?',

    // Contact Form
    'contact.prompt': "I'd love to discuss this further with you personally. Please leave your contact information:",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'What would you like to discuss?',
    'contact.submit': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': "Thanks for reaching out! I'll get back to you soon.",
  },
  zh: {
    // Profile Section
    'profile.name': '郑理',
    'profile.title': '数据科学 | 产品 | 人工智能',
    'profile.experience': '工作经历',
    'profile.education': '教育背景',
    'profile.projects': '个人项目',

    // Mobile tabs
    'tab.experience': '工作经历',
    'tab.projects': '个人项目',

    // Experience
    'exp.meta.title': '首席数据科学家，技术负责人',
    'exp.meta.company': 'Meta（Instagram / Messenger）',
    'exp.meta.date': '2021年9月 - 2026年1月',
    'exp.meta.desc': '主导IG搜索与MetaAI集成，通过大语言模型驱动的查询理解和个性化排序提升搜索相关性；推动Messenger端到端加密全球上线。',
    'exp.meta.bullet1': '0→1：推动并打通AI搜索在Instagram上的集成',
    'exp.meta.bullet2': '1→100：从数据基础到方向重构搜索流程（查询理解、检索、排序、个性化及模型评估）',
    'exp.meta.bullet3': '领导跨职能分析团队提升IG搜索质量，同时支持MetaAI功能（如AI摘要和内容识别）',
    'exp.meta.bullet4': '通过设计实验、定义目标/指标、制定上线计划及因果分析推动产品发布决策',
    'exp.meta.bullet5': '设计定制化A/B测试框架用于集群/网络实验，后成为全组织标准实践',
    'exp.meta.bullet6': '通过识别用户痛点、量化机会优先级和估算时间线制定团队路线图；支持数据科学和工程团队招聘',
    'exp.meta.link1.text': 'IG搜索 × MetaAI',
    'exp.meta.link1.url': 'https://about.instagram.com/blog/announcements/instagram-meta-ai',
    'exp.meta.link2.text': '端到端加密',
    'exp.meta.link2.url': 'https://about.fb.com/news/2023/12/default-end-to-end-encryption-on-messenger/',

    'exp.cofounder': '联合创始人',
    'exp.cofounder.company': 'Flat Strategy',
    'exp.cofounder.date': '2025年3月 - 至今',
    'exp.cofounder.desc': '利用自研AI代理技术，为现代购房者提供专业交易服务，实现无与伦比的透明度、速度和财务清晰度。',
    'exp.cofounder.link1.text': '了解更多',
    'exp.cofounder.link1.url': 'https://www.closewithflat.com',

    'exp.pwc.title': '高级咨询顾问，数据与分析洞察',
    'exp.pwc.company': '普华永道',
    'exp.pwc.date': '2018年6月 - 2021年9月',
    'exp.pwc.desc': '为顶级银行开发可衡量的洞察，通过先进的定量分析测试和实施新方案、降低风险并减少运营摩擦。',
    'exp.pwc.bullet1': '主导大型银行的分析项目，通过定量建模测试/实施新方案、降低风险并减少运营摩擦',
    'exp.pwc.bullet2': '开发和调优金融风险模型和分类器；执行假设检验和监控，每周节省100+小时人工审核',
    'exp.pwc.bullet3': '使用Python（spaCy、scikit-learn、TensorFlow）构建NLP交易筛查系统，并支持多客户部署',

    'exp.duke.title': '暑期数据分析师',
    'exp.duke.company': '杜克医疗',
    'exp.duke.date': '2018年3月 - 2018年6月',
    'exp.duke.desc': '为北美最大的医院集团之一优化欺诈识别流程，将误报率从37%降至10%以下。',
    'exp.duke.bullet1': '设计并实施欺诈和异常检测工作流',
    'exp.duke.bullet2': '构建ETL数据管道，执行数据质量分析，编写数据字典',

    'exp.her.title': '数据分析师',
    'exp.her.company': 'HER Realtors',
    'exp.her.date': '2015年8月 - 2016年12月',
    'exp.her.desc': '开发房产价格预测和推荐系统，帮助投资者客户做出正确决策，促成总计530万美元交易。',
    'exp.her.bullet1': '通过Tableau仪表盘交付模型结果，并与利益相关者迭代模型/特征',
    'exp.her.bullet2': '基于历史交易数据构建和训练机器学习模型',

    // Education
    'edu.duke.degree': '数据科学硕士（金融欺诈分析方向）',
    'edu.duke.school': '杜克大学',
    'edu.duke.date': '2017 - 2018',

    'edu.osu.degree': '会计与管理信息系统学士',
    'edu.osu.school': '俄亥俄州立大学',
    'edu.osu.date': '2012 - 2016',

    // Activity
    'profile.activity': '兴趣活动',
    'activity.pilot.title': '私人飞行员执照（PPL）',
    'activity.pilot.org': 'FAA • #3877290',

    // Projects
    'proj.flat': 'Close with Flat',
    'proj.flat.desc': '通过固定费率交易服务，提供低成本的现代购房体验',
    'proj.aterminal': 'Alpha Terminal',
    'proj.aterminal.desc': 'AI驱动的金融智能仪表盘，利用多种大语言模型和实时网络数据进行模块化分析',
    'proj.gomoku': '五子棋游戏',
    'proj.gomoku.desc': '支持AI对战和本地双人对战的iOS游戏',
    'proj.timer': '专注工作计时器',
    'proj.timer.desc': '简约风格的专注工作计时工具',
    'proj.lastFetched': '最后获取：',
    'proj.experimentdesigner': '实验设计工具',
    'proj.experimentdesigner.desc': '用于设计和运行统计实验的工具',
    'proj.experimentdesigner.skill': '同时提供 Claude Code 技能',
    'proj.northstar': 'NorthStar',
    'proj.northstar.desc': '集指标创建、管理与报表于一体，并原生集成 AI 的平台，源自 Meta 内部工具：QE、Deltoid 和 M360',

    // Chat Section
    'chat.header': '对话',
    'chat.placeholder': '有什么想问的...',
    'chat.welcome': '你好，我是Li。欢迎询问关于我工作的任何问题。',
    'chat.error': '抱歉，出了点问题。请重试。',
    'chat.btn.technologies': '技术栈',
    'chat.btn.projects': '项目',
    'chat.btn.whatsNext': '下一步',
    'chat.btn.collaborate': '合作',
    'chat.q.technologies': '你使用哪些技术？',
    'chat.q.projects': '介绍一下你最近的项目',
    'chat.q.whatsNext': '你的下一步是什么？',
    'chat.q.collaborate': '我们可以合作实现一个好想法吗？',

    // Contact Form
    'contact.prompt': '我很乐意和你进一步深入讨论。请留下你的联系方式：',
    'contact.name': '您的姓名',
    'contact.email': '您的邮箱',
    'contact.message': '您想讨论什么？',
    'contact.submit': '发送消息',
    'contact.sending': '发送中...',
    'contact.success': '感谢联系！我会尽快回复您。',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
