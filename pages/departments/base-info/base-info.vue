<template>
	<view>
		<view class="info">
			<u-alert-tips type="warning" :show-icon="true" :description="description"></u-alert-tips>
			<uni-list>
			    <uni-list-item title="所属医院" link to="/pages/departments/hospitalList/hospitalList"  :rightText="info.hospitalName" @click="selectHospital()" ></uni-list-item>
			    <uni-list-item title="所属科室" link to="/pages/departments/department-select/department-select"  :rightText="info.departmentName" @click="selectHospital()" ></uni-list-item>
			    <uni-list-item title="科室名称" link :rightText="info.officeName" @click="editName('科室名称', 'name')" ></uni-list-item>
			    <uni-list-item title="创建者" :rightText="info.creatorName"></uni-list-item>
			    <uni-list-item title="编号" :rightText="info.creatorId"></uni-list-item>
			</uni-list>
			<button class="transferBtn" @click="transfer">转让科室</button>
			<button class="closeBtn"  @click="close" type="default">解散科室</button>
			<button class="bottomBtn" @click="goDepartment">切换科室</button>
		</view>
		<popup :title="editInfoTitle" ref="popup">
			<input type="text" v-model="inputValue"/>
			<button class="button button--primary" @click="save">保存</button>
		</popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					hospitalName: '首都医科大学附属宣武医院',
					departmentName: '心血管内科',
					officeName: '内科二组',
					creatorName: '赵易',
					creatorId: '201001'
				},
				description: '仅创建者和管理员可以修改科室名称和所属医院。',
				editInfoTitle: '', // 弹窗标题名
				inputTarget: '', // 输入的key
				inputValue: '', // 输入的value
				editInfo: {
				  name: ''
				}
			};
		},
		methods: {
			// 选择医院
			selectHospital () {
			},
			transfer () {},
			// 
			close () {},
			// 切换科室
			goDepartment () {
				uni.navigateTo({
				    url: '/pages/departments/departments-list/departments-list',
					success: function(res) {
						console.log(res)
					}
				});
			},
			editName(title, key) {
			  this.editInfoTitle = title;
			  this.inputTarget = key;
			  this.$refs.popup.open();
			},
			save() {
			  this.editInfo[this.inputTarget] = this.inputValue;
			  this.inputValue = '';
			  this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss">
	page {
		.info {
			.uni-list-item__extra-text {
				font-size: 28rpx !important;
			}
			.transferBtn {
				width: 90%;
				margin-top: 30rpx;
				background-color: $base-color;
				color: #fff;
			}
			.closeBtn {
				width: 90%;
				margin-top: 30rpx;
				background-color: #fff;
				color: #666;
			}
			.bottomBtn {
				padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
				padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
				background-color: #fff;
				border-radius: 0;
				color: $text-color;
				font-weight: 500;
				width: 100%;
				position: fixed;
				bottom: 0;
			}
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
		  .saveBtn {
			  background-color: $base-color;
		  }
		}
	}
</style>
