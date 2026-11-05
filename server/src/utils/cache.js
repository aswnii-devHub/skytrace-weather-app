const store = new Map();
export async function cached(key, ttlMs, loader) {
  const now=Date.now(), hit=store.get(key);
  if(hit && hit.expires>now) return hit.value;
  const value=await loader();
  store.set(key,{value,expires:now+ttlMs});
  return value;
}
