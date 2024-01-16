import { $ } from 'zx';

export async function FetchDataFromUrl(url: string) {
  return $`curl -s ${url}`;
}
