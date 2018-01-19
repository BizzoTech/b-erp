const fs = require('fs-extra');

const start = async() => {
  const packageJson = JSON.parse(await fs.readFile('./package.json'), 'utf8');
  const modules = packageJson['b-erp-modules'] || [];
  const modulesImport = modules.map((mod, i) => `import module${i} from "${mod}";`).join('\n');
  const modulesregister = modules.map((mod, i) => `registerModule(module${i});`).join('\n');
  const modulesFile = `import { registerModule } from "b-erp-core/dist/registerModule";
${modulesImport}

${modulesregister}  `;
  console.log(modulesFile);
  await fs.writeFile('./web/src/modules.js', modulesFile);
}

start();