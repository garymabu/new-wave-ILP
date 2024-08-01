export class LiquidationService {
  public async liquidateCompany(
    companyId: number,
    completeCompanyValue: number,
    initialCompanyValue: number,
    finalCompanyValue: number
  ) {
    await fetch(
      "https://prod-18.westus.logic.azure.com:443/workflows/f29e1d71bc6b40e4815354a1188a4634/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=whK3QcyJElJrBShUd67nCswrLsCn7FkdHj2aRuIjqxg",
      {
        method: "POST",
        body: JSON.stringify({
          companyId,
          completeCompanyValue,
          initialCompanyValue,
          finalCompanyValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
