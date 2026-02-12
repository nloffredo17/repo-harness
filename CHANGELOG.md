# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] - 2025-02-12

### Added

- CLI `repo-harness init <project-name>` — bootstraps new Next.js projects from the Repo Harness template
- `create-repo-harness` package for `npm create repo-harness <project-name>`
- Template with layered domains, ESLint boundaries, Vitest, Playwright, and repro packs
- `harness` script: `dev`, `check`, `repro` commands
- Project name validation: rejects path traversal, invalid chars, empty names
- Devcontainer and docker-compose support
