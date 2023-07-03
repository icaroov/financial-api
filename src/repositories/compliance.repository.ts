import { DocumentStatus } from "@/types/compliance.type"

export interface IComplianceRepository {
  validateDocument(document: string): Promise<DocumentStatus>
}
