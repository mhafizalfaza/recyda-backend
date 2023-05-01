import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { UpdatePackagingInput } from "../models/Packaging";

@singleton()
export class PackagingService {
  updatePackaging({
    context,
    data,
  }: {
    context: Context;
    data: UpdatePackagingInput;
  }) {
    return context.dataSources?.packagingDatasource.updatePackaging(data);
  }

  async duplicatePackaging({ context, id }: { context: Context; id: string }) {
    const packaging =
      await context.dataSources?.packagingDatasource.duplicatePackaging(id);

    return packaging;
  }

  createPackaging({
    context,
    data,
  }: {
    context: Context;
    data: Prisma.LayerCreateInput;
  }) {
    return context.dataSources?.packagingDatasource.createPackaging(data);
  }

  deletePackaging({ context, id }: { context: Context; id: string }) {
    return context.dataSources?.packagingDatasource.deletePackaging(id);
  }
}
