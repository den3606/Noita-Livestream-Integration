const fs = require("fs")
const path = require("path")
//check if workaround exists
const workaroundPath = path.join(__dirname, "../twitch-helper")
if (!fs.existsSync(workaroundPath)) {
    fs.mkdirSync(workaroundPath)
    const XML = `
    <Mod
        name="Twitch-helper"
        description="Temporal workaround for twitch integration, preferably always leave enabled."
        request_no_api_restrictions="1" 
        > 
    </Mod>`
    fs.writeFileSync(path.join(workaroundPath, "mod.xml"), XML)
    fs.writeFileSync(path.join(workaroundPath, "init.lua"), "function OnModPreInit() end")
}
// Update
async function updateSelf() {
    return true;
}

function run() {
    const Settings = require("./lib/settings")
    const Twitch = require("./lib/twitch")
    const Youtube = require("./lib/youtube")
    const Noita = require("./lib/noita")
    const WebUI = require("./lib/webui")
    class Main {
        constructor() {
            this.initSubmodules()
        }

        initSubmodules() {
            this.settings = new Settings()
            this.twitch = new Twitch(this)
            this.youtube = new Youtube(this)
            this.noita = new Noita(this)
            this.webui = new WebUI(this)
        }
    }

    const bot = new Main()
}

function main() {
    if (noselfupdate) {
        console.warn("Auto update disabled.");
        run();
    } else {
        updateSelf().then(success => {
            if (success) {
                run();
            } else {
                console.error('[update] ERROR: Unable to perform self-update!');
            }
        }).catch(e => {
            console.error('[update] ERROR: Unable to perform self-update!');
            console.error('[update] ERROR: The full error message is:');
            console.error('-----------------------------------------------');
            console.error(e);
            console.error('-----------------------------------------------');
        });
    }
}

// -------------------------------------------------------------------
// Prevent CLI from immediately closing in case of an error
process.stdin.resume();
process.on('uncaughtException', (e) => {
    console.log(e);
});

// Safely load configuration
let branch = 'master';
let updatelog = true;
let noselfupdate = false;
try {
    const config = require('./config.json');
    if (config) {
        if (config.branch)
            branch = config.branch.toLowerCase();
        updatelog = !!config.updatelog;
        noselfupdate = !!config.noselfupdate;
    }
} catch (_) {
    console.warn('[update] WARNING: An error occurred while trying to read the config file! Falling back to default values.');
}

//Boot
main();