import { Max, Min } from "class-validator";
import { ArgsType, Field, InputType, Int, ObjectType } from "type-graphql";
import { Packaging } from "./Packaging";

@ObjectType({ description: "The project model" })
export class Project {
  @Field({ description: "The unique identifier of the project" })
  id!: string;

  @Field({ description: "The key of the project" })
  key!: string;

  @Field({ description: "The name of the project", nullable: true })
  name?: string;

  @Field(() => [Packaging], {
    description: "The list of packagings of the project",
    nullable: true,
  })
  packagings?: Packaging[];

  @Field({
    description: "The number of packagings in the project",
    nullable: true,
  })
  packagingsCount?: number;
}

export interface ProjectsQuery {
  key?: string;
  name?: string;
}

@InputType()
export class QueryArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  key?: string;
}

@InputType()
export class Pagination {
  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  take?: number;
}

@InputType()
export class ProjectsArgs {
  @Field({ nullable: true })
  query?: QueryArgs;

  @Field({ nullable: true })
  pagination?: Pagination;
}

@ArgsType()
export class FindProjectsArgs {
  @Field((type) => Int, { defaultValue: 0 })
  @Min(0)
  skip?: number;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  key?: string;
}

@InputType()
export class UpdateProjectInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  key?: string;
}
