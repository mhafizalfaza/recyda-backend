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
  CreatePackagingInput,
  Packaging,
  UpdatePackagingInput,
} from "../models/Packaging";
import { Project } from "../models/Project";
import { PackagingService } from "../services/PackagingService";

@Resolver(Packaging)
export class PackagingResolver {
  readonly packagingService: PackagingService;

  constructor() {
    this.packagingService = container.resolve(PackagingService);
  }

  @Mutation(() => Packaging)
  updatePackaging(
    @Arg("data") updatePackagingInput: UpdatePackagingInput,
    @Ctx() context: Context
  ) {
    return this.packagingService.updatePackaging({
      data: updatePackagingInput,
      context,
    });
  }

  @Mutation(() => Project)
  duplicatePackaging(@Arg("id") id: string, @Ctx() context: Context) {
    return this.packagingService.duplicatePackaging({
      id,
      context,
    });
  }

  @FieldResolver()
  weight(@Root() packaging: Packaging) {
    const packagingWeightTotal = packaging.components?.reduce(
      (accumulator, component) => {
        const componentWeightTotal = component.layers?.reduce(
          (accumulator, layer) => {
            return Number((accumulator + Number(layer.weight)).toFixed(2));
          },
          0
        );
        return Number((accumulator + Number(componentWeightTotal)).toFixed(2));
      },
      0
    );

    return packagingWeightTotal;
  }

  @Mutation(() => Packaging)
  createPackaging(
    @Arg("data") createPackagingInput: CreatePackagingInput,
    @Ctx() context: Context
  ) {
    return this.packagingService.createPackaging({
      data: createPackagingInput,
      context,
    });
  }

  @Mutation(() => Packaging)
  deletePackaging(@Arg("id") id: string, @Ctx() context: Context) {
    return this.packagingService.deletePackaging({
      id,
      context,
    });
  }
}
