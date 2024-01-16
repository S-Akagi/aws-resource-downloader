import { $ } from 'zx';
import { CYAN, GREEN, BOLD, RESET } from '../util/colorSet.js';
import { AppendToFile } from '../infrastructure/fileSystem.js';

export async function ProcessResourceType(
  resourceType: string,
  downloadDir: string,
) {
  console.log(`${CYAN}${BOLD}Start resource type: ${resourceType}${RESET}`);

  // Fetch resource IDs using AWS CLI and format the output
  const resourceIds =
    await $`aws configservice list-discovered-resources --resource-type "${resourceType}" | jq -r '.resourceIdentifiers[].resourceId'`;

  // Process resources in batches of 10
  const batchSize = 4;
  const totalResources = resourceIds.stdout.trim().split('\n').filter(Boolean);

  for (let i = 0; i < totalResources.length; i += batchSize) {
    const batch = totalResources.slice(i, i + batchSize);

    // Process resources in parallel for each batch
    const promises = batch.map(async (resourceId) => {
      console.log(
        `${CYAN}${BOLD}Resource type=${resourceType}, Resource id=${resourceId} Processing${RESET}`,
      );

      // Execute AWS CLI for batch-get-resource-config
      const result =
        await $`aws configservice batch-get-resource-config --resource-keys resourceType=${resourceType},resourceId=${resourceId}`;

      // Append the result to the file instead of overwriting it
      AppendToFile(`${downloadDir}/${resourceType}on`, result.stdout);
    });

    // Wait for all promises in the current batch to complete
    await Promise.all(promises);
  }

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
