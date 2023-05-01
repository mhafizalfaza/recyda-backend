import { DataSource } from "apollo-datasource";
import { DB } from "../db/prisma/connection";
import { Prisma, Project } from "@prisma/client";
import { FindProjectsArgs } from "../models/Project";

export class ProjectDatasource extends DataSource {
  constructor() {
    super();
  }

  async findProject(id: string) {
    return DB.project.findUnique({
      where: { id },
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

  async findProjects({ name, key, take, skip }: FindProjectsArgs) {
    const where: Prisma.ProjectWhereInput = {};

    const query = { name, key };

    const queryKeys = Object.keys({ name, key }) as Array<
      keyof {
        name?: string;
        key?: string;
      }
    >;

    queryKeys.forEach((queryKey) => {
      where[queryKey] = { contains: query[queryKey], mode: "insensitive" };
    });

    return DB.project.findMany({
      where,
      take,
      skip,
      include: { _count: true },
    });
  }

  async updateProject(data: Partial<Project>) {
    return DB.project.update({
      where: { id: data?.id },
      data,
      include: {
        packagings: { include: { components: { include: { layers: true } } } },
      },
    });
  }
}
