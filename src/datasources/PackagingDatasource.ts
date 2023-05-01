import { DataSource } from "apollo-datasource";
import { DB } from "../db/prisma/connection";
import { Packaging, Prisma } from "@prisma/client";
import {
  ComponentDatasource,
  ComponentWithLayers,
} from "./ComponentDatasource";
import { container } from "tsyringe";

export type PackagingWithComponents = Packaging & {
  components: ComponentWithLayers[];
};

export class PackagingDatasource extends DataSource {
  readonly componentDatasource: ComponentDatasource;

  constructor() {
    super();
    this.componentDatasource = container.resolve(ComponentDatasource);
  }

  async updatePackaging(data: Partial<Packaging>) {
    return DB.packaging.update({
      where: { id: data?.id },
      data,
      include: { components: { include: { layers: true } } },
    });
  }

  async duplicatePackaging(id: string) {
    const packaging = await DB.packaging.findUnique({
      where: { id },
      include: { components: { include: { layers: true } } },
    });

    if (!packaging) {
      return null;
    }

    const {
      id: packagingId,
      createdAt,
      updatedAt,
      components,
      projectId,
      ...packagingMinimum
    } = packaging;

    const newPackaging = await DB.packaging.create({
      data: {
        ...packagingMinimum,
        ...(projectId
          ? {
              Project: {
                connect: { id: projectId },
              },
            }
          : {}),
      },
    });

    await this.componentDatasource.duplicateComponents({
      packaging,
      newPackagingId: newPackaging.id,
    });

    return DB.project.findUnique({
      where: { id: packaging.projectId || "" },
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

  async createPackaging(data: Prisma.PackagingCreateInput) {
    return await DB.packaging.create({
      data,
      include: {
        components: {
          include: {
            layers: true,
          },
        },
      },
    });
  }

  async deletePackaging(id: string) {
    return await DB.packaging.delete({
      where: { id },
    });
  }
}
