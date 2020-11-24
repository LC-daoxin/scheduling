<template>
  <view class="feed-back">
    <form @submit="formSubmit" @reset="formReset">
      <view class="uni-form-item uni-column">
        <view class="title">标题</view>
        <input class="uni-input" name="input" placeholder="请输入反馈标题"/>
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">内容</view>
        <view class="uni-textarea">
          <textarea placeholder="请输入反馈内容"/>
        </view>
      </view>
      <view class="uni-btn-v">
        <button form-type="submit" type="primary">提交</button>
        <button class="reset-btn" type="default" form-type="reset">重制</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
      var formdata = e.detail.value
      uni.showModal({
        content: '表单数据内容：' + JSON.stringify(formdata),
        showCancel: false
      });
    },
    formReset: function (e) {
      console.log('清空数据')
    }
  }
}
</script>

<style scoped>
.feed-back {
  height: calc(100vh - 44px);
  background-color: #f8f8f8;
  padding: 1em 1em 0;
}

.feed-back .uni-btn-v button + button {
  margin-top: 0.5em;
}

.feed-back .uni-btn-v .reset-btn {
  background-color: #fff;
}

::v-deep button {
  font-size: inherit;
}

.uni-form-item {
  margin-bottom: 1em;
}

.uni-form-item .title {
  font-size: 1.2em;
  font-weight: bold;
  padding: 20rpx 0;
}

.uni-form-item input,
.uni-form-item .uni-textarea {
  padding: 0.4em;
  border: 1px solid #eee;
  border-radius: 0.4em;
  background-color: #fff;
}
</style>
