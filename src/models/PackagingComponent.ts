import { IsNumber, IsString } from "class-validator";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { ComponentLayer } from "./ComponentLayer";

@ObjectType("Component", { description: "The component model" })
export class PackagingComponent {
  @Field({ description: "The unique identifier of the component" })
  id!: string;

  @Field(() => String, {
    description: "The colour of the component",
    nullable: true,
  })
  colour?: String;

  @Field(() => String, {
    description: "The colourant of the component",
    nullable: true,
  })
  colourant?: String;

  @Field({ description: "The position of the component", nullable: true })
  @IsNumber()
  position?: number;

  @Field({ description: "The type of the component", nullable: true })
  @IsString()
  componentType?: string;

  @Field({ description: "The coverage of the component", nullable: true })
  @IsNumber()
  coverage?: number;

  @Field(() => [ComponentLayer], {
    description: "The list of layers of the component",
    nullable: true,
  })
  layers?: ComponentLayer[];

  @Field({ description: "The name of the component", nullable: true })
  @IsString()
  name?: string;

  @Field(() => String, {
    description: "The opacity of the component",
    nullable: true,
  })
  @IsString()
  opacity?: String;

  @Field({
    description:
      "The weight of the component (sum of the weight of all layers) in gram",
    nullable: true,
  })
  @IsNumber()
  weight: number;
}

@InputType()
export class CreateComponentInput {
  @Field({ nullable: true })
  colour?: string;

  @Field({ nullable: true })
  colourant?: string;

  @Field({ nullable: true })
  componentType?: string;

  @Field({ nullable: true })
  coverage?: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  opacity?: string;

  @Field({ nullable: true })
  position?: number;

  @Field()
  packagingId?: string;
}

@InputType()
export class UpdateComponentInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  colour?: string;

  @Field({ nullable: true })
  colourant?: string;

  @Field({ nullable: true })
  componentType?: string;

  @Field({ nullable: true })
  coverage?: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  opacity?: string;

  @Field({ nullable: true })
  position?: number;
}