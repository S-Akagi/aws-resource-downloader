import { $ } from 'zx';
import { CYAN, GREEN, BOLD, RESET } from '../util/colorSet.js';
import { AppendToFile } from '../infrastructure/fileSystem.js';

export async function ProcessResourceType(
  resourceType: string,
  downloadDir: string,
) {
  console.log(`${CYAN}${BOLD}Start resource type: ${resourceType}${RESET}`);

  const resourceIds =
    await $`aws configservice list-discovered-resources --resource-type "${resourceType}" | jq -r '.resourceIdentifiers[].resourceId'`;

  const batchSize = 4;
  const totalResources = resourceIds.stdout.trim().split('\n').filter(Boolean);

  // Array to store results before writing to file
  const resultsArray = [];

  for (let i = 0; i < totalResources.length; i += batchSize) {
    const batch = totalResources.slice(i, i + batchSize);

    const promises = batch.map(async (resourceId) => {
      const result =
        await $`aws configservice batch-get-resource-config --resource-keys resourceType=${resourceType},resourceId=${resourceId}`;

      // Append the result to the array instead of overwriting it
      resultsArray.push(JSON.parse(result.stdout));
    });

    await Promise.all(promises);
  }

  console.log(resultsArray);
  // Write each object with a comma after it in the file
  AppendToFile(
    `${downloadDir}/${resourceType}.json`,
    JSON.stringify(resultsArray, null, 2),
  );

  console.log(
    `${GREEN}${BOLD}Processed resource type: ${resourceType}${RESET}`,
  );
}

export async function ProcessBatch(batch: string[], downloadDirectory: string) {
  const batchPromises = batch.map((resourceType) =>
    ProcessResourceType(resourceType, downloadDirectory),
  );
  return Promise.all(batchPromises);
}
