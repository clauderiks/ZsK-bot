export async function reviewer(diff, provider) {
  return await provider(diff);
}
