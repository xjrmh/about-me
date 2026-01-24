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
    'profile.title': 'Data Science | Real Estate | AI',
    'profile.experience': 'Experience',
    'profile.education': 'Education',
    'profile.projects': 'Projects',

    // Experience
    'exp.cofounder': 'Co-Founder',
    'exp.cofounder.company': 'Flat Strategy',
    'exp.cofounder.date': 'Mar 2025 - Present',
    'exp.cofounder.desc': 'Empowering modern homebuyers with expert transaction services, leveraging in-house agentic AI',

    'exp.meta.title': 'Senior Data Scientist, Tech Lead',
    'exp.meta.company': 'Meta (Instagram / Messenger)',
    'exp.meta.date': 'Sep 2021 - Jan 2025',
    'exp.meta.desc': 'Led IG Search × MetaAI integration and E2EE global launch on Messenger',

    'exp.pwc.title': 'Senior Associate, Data & Analytics',
    'exp.pwc.company': 'PwC',
    'exp.pwc.date': 'Jun 2018 - Sep 2021',
    'exp.pwc.desc': 'Led analytics engagements for major banks, developed financial risk models and NLP systems',

    'exp.her.title': 'Data Analyst',
    'exp.her.company': 'HER Realtors',
    'exp.her.date': 'Aug 2015 - Dec 2016',
    'exp.her.desc': 'Developed ML-based real estate price prediction system',

    // Education
    'edu.duke.degree': 'M.S., Data Science (Financial Fraud Analytics)',
    'edu.duke.school': 'Duke University',
    'edu.duke.date': '2017 - 2018',

    'edu.osu.degree': 'B.S., Accounting & MIS',
    'edu.osu.school': 'The Ohio State University',
    'edu.osu.date': '2012 - 2016',

    // Projects
    'proj.gomoku': 'Gomoku Game',
    'proj.gomoku.desc': 'iOS game featuring AI opponent and local multiplayer',
    'proj.timer': 'Work Focus Timer',
    'proj.timer.desc': 'Minimalist productivity timer for focused work sessions',

    // Chat Section
    'chat.header': 'Chat',
    'chat.placeholder': 'Ask me anything...',
    'chat.welcome': "Hi, I'm Li. Ask me anything about my work.",
    'chat.error': 'Sorry, something went wrong. Please try again.',
    'chat.btn.technologies': 'Technologies',
    'chat.btn.projects': 'Projects',
    'chat.btn.whatsNext': "What's next?",
    'chat.q.technologies': 'What technologies do you work with?',
    'chat.q.projects': 'Tell me about your recent projects',
    'chat.q.whatsNext': "What's next for you?",
  },
  zh: {
    // Profile Section
    'profile.name': '郑理',
    'profile.title': '数据科学 | 房地产 | 人工智能',
    'profile.experience': '工作经历',
    'profile.education': '教育背景',
    'profile.projects': '个人项目',

    // Experience
    'exp.cofounder': '联合创始人',
    'exp.cofounder.company': 'Flat Strategy',
    'exp.cofounder.date': '2025年3月 - 至今',
    'exp.cofounder.desc': '利用自研AI代理技术，为现代购房者提供专业交易服务',

    'exp.meta.title': '高级数据科学家，技术负责人',
    'exp.meta.company': 'Meta（Instagram / Messenger）',
    'exp.meta.date': '2021年9月 - 2025年1月',
    'exp.meta.desc': '主导IG搜索与MetaAI集成，以及Messenger端到端加密全球上线',

    'exp.pwc.title': '高级咨询顾问，数据分析',
    'exp.pwc.company': '普华永道',
    'exp.pwc.date': '2018年6月 - 2021年9月',
    'exp.pwc.desc': '为大型银行主导数据分析项目，开发金融风险模型和自然语言处理系统',

    'exp.her.title': '数据分析师',
    'exp.her.company': 'HER Realtors',
    'exp.her.date': '2015年8月 - 2016年12月',
    'exp.her.desc': '开发基于机器学习的房产价格预测系统',

    // Education
    'edu.duke.degree': '数据科学硕士（金融欺诈分析方向）',
    'edu.duke.school': '杜克大学',
    'edu.duke.date': '2017 - 2018',

    'edu.osu.degree': '会计与管理信息系统学士',
    'edu.osu.school': '俄亥俄州立大学',
    'edu.osu.date': '2012 - 2016',

    // Projects
    'proj.gomoku': '五子棋游戏',
    'proj.gomoku.desc': '支持AI对战和本地双人对战的iOS游戏',
    'proj.timer': '专注工作计时器',
    'proj.timer.desc': '简约风格的专注工作计时工具',

    // Chat Section
    'chat.header': '对话',
    'chat.placeholder': '有什么想问的...',
    'chat.welcome': '你好，我是Li。欢迎询问关于我工作的任何问题。',
    'chat.error': '抱歉，出了点问题。请重试。',
    'chat.btn.technologies': '技术栈',
    'chat.btn.projects': '项目',
    'chat.btn.whatsNext': '下一步计划',
    'chat.q.technologies': '你使用哪些技术？',
    'chat.q.projects': '介绍一下你最近的项目',
    'chat.q.whatsNext': '你的下一步计划是什么？',
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
