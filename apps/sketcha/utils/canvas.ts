export function GetRandomCanvasName(): string {
  return `#${crypto.randomUUID().slice(0, 7)}`;
}

