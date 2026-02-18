type PlanType = "basic" | "pro";

export type Plan = {
  type: PlanType;
  billingCycle: "monthly";
};

const Plan_Pricing: Record<PlanType, number> = {
  basic: 499,
  pro: 999,
};

export function calculatePrice(input: Plan): number {
  return Plan_Pricing[input.type];
}
