# create-odc-project
A scaffolding tool for common One Design projects. This tool does three main things:
- It copies standard starter files (templates, project config, dependency config) into a project directory.
- It can initialize a new project directory as a git repository.
- It can download node package dependencies.

The tool is meant to be extensible and can support the addition of multiple project bases. However, there is currently only one project base configured, and that is for a [Craft 4 project](#craft-cms-javascript) using Vite and Tailwind.

## Quick Start
To use the installation wizard (recommended):

`npx @flynnt/create-odc-project`

## Command Line Usage with Options
`npx create-odc-project [projectTemplate<String>] [-g|--git <Boolean>] [-i|--install <Boolean>]`

Installation with default options:

`npx create-odc-project [-y|--yes]`

### Option Reference

`[template<String>]`: The project template type. Defaults to `craftcms-js`.

`-g|--git`: Whether or not to intialize a git repository in the current working directory. Default: `true`.

`-i|--install`: Whether or not to install node package dependencies in the current working directory. Default: `true`.

`-y|--yes`: Skips prompts and accepts the default option values.

## Project Templates
### Craft CMS (JavaScript)
In the context of a Craft 4 project, the tool is meant to augment the base install from `composer create-project craftcms/craft` with our own organizational tools and preferences. This template type is meant to work in conjunction with a Craft installation and wouldn't be very useful on its own. In this context, the tool is usually called from a parent script, so you don't really have to worry about running it manually.

Nevertheless, it's certainly possible to manually install Craft 4 and then run this tool to bring that base install in line with our preferences. Note that the Craft project template presumes that the Craft application code is scoped to an `/app` directory.
