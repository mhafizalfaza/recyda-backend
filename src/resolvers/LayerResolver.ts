import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../models/Context";
import {
  ComponentLayer,
  CreateLayerInput,
  UpdateLayerInput,
} from "../models/ComponentLayer";
import { LayerService } from "../services/LayerService";
import { Project } from "../models/Project";

@Resolver(ComponentLayer)
export class LayerResolver {
  readonly layerService: LayerService;

  constructor() {
    this.layerService = container.resolve(LayerService);
  }

  @Mutation(() => ComponentLayer)
  updateLayer(
    @Arg("data") updateLayerInput: UpdateLayerInput,
    @Ctx() context: Context
  ) {
    return this.layerService.updateLayer({
      data: updateLayerInput,
      context,
    });
  }

  @Mutation(() => Project)
  duplicateLayer(@Arg("id") id: string, @Ctx() context: Context) {
    return this.layerService.duplicateLayer({
      id,
      context,
    });
  }

  @Mutation(() => ComponentLayer)
  createLayer(
    @Arg("data") createLayerInput: CreateLayerInput,
    @Ctx() context: Context
  ) {
    return this.layerService.createLayer({
      data: createLayerInput,
      context,
    });
  }

  @Mutation(() => ComponentLayer)
  deleteLayer(@Arg("id") id: string, @Ctx() context: Context) {
    return this.layerService.deleteLayer({
      id,
      context,
    });
  }
}
