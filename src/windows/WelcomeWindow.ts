import ParentWindow from "./ParentWindow";

class WelcomeWindow extends ParentWindow {

  constructor(title: string) {
    super(title, {
    });

    this.setRootFile("index.html", "welcome");
  }
}

export default WelcomeWindow;
