<template>
  <view class="wrap">
    <u-notice-bar class="notice" mode="horizontal" :list="notice" :more-icon="true"></u-notice-bar>
    <view class="tab-bar">
      <view class="tab-header">
        <view v-for="(tab, tabIndex) of tabsContent"
              :key="tabIndex"
              :class="`tab-header_item ${isActiveTab(tabIndex)}`"
              @click="switchTab(tabIndex)">
          <text>{{ tab.Type }}</text>
        </view>
      </view>
      <view class="tab-inner">
        <view v-for="(tab, tabIndex) of tabsContent" :key="tabIndex" v-show="currentTabIndex === tabIndex"
              class="tab-inner_item">
          <message-item :notice="tab"></message-item>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MessageItem from "./MessageItem";
import tabsContent from './tabsContent.js'

export default {
  data() {
    return {
      list: [],
      current: 3,
      currentTabIndex: 0,
      notice: ['本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班！'],
      tabsContent,
      currentTabs: 0,
      swiperCurrent: 0,
      clientHeight: 0
    };
  },
  mounted() {
    this.list = this.$store.state.vuex_tabbar;
  },
  methods: {
    switchTab(index) {
      this.currentTabIndex = index;
    },
    isActiveTab(index) {
      return this.currentTabIndex === index ? 'tab-header_item_active' : '';
    },
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
    }
  },
  components: {
    MessageItem
  }
};
</script>

<style lang="scss">
@import "../../../components/tab-bar/tab-bar.scss";

.wrap {
  height: calc(100vh - var(--window-top) - 50px);
}
</style>
