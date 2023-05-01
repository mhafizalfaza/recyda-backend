import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import path from "path";
import { ApolloServer } from "apollo-server";
import { ProjectDatasource } from "./datasources/ProjectDatasource";
import { PackagingDatasource } from "./datasources/PackagingDatasource";
import { PackagingResolver } from "./resolvers/PackagingResolver";
import { ComponentDatasource } from "./datasources/ComponentDatasource";
import { ComponentResolver } from "./resolvers/ComponentResolver";
import { LayerDatasource } from "./datasources/LayerDatasource";
import { LayerResolver } from "./resolvers/LayerResolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [
      ProjectResolver,
      PackagingResolver,
      ComponentResolver,
      LayerResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // This is a temporary workaround of a known issue: https://github.com/MichalLytek/type-graphql/issues/1396
    // Should not cause any validation issue according to https://github.com/MichalLytek/type-graphql/issues/1396#issuecomment-1346505431
    validate: { forbidUnknownValues: false },
  });
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    dataSources: () => {
      return {
        projectDatasource: new ProjectDatasource(),
        packagingDatasource: new PackagingDatasource(),
        componentDatasource: new ComponentDatasource(),
        layerDatasource: new LayerDatasource(),
      };
    },
    plugins: [
      {
        async requestDidStart(requestContext) {
          console.log(
            "Request started! Query:\n" + requestContext.request.query
          );

          return {
            async parsingDidStart() {
              console.log("Parsing started!");
            },
            async validationDidStart() {
              console.log("Validation started!");
            },
          };
        },
      },
    ],
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

void main();
