"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./ExploreContainer.css");
const ExploreContainer = ({ name }) => {
    return (<div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>);
};
exports.default = ExploreContainer;
