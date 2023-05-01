import { DataSource } from "apollo-datasource";
import { DB } from "../db/prisma/connection";
import { Layer, Prisma } from "@prisma/client";
import { ComponentWithLayers } from "./ComponentDatasource";

export class LayerDatasource extends DataSource {
  constructor() {
    super();
  }

  async updateLayer(data: Partial<Layer>) {
    return DB.layer.update({ where: { id: data?.id }, data });
  }

  async duplicateLayers({
    component,
    newComponentId,
  }: {
    component: ComponentWithLayers;
    newComponentId: string;
  }) {
    const layersCreateMany: Prisma.Enumerable<Prisma.LayerCreateManyInput> = [];

    for (const layer of component.layers) {
      const { id, createdAt, updatedAt, ...layerMinimum } = layer;

      layersCreateMany.push({ ...layerMinimum, componentId: newComponentId });
    }

    return DB.layer.createMany({ data: layersCreateMany });
  }

  async duplicateLayer(id: string) {
    const layer = await DB.layer.findUnique({
      where: { id },
    });

    if (!layer) {
      return null;
    }

    const {
      id: layerId,
      createdAt,
      updatedAt,
      componentId,
      ...layerMinimum
    } = layer;

    const newLayer = await DB.layer.create({
      data: {
        ...layerMinimum,
        ...(componentId
          ? {
              componentId,
            }
          : {}),
      },
      include: {
        Component: {
          include: {
            Packaging: {
              include: {
                Project: true,
              },
            },
          },
        },
      },
    });

    return DB.project.findUnique({
      where: { id: newLayer.Component?.Packaging?.Project?.id || "" },
      include: {
        packagings: {
          include: {
            components: {
              include: {
                layers: true,
              },
            },
          },
        },
      },
    });
  }

  async createLayer(data: Prisma.LayerCreateInput) {
    return await DB.layer.create({
      data,
    });
  }

  async deleteLayer(id: string) {
    return await DB.layer.delete({
      where: { id },
    });
  }
}
