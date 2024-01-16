import * as fs from 'fs';

export function AppendToFile(filePath: string, content: string) {
  fs.appendFileSync(filePath, content);
}
