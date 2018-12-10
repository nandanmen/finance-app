'use strict'

function Router(routes) {
    this.routes = routes;
    this.root = document.getElementById("app");
    this.init();
}

Router.prototype.init = function() {
    (function (scope, routes) {
        window.addEventListener("hashchange", function() {
            scope.onPageChange(scope, routes);
        });
    }(this, this.routes));
    this.onPageChange(this, this.routes);
}

Router.prototype.onPageChange = function(scope, routes) {
    // if going to different page
    if (window.location.hash.length > 0) {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.isActive(window.location.hash.substr(1))) {
                scope.goToRoute(route.template);
            }
        }
    // else go to home page
    } else {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.isHome) {
                scope.goToRoute(route.template);
            }
        }
    }
}

Router.prototype.goToRoute = function(html) {
    (function (scope) {
        const url = `pages/${html}`;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                scope.root.innerHTML = this.responseText;
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }(this));
}

function init(routes) {
    return new Router(routes);
}

module.exports = { init };