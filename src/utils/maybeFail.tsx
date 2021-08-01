// == Types ================================================================

// == Constants ============================================================

// == Exports ==============================================================

export async function maybeFail(
  successFunction: () => Promise<void>,
  successProbability: number,
  errorMessage = "Intentional failure"
) {
  if (Math.random() < successProbability) return successFunction();
  throw new Error(errorMessage);
}
