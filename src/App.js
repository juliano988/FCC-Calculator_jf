
import React from "react";
import "./App.scss";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calc: 0,
      result: 0,
      calcMenu: false,
      disableDot: false,
      degRad: ["DEG", "Degree"]
    };

    this.handleClickCalcMenu = this.handleClickCalcMenu.bind(this);

    this.appRef = React.createRef();
    this.calcRef = React.createRef();
    this.menuOptionRef = React.createRef();
    this.keyboardRef = React.createRef();
    this.dotRef = React.createRef();
  }

  componentDidMount() {
    this.appRef.current.setAttribute(
      "style",
      "background-color: hsl(" + Math.random() * 361 + ", 100%, 70%)"
    );
  }

  handleClickCalcMenu() {
    this.setState({
      calcMenu: !this.state.calcMenu
    });
    console.log(this.state.calcMenu);
    if (!this.state.calcMenu === true) {
      this.menuOptionRef.current.setAttribute(
        "style",
        "display: initial; opacity: 1"
      );
      this.keyboardRef.current.setAttribute(
        "style",
        "display: none; opacity: 0"
      );
    } else {
      this.menuOptionRef.current.setAttribute(
        "style",
        "display: none; opacity: 0"
      );
      this.keyboardRef.current.setAttribute(
        "style",
        "display: initial; opacity: 1"
      );
    }
  }

  handlePress(e) {
    switch (e) {
      case "degRad":
        console.log(this.state.degRad);
        if (this.state.degRad[0] === "DEG") {
          this.setState({
            degRad: ["RAD", "Radian"]
          });
        } else {
          this.setState({
            degRad: ["DEG", "Degree"]
          });
        }
        break;
      case "CC":
        this.setState({
          calc: 0,
          result: 0
        });
        break;
      case "/":
        if (/\+\/$|-\/$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/\+\/$|-\/$/, function (match) {
              return match[0];
            }),
            disableDot: false
          });
        } else if (/\/\/$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/\/\/$/, "/"),
            disableDot: false
          });
        } else {
          this.setState({
            calc: this.state.calc + e,
            disableDot: false
          });
        }
        break;
      case "*":
        if (/\+\*$|-\*$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/\+\*$|-\*$/, function (match) {
              return match[0];
            }),
            disableDot: false
          });
        } else if (/\**$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/\**$/, "*"),
            disableDot: false
          });
        } else {
          this.setState({
            calc: this.state.calc + e,
            disableDot: false
          });
        }
        break;
      case "-":
        if (/--$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/--$/, "-"),
            disableDot: false
          });
        } else {
          this.setState({
            calc: this.state.calc + e,
            disableDot: false
          });
        }
        break;
      case "+":
        if (/\++$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/\++$/, "+"),
            disableDot: false
          });
        } else {
          this.setState({
            calc: this.state.calc + e,
            disableDot: false
          });
        }
        break;
      case "0":
        if (/\.[0-9]$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/^0/, "")
          });
        } else if (/[+\-*/]0$/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/0$/, "0."),
            disableDot: true
          });
        } else {
          this.setState({
            calc: (this.state.calc + e).replace(/^0/, "")
          });
        }
        break;
      case ".":
        this.setState({
          calc: this.state.calc + e,
          disableDot: true
        });
        break;
      case "=":
        //The operator '**' should be not be used in production code.
        let finalCalc = this.state.calc.replace(
          /e\^/g,
          "2.7182818284590452353602874713527**"
        );
        finalCalc = finalCalc.replace(/log2/g, "Math.log2");
        finalCalc = finalCalc.replace(/log10/g, "Math.log10");
        finalCalc = finalCalc.replace(/ln/g, "Math.log");
        if (this.state.degRad[0] === "DEG") {
          finalCalc = finalCalc.replace(/π/g, "180");
          finalCalc = finalCalc.replace(/cos\(/g, "Math.cos(0.0174533*");
          finalCalc = finalCalc.replace(/sin\(/g, "Math.sin(0.0174533*");
          finalCalc = finalCalc.replace(/tg\(/g, "Math.tan(0.0174533*");
        } else {
          finalCalc = finalCalc.replace(
            /π/g,
            "3.1415926535897932384626433832795"
          );
          finalCalc = finalCalc.replace(/cos/g, "Math.cos");
          finalCalc = finalCalc.replace(/sin/g, "Math.sin");
          finalCalc = finalCalc.replace(/tg/g, "Math.tan");
        }
        finalCalc = finalCalc.replace(/𝑥²/g, "**2");
        finalCalc = finalCalc.replace(/\^/g, "**");
        finalCalc = finalCalc.replace(/½/g, "(0.5)");
        console.log(finalCalc);
        //indirectWindow variable was necessary for security resons.
        const indirectWindow = window;
        let result = indirectWindow.eval(finalCalc);
        if (/\./.test(result.toString())) {
          result = result.toFixed(3);
        }
        this.setState({
          calc: result,
          result: result
        });
        break;
      default:
        if (/^0[1-9A-zπ]/.test(this.state.calc + e)) {
          this.setState({
            calc: (this.state.calc + e).replace(/^0/, "")
          });
        } else if (/^0./.test(this.state.calc + e)) {
          this.setState({
            calc: this.state.calc + e
          });
        } else {
          this.setState({
            calc: (this.state.calc + e).replace(/^0/, "")
          });
        }
        break;
    }
  }

  render() {
    return (
      <div id="app" ref={this.appRef}>
        <div id="calculator">
          <div id="screen">
            <div id="display">
              <p id="deg-rad-display">{this.state.degRad[0]}</p>
              <p>{this.state.calc}</p>
            </div>
            <p id="result">{this.state.result}</p>
          </div>
          <div id="menu">
            <AwesomeButton
              type="primary"
              id="menu-btn"
              onPress={this.handleClickCalcMenu}
            >
              Menu
            </AwesomeButton>
            <div id="menu-option" ref={this.menuOptionRef}>
              <Tabs id="tabs" defaultActiveKey="basics">
                <Tab eventKey="basics" title="Basics">
                  <div id="basics-tab">
                    <p>Formating</p>
                    <button onClick={this.handlePress.bind(this, "(")}>
                      (
                    </button>
                    <button onClick={this.handlePress.bind(this, ")")}>
                      )
                    </button>
                    <hr></hr>
                    <p>Exponential</p>
                    <button onClick={this.handlePress.bind(this, "^")}>
                      𝑥ʸ
                    </button>
                    <button onClick={this.handlePress.bind(this, "e^")}>
                      𝑒ˣ
                    </button>
                    <hr></hr>
                    <p>Logarithm</p>
                    <button onClick={this.handlePress.bind(this, "log2(")}>
                      log₂
                    </button>
                    <button onClick={this.handlePress.bind(this, "log10(")}>
                      log₁₀
                    </button>
                    <button onClick={this.handlePress.bind(this, "ln(")}>
                      ln
                    </button>
                    <hr></hr>
                  </div>
                </Tab>
                <Tab eventKey="trigonometry" title="Trigonometry">
                  <div id="trigonometry-tab">
                    <p>Calculate in</p>
                    <button onClick={this.handlePress.bind(this, "degRad")}>
                      {this.state.degRad[0]}
                    </button>
                    <p id="dgree-rad-p">{this.state.degRad[1]}</p>
                    <hr></hr>
                    <p>Constant</p>
                    <button onClick={this.handlePress.bind(this, "π")}>
                      π
                    </button>
                    <hr></hr>
                    <p>Functions</p>
                    <button onClick={this.handlePress.bind(this, "sin(")}>
                      sin
                    </button>
                    <button onClick={this.handlePress.bind(this, "cos(")}>
                      cos
                    </button>
                    <button onClick={this.handlePress.bind(this, "tg(")}>
                      tan
                    </button>
                    <hr></hr>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          <div id="keyboard" ref={this.keyboardRef}>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "^½")}
            >
              √𝑥
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "^2")}
            >
              𝑥²
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "CC")}
            >
              CC
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "7")}
            >
              7
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "8")}
            >
              8
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "9")}
            >
              9
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "/")}
            >
              ÷
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "4")}
            >
              4
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "5")}
            >
              5
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "6")}
            >
              6
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "*")}
            >
              ×
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "1")}
            >
              1
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "2")}
            >
              2
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "3")}
            >
              3
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "-")}
            >
              -
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "0")}
            >
              0
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, ".")}
              disabled={this.state.disableDot}
            >
              .
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "=")}
            >
              =
            </AwesomeButton>
            <AwesomeButton
              type="primary"
              onPress={this.handlePress.bind(this, "+")}
            >
              +
            </AwesomeButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
