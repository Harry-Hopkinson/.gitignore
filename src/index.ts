const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;

const configFiles: any = {};
const configFolderPath = path.resolve(__dirname, "config");

(async () => {
    const files = await readdir(configFolderPath).catch(console.log);

    for (let i of Object.keys(files)) {
        const gitignoreName = files[i];
        configFiles[gitignoreName] = path.join(configFolderPath, i);
    }

    const { language } = await inquirer.prompt([
        {
            type: "list",
            message:
                "Which Language do you want to generate the .gitignore for?",
            name: "language",
            choices: Object.keys(configFiles),
        },
    ]);

    let config = await readFile(configFiles[language].catch(console.log));
    const folderPath = path.resolve(__dirname, "..", "..", "..", ".gitignore");
    await writeFile(folderPath, config.toString()).catch((err: any) => {
        console.log(err);
        process.exit();
    });
})();
