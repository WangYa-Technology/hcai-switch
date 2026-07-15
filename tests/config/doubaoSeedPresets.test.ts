import { describe, expect, it } from "vitest";
import { codexProviderPresets } from "@/config/codexProviderPresets";

// 回归：DouBaoSeed Codex catalog 的 contextWindow 必须稳定。
describe("DouBaoSeed preset consistency", () => {
  const DOUBAO_MODEL_ID = "doubao-seed-2-1-pro-260628";
  const EXPECTED_CONTEXT_WINDOW = 262144;

  it("keeps the doubao context window for Codex", () => {
    const codexPreset = codexProviderPresets.find(
      (item) => item.name === "DouBaoSeed",
    );
    const codexModel = (codexPreset?.modelCatalog ?? []).find(
      (model) => model.model === DOUBAO_MODEL_ID,
    );
    expect(codexModel, "Codex DouBaoSeed catalog model").toBeDefined();
    expect(codexModel?.contextWindow).toBe(EXPECTED_CONTEXT_WINDOW);
  });
});
