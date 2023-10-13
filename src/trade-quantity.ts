import { FileStorage } from "./file-storage";

export class TradeQty {
  constructor(private storage: FileStorage) {}

  /**
   * Example message:
   * MEXC:C98USDT.P (5)
   * Entry: 0.1379
   * TP: 0.1365
   * SL: 0.1386
   *
   * Checks if the message has an entry and SL
   * @param msg
   */
  private isMatch(msg: string): boolean {
    return msg.includes("\nEntry:") && msg.includes("\nSL:");
  }

  private calcQty(entry: string, sl: string): string {
    const entryPrice = parseFloat(entry);
    const slPrice = parseFloat(sl);

    const balance = +(this.storage.get("accountBalance") || "10000");
    const riskPercentage = +(this.storage.get("riskPercentage") || "0.01");

    const risk = balance * riskPercentage;
    const qty = risk / (entryPrice - slPrice);

    return qty.toFixed(2);
  }

  public addQty(msg: string): string {
    if (!this.isMatch(msg)) return msg;

    const lines = msg.split("\n");
    const entry = lines.find((l) => l.startsWith("Entry:"))!.split(" ")[1];
    const sl = lines.find((l) => l.startsWith("SL:"))!.split(" ")[1];

    const qty = this.calcQty(entry, sl);

    return `${msg}\nQty: ${qty}`;
  }
}
