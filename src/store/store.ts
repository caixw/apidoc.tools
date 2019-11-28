// SPDX-License-Identifier: MIT

import * as vuex from 'vuex';
import * as types from './types';
import { DocTree } from '@/components/DocTree.ts';
import config from '@/config/config.ts';

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
    }
};

export interface State {
    htmlTitle: string
    title: string
    message: Message
    docTree: DocTree[]
    method: {
        methods: string[],
        filter: string[]
    },
    tag: {
        tags: Tag[],
        filter: string[]
    },
    server: {
        servers: Server[],
        filter: string[]
    }
}

export interface Message {
    message: string
    type: 'error' | 'warning' | 'info' | 'success'
}

export interface Tag {
    id: string,
    title: string
}

export interface Server {
    id: string
    url: string
    description: string
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

    // method
    [types.INIT_METHOD_FILTER](state: State, methods: string[]) {
        state.method.methods.push(...methods);
        state.method.filter.push(...methods);
    },
    [types.SET_METHOD_FILTER](state: State, methods: string[]) {
        state.method.filter.length = 0;
        state.method.filter.push(...methods);
    },

    // server
    [types.INIT_SERVER_FILTER](state: State, servers: Server[]) {
        state.server.servers.push(...servers);
        for (const srv of servers) {
            state.server.filter.push(srv.id);
        }
    },
    [types.SET_SERVER_FILTER](state: State, servers: string[]) {
        state.server.filter.length = 0;
        state.server.filter.push(...servers);
    },

    // tag
    [types.INIT_TAG_FILTER](state: State, tags: Tag[]) {
        state.tag.tags.push(...tags);
        for (const tag of tags) {
            state.tag.filter.push(tag.id);
        }
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
