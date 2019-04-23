const { app, ipcMain, BrowserWindow, ipcRenderer} = require('electron')
const client = require("./client.js");
const http = require("http");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let startWin
let chatWin



function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 969, height: 545 })

  // and load the index.html of the app.
  win.loadFile('index.html')

  win.setMenuBarVisibility(false)
  // Open the DevTools.
  win.webContents.openDevTools()


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })


}

/**
 * This function creates a new window and loads startScreen.html
 * this function should be called when the user presses the play button from index.html
 */
function createStart () {
  // Create the browser window.
  startWin = new BrowserWindow({ width: 969, height: 545 })

  // and load the index.html of the app.
  startWin.loadFile('startScreen.html')
  // Open the DevTools.
 win.webContents.openDevTools()

  // Emitted when the window is closed.
  startWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    startWin = null
  })
}

/**
 * This function creates a new window and loads lobby.html
 * this function should be called after the user succesfully joins a host's game
 */
function lobby () {
  // Create the browser window.
  startWin = new BrowserWindow({ width: 969, height: 545 })

  // and load the index.html of the app.
  startWin.loadFile('lobby.html')
  // Open the DevTools.

  // Emitted when the window is closed.
  startWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    startWin = null
  })
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

/**
 * Event listenter that opens startScreen.html from index.html
 * @listens Played
 */
ipcMain.on("Played", (event, arg) => {
  console.log(arg)  // prints arg
  createStart();    // Open a new Window for start menu
  win.close();      // close the previous window
})

/**
 * Event listener that switches to lobby html after a client has succesfully sent
 * the userName and ip to the host
 */
client.clientEvent.on("SwitchToLobby", () => {
  console.log("Switching to lobby");
  lobby();      // open lobby.html when succesfully joining host
  win.close();
});






ipcMain.on("Host", (event, arg) => {
  console.log(arg); // prints arg
})

ipcMain.on("Join", (event, arg) => {
  console.log(arg); // prints arg
})

ipcMain.on("Options", (event, arg) => {
  console.log(arg); // prints arg
})

/**
 * Event listener that triggers the sendUser function which sends the userName
 * to the host.
 * @listens SendUser
 */
ipcMain.on("SendUser", (event, arg) => {
  client.sendUser(arg.ip, arg.userName, arg.clientIP, arg);    // send username to server
                                            // determined by ip
});

ipcMain.on("SendSetting", (event, arg) => {
  var post = http.request({
    hostname: arg.ip,
    port: 3001,
    path: '/sendSetting',
    method: 'POST',
    'content-type': 'text/plain'
  }, (res) => { 
    console.log("Setting captured")
    console.log(res.statusCode);
  })

  post.on("Error", (err) => {
    console.log(err);
  });
  post.write(JSON.stringify(arg));
  post.end();
});







// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
