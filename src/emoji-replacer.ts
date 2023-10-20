export class EmojiReplacer {
  private static emojis: { [key: string]: string } = {
    "1": ":green_circle:",
    "-1": ":red_circle:",
    "1.chart": ":chart_with_upwards_trend:",
    "-1.chart": ":chart_with_downwards_trend:",
    "1.neg": ":red_circle:",
    "-1.neg": ":green_circle:",
  };

  static injectEmoji(str: string) {
    let result = str;
    const pattern = /emoji\((-?\d)(,\s*(.*?))?\)/;
    while (result.match(pattern)) {
      result = result.replace(pattern, (match) => {
        const key = [1, 3]
          .map((i) => match.replace(pattern, `$${i}`))
          .filter(Boolean)
          .join(".");
        return this.emojis[key] || key;
      });
    }
    return result;
  }
}
