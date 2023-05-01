import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import { UpdateLayerInput } from "../models/ComponentLayer";
import { Context } from "../models/Context";

@singleton()
export class LayerService {
  updateLayer({ context, data }: { context: Context; data: UpdateLayerInput }) {
    return context.dataSources?.layerDatasource.updateLayer(data);
  }

  duplicateLayer({ context, id }: { context: Context; id: string }) {
    return context.dataSources?.layerDatasource.duplicateLayer(id);
  }

  createLayer({
    context,
    data,
  }: {
    context: Context;
    data: Prisma.LayerCreateInput;
  }) {
    return context.dataSources?.layerDatasource.createLayer(data);
  }

  deleteLayer({ context, id }: { context: Context; id: string }) {
    return context.dataSources?.layerDatasource.deleteLayer(id);
  }
}
