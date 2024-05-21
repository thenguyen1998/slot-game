import * as PIXI from 'pixi.js';
import Loader from './Views/Loader';
import PlayButton from './Controller/PlayButton';
import Background from './Views/Background';
import ReelsContainer from './Controller/ReelsContainer';
import Scoreboard from './Controller/Scoreboard';
import VictoryScreen from './Views/VictoryScreen';

export default class Game {
    public app: PIXI.Application;
    private playBtn: PlayButton;
    private reelsContainer: ReelsContainer;
    private scoreboard: Scoreboard;
    private victoryScreen: VictoryScreen;

    constructor() {
        this.app = new PIXI.Application({ width: 960, height: 536 });
        window.document.body.appendChild(this.app.view);
        new Loader(this.app, this.init.bind(this));
    }

    private init() {
        this.createScene();
        this.createPlayButton();
        this.createReels();
        this.createScoreboard();
        this.createVictoryScreen();
    }

    private createScene() {
        const bg = new Background(this.app.loader);
        this.app.stage.addChild(bg.sprite);
    }

    private createPlayButton() {
        this.playBtn = new PlayButton(this.app, this.handleStart.bind(this));
        this.app.stage.addChild(this.playBtn.sprite);
    }

    private createReels() {
        this.reelsContainer = new ReelsContainer(this.app);
        this.app.stage.addChild(this.reelsContainer.container);
    }

    private createScoreboard() {
        this.scoreboard = new Scoreboard(this.app);
        this.app.stage.addChild(this.scoreboard.container);
    }

    private createVictoryScreen() {
        this.victoryScreen = new VictoryScreen(this.app);
        this.app.stage.addChild(this.victoryScreen.container);
    }

    handleStart() {
        this.scoreboard.decrement();
        this.playBtn.setDisabled();
        this.reelsContainer.spin()
            .then(this.processSpinResult.bind(this));
    }

    private processSpinResult(isWin: boolean) {
        if (isWin) {
            this.scoreboard.increment();
            this.victoryScreen.show();
        }

        if (!this.scoreboard.outOfMoney) this.playBtn.setEnabled();
    }
}
