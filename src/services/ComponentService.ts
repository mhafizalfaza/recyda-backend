import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { UpdateComponentInput } from "../models/PackagingComponent";

@singleton()
export class ComponentService {
  updateComponent({
    context,
    data,
  }: {
    context: Context;
    data: UpdateComponentInput;
  }) {
    return context.dataSources?.componentDatasource.updateComponent(data);
  }

  duplicateComponent({ context, id }: { context: Context; id: string }) {
    return context.dataSources?.componentDatasource.duplicateComponent(id);
  }

  createComponent({
    context,
    data,
  }: {
    context: Context;
    data: Prisma.ComponentCreateInput;
  }) {
    return context.dataSources?.componentDatasource.createComponent(data);
  }

  deleteComponent({ context, id }: { context: Context; id: string }) {
    return context.dataSources?.componentDatasource.deleteComponent(id);
  }
}
