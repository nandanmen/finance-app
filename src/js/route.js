'use strict'

function Route(name, template, isHome) {
    this.name = name;
    this.template = template;
    this.isHome = isHome;
}

Route.prototype.isActive = function(name) {
    return name.replace("#","") === this.name;
}

function init(name, template, isHome) {
    return new Route(name, template, isHome);
}

module.exports = { init };