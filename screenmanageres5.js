"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScreenManager =
/*#__PURE__*/
function () {
  function ScreenManager(screen) {
    _classCallCheck(this, ScreenManager);

    this.screen = screen;
    this.screen.active = true;
    document.getElementById('buildingDiv').style.visibility = "hidden";
  }

  _createClass(ScreenManager, [{
    key: "closeCurrentScreen",
    value: function closeCurrentScreen() {
      this.screen.active = false;
    }
  }]);

  return ScreenManager;
}();

var ScreenView =
/*#__PURE__*/
function () {
  function ScreenView() {
    _classCallCheck(this, ScreenView);

    this.margin = 0;
    this.x = 0;
    this.y = 0;
    this.w = canvas.width - this.margin * 2;
    this.h = canvas.height - this.y - this.margin * 1;
    this.active = true;
    this.buttons = [];
    this.inputs = []; //console.log("this is ScreenView constructor");

    document.getElementById('buildingDiv').style.visibility = "hidden";
  }

  _createClass(ScreenView, [{
    key: "ticktock",
    value: function ticktock() {
      this.tick();
    }
  }, {
    key: "exitScreen",
    value: function exitScreen(self) {
      console.log("closing the screen"); // only reset the camera if exiing the map screen

      if (screenManager.screen == mapScreen) {
        // TODO: need a better way to keepe track of previous screens
        camera.x = -200;
        camera.y = -200;
      }

      if (screenManager.screen == marchScreen || screenManager.screen == worldMapScreen) {
        // TODO: need a better way to keepe track of previous screens
        mapScreen.active = true;
        screenManager.screen == mapScreen;
        mapScreen.setup();
        screenManager = new ScreenManager(mapScreen);
      } else {
        cities[currentCity].active = true;
        screenManager = new ScreenManager(cityScreen);
      }

      self.active = false; //screenManager.screen =    
      //cityScreen = new CityScreen();

      if (self.troopBuilding) {
        //console.log("exiting - from a troop building");
        self.troopBuilding.trainingScreen = null;
      }

      if (self.inputs) {
        for (var x = 0; x < self.inputs.length; x++) {
          document.getElementById('maindiv').removeChild(self.inputs[x]);
        }
      }
    }
  }, {
    key: "drawButtons",
    value: function drawButtons() {
      //console.log(this.buttons.length);
      for (var x = 0; x < this.buttons.length; x++) {
        this.buttons[x].draw();
      }
    }
  }, {
    key: "checkButtons",
    value: function checkButtons() {
      for (var x = 0; x < this.buttons.length; x++) {
        var b = this.buttons[x];

        if (clicked) {
          //mouse is clicked, check if it was on a button
          if (b.style == "rectangle") {
            console.log("cliecked in checkbuttons");

            if (mouse.x > b.x * zoom.x && mouse.x < b.x * zoom.x + b.w * zoom.x && mouse.y > b.y * zoom.y && mouse.y < b.y * zoom.y + b.h * zoom.y) {
              if (b.action && b.active) {
                clicked = false;
                console.log(b.text + " pressed");
                var callback = b.action;
                callback(this, b);
              }
            }
          } else if (b.style == "circle") {
            var dx = mouse.x - b.x;
            var dy = mouse.y - b.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            console.log("circle dist = ", dist);

            if (dist < b.h) {
              if (b.action && b.active) {
                clicked = false;
                console.log(b.text + " pressed");
                var _callback = b.action;

                _callback(this, b);
              }
            }
          }
        }
      }
    }
  }, {
    key: "bing",
    value: function bing() {//console.log("pressed the bong");
    }
  }]);

  return ScreenView;
}();