import { Card, Prisma } from "@prisma/client"

export interface ICardsRepository {
  createCard: (data: Prisma.CardCreateInput) => Promise<Card>
  findCardsByAccountId: (accountId: string) => Promise<Card[]>
  findCardsByUserId: (userId: string) => Promise<Card[]>
}
