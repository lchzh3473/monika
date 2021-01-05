/***********************************************************************
 *
 * Monika Background - Robert Borghese
 *
 * Awwwwwww, you're reading the source code?
 * How adorable ;)
 *
 *
 * Anyway, this shit's a fuckin mess that was thrown together in like
 * 2 hours. Please do not judge too harshly P:
 *
 *
 * LICENSE:
 * You do not have my permission to use this code.
 * Sorry, write your own wallpaper. P:
 *
 ***********************************************************************/

//-----------------------------------------------------------------------------
// SceneManager
//-----------------------------------------------------------------------------

SceneManager._screenWidth       = 1920;
SceneManager._screenHeight      = 1080;
SceneManager._boxWidth          = 1920;
SceneManager._boxHeight         = 1080;

//-----------------------------------------------------------------------------
// Scene_Boot
//-----------------------------------------------------------------------------

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Monika);
};

//-----------------------------------------------------------------------------
// Scene_Monika
//-----------------------------------------------------------------------------

function Scene_Monika() {
    this.initialize.apply(this, arguments);
}

Scene_Monika.prototype = Object.create(Scene_Base.prototype);
Scene_Monika.prototype.constructor = Scene_Monika;

Scene_Monika.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Monika.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this._house = new Sprite();
    this._house.opacity = 0;

    this.__backkyBack = new TilingSprite(ImageManager.loadBitmap('monika-shit/', "background", 0, true));
    this.__backkyBack.move(0, 0, 1920, 1080);
    this._house.addChild(this.__backkyBack);

    this.__maskkyMask = new TilingSprite(ImageManager.loadBitmap('monika-shit/', "maskmask", 0, true));
    this.__maskkyMask.move(0, 0, 1920, 1080);
    this.__maskkyMask.opacity = 125;
    this._house.addChild(this.__maskkyMask);

    this.__justMonika = new Sprite(ImageManager.loadBitmap('monika-shit/', "main", 0, true));
    this._house.addChild(this.__justMonika);

    this.__namebox = new Sprite(ImageManager.loadBitmap('monika-shit/', "monikabox", 0, true));
    this.__namebox.anchor.x = 0.5;
    this.__namebox.x = 520;
    this.__namebox.y = 795;
    this.__namebox.opacity = 0;
    this._house.addChild(this.__namebox);

    this.__textbox = new Sprite(ImageManager.loadBitmap('monika-shit/', "textbox", 0, true));
    this.__textbox.anchor.x = 0.5;
    this.__textbox.x = Graphics.width / 2;
    this.__textbox.y = Graphics.height - 230;
    this.__textbox.opacity = 0;
    this._house.addChild(this.__textbox);

	this.addChild(this._house);

    this.createDisplayObjects();

    this.__waitwaitBaitBait = 0;

    var xhr = new XMLHttpRequest();
    var url = 'MonikaLines.json';
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            try {
                this.__monMonData = JSON.parse(xhr.responseText);
            } catch(e) {
                this.__monMonData = [
                    [
                        "It appears that the MonikaLines.json file was tampered with.",
                        "There's nothing wrong with it, but the JSON formatting was broken.",
                        "Please fix it and return to me."
                    ]
                ];
                this.____isDead = true;
            }
        }
    }.bind(this);
    xhr.onerror = function() {
        this.__monMonData = [
            [
                "It appears that the MonikaLines.json file was destroyed.",
                "I suppose I have no choice but to sit here are stare at you."
            ]
        ];
        this.____isDead = true;
    };
    this.__monMonData = null;
    xhr.send();

    this.__isStarted = false;
    this.__isMessaging = false;
    this.__currIndexOfShit = 0;
    this.__theMessageTyyyype = 0;
};

Scene_Monika.prototype.start = function() {
    Scene_Base.prototype.start.apply(this, arguments);
    if(!this.___naaaaame) {
        var xhr = new XMLHttpRequest();
        var url = 'Name.txt';
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                this.___naaaaame = xhr.responseText;
                if(this.___naaaaame.length == 0 || this.___naaaaame == "insert-your-name-here") {
                    this.__justMonika.bitmap = ImageManager.loadBitmap('monika-shit/', "blank", 0, true);
                    this.__namebox.bitmap = new Bitmap();
                    var locloc = window.location.href.replace("file:///", "").replace(/%20/g, " ").replace("index.html", "Name.txt");
                    var bitbut = new Bitmap(Graphics._boxWidth, Graphics._boxHeight);
                    bitbut.fillRect(0, 400, Graphics._boxWidth, 40, "rgba(0, 0, 0, 0.5)");
                    bitbut.drawText(locloc, 0, 400, Graphics._boxWidth, 40, "center");
                    var sprrr = new Sprite(bitbut);
                    this.addChild(sprrr);
                    this.__monMonData = [
                        [
                            "Please insert your name into the file in the following location.",
                            "Once you do so, change your wallpaper to something else, then back to this one.",
                            "Sorry, I know this must be a bit annoying.",
                            "Unfortunately, you can't get keyboard input for the web apps in Wallpaper Engine.",
                            "Probably should've tested that before implementing a text input system.",
                            "But hey, we all good now. ¯\\\\_(ツ)_/¯",
                            "Anyway, just place your name in that text file, so Monika will know what it is.",
                            "Preferably the same name you played the game with, but that's up to you.",
                            "Perhaps you'll use your real name? \\!Or maybe an alias?",
                            "Either way, doesn't change the fact you're installing a virtual girlfriend onto your desktop.",
                            "Or the fact I programmed one...",
                            "...",
                            "Do you really have time to be dawdling here?",
                            "She's waiting for you."
                        ]
                    ];
                    this.____isDead = true;
                    this.__isStarted = false;
                }
            }
        }.bind(this);
        xhr.onerror = function() {
            this.__monMonData = [
                [
                    "It appears that the Name.json file does not exist.",
                    "I suppose I have no choice but to sit here are stare at you."
                ]
            ];
            this.____isDead = true;
        };
        xhr.send();
    } else {
        this._fadeDuration = 1;
        this.startFadeIn(120, false);
        if(this.__monMonData) {
            this.__monMonData[0] = [
                "Welcome back, my love."
            ]
        }
    }
};

Scene_Monika.prototype.showAThing = function() {
    if(!this.__isMessaging) {
        this.__isMessaging = true;
        this.__currIndexOfShit = 0;
        this.__theMessageTyyyype = Math.randomInt(this.__monMonData.length);
        while(!this.__dead && this.__theMessageTyyyype == 0) {
            this.__theMessageTyyyype = Math.randomInt(this.__monMonData.length);
        }
    }
    if(this.__currIndexOfShit < this.__monMonData[this.__theMessageTyyyype].length) {
        $gameMessage.add("<WordWrap>\"" + this.__monMonData[this.__theMessageTyyyype][this.__currIndexOfShit].replace("[player]", this.___naaaaame) + "\"");
        this.__currIndexOfShit++;
    } else {
        this.__isMessaging = false;
        this.__currIndexOfShit = 0;
        this.__theMessageTyyyype = 0;
    }
};

Scene_Monika.prototype.update = function() {
    if(!this.___naaaaame) return;
    if(this._house.opacity < 255) {
        this._house.opacity += 5;
        this.__canTryueStart = false;
    } else if(!this.__canTryueStart) {
        this.__canTryueStart = true;
        var stuff = localStorage.getItem("MonikaBackgroundSaveInfo");
        if(!!stuff) {
            this.__waitwaitBaitBait = parseInt(stuff || 0);
        }
    }
    if(this._fadeDuration === 0 && this.__canTryueStart) {
        if(this.__monMonData == null) return;
        else if(!this.__isStarted) {
            this.__isMessaging = true;
            this.__currIndexOfShit = 0;
            this.__theMessageTyyyype = 0;
            this.__isStarted = true;
            if(!!localStorage.getItem("MonikaBackgroundSaveInfoDidIt")) {
                if(this.__monMonData && this.__monMonData[0][0] !== "Please insert your name into the file in the following location.") {
                    this.__monMonData[0] = [
                        "Welcome back, my love."
                    ]
                }
            } else {
                localStorage.setItem("MonikaBackgroundSaveInfoDidIt", "TRUE");
            }
            this.showAThing();
        }
        this.updateMain();
        this.__backkyBack.origin.x += 0.5;
        this.__maskkyMask.origin.x += 1;
        if(this.__backkyBack.origin.x > 1920) this.__backkyBack.origin.x = 0;
        if(this.__maskkyMask.origin.x > 1920) this.__maskkyMask.origin.x = 0;
        this._messageWindow.x = 385;
        if(this.__isMessaging && !$gameMessage.isBusy()) {
            this.showAThing();
        } else if(!this.__isMessaging && ++this.__waitwaitBaitBait > 1000) {
            this.__waitwaitBaitBait = 0;
            this.showAThing();
        }
        
        if(this.__waitwaitBaitBait % 100 === 0) {
            localStorage.setItem("MonikaBackgroundSaveInfo", this.__waitwaitBaitBait);
        }
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Monika.prototype.updateMain = function() {
    var active = this.isActive();
    $gameTimer.update(active);
    $gameScreen.update();
    if(!this._messageWindow.isClosed()) {
        this.__namebox.opacity = this._messageWindow.openness;
        this.__textbox.opacity = this._messageWindow.openness;
    } else {
        this.__namebox.opacity = 0;
        this.__textbox.opacity = 0;
    }
};

Scene_Monika.prototype.isBusy = function() {
    return ((this._messageWindow && this._messageWindow.isClosing()) ||
            this._waitCount > 0 ||
            Scene_Base.prototype.isBusy.call(this));
};

Scene_Monika.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    if (!SceneManager.isNextScene(Scene_Battle)) {
        SceneManager.snapForBackground();
    } else {
        ImageManager.clearRequest();
    }

    if (SceneManager.isNextScene(Scene_Monika)) {
        ImageManager.clearRequest();
    }

    $gameScreen.clearZoom();
    this.removeChild(this._windowLayer);
};

Scene_Monika.prototype.createDisplayObjects = function() {
    this.createWindowLayer();
    this.createAllWindows();
};

Scene_Monika.prototype.createAllWindows = function() {
    this.createMessageWindow();
};

Scene_Monika.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Message();
    this.addWindow(this._messageWindow);
    this._messageWindow.subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};
