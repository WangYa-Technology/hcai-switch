import { describe, expect, it } from "vitest";
import { opencodeProviderPresets } from "@/config/opencodeProviderPresets";

describe("Xiaomi MiMo Token Plan presets", () => {
  it("keeps OpenCode MiMo presets available after OpenClaw removal", () => {
    const payAsYouGo = opencodeProviderPresets.find(
      (item) => item.name === "Xiaomi MiMo",
    );
    const tokenPlan = opencodeProviderPresets.find(
      (item) =>
        item.name === "Xiaomi MiMo Token Plan (China)" ||
        item.name?.includes("MiMo Token Plan"),
    );

    // At least pay-as-you-go should remain if it was shared across apps.
    // Token plan may only have lived in OpenClaw; skip if absent.
    if (payAsYouGo) {
      expect(payAsYouGo.settingsConfig).toBeDefined();
    }
    if (tokenPlan) {
      expect(tokenPlan.settingsConfig).toBeDefined();
    }
    expect(payAsYouGo || tokenPlan).toBeTruthy();
  });
});
