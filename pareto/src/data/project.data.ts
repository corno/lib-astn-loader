import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { external, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

export const $: mproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "loads an ASTN Document from the filesystem",
    'license': "TBD",

    'dependencies': d({
        "lib-astn-dummyhandlers": null,
    }),
    'type': ['library', {
        'main': {
            'definition': {
                'glossary': {
                    'root': glossary,
                    'imports': d({
                        //"common": "glo-pareto-common",
                    }),
                },
                'api': {
                    'root': api,
                    'imports': d({
                        "common": external("glo-pareto-common"),
                    }),
                }
            },
            'implementation': ['typescript', null],
        },
        'submodules': d({
        }),
        'bindings': [false],
        'executables': d({}),
        'test': {
            'dependencies': d({
                "glo-astn-typedhandlers": null
            }),
            'definition': {
                'glossary': {
                    'root': {
                        'glossary parameters': d({}),
                        'imports': d({}),
                        'root': {
                            'namespaces': d({}),
                            'types': d({}),
                        },
                        'asynchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                        'synchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                    },
                    'imports': d({}),
                },
                'api': {
                    'root': {
                        'algorithms': d({}),
                    },
                    'imports': d({}),
                },
            },
            'imports': d({}),
        }
    }],
}