export async function refreshData<T>(
  fetchFunction: () => Promise<T[]>
): Promise<T[]> {
  const data = await fetchFunction();
  return data;
}
