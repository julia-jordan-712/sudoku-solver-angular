import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      options: {
        projectConfig: {
          root: "./",
          sourceRoot: "src",
          buildOptions: {
            outputPath: "dist/sudoku-solver-angular",
            tsConfig: "tsconfig.cy.json",
            inlineStyleLanguage: "scss",
            assets: ["src/favicon.ico", "src/assets"],
            styles: ["src/styles/styles.scss"],
            stylePreprocessorOptions: {
              includePaths: ["src/styles"],
            },
          },
        },
      },
    },
    specPattern: "**/*.cy.ts",
    viewportHeight: 700,
    viewportWidth: 1500,
  },
});
