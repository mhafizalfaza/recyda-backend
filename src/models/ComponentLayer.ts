import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

@ObjectType("Layer", { description: "The layer model" })
export class ComponentLayer {
  @Field({ description: "The unique identifier of the layer" })
  @IsString()
  id!: string;

  @Field({ description: "The density of the layer", nullable: true })
  @IsNumber()
  density?: number;

  @Field({ description: "The position of the layer", nullable: true })
  @IsNumber()
  position?: number;

  @Field(() => String, { description: "The type of the layer", nullable: true })
  @IsString()
  layerType?: String;

  @Field({ description: "The name of the layer", nullable: true })
  @IsString()
  name?: string;

  @Field({ description: "The material key of the layer", nullable: true })
  @IsString()
  materialKey?: string;

  @Field({ description: "The visible outer of the layer", nullable: true })
  @IsBoolean()
  visibleOuterLayer?: boolean;

  @Field({ description: "The weight of the layer in gram", nullable: true })
  @IsNumber()
  weight?: number;
}

@InputType()
export class CreateLayerInput {
  @Field({ nullable: true })
  density?: number;

  @Field({ nullable: true })
  layerType?: string;

  @Field({ nullable: true })
  materialKey?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  visibleOuterLayer?: boolean;

  @Field({ nullable: true })
  weight?: number;

  @Field()
  componentId?: string;
}

@InputType()
export class UpdateLayerInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  density?: number;

  @Field({ nullable: true })
  layerType?: string;

  @Field({ nullable: true })
  materialKey?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  visibleOuterLayer?: boolean;

  @Field({ nullable: true })
  weight?: number;
}
