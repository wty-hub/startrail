import React from 'react';

export interface HeaderType {
  hideBack: boolean;
  navigation: any;
  title?: string;
  style?: any;
  accessoryRight?: (props?: any) => React.ReactNode;
}

export interface DiaryEntry {
  id: number; // 唯一标识符
  // title: string; // 日记标题
  content: string; // 日记内容
  daystring: string; // 创建日期(YYYY-MM-DD)
}
