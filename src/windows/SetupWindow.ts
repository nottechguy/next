import ParentWindow from "./ParentWindow";

class SetupWindow extends ParentWindow {

  constructor(title: string) {
    super(title, {
    });

    this.setRootFile("index.html", "setup");
  }
}

export default SetupWindow;
