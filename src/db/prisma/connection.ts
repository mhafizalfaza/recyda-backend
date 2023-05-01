import { PrismaClient } from '@prisma/client'

export const DB = new PrismaClient()

export const closeDB = async (DBInstance: PrismaClient): Promise<void> => {
  await DBInstance.$disconnect()
}
