import { GraphQLError } from "graphql";
import { container } from "tsyringe";
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Context } from "../models/Context";
import {
  FindProjectsArgs,
  Project,
  UpdateProjectInput,
} from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { Prisma } from "@prisma/client";

@Resolver(Project)
export class ProjectResolver {
  readonly projectService: ProjectService;

  constructor() {
    this.projectService = container.resolve(ProjectService);
  }

  @Query(() => Project)
  async project(@Arg("id") id: string, @Ctx() context: Context) {
    const project = await this.projectService.getProject(id, context);
    if (!project) {
      throw new GraphQLError(`Project with id ${id} does not exist`);
    }

    return project;
  }

  @Query(() => [Project])
  projects(@Ctx() context: Context, @Args() args: FindProjectsArgs) {
    return this.projectService.getProjects({ args, context });
  }

  @Mutation(() => Project)
  updateProject(
    @Arg("data") updateProjectInput: UpdateProjectInput,
    @Ctx() context: Context
  ) {
    return this.projectService.updateProject({
      data: updateProjectInput,
      context,
    });
  }

  @FieldResolver()
  packagingsCount(
    @Root()
    project: Project & {
      _count: Prisma.ProjectCountOutputType;
    }
  ) {
    return project._count.packagings;
  }
}
