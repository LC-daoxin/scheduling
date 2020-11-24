<template>
  <view class="personal-settings">
    <text class="title">个人信息</text>
    <u-cell-group class="personal-info">
      <u-cell-item title="昵称" :value="info.name" @click="open('昵称', 'name')"></u-cell-item>
      <u-cell-item title="手机" :value="info.phone" @click="open('手机', 'phone')"></u-cell-item>
      <u-cell-item title="邮箱" :value="info.email" @click="open('邮箱', 'email')"></u-cell-item>
    </u-cell-group>
    <text class="title">医院信息</text>
    <u-cell-group>
      <u-cell-item title="医院" :value="info.hospital" @click="open('医院', 'hospital')"></u-cell-item>
      <u-cell-item title="科室" :value="info.departments" @click="open('科室', 'departments')"></u-cell-item>
    </u-cell-group>
    <uni-popup ref="popup" type="bottom">
      <view class="edit-info">
        <view class="edit-info_title">{{ editInfoTitle }}</view>
        <input type="text" v-model="inputValue"/>
        <button type="primary" @click="save">保存</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

export default {
  data() {
    return {
      editInfoTitle: '',
      inputTarget: '',
      inputValue: '',
      info: {
        name: '',
        phone: '',
        email: '',
        hospital: '',
        departments: ''
      }
    };
  },
  methods: {
    open(title, key) {
      this.editInfoTitle = title;
      this.inputTarget = key;
      this.$refs.popup.open();
    },
    save() {
      this.info[this.inputTarget] = this.inputValue;
      this.inputValue = '';
      this.$refs.popup.close();
    }
  },
  components: {
    uniPopup,
    uniPopupMessage,
    uniPopupDialog
  }
};
</script>

<style lang="scss" scoped>
@import '../custom-style.scss';

.personal-settings {
  height: calc(100vh - 44px);
  padding: 1em 1em 0;
  background-color: rgb(248, 248, 248);

  .title {
    font-size: 1.3em;
    line-height: 2;
    font-weight: bold;
  }

  .personal-info {
    margin-bottom: 1em;
  }

  .edit-info {
    padding: 1em;
    font-size: 1.1em;
    font-weight: bold;
    background-color: #fff;
    border-radius: 0.8em 0.8em 0 0;

    .edit-info_title {
      margin-bottom: 0.5em;
    }

    ::v-deep button {
      font-size: inherit;
    }

    input {
      margin: 1em 0;
      padding: 0.4em;
      border: 1px solid #eee;
      border-radius: 0.4em;
    }
  }
}
</style>
