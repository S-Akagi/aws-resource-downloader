import { $, question } from 'zx';
import { BG_GREEN, CYAN, GREEN, RESET } from '../util/colorSet.js';

export async function SelectAwsProfile() {
  console.log(`${BG_GREEN} Available AWS Profiles: ${RESET}`);
  const profiles = await $`aws configure list-profiles`;
  const profileList = profiles.stdout.trim().split('\n');

  for (let i = 0; i < profileList.length; i++) {
    console.log(`${CYAN}・${profileList[i]} ${RESET}`);
  }

  const selectedProfile = await question(
    `${GREEN}Select an AWS profile: ${RESET}`,
    {
      choices: profiles.stdout.trim().split('\n'),
    },
  );

  process.env.AWS_PROFILE = selectedProfile;
  console.log(`set to: ${selectedProfile}`);

  try {
    await $`aws configure list`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const error_message = (error as any).stderr?.trim(); // ここで型アサーションを使用
      if (error_message && error_message.includes('sso')) {
        console.log("Executing 'aws sso login'");
        await $`aws sso login`;
      }
    }
  }
}

export async function SelectAwsRegion() {
  console.log(`${BG_GREEN}Select an AWS region:${RESET}`);

  const regions =
    await $`aws ec2 describe-regions --all-regions --query 'Regions[].RegionName' --output text`;
  const regionList = regions.stdout.trim().split('\t');

  for (let i = 0; i < regionList.length; i++) {
    console.log(`${CYAN}・${regionList[i]} ${RESET}`);
  }

  const selectedRegion = await question(
    `${GREEN}Select an AWS_REGION: ${RESET}`,
    {
      choices: regionList,
    },
  );

  console.log(`set to: ${selectedRegion.trim()}`);
}
