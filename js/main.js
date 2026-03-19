/* ============================================
   main.js — entry point, wires everything up
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    const sessionStart = Date.now();

    // Instantiate — Commands gets terminal ref after both are created
    const spotify  = new Spotify(CONFIG.spotify.clientId);
    const sidebar  = new Sidebar(sessionStart);
    const commands = new Commands(null, spotify);
    const terminal = new Terminal(commands, sidebar);

    // Back-reference so Commands can call terminal methods (e.g. addLine)
    commands.t = terminal;

    // Handle Spotify OAuth redirect (page reloads after user authorizes)
    const spotifyConnected = await spotify.handleCallbackIfNeeded();

    window.terminal = terminal;

    sidebar.init();
    terminal.init(spotifyConnected);
});
