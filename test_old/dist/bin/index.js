"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pb = __importStar(require("pareto-core-exe"));
const pl = __importStar(require("pareto-core-lib"));
const lib = __importStar(require("../../../../lib"));
const atl = __importStar(require("astn-tokenizer-lib"));
const createLoggingTypedHandler_1 = require("../createLoggingTypedHandler");
const createFileResourceGetter_1 = require("../../fs/createFileResourceGetter");
pb.runProgram(($) => {
    if ($.argument === undefined) {
        throw new Error("MISSING ARGUMENT");
    }
    const root = $.argument;
    const tokLib = atl.init();
    const errorLog = pb.createStdErr();
    function createCache(path) {
        return lib.createExternalSchemaCache({
            logExternalSchemaError: ($) => {
                errorLog.write(`external schema: ${lib.createExternalErrorMessage($.error)} @ ${$.range === null ? "??" : tokLib.createRangeMessage($.range)}`);
                errorLog.write("\n");
            },
        }, {
            getSchemaData: (0, createFileResourceGetter_1.createFileResourceGetter)(path, ($) => {
                pl.logDebugMessage("FS ERROR");
            })
        });
    }
    const contextDir = [root, "schemas"];
    const externalCache = createCache([root, "schemas"]);
    const contextCache = createCache([contextDir]);
    lib.fireAndForget(lib.createAsyncRegistry((registry) => {
        registry.register((0, createFileResourceGetter_1.createFileResourceGetter)(contextDir, ($) => {
            pl.logDebugMessage("FS ERRROR");
        })({
            id: ["mrshl", "schemaschema@0.1"]
        }, {
            onFailed: () => {
            },
            onNotExists: () => {
                pl.logDebugMessage("FILE DOES NOT EXIST");
            },
            init: () => {
                return tokLib.createCreateTokenizer({
                    onError: ($) => {
                        errorLog.write(`${tokLib.createTokenizerErrorMessage($.error)} @ ${tokLib.createRangeMessage($.range)}`);
                        errorLog.write("\n");
                    }
                })({
                    consumer: lib.createDocumentLoader({
                        id: "schemaschema@0.1"
                    }, {
                        logError: ($) => {
                            errorLog.write(`${lib.createInternalErrorMessage($.error)} @ ${$.annotation === null ? "??" : tokLib.createRangeMessage($.annotation.range)}`);
                            errorLog.write("\n");
                        },
                        handler: (0, createLoggingTypedHandler_1.createLoggingTypedHandler)(($) => {
                            pl.logDebugMessage(`>>> ${$[0]}`);
                        })
                    }, contextCache, externalCache, registry.register)
                });
            }
        }));
    }));
});
