'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '@/lib/profile-data';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'section.summary': 'Summary',
    'section.experience': 'Experience',
    'section.education': 'Education',
    'section.projects': 'Projects',
    'section.skills': 'Skills',
    'section.recognition': 'Recognition',
    'section.activity': 'Activity',
    'tab.experience': 'Experience',
    'tab.projects': 'Projects',
    'experience.moreImpact': 'More impact',
    'project.lastUpdated': 'Last updated:',
    'language.selectorLabel': 'Language',
    'language.english': 'English',
    'language.chinese': 'Chinese',
    'chat.header': 'Chat with Li',
    'chat.description': 'Ask about Li’s professional experience and projects.',
    'chat.open': 'Open chat',
    'chat.close': 'Close chat',
    'chat.inputLabel': 'Message',
    'chat.placeholder': 'Ask about my work…',
    'chat.send': 'Send message',
    'chat.welcome': 'Ask about Flatre.ai, Meta AI Search, experimentation, or my projects.',
    'chat.loading': 'Li is responding…',
    'chat.error': 'Sorry, something went wrong. Please try again.',
    'chat.suggestion.flatre': 'Flatre.ai',
    'chat.suggestion.aiSearch': 'AI Search',
    'chat.suggestion.experimentation': 'Experimentation',
    'chat.suggestion.collaborate': 'Collaborate',
    'chat.query.flatre': 'What are you building at Flatre.ai?',
    'chat.query.aiSearch': 'Tell me about your work on Meta AI Search.',
    'chat.query.experimentation': 'How do you approach experimentation and causal inference?',
    'chat.query.collaborate': 'How can we collaborate?',
    'contact.prompt': 'I’d love to discuss this further. Please leave your contact information:',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'What would you like to discuss?',
    'contact.submit': 'Send message',
    'contact.sending': 'Sending…',
    'contact.success': 'Thanks for reaching out. I’ll get back to you soon.',
    'contact.error.required': 'Please complete every field.',
    'contact.error.email': 'Enter a valid email address.',
    'contact.error.unavailable': 'Message delivery is temporarily unavailable. Please email me directly.',
    'contact.error.generic': 'Your message could not be sent. Please try again.',
  },
  zh: {
    'section.summary': '个人简介',
    'section.experience': '工作经历',
    'section.education': '教育背景',
    'section.projects': '个人项目',
    'section.skills': '技能',
    'section.recognition': '认可与奖项',
    'section.activity': '兴趣活动',
    'tab.experience': '工作经历',
    'tab.projects': '个人项目',
    'experience.moreImpact': '更多影响',
    'project.lastUpdated': '最后更新：',
    'language.selectorLabel': '语言',
    'language.english': '英语',
    'language.chinese': '中文',
    'chat.header': '与 Li 对话',
    'chat.description': '了解 Li 的专业经历和项目。',
    'chat.open': '打开对话',
    'chat.close': '关闭对话',
    'chat.inputLabel': '消息',
    'chat.placeholder': '询问我的工作…',
    'chat.send': '发送消息',
    'chat.welcome': '欢迎询问 Flatre.ai、Meta AI Search、实验设计或我的项目。',
    'chat.loading': 'Li 正在回复…',
    'chat.error': '抱歉，出现了问题。请重试。',
    'chat.suggestion.flatre': 'Flatre.ai',
    'chat.suggestion.aiSearch': 'AI Search',
    'chat.suggestion.experimentation': '实验设计',
    'chat.suggestion.collaborate': '合作',
    'chat.query.flatre': '你在 Flatre.ai 打造什么？',
    'chat.query.aiSearch': '介绍一下你在 Meta AI Search 的工作。',
    'chat.query.experimentation': '你如何开展实验设计和因果推断？',
    'chat.query.collaborate': '我们可以如何合作？',
    'contact.prompt': '我很乐意进一步讨论。请留下您的联系方式：',
    'contact.name': '姓名',
    'contact.email': '电子邮箱',
    'contact.message': '您想讨论什么？',
    'contact.submit': '发送消息',
    'contact.sending': '发送中…',
    'contact.success': '感谢联系！我会尽快回复您。',
    'contact.error.required': '请填写所有字段。',
    'contact.error.email': '请输入有效的电子邮箱。',
    'contact.error.unavailable': '消息发送暂时不可用，请直接发送邮件与我联系。',
    'contact.error.generic': '消息未能发送，请重试。',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const t = useCallback(
    (key: string) => translations[language][key] ?? key,
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
