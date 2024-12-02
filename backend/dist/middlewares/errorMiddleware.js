"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ message: "Une erreur est survenue", error: err.message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map