import { IsNumber, IsString, Min } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { PackagingComponent } from "./PackagingComponent";

@ObjectType({ description: "The packaging model" })
export class Packaging {
  @Field({ description: "The unique identifier of the packaging" })
  @IsString()
  id!: string;

  @Field(() => [PackagingComponent], {
    description: "The list of components of the packaging",
    nullable: true,
  })
  components?: PackagingComponent[];

  @Field({ description: "The name of the packaging", nullable: true })
  @IsString()
  name?: string;

  @Field({ description: "The position of the packaging", nullable: true })
  @IsNumber()
  position?: number;

  @Field({ description: "The packagingType of the packaging", nullable: true })
  @IsString()
  packagingType?: string;

  @Field({
    description: "The width of the packaging in centimeter",
    nullable: true,
  })
  @IsNumber()
  @Min(0)
  width?: number;

  @Field({
    description: "The length of the packaging in centimeter",
    nullable: true,
  })
  @IsNumber()
  @Min(0)
  length?: number;

  @Field({
    description: "The height of the packaging in centimeter",
    nullable: true,
  })
  @IsNumber()
  @Min(0)
  height?: number;

  @Field({
    description: "The volume of the packaging in liter",
    nullable: true,
  })
  @IsNumber()
  @Min(0)
  volume?: number;

  @Field({
    description:
      "The weight of the packaging (sum of the weight of all components) in gram",
    nullable: true,
  })
  @IsString()
  weight: number;
}

@InputType()
export class CreatePackagingInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  packagingType?: string;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  length?: number;

  @Field({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  volume?: number;

  @Field()
  projectId?: string;
}

@InputType()
export class UpdatePackagingInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  packagingType?: string;

  @Field({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  length?: number;

  @Field({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  volume?: number;
}
