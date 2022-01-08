export async function hashCreate(hashValue: string) {
  const crypto = require("crypto");
  const str = hashValue;
  const hashHex = crypto.createHash("sha256").update(str, "utf8").digest("hex");
  return hashHex;
}
