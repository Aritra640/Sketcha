export function GetGuestName(): string {
  return `Guest@${crypto.randomUUID().slice(0, 7)}`;
}
