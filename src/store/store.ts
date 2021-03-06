// SPDX-License-Identifier: MIT

import * as vuex from 'vuex';
import * as types from './types';
import { DocTree } from '@/components/DocTree.ts';
import config from '@/config/config.ts';
import * as apidoc from '@/components/apidoc.ts';

const state: State = {
    htmlTitle: '',
    title: config.name,
    message: {
        message: '',
        type: 'error'
    },
    docTree: [],
    method: {
        methods: [],
        filter: []
    },
    tag: {
        tags: [],
        filter: []
    },
    server: {
        servers: [],
        filter: []
    },
    apiFooter: {}
};

export interface State {
    htmlTitle: string
    title: string
    message: Message
    docTree: DocTree[]

    // api 相关的功能
    method: {
        methods: string[],
        filter: string[]
    },
    tag: {
        tags: apidoc.Tag[],
        filter: string[]
    },
    server: {
        servers: apidoc.Server[],
        filter: string[]
    },
    apiFooter: {
        created?: string,
        license?: string,
        contact?: string
    }
}

export interface Message {
    message: string
    type: 'error' | 'warning' | 'info' | 'success'
}

const getters: vuex.GetterTree<State, State> = {
    // TODO
};

const mutations: vuex.MutationTree<State> = {
    // 设置 html>head>title 的内容
    [types.SET_HTML_TITLE](state: State, title?: string) {
        if (title === undefined || title === '') {
            document.title = config.titleSuffix;
            return;
        }

        state.htmlTitle = title;
        document.title = title + config.titleSeparator + config.titleSuffix;
    },

    // 设置 toolbar 上的标题内容的翻译 ID
    [types.SET_TITLE](state: State, title: string) {
        state.title = title;
    },

    // 设置弹出的提示信息
    [types.SET_MESSAGE](state: State, message: string | { message: string, type?: 'error' | 'warning' | 'info' | 'success' }) {
        if (typeof message === 'string') {
            state.message.message = message;
            state.message.type = 'error';
            return;
        }

        state.message.message = message.message;
        state.message.type = message.type === undefined ? 'error' : message.type;
    },

    [types.CLEAR_DOC_TREE](state: State) {
        state.docTree.length = 0;
    },

    [types.ADD_DOC_TREE](state: State, tree: DocTree) {
        state.docTree.push(tree);
    },

    [types.INIT_API](state: State, doc: apidoc.ApiDoc) {
        // methods
        state.method.methods.length = 0;
        state.method.filter.length = 0;
        if (doc.apis !== undefined && doc.apis.length > 0) {
            const methods: string[] = [];
            for (const api of doc.apis) {
                if (!methods.includes(api.method)) {
                    methods.push(api.method);
                }
            }
            state.method.methods.push(...methods);
            state.method.filter.push(...methods);
        }

        // server
        state.server.servers.length = 0;
        state.server.filter.length = 0;
        state.server.servers.push(...doc.servers);
        for (const srv of doc.servers) {
            state.server.filter.push(srv.name);
        }

        // tag
        state.tag.tags.length = 0;
        state.tag.filter.length = 0;
        if (doc.tags !== undefined && doc.tags.length > 0) {
            state.tag.tags.push(...doc.tags);
            for (const tag of doc.tags) {
                state.tag.filter.push(tag.name);
            }
        }

        // footer
        state.apiFooter = {};
        state.apiFooter.created = doc.created;
        if (doc.license !== undefined) {
            const l = doc.license;
            state.apiFooter.license = buildURL(l.url, l.text);
        }
        if (doc.contact !== undefined) {
            let url = doc.contact.url;
            if (url === undefined) {
                url = 'mailto:' + doc.contact.email;
            }

            state.apiFooter.contact = buildURL(url, doc.contact.name);
        }
    },

    [types.SET_METHOD_FILTER](state: State, methods: string[]) {
        state.method.filter.length = 0;
        state.method.filter.push(...methods);
    },

    [types.SET_SERVER_FILTER](state: State, servers: string[]) {
        state.server.filter.length = 0;
        state.server.filter.push(...servers);
    },

    [types.SET_TAG_FILTER](state: State, tags: string[]) {
        state.tag.filter.length = 0;
        state.tag.filter.push(...tags);
    }
};

const actions: vuex.ActionTree<State, State> = {
    //
};

export const store: vuex.StoreOptions<State> = {
    state,
    getters,
    mutations,
    actions
};

export function buildURL(url: string, text: string): string {
    let start = '';
    let end = '';

    let code = text.charCodeAt(0);
    if (code > 0 && code < 255) {
        start = '&nbsp;';
    }
    code = text.charCodeAt(text.length - 1);
    if (code > 0 && code < 255) {
        end += '&nbsp;';
    }

    return `${start}<a href="${url}">${text}</a>${end}`;
}
