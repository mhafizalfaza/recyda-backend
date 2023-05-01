import { ComponentDatasource } from "../datasources/ComponentDatasource";
import { LayerDatasource } from "../datasources/LayerDatasource";
import { PackagingDatasource } from "../datasources/PackagingDatasource";
import { ProjectDatasource } from "../datasources/ProjectDatasource";

export type AppDataSources = {
  projectDatasource: ProjectDatasource;
  packagingDatasource: PackagingDatasource;
  componentDatasource: ComponentDatasource;
  layerDatasource: LayerDatasource;
};

export class Context {
  dataSources?: AppDataSources;
}
