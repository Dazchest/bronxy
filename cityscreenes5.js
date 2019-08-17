"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CityScreen =
/*#__PURE__*/
function (_ScreenView) {
  _inherits(CityScreen, _ScreenView);

  // get the defaults from ScreenView
  function CityScreen() {
    var _this;

    _classCallCheck(this, CityScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CityScreen).call(this));
    camera.x = -200;
    camera.y = -200;
    _this.camera = camera;
    _this.name = "City";
    _this.inputs = []; //this.inputs.push(new newInput("f"));

    console.log("this is CityScreen constructor");

    _this.buttons.push(new Button({
      "active": true,
      "style": "circle",
      "x": 500,
      "y": 100,
      "w": 80,
      "h": 40,
      "text": "Items",
      "screen": _assertThisInitialized(_this),
      "action": _this.itemScreen
    }));

    _this.buttons.push(new Button({
      "active": true,
      "x": 500,
      "y": 160,
      "w": 80,
      "h": 30,
      "text": "Research",
      "screen": _assertThisInitialized(_this),
      "action": _this.researchScreen
    }));

    _this.buttons.push(new Button({
      "active": true,
      "x": 500,
      "y": 20,
      "w": 70,
      "h": 30,
      "text": "Map 3",
      "screen": _assertThisInitialized(_this),
      "action": _this.mapScreen3
    })); // cities[currentCity].active = false;
    // buildingHandler.highlightGrid = false;


    return _this;
  }

  _createClass(CityScreen, [{
    key: "tick",
    value: function tick() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      //console.log("cityscreen here");
      //return;
      if (this.active) {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#aaaaff";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = '#000000';
        ctx.font = "20px Georgia";
        ctx.fillText(this.name, this.x + 20, this.y + 20);
        buildingHandler.drawBuildings(); // var grd = ctx.createLinearGradient(0, 0, 0, 100);
        // grd.addColorStop(0, "#cccc66");
        // grd.addColorStop(1, "#aaaaff");
        // ctx.fillStyle = grd;
        // ctx.fillStyle = "#000000";
        // ctx.globalAlpha = .5;
        // ctx.fillRect(0, 0, canvas.width, 100);
        // ctx.globalAlpha = 1;

        this.drawButtons();
        this.checkButtons();
        buildingHandler.checkBuildingClick();
        buildingHandler.highlightEmptyBuildSpot();
        Resource.drawAll(); //this.inputs[0].draw();
      }
    }
  }, {
    key: "itemScreen",
    value: function (_itemScreen) {
      function itemScreen() {
        return _itemScreen.apply(this, arguments);
      }

      itemScreen.toString = function () {
        return _itemScreen.toString();
      };

      return itemScreen;
    }(function () {
      console.log("going to item screen");
      itemScreen = new ItemScreen();
      screenManager.screen = itemScreen;
    })
  }, {
    key: "researchScreen",
    value: function (_researchScreen) {
      function researchScreen() {
        return _researchScreen.apply(this, arguments);
      }

      researchScreen.toString = function () {
        return _researchScreen.toString();
      };

      return researchScreen;
    }(function () {
      console.log("going to Research screen");
      researchScreen = new ResearchScreen();
      screenManager.screen = researchScreen;
    }) // mapScreen() {
    //     console.log("going to the map 1");
    //     mapScreen = new MapScreen(1);
    //     screenManager.screen = mapScreen;
    // }
    // mapScreen2() {
    //     console.log("going to the map 2");
    //     mapScreen = new MapScreen(2);
    //     screenManager.screen = mapScreen;
    // }

  }, {
    key: "mapScreen3",
    value: function mapScreen3() {
      console.log("going to the map 3"); //mapScreen = new MapScreen(3);

      screenManager.screen = mapScreen;
      mapScreen.setup();
    }
  }]);

  return CityScreen;
}(ScreenView);