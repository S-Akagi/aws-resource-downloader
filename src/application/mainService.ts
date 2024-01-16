import { $ } from 'zx';
import { SelectAwsProfile, SelectAwsRegion } from './awsService.js';
import {
  CreateDirectory,
  CreateTestFile,
  GetDownloadDirectory,
} from './directoryService.js';
import { ProcessBatch } from './resourceService.js';

$.verbose = false;

export default async function RunMainScript() {
  // AWS configurations
  await SelectAwsProfile();
  await SelectAwsRegion();

  const downloadDirBase = await GetDownloadDirectory();

  const accountIdWithQuotes =
    await $`aws sts get-caller-identity --query "Account"`;
  const accountIdOutput = accountIdWithQuotes.stdout.trim().replace(/"/g, '');

  console.log(accountIdOutput);

  const downloadDirectory = `${downloadDirBase}/${accountIdOutput}`;

  await CreateDirectory(downloadDirectory);
  await CreateTestFile(`${downloadDirectory}/test_file.txt`);

  const resources =
    await $`curl -s https://awscli.amazonaws.com/v2/documentation/api/latest/reference/configservice/list-discovered-resources.html | grep docutils | grep -o "AWS::[^<]*"`;

  const resourceTypes = resources.stdout.trim().split('\n');
  const maxParallel = 4;

  // Split the resource types into batches of size maxParallel
  for (let i = 0; i < resourceTypes.length; i += maxParallel) {
    const batch = resourceTypes.slice(i, i + maxParallel);
    await ProcessBatch(batch, downloadDirBase);
  }
}
