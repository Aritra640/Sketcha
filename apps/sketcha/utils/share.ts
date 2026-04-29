export function CreateShareSlug(): string {
  
  const randString = crypto.randomUUID().replace(/-/g,"").slice(0,25);
  return randString;
}
