import * as fs from 'fs';

async function renameVitePartial(targetDir: string) {
  fs.rename(
    `${targetDir}/vite.example.twig`,
    `${targetDir}/vite.twig`,
    () => {}
  );
}

export default renameVitePartial;
