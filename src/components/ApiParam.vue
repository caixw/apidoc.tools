<!-- SPDX-License-Identifier: MIT -->

<template>
<div>
    <h5 class="subtitle-2">{{$i18n.t(title)}}</h5>

    <v-simple-table dense>
        <template v-slot:default>
            <thead>
                <tr>
                    <th>{{$i18n.t('api.var')}}</th>
                    <th>{{$i18n.t('api.type')}}</th>
                    <th>{{$i18n.t('api.value')}}</th>
                    <th>{{$i18n.t('api.description')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(param, index) of params" :key="index">
                    <th>{{param.name}}</th>
                    <td>{{getTypeName(param)}}</td>
                    <td>
                        <v-icon>{{checkbox(param.optional)}}</v-icon>
                        {{param.default}}
                    </td>
                    <td v-html="getDescription(param)" />
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as apidoc from '@/components/apidoc.ts';

@Component
export default class XApiParam extends Vue {
    @Prop() readonly params!: apidoc.Param[];
    @Prop() readonly title!: string;

    getTypeName(param: apidoc.Param): string {
        if (param.array) {
            return param.type + '[]';
        }
        return param.type;
    }

    getDescription(param: apidoc.Param): string {
        const dest = apidoc.getDescription(param.summary, param.description);
        return apidoc.getDescriptionWithEnum(dest, param.enums);
    }

    checkbox(optional: boolean): string {
        return optional ? 'mdi-checkbox-blank-outline' : 'mdi-check-box-outline';
    }
};
</script>
