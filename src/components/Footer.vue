<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <p class="mt-2 mb-1">&copy; 2019 by <a :href="appURL">{{appName}}</a></p>
        <p class="mt-1 mb-2" v-html="$i18n.t('footer.home', this.$i18n.locale, {license, host})" />
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';

import config from '@/config/config.ts';
import { buildURL } from '@/store/store.ts';

@Component({
    components: { Fragment }
})
export default class XFooter extends Vue {
    appURL = config.url;
    appName = config.name;
    license = '';
    host = '';

    created() {
        this.license = buildURL(config.license.url, config.license.name);
        this.host = buildURL(config.repo, 'Github');
    }
}
</script>
