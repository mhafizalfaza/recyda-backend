import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { FindProjectsArgs, UpdateProjectInput } from "../models/Project";

@singleton()
export class ProjectService {
  getProject(id: string, context: Context) {
    return context.dataSources?.projectDatasource.findProject(id);
  }

  async getProjects({
    context,
    args,
  }: {
    context: Context;
    args: FindProjectsArgs;
  }) {
    const projects = await context.dataSources?.projectDatasource.findProjects(
      args
    );

    if (projects) {
      return projects;
    }
    return [];
  }

  updateProject({
    context,
    data,
  }: {
    context: Context;
    data: UpdateProjectInput;
  }) {
    return context.dataSources?.projectDatasource.updateProject(data);
  }
}
