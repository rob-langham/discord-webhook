export type StorageKey = "risk_usdt" | "riskPercentage" | "accountBalance" | string;

/**
 * A simple key value store that saves to a json file
 */
export class FileStorage {
  private fs = require("fs");
  private path = require("path");

  private storage: { [key: string]: string } = {};

  constructor() {
    this.load();
  }

  private filepath() {
    const dir = process.env.STORAGE_DIR || __dirname + "/../storage";
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
    }
    return this.path.join(dir, "storage.json");
  }

  private load() {
    const filePath = this.filepath();
    if (!this.fs.existsSync(filePath)) {
      return {};
    }
    const raw = this.fs.readFileSync(filePath);
    this.storage = JSON.parse(raw);
  }

  public get(key: StorageKey): any | undefined {
    return this.storage[key];
  }

  public set(key: StorageKey, value: any) {
    this.storage[key] = value;
    this.save();
  }

  private save() {
    const filePath = this.filepath();
    this.fs.writeFileSync(filePath, JSON.stringify(this.storage));
  }
}

export const storage = new FileStorage();
