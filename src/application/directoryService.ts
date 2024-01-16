import { $, question } from 'zx';
import { BG_GREEN, GREEN, RESET } from '../util/colorSet.js';

export async function GetDownloadDirectory(): Promise<string> {
  console.log(`${BG_GREEN} Input Download Dir: ${RESET}`);
  const user_input = await question(
    `${GREEN}Enter the download directory path (or press Enter for the default): ${RESET}`,
  );
  const DOWNLOAD_DIR: string = user_input.trim() || 'out';
  console.log(`set to: ${DOWNLOAD_DIR}`);
  return DOWNLOAD_DIR;
}

export async function CreateDirectory(directory: string): Promise<void> {
  await $`mkdir -p ${directory}`;
  await $`chmod u+w ${directory}`;
  await $`ls -ld ${directory}`;
  console.log(`Directory created with write permissions: ${directory}`);
}

export async function CreateTestFile(file: string): Promise<void> {
  await $`echo "This is a test file." > ${file}`;
  await $`rm ${file}`;
  console.log(`Test file created successfully: ${file}`);
}
