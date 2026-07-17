export type Language = 'en' | 'zh';

export type LocalizedText = Readonly<Record<Language, string>>;

export type ISOYearMonth = `${number}-${number}`;

export interface ProfileLink {
  label: LocalizedText;
  url: string;
}

export interface Experience {
  id: 'flatre' | 'meta' | 'pwc' | 'duke-health' | 'her-realtors';
  role: LocalizedText;
  company: LocalizedText;
  location: LocalizedText;
  startDate: ISOYearMonth;
  endDate: ISOYearMonth | 'present';
  summary: LocalizedText;
  bullets: readonly LocalizedText[];
  featuredBulletCount?: number;
  links?: readonly ProfileLink[];
  logo?: string;
}

export interface Project {
  id:
    | 'flatre'
    | 'listing-photo-ranker'
    | 'northstar'
    | 'experiment-designer'
    | 'alpha-terminal'
    | 'gomoku'
    | 'work-focus-timer';
  title: LocalizedText;
  description: LocalizedText;
  url: string;
  image?: string;
  imageAlt?: LocalizedText;
  secondaryLink?: ProfileLink;
}

export interface Education {
  degree: LocalizedText;
  school: LocalizedText;
  startYear: number;
  endYear: number;
  logo: string;
}

export interface SkillGroup {
  name: LocalizedText;
  items: readonly LocalizedText[];
}

export interface SocialLink {
  id: 'linkedin' | 'github' | 'resume' | 'email';
  label: LocalizedText;
  url: string;
}

export interface ProfileData {
  name: LocalizedText;
  headline: LocalizedText;
  summary: LocalizedText;
  seo: {
    title: LocalizedText;
    description: LocalizedText;
    imageAlt: LocalizedText;
  };
  location: LocalizedText;
  email: string;
  resumeUrl: string;
  socialLinks: readonly SocialLink[];
  experience: readonly Experience[];
  education: readonly Education[];
  projects: readonly Project[];
  skills: readonly SkillGroup[];
  recognition: readonly LocalizedText[];
  activity: readonly LocalizedText[];
}

const text = (en: string, zh: string): LocalizedText => ({ en, zh });

export const profileData = {
  name: text('Li Zheng', '郑理'),
  headline: text(
    'Founder, Flatre.ai | AI Product & Data Leader | ex-Meta',
    'Flatre.ai 创始人 | AI 产品与数据负责人 | 前 Meta',
  ),
  summary: text(
    'Data science and AI product leader with 9+ years of experience shipping 0→1 products and scaling AI and data systems to global audiences. Expertise in experimentation, causal inference, LLM evaluation and integration, search, measurement, and product growth.',
    '拥有9年以上经验的人工智能与数据产品负责人，擅长推动0→1产品落地，并将AI与数据系统扩展至全球用户。专长涵盖实验设计、因果推断、LLM评估与集成、搜索、指标体系和产品增长。',
  ),
  seo: {
    title: text(
      'Li Zheng — Founder, Flatre.ai | AI & Data Product Leader',
      '郑理 — Flatre.ai 创始人 | AI 与数据产品负责人',
    ),
    description: text(
      'Founder of Flatre.ai and former Meta Staff Data Scientist with 9+ years of experience building AI, search, experimentation, and data products.',
      'Flatre.ai 创始人、前 Meta 员工数据科学家，拥有9年以上构建AI、搜索、实验和数据产品的经验。',
    ),
    imageAlt: text(
      'Li Zheng, Founder of Flatre.ai',
      'Flatre.ai 创始人郑理',
    ),
  },
  location: text('New York, NY', '美国纽约'),
  email: 'li_zheng@outlook.com',
  resumeUrl:
    'https://drive.google.com/file/d/1HIRGguTe5fRtfkaszFQq2KSxCqCu5JAo/view',
  socialLinks: [
    {
      id: 'linkedin',
      label: text('LinkedIn', '领英'),
      url: 'https://www.linkedin.com/in/li-zheng/',
    },
    {
      id: 'github',
      label: text('GitHub', 'GitHub'),
      url: 'https://github.com/xjrmh',
    },
    {
      id: 'resume',
      label: text('Résumé PDF', '简历 PDF'),
      url: 'https://drive.google.com/file/d/1HIRGguTe5fRtfkaszFQq2KSxCqCu5JAo/view',
    },
    {
      id: 'email',
      label: text('Email', '电子邮件'),
      url: 'mailto:li_zheng@outlook.com',
    },
  ],
  experience: [
    {
      id: 'flatre',
      role: text('Founder', '创始人'),
      company: text('Flatre.ai', 'Flatre.ai'),
      location: text('New York, NY', '美国纽约'),
      startDate: '2025-10',
      endDate: 'present',
      summary: text(
        'Building real estate AI for agents, teams, and brokerages—bringing pipeline, inbox, contracts, deadlines, communications, vendors, and approvals into one intelligent workspace.',
        '为房产经纪人、团队和经纪公司打造房地产AI，将业务管线、收件箱、合同、截止日期、沟通、供应商和审批整合到一个智能工作空间。',
      ),
      bullets: [
        text(
          'Unifying deal workflows, documents, communications, tasks, and approvals around a shared transaction record.',
          '以统一交易记录串联交易流程、文档、沟通、任务和审批。',
        ),
        text(
          'Designing review-gated AI workflows that surface risk and keep agents in control.',
          '设计带人工审核机制的AI工作流，在保持经纪人控制权的同时识别风险并推动交易进展。',
        ),
      ],
      links: [
        {
          label: text('Visit Flatre.ai', '访问 Flatre.ai'),
          url: 'https://www.flatre.ai',
        },
      ],
      logo: '/logos/flatre-logo.svg',
    },
    {
      id: 'meta',
      role: text('Staff Data Scientist, Tech Lead', '员工数据科学家、技术负责人'),
      company: text('Meta (Instagram / Messenger)', 'Meta（Instagram / Messenger）'),
      location: text('New York, NY', '美国纽约'),
      startDate: '2021-09',
      endDate: '2026-01',
      summary: text(
        'Led Instagram Search × Meta AI integration through LLM-based query understanding and personalized ranking; previously drove the global launch of end-to-end encryption on Messenger through experiment design, go-to-market strategy, and capacity planning.',
        '主导 Instagram 搜索与 Meta AI 集成，通过大语言模型驱动的查询理解和个性化排序提升搜索质量；此前通过实验设计、上市策略和容量规划推动 Messenger 端到端加密全球上线。',
      ),
      bullets: [
        text(
          '0→1: Set the launch bar and drove AI Search integration into Instagram.',
          '0→1：设定上线标准并推动 AI Search 在 Instagram 上落地。',
        ),
        text(
          '1→100: Rebuilt the search flow across query understanding, retrieval, ranking, personalization, and model evaluation, improving high-quality search volume by 21% year over year.',
          '1→100：端到端重构查询理解、召回、排序、个性化与模型评估流程，推动高质量搜索量同比增长21%。',
        ),
        text(
          'Designed LLM evaluation frameworks and benchmark suites for quality, safety, and regression, including human-in-the-loop annotation and system-prompt optimization.',
          '设计覆盖质量、安全与回归的LLM评估框架和基准体系，包括人机协同标注与系统提示词优化。',
        ),
        text(
          'Designed a predictive decision framework for peak demand and capacity cost that informed company-level investment decisions and unblocked Instagram AI Search launch.',
          '设计高峰需求与容量成本预测决策框架，支持公司级投资决策并推动 Instagram AI Search 上线。',
        ),
        text(
          'Led a cross-functional analytics team improving Instagram Search quality and enabling Meta AI features such as summarization and content recognition.',
          '领导跨职能分析团队提升 Instagram 搜索质量，并支持摘要和内容识别等 Meta AI 能力。',
        ),
        text(
          'Drove product go/no-go decisions through experiment design, goal and metric definition, rollout planning, and causal studies.',
          '通过实验设计、目标与指标定义、上线规划和因果研究推动产品 go/no-go 决策。',
        ),
        text(
          'Designed custom A/B testing frameworks for cluster and network experiments that became standard practice across the organization.',
          '设计用于集群和网络实验的定制化 A/B 测试框架，后成为组织标准。',
        ),
        text(
          'Set team roadmaps by identifying user friction, sizing and prioritizing opportunities, estimating timelines from experiment and holdout signals, and supporting data science and engineering hiring.',
          '基于用户摩擦、机会评估和实验及留存对照信号制定团队路线图，并支持数据科学与工程招聘。',
        ),
      ],
      featuredBulletCount: 3,
      links: [
        {
          label: text('Instagram Search × Meta AI', 'Instagram 搜索 × Meta AI'),
          url: 'https://help.instagram.com/321958406152282/?helpref=uf_share',
        },
        {
          label: text('Messenger E2EE', 'Messenger 端到端加密'),
          url: 'https://about.fb.com/news/2023/12/default-end-to-end-encryption-on-messenger/',
        },
      ],
    },
    {
      id: 'pwc',
      role: text('Senior Associate, Data & Analytics', '高级咨询顾问，数据与分析'),
      company: text('PwC', '普华永道'),
      location: text('New York, NY', '美国纽约'),
      startDate: '2018-06',
      endDate: '2021-09',
      summary: text(
        'Led major banks in developing measurable insights, testing and implementing new ideas, mitigating risk, and reducing friction through quantitative analytics, data modeling, and digital strategy.',
        '为大型银行开发可衡量的洞察，通过定量分析、数据建模和数字战略测试与实施新方案、降低风险并减少运营摩擦。',
      ),
      bullets: [
        text(
          'Led analytics engagements for major banks to test and implement new ideas, mitigate risk, and reduce operational friction through quantitative modeling.',
          '主导大型银行分析项目，通过定量建模测试和实施新方案、降低风险并减少运营摩擦。',
        ),
        text(
          'Developed and tuned financial risk models and classifiers; ran hypothesis testing and monitoring, saving 100+ hours per week in manual review.',
          '开发和调优金融风险模型与分类器，执行假设检验和监控，每周节省100多小时人工审核。',
        ),
        text(
          'Built NLP transaction-screening predictive classifiers in Python using spaCy, scikit-learn, and TensorFlow, and supported deployment across multiple clients.',
          '使用 Python、spaCy、scikit-learn 和 TensorFlow 构建 NLP 交易筛查预测分类器，并支持多客户部署。',
        ),
      ],
      featuredBulletCount: 2,
      logo: '/logos/pwc.png',
    },
    {
      id: 'duke-health',
      role: text('Summer Data Analyst', '暑期数据分析师'),
      company: text('Duke Health', '杜克医疗'),
      location: text('Durham, NC', '美国北卡罗来纳州达勒姆'),
      startDate: '2018-03',
      endDate: '2018-06',
      summary: text(
        'Optimized a fraud identification workflow for one of the largest hospital groups in North America.',
        '为北美最大的医院集团之一优化欺诈识别流程。',
      ),
      bullets: [
        text(
          'Designed and implemented fraud and anomaly detection workflows.',
          '设计并实施欺诈和异常检测工作流。',
        ),
        text(
          'Built ETL data pipelines, performed data-quality analysis, and drafted data dictionaries.',
          '构建 ETL 数据管道，执行数据质量分析并编写数据字典。',
        ),
      ],
      logo: '/logos/duke-health.png',
    },
    {
      id: 'her-realtors',
      role: text('Data Analyst', '数据分析师'),
      company: text('HER Realtors', 'HER Realtors'),
      location: text('Columbus, OH', '美国俄亥俄州哥伦布'),
      startDate: '2015-08',
      endDate: '2016-12',
      summary: text(
        'Developed a real estate price prediction and recommendation system for investor clients, contributing to $5.3M in combined deals.',
        '为房地产投资客户开发价格预测和推荐系统，促成总计530万美元交易。',
      ),
      bullets: [
        text(
          'Delivered model outputs through Tableau dashboards and iterated models and features with stakeholders.',
          '通过 Tableau 仪表盘交付模型结果，并与利益相关者迭代模型和特征。',
        ),
        text(
          'Built and trained machine-learning models using historical transaction data.',
          '基于历史交易数据构建和训练机器学习模型。',
        ),
      ],
    },
  ],
  education: [
    {
      degree: text('M.S., Data Science (Financial Fraud Analytics)', '数据科学硕士（金融欺诈分析）'),
      school: text('Duke University', '杜克大学'),
      startYear: 2017,
      endYear: 2018,
      logo: '/logos/duke-university.png',
    },
    {
      degree: text('B.S., Accounting & MIS', '会计与管理信息系统学士'),
      school: text('The Ohio State University', '俄亥俄州立大学'),
      startYear: 2012,
      endYear: 2016,
      logo: '/logos/osu.png',
    },
  ],
  projects: [
    {
      id: 'flatre',
      title: text('Flatre.ai', 'Flatre.ai'),
      description: text(
        'AI workspace for real estate agents, teams, and brokerages that connects pipeline, inbox, contracts, closings, and review-gated AI workflows.',
        '面向房产经纪人、团队和经纪公司的AI工作空间，串联业务管线、收件箱、合同、交割和带人工审核的AI工作流。',
      ),
      url: 'https://www.flatre.ai',
      image: '/project_screenshots/flatre.jpg',
      imageAlt: text('Flatre.ai product website', 'Flatre.ai 产品网站'),
    },
    {
      id: 'listing-photo-ranker',
      title: text('Listing Photo Ranker', '房源照片排序工具'),
      description: text(
        'Ranks real estate listing photos using computer vision and multimodal LLM-as-judge evaluation.',
        '使用计算机视觉和多模态 LLM-as-judge 评估对房地产房源照片进行排序。',
      ),
      url: 'https://listing-photo-ranker.flatre.ai/',
      image: '/project_screenshots/listing-photo-ranker.png',
      imageAlt: text('Listing Photo Ranker interface', '房源照片排序工具界面'),
    },
    {
      id: 'northstar',
      title: text('NorthStar', 'NorthStar'),
      description: text(
        'AI-integrated metrics and experimentation management platform evolved from Meta’s QE, Deltoid, and M360 toolkits.',
        '原生集成AI的指标与实验管理平台，源自 Meta 的 QE、Deltoid 和 M360 工具体系。',
      ),
      url: 'https://northstar.xjrmh.com/auth/signin',
      image: '/project_screenshots/northstar.png',
      imageAlt: text('NorthStar dashboard', 'NorthStar 仪表盘'),
    },
    {
      id: 'experiment-designer',
      title: text('Experiment Designer', '实验设计工具'),
      description: text(
        'Open-source tool for designing and running statistical experiments.',
        '用于设计和运行统计实验的开源工具。',
      ),
      url: 'https://experimentdesigner.xjrmh.com',
      image: '/project_screenshots/experiment-designer.png',
      imageAlt: text('Experiment Designer interface', '实验设计工具界面'),
      secondaryLink: {
        label: text('Also available as a Claude Code skill', '同时提供 Claude Code 技能'),
        url: 'https://github.com/xjrmh/experiment-designer-skill',
      },
    },
    {
      id: 'alpha-terminal',
      title: text('Alpha Terminal', 'Alpha Terminal'),
      description: text(
        'AI-powered financial intelligence dashboard using LLMs and real-time data for modular analyses.',
        'AI驱动的金融智能仪表盘，利用大语言模型和实时数据进行模块化分析。',
      ),
      url: 'https://aterminal.xjrmh.com',
      image: '/project_screenshots/alpha-terminal.png',
      imageAlt: text('Alpha Terminal dashboard', 'Alpha Terminal 仪表盘'),
    },
    {
      id: 'gomoku',
      title: text('Gomoku', '五子棋'),
      description: text(
        'iOS game featuring an AI opponent and local multiplayer.',
        '支持AI对战和本地双人对战的 iOS 游戏。',
      ),
      url: 'https://apps.apple.com/us/app/go-moku/id6755308947',
    },
    {
      id: 'work-focus-timer',
      title: text('Work Focus Timer', '专注工作计时器'),
      description: text(
        'Minimalist productivity timer for focused work sessions.',
        '用于专注工作时段的简约效率计时器。',
      ),
      url: 'https://xjrmh.github.io/work-focus-timer/',
    },
  ],
  skills: [
    {
      name: text('Data & AI', '数据与人工智能'),
      items: [
        text('Python', 'Python'),
        text('SQL (Presto, Hive, Spark)', 'SQL（Presto、Hive、Spark）'),
        text('R', 'R'),
        text('NLP', '自然语言处理'),
        text('Classification', '分类建模'),
        text('RAG', 'RAG'),
        text('LLM evaluation', 'LLM评估'),
      ],
    },
    {
      name: text('Experimentation', '实验与因果推断'),
      items: [
        text('A/B testing', 'A/B测试'),
        text('Causal inference', '因果推断'),
        text('Cluster and network experiments', '集群与网络实验'),
      ],
    },
    {
      name: text('Search & ML', '搜索与机器学习'),
      items: [
        text('Ranking and search evaluation', '排序与搜索评估'),
        text('spaCy', 'spaCy'),
        text('scikit-learn', 'scikit-learn'),
        text('TensorFlow', 'TensorFlow'),
      ],
    },
    {
      name: text('Platforms', '平台与工具'),
      items: [
        text('Tableau', 'Tableau'),
        text('R Shiny', 'R Shiny'),
        text('AWS', 'AWS'),
        text('Linux', 'Linux'),
        text('Git', 'Git'),
      ],
    },
  ],
  recognition: [
    text('Greatly Exceeds Expectations (Meta, 2022–2024)', '卓越绩效评级（Meta，2022–2024）'),
    text('Going Above and Beyond (PwC, 2020)', 'Going Above and Beyond（普华永道，2020）'),
    text('AWS Technical Professional (2019)', 'AWS Technical Professional（2019）'),
    text('Google Analytics IQ (2019)', 'Google Analytics IQ（2019）'),
    text('ACFE Member (2018)', 'ACFE 会员（2018）'),
    text('MVP (Nationwide Insurance, 2015)', 'MVP（Nationwide Insurance，2015）'),
  ],
  activity: [text('FAA Private Pilot', 'FAA 私人飞行员')],
} satisfies ProfileData;

export function localize(value: LocalizedText, language: Language): string {
  return value[language];
}

export function formatDateRange(
  startDate: ISOYearMonth,
  endDate: ISOYearMonth | 'present',
  language: Language,
): string {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  const formatMonth = (value: ISOYearMonth) => {
    const [year, month] = value.split('-').map(Number);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: language === 'zh' ? 'numeric' : 'short',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, 1)));
  };

  const end =
    endDate === 'present'
      ? language === 'zh'
        ? '至今'
        : 'Present'
      : formatMonth(endDate);

  return `${formatMonth(startDate)}–${end}`;
}

export function serializeProfileForChat(language: Language): string {
  const lines: string[] = [
    `Name: ${localize(profileData.name, language)}`,
    `Headline: ${localize(profileData.headline, language)}`,
    `Summary: ${localize(profileData.summary, language)}`,
    `Location: ${localize(profileData.location, language)}`,
    '',
    language === 'zh' ? '工作经历：' : 'Experience:',
  ];

  for (const item of profileData.experience) {
    lines.push(
      `${localize(item.role, language)}, ${localize(item.company, language)} (${formatDateRange(item.startDate, item.endDate, language)})`,
      localize(item.summary, language),
      ...item.bullets.map((bullet) => `- ${localize(bullet, language)}`),
      '',
    );
  }

  lines.push(language === 'zh' ? '教育：' : 'Education:');
  for (const item of profileData.education) {
    lines.push(
      `- ${localize(item.degree, language)}, ${localize(item.school, language)} (${item.startYear}–${item.endYear})`,
    );
  }

  lines.push('', language === 'zh' ? '项目：' : 'Projects:');
  for (const item of profileData.projects) {
    lines.push(
      `- ${localize(item.title, language)}: ${localize(item.description, language)} (${item.url})`,
    );
  }

  lines.push('', language === 'zh' ? '技能：' : 'Skills:');
  for (const group of profileData.skills) {
    lines.push(
      `- ${localize(group.name, language)}: ${group.items.map((item) => localize(item, language)).join(', ')}`,
    );
  }

  lines.push(
    '',
    language === 'zh' ? '认可与奖项：' : 'Recognition:',
    ...profileData.recognition.map((item) => `- ${localize(item, language)}`),
    '',
    language === 'zh' ? '其他：' : 'Other:',
    ...profileData.activity.map((item) => `- ${localize(item, language)}`),
  );

  return lines.join('\n');
}
