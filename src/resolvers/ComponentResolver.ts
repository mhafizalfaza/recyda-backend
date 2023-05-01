import { container } from "tsyringe";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { Context } from "../models/Context";
import {
  CreateComponentInput,
  PackagingComponent,
  UpdateComponentInput,
} from "../models/PackagingComponent";
import { Project } from "../models/Project";
import { ComponentService } from "../services/ComponentService";

@Resolver(PackagingComponent)
export class ComponentResolver {
  readonly componentService: ComponentService;

  constructor() {
    this.componentService = container.resolve(ComponentService);
  }

  @Mutation(() => PackagingComponent)
  updateComponent(
    @Arg("data") updateComponentInput: UpdateComponentInput,
    @Ctx() context: Context
  ) {
    return this.componentService.updateComponent({
      data: updateComponentInput,
      context,
    });
  }

  @Mutation(() => Project)
  duplicateComponent(@Arg("id") id: string, @Ctx() context: Context) {
    return this.componentService.duplicateComponent({
      id,
      context,
    });
  }

  @Mutation(() => PackagingComponent)
  createComponent(
    @Arg("data") createComponentInput: CreateComponentInput,
    @Ctx() context: Context
  ) {
    return this.componentService.createComponent({
      data: createComponentInput,
      context,
    });
  }

  @Mutation(() => PackagingComponent)
  deleteComponent(@Arg("id") id: string, @Ctx() context: Context) {
    return this.componentService.deleteComponent({
      id,
      context,
    });
  }

  @FieldResolver()
  weight(@Root() component: PackagingComponent) {
    const weightTotal = component.layers?.reduce((accumulator, layer) => {
      return Number((accumulator + Number(layer.weight)).toFixed(2));
    }, 0);
    return weightTotal;
  }
}
