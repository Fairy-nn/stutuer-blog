/**
 * 序列化数据，确保数据可以从服务器组件传递到客户端组件
 * 主要是处理MDX内容中的Module对象等不可序列化的数据
 */

// 处理日期对象的序列化
export const serializeDate = (date: Date): string => {
  return date.toISOString();
};

// Removed serializePost function as its logic is now handled in page.tsx 