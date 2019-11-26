#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const service_1 = require("../service");
class Bootstrap {
    constructor() {
        const service = new service_1.default();
        service.start();
    }
}
exports.Bootstrap = Bootstrap;
new Bootstrap();
//# sourceMappingURL=index.js.map