import { DataSource } from "apollo-datasource";
import { DB } from "../db/prisma/connection";
import { Component, Layer, Packaging, Prisma } from "@prisma/client";
import { LayerDatasource } from "./LayerDatasource";
import { container } from "tsyringe";
import { PackagingWithComponents } from "./PackagingDatasource";

export type ComponentWithLayers = Component & {
  layers: Layer[];
};

export class ComponentDatasource extends DataSource {
  readonly layerDatasource: LayerDatasource;

  constructor() {
    super();
    this.layerDatasource = container.resolve(LayerDatasource);
  }

  async updateComponent(data: Partial<Component>) {
    return DB.component.update({
      where: { id: data?.id },
      data,
      include: { layers: true },
    });
  }

  async duplicateComponents({
    packaging,
    newPackagingId,
  }: {
    packaging: PackagingWithComponents;
    newPackagingId: string;
  }) {
    const componentsCreateMany: Prisma.Enumerable<Prisma.ComponentCreateManyInput> =
      [];

    for (const component of packaging.components) {
      const { id, layers, createdAt, updatedAt, ...componentMinumum } =
        component;

      componentsCreateMany.push({
        ...componentMinumum,
        packagingId: newPackagingId,
      });
    }

    return DB.component.createMany({ data: componentsCreateMany });
  }

  async duplicateComponent(id: string) {
    const component = await DB.component.findUnique({
      where: { id },
      include: { layers: true },
    });

    if (!component) {
      return null;
    }

    const {
      id: componentId,
      createdAt,
      updatedAt,
      layers,
      packagingId,
      ...componentMinimum
    } = component;

    const newComponent = await DB.component.create({
      data: {
        ...componentMinimum,
        ...(packagingId
          ? {
              packagingId,
            }
          : {}),
      },
      include: {
        Packaging: {
          include: {
            Project: true,
          },
        },
      },
    });

    await this.layerDatasource.duplicateLayers({
      component,
      newComponentId: newComponent.id,
    });

    return DB.project.findUnique({
      where: { id: newComponent.Packaging?.Project?.id || "" },
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

  async createComponent(data: Prisma.ComponentCreateInput) {
    return await DB.component.create({
      data,
      include: {
        layers: true,
      },
    });
  }

  async deleteComponent(id: string) {
    return await DB.component.delete({
      where: { id },
    });
  }
}
