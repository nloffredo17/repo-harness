import { program } from "commander";
import {
  cpSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  rmSync,
} from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function resolveTemplatePath(cliDir: string): string {
  const npmLayout = join(cliDir, "..", "template");
  const monorepoLayout = join(cliDir, "..", "..", "template");
  return existsSync(npmLayout) ? npmLayout : monorepoLayout;
}

export function replacePlaceholders(dir: string, projectName: string): void {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== ".git") replacePlaceholders(full, projectName);
    } else if (e.isFile()) {
      const ext = e.name.split(".").pop();
      if (!["json", "ts", "tsx", "js", "mjs", "md", "yml", "yaml"].includes(ext ?? "")) continue;
      try {
        let content = readFileSync(full, "utf-8");
        if (content.includes("{{PROJECT_NAME}}")) {
          content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
          writeFileSync(full, content);
        }
      } catch (_) {
        // skip binary or unreadable
      }
    }
  }
}

program
  .name("repo-harness")
  .description("Bootstrap agent-ready Next.js repos with devcontainer, checks, and repro packs")
  .version("0.1.0");

program
  .command("init <project-name>")
  .description("Create a new project from the Repo Harness template")
  .option("--no-install", "Skip dependency install")
  .option("--no-devcontainer", "Skip copying .devcontainer (monorepo already has it)")
  .option("--use-npm", "Use npm to install dependencies")
  .option("--use-yarn", "Use yarn to install dependencies")
  .option("--use-bun", "Use bun to install dependencies")
  .option("-y, --yes", "Non-interactive")
  .action(async (
    projectName: string,
    opts: { install: boolean; devcontainer: boolean; useNpm?: boolean; useYarn?: boolean; useBun?: boolean }
  ) => {
    const targetDir = join(process.cwd(), projectName);
    if (existsSync(targetDir)) {
      console.error(`Error: ${targetDir} already exists.`);
      process.exit(1);
    }

    const templatePath = resolveTemplatePath(__dirname);
    if (!existsSync(templatePath)) {
      console.error("Error: Template not found at", templatePath);
      console.error("Run this CLI from the RepoHarness monorepo or install repo-harness from npm.");
      process.exit(1);
    }

    mkdirSync(targetDir, { recursive: true });
    cpSync(templatePath, targetDir, { recursive: true });
    replacePlaceholders(targetDir, projectName);

    if (opts.install !== false) {
      const useNpm = opts.useNpm ?? false;
      const useYarn = opts.useYarn ?? false;
      const useBun = opts.useBun ?? false;
      const installCmd = useBun ? "bun install" : useYarn ? "yarn" : useNpm ? "npm install" : "pnpm install";
      console.log("Installing dependencies...");
      execSync(installCmd, { cwd: targetDir, stdio: "inherit", shell: true });
    }

    if (opts.devcontainer === false) {
      const dc = join(targetDir, ".devcontainer");
      if (existsSync(dc)) {
        rmSync(dc, { recursive: true });
      }
    }

    console.log("\nDone. Next steps:");
    console.log(`  cd ${projectName}`);
    console.log("  harness dev   # or: make dev");
    console.log("  harness check   # or: make check");
  });

// Only run CLI when executed directly (not when imported for tests)
const currentPath = resolve(fileURLToPath(import.meta.url));
const scriptPath = process.argv[1] ? resolve(process.cwd(), process.argv[1]) : null;
const isMainModule = scriptPath != null && currentPath === scriptPath;
if (isMainModule) {
  program.parse();
}
