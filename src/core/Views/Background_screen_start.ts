import * as PIXI from 'pixi.js';

export default class ScreenStart {
      private gameController: GameController;
      private app: PIXI.Application;
      public isSoundOn: boolean;

    showGameStart() {
    // Create the player name input
    const playerNameInput = document.createElement("input");
    playerNameInput.id = "playerNameInput";
    playerNameInput.type = "text";
    playerNameInput.placeholder = "Enter your name";
    playerNameInput.style.position = "absolute";
    playerNameInput.style.left = "665px";
    playerNameInput.style.top = "370px";
    playerNameInput.style.width = "200px";
    playerNameInput.style.padding = "10px";

    playerNameInput.addEventListener("input", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const playerName = event.target.value;
        localStorage.setItem("playerName", playerName);
      }
    });
    document.body.appendChild(playerNameInput);

    this.gameController.hideApp1();
    const startScreen = new PIXI.Container();
    this.app.stage.addChild(startScreen);

    const backgroundTexture = PIXI.Texture.from("../assets/startttt.png");
    const backgroundSprite = new PIXI.Sprite(backgroundTexture);
    backgroundSprite.width = 560;
    backgroundSprite.height = 700;
    startScreen.addChild(backgroundSprite);

    const playButton = PIXI.Sprite.from("../assets/R.png");
    playButton.position.set(190, 400);
    playButton.width = 173;
    playButton.height = 60;
    this.app.stage.addChild(playButton);

    playButton.interactive = true;
    playButton.buttonMode = true;

    this.gameController.pauseGame();

    playButton.on("pointerdown", () => {
      this.app.stage.removeChild(startScreen);
      document.body.removeChild(playerNameInput);
      this.gameController.resumeGame();
      this.gameController.gameEnded = false;
      this.gameController.showApp1();
    });

    startScreen.addChild(playButton);
  }
  public getApp(): PIXI.Application {
    return this.app;
  }
}
