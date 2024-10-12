"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const fs = require("fs");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Define options for the command line
    this.option("name", {
      type: String,
      description: "Project name",
    });

    this.option("description", {
      type: String,
      description: "Project description",
    });

    this.option("frontendFramework", {
      type: String,
      description: "Frontend framework",
      choices: ["React", "Angular", "Next.js", "Vue"],
    });
  }

  prompting() {
    this.log(
      yosay(`Welcome to the glorious ${chalk.red("backdraft")} generator!`)
    );

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type: "input",
        name: "name",
        message: "App Name",
        default: "myapp",
      });
    }

    if (!this.options.description) {
      prompts.push({
        type: "input",
        name: "description",
        message: "App Description",
        default: "My App",
      });
    }

    if (!this.options.frontendFramework) {
      prompts.push({
        type: "list",
        name: "frontendFramework",
        message: "Select a frontend framework:",
        choices: ["React", "Angular", "Next.js", "Vue"],
      });
    }

    prompts.push({
      type: "checkbox",
      name: "features",
      message: "Select additional features to include:",
      choices: [
        { name: "Tailwind CSS", value: "tailwind" },
        { name: "Redux (for React)", value: "redux" },
        { name: "Vuex (for Vue)", value: "vuex" },
        { name: "Jest Testing", value: "jest" },
        { name: "Cypress Testing", value: "cypress" },
      ],
    });

    return this.prompt(prompts).then((props) => {
      this.props = {
        ...props,
        name: this.options.name || props.name,
        description: this.options.description || props.description,
        frontendFramework:
          this.options.frontendFramework || props.frontendFramework,
      };
    });
  }

  writing() {
    const src = this.sourceRoot();
    const dest = this.destinationPath(`${this.props.name}`);

    // The ignore array is used to ignore files, push file names into this array that you want to ignore.
    const copyOpts = {
      globOptions: {
        ignore: ["**/*.md.ejs"],
      },
    };

    this.fs.copy(src, dest, copyOpts);

    // Write backend files using the template folder
    const backendSrc = this.templatePath("backend");
    this.log(`Setting up the backend...`);
    const backendDest = this.destinationPath(`${this.props.name}/backend`);
    if (fs.existsSync(backendSrc)) {
      this.fs.copy(backendSrc, backendDest);
    } else {
      this.log(chalk.red("Backend templates folder not found!"));
    }

    // Write frontend setup based on the selected framework
    const frontendDir = `${this.props.name}/frontend`;
    this._setupFrontend(frontendDir);

    // Write README file
    this._writingReadme();
  }

  install() {
    const backendDir = path.join(process.cwd(), `${this.props.name}/backend`);
    const frontendDir = path.join(process.cwd(), `${this.props.name}/frontend`);

    // Install dependencies for the backend
    if (fs.existsSync(`${backendDir}/package.json`)) {
      this.log("Installing backend dependencies...");
      this._setupEslint(frontendDir);
      this.spawnCommandSync("npm", ["install"], { cwd: backendDir });
    } else {
      this.log(chalk.red("No package.json found in the backend folder!"));
    }

    // Install dependencies for the frontend
    if (fs.existsSync(`${frontendDir}/package.json`)) {
      this.log("Installing frontend dependencies...");
      this.spawnCommandSync("npm", ["install"], { cwd: frontendDir });
    }
  }

  _setupFrontend(frontendDir) {
    const { frontendFramework, features } = this.props;
    this.log(`Setting up the ${frontendFramework} frontend...`);

    // Create frontend directory if it doesn't exist
    if (!fs.existsSync(frontendDir)) {
      fs.mkdirSync(frontendDir, { recursive: true });
    }
    const parentDir = path.resolve(frontendDir, "..");
    const projectName = path.basename(frontendDir);
    switch (frontendFramework) {
      case "React":
        this.spawnCommandSync("npx", ["create-react-app", frontendDir]);
        if (features.includes("redux")) {
          this.spawnCommandSync(
            "npm",
            ["install", "@reduxjs/toolkit", "react-redux"],
            {
              cwd: frontendDir,
            }
          );
        }
        break;
      case "Angular":
        this.log(`Creating Angular project ${projectName}...`);
        // Install Angular CLI (specific version, e.g., 16.0.0)
        this.spawnCommandSync("npm", ["install", "@angular/cli@16.0.0", "-g"]);

        // Run Angular CLI command from the parent directory
        this.spawnCommandSync("ng", [
          "new",
          "--skip-install",
          "--directory",
          frontendDir,
        ]);
        break;
      case "Next.js":
        this.spawnCommandSync("npx", ["create-next-app", frontendDir]);
        break;
      case "Vue":
        // Ensure the directory name is valid for Vue
        this.log(`Creating Vue project: ${projectName}`);

        // Install Vue CLI if not already installed
        this.spawnCommandSync("npm", ["install", "@vue/cli@5.0.8", "-g"]);

        // Run Vue CLI to create the project with a valid project name
        this.spawnCommandSync("vue", ["create", projectName, "--default"], {
          cwd: parentDir,
        });
        if (features.includes("vuex")) {
          this.spawnCommandSync("npm", ["install", "vuex"], {
            cwd: frontendDir,
          });
        }
        break;
    }

    // Additional feature setups
    if (features.includes("tailwind")) {
      try {
        this.spawnCommandSync(
          "npm",
          ["install", "tailwindcss", "postcss", "autoprefixer"],
          {
            cwd: frontendDir,
          }
        );
        this.spawnCommandSync("npx", ["tailwindcss", "init", "-p"], {
          cwd: frontendDir,
        });
      } catch (error) {
        console.error("Error installing Tailwind CSS:", error);
      }
    }

    if (features.includes("jest")) {
      try {
        this.spawnCommandSync("npm", ["install", "jest"], {
          cwd: frontendDir,
        });
      } catch (error) {
        console.error("Error installing Jest:", error);
      }
    }

    if (features.includes("cypress")) {
      try {
        this.spawnCommandSync("npm", ["install", "cypress"], {
          cwd: frontendDir,
        });
      } catch (error) {
        console.error("Error installing Cypress:", error);
      }
    }
  }

  _setupEslint(frontendDir) {
    let backendDir = path.join(process.cwd(), `${this.props.name}/backend`);
    // Setup ESLint for the frontend
    this.spawnCommandSync("npm", ["install", "eslint"], {
      cwd: frontendDir,
    });
    this.spawnCommandSync("npx", ["eslint", "--init"], {
      cwd: frontendDir,
    });
    this.spawnCommandSync("npm", ["install", "eslint"], {
      cwd: backendDir,
    });
    this.spawnCommandSync("npx", ["eslint", "--init"], {
      cwd: backendDir,
    });
  }

  _writingReadme() {
    const readmeTemplate = this.templatePath("README.md.ejs");
    const readmeDest = this.destinationPath(`${this.props.name}/README.md`);

    if (fs.existsSync(readmeTemplate)) {
      this.fs.copyTpl(readmeTemplate, readmeDest, {
        name: this.props.name,
        description: this.props.description,
        features: this.props.features,
      });
    } else {
      this.log(chalk.red("README.md.ejs template file not found!"));
    }
  }
};
