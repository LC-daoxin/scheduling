<template>
  <view class="request-page">
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
        <button form-type="submit" class="button button--primary">提交</button>
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
