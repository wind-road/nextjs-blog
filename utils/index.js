import fs from 'fs'
import path from 'path'
// 递归获取文件
export const getFiles = (dir) => {
  const files = fs.readdirSync(dir);
  const result = [];
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      result.push(...getFiles(filePath));
    } else {
      result.push(filePath.replace(/\\/g, '/').split('posts/')[1]);
    }
  });
  return result;
}
