export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

export function validateDocumentInputFormat(document: string) {
  if (!cpfRegex.test(document) && !cnpjRegex.test(document)) {
    throw new Error("Invalid document, must be a CPF or CNPJ")
  }
}
