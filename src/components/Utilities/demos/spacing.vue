<template>
  <div>
    <cdr-text
      tag="h2"
      modifier="heading-serif-600 heading-serif-700@md heading-serif-700@lg"
    >
      Space classes
    </cdr-text>

    <div
      :data-backstop="`spacing-${category}-utilities`"
    >
      <template
        v-for="type in types"
      >
        <template
          v-for="(v,k,i) in spaceTokens"
        >
          <div
            :key="`${type}-${k}-${i}`"
            :class="[`${getClass(type, k)}`, typeClass(type)]"
          >{{ getClass(type, k) }}</div>
          <div
            :key="`${type}-${k}-${i}-xs`"
            :class="[`${getClass(type, k)}@xs`, typeClass(type)]"
          >{{ getClass(type, k) }}@xs</div>
          <div
            :key="`${type}-${k}-${i}-sm`"
            :class="[`${getClass(type, k)}@sm`, typeClass(type)]"
          >{{ getClass(type, k) }}@sm</div>
          <div
            :key="`${type}-${k}-${i}-md`"
            :class="[`${getClass(type, k)}@md`, typeClass(type)]"
          >{{ getClass(type, k) }}@md</div>
          <div
            :key="`${type}-${k}-${i}-lg`"
            :class="[`${getClass(type, k)}@lg`, typeClass(type)]"
          >{{ getClass(type, k) }}@lg</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { CdrText } from 'srcdir/index';
import * as tokens from '@rei/cdr-tokens';
import pickBy from 'lodash/pickBy';
import kebabCase from 'lodash/kebabCase';

export default {
  name: 'UtilitiesSpace',
  components: {
    CdrText,
  },
  props: {
    category: String,
    types: Array,
  },
  data() {
    return {
      tokens,
    };
  },
  computed: {
    spaceTokens() {
      return pickBy(this.tokens, (v, k) => {
        if (k.includes('Space') && !k.includes('Inset')) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    getClass(type, token) {
      return `cdr-${type}-${kebabCase(token.substring(3))}`;
    },
    typeClass(type) {
      return type.includes('p') ? 'spacing-example-p' : 'spacing-example-m';
    },
  },
};
</script>

<style>
.spacing-example-p {
  /* For showing things like right padding */
  border: 1px black solid;
  box-sizing: content-box;
  width: 300px;
  background-color:rgb(199, 220, 191);
}

.spacing-example-m {
  border: 1px black solid;
  background-color: mistyrose;
}
</style>
