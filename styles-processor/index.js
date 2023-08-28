const postcss = require('postcss');
const fs = require('fs');

async function scope(input, scopeId) {
  const res = await postcss([
    require("postcss-modules")({
      scopeBehaviour: "global",
      exportGlobals: true,
      generateScopedName: function (name, _, __) {
        return `${name}[${scopeId}]`;
      },
    }),
  ]).process(input);
  return res.css
}

try {
  const cssDir = `${__dirname}/../src/themes/${process.argv[2]}`
  const sourceDir = `${cssDir}/sources`
  const data = fs.readdirSync(sourceDir);
  data.forEach(async file => {
    if (fs.lstatSync(`${sourceDir}/${file}`).isDirectory())
      return
    const css = fs.readFileSync(`${sourceDir}/${file}`, 'utf8')
    const processed = await scope(css, `data-scope-${process.argv[2]}`)
    // await (new Promise(resolve => fs.mkdir(`${cssDir}/sources`, (err) => {resolve()})))
    fs.writeFileSync(`${cssDir}/${file}`, processed)
  })
} catch (err) {
  console.error(err);
}

