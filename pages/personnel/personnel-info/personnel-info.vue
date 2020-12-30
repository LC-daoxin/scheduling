<template>
	<view>
		<uni-list class="uni-list">
		    <uni-list-item title="姓名" :rightText="info.nickName" clickable @click="edit('更改姓名', 'nickName', info.nickName)">
				<template class="footer" slot="footer">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.nickName ? info.nickName : '无' }}</view>
				</template>
			</uni-list-item>
		    <uni-list-item title="手机号" :rightText="info.mobile" clickable @click="edit('更改手机', 'mobile', info.mobile)">
				<template class="footer" slot="footer">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.mobile ? info.mobile : '无' }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list class="uni-list">
		    <uni-list-item title="职称" :rightText="info.positional">
				<template class="footer" slot="footer">
					<picker class="picker" @change="Changepositional" :value="positionalIndex" :range="positionalArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ positionalArray[positionalIndex] }}</view>
					</picker>
				</template>
			</uni-list-item>
		    <uni-list-item title="层级" :rightText="info.tier">
				<template class="footer" slot="footer">
					<picker class="picker" @change="ChangeTier" :value="tierIndex" :range="tierArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ tierArray[tierIndex] }}</view>
					</picker>
				</template>
			</uni-list-item>
		    <uni-list-item title="年资" :rightText="info.officeName">
				<template class="footer" slot="footer">
					<picker class="picker" @change="ChangeSeniority" :value="seniorityIndex" :range="seniorityArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ seniorityArray[seniorityIndex] }}</view>
					</picker>
				</template>
			</uni-list-item>
		    <uni-list-item title="学历" :rightText="info.education">
				<template class="footer" slot="footer">
					<picker class="picker" @change="ChangeEducation" :value="educationIndex" :range="educationArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ educationArray[educationIndex] }}</view>
					</picker>
				</template>
			</uni-list-item>
		    <uni-list-item title="工号" :rightText="info.userCode" clickable @click="edit('更改工号', 'userCode', info.userCode)">
				<template class="footer" slot="footer">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.userCode ? info.userCode : '无' }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list class="uni-list switch-list" v-if="info.status !== 2 && info.groupRole !== 0">
		    <uni-list-item>
				<template class="header" slot="header">
					<view class="text">是否管理员</view>
				</template>
				<template slot="footer">
					<switch :checked="switchChecked" @change="switchAdministrator" />
				</template>
			</uni-list-item>
		</uni-list>
		<view class="remind" v-if="info.status !== 2 && info.groupRole !== 0">开启后，该成员可以帮助您管理科室。</view>
		<button class="deleteBtn" @click="deleteUser" v-if="info.status !== 2 && info.groupRole !== 0">删除成员</button>
		<popup :title="editInfoTitle" ref="popup">
			<input type="text" v-model="inputValue"/>
			<button class="button button--primary" @click="save">保存</button>
		</popup>
	</view>
</template>

<script>
	import { requestPost, request } from '@/utils/request';
	import { getUserInfo, getGroupInfo } from '@/utils/index.js';
	export default {
		data() {
			return {
				info: {},
				positionalIndex: 0,
				tierIndex: 0,
				seniorityIndex: 0,
				educationIndex: 0,
				switchChecked: false,
				positionalArray: ['无', '主任医生', '副主任医生', '主治医生', '实习医生', '其他'],
				tierArray: ['无', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5'],
				educationArray: ['无', '高中及以下', '中专', '大专', '本科', '硕士', '博士'],
				seniorityArray: [],
				editInfoTitle: '', // 弹窗标题名
				inputTarget: '', // 输入的key
				inputValue: '' // 输入的value
			};
		},
		onLoad(option) {
			for (let i = 0; i <= 60; i++) {
				this.seniorityArray.push(i)
			}
			const Info = JSON.parse(decodeURIComponent(option.info));
			if (option.type === '1') {
				this.info = Info.info;
				this.info.status = Info.status;
				this.info.groupRole = this.Info.userInfo.groupRole
			} else {
				this.info = Info.userInfo
			}
			if (Info.status === 1 || Info.status === 2) {
				this.switchChecked = true
			} else {
				this.switchChecked = false
			}
			this.transformIndex();
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		methods: {
			transformIndex () {
				if (this.info.positional === null) {
					this.positionalIndex = 0
				} else {
					this.positionalArray.forEach((item,i) => {
						if (this.info.positional === item) {
							this.positionalIndex = i
						}
					})
				}
				if (this.info.rank === null) {
					this.tierIndex = 0
				} else {
					this.tierArray.forEach((item,i) => {
						if (this.info.rank === item) {
							this.tierIndex = i
						}
					})
				}
				if (this.info.seniority === null) {
					this.seniorityIndex = 0
				} else {
					this.seniorityArray.forEach((item,i) => {
						if (this.info.seniority === item) {
							this.seniorityIndex = i
						}
					})
				}
				if (this.info.education === null) {
					this.educationIndex = 0
				} else {
					this.educationArray.forEach((item,i) => {
						if (this.info.education === item) {
							this.educationIndex = i
						}
					})
				}
			},
			edit(title, key, value) {
				this.editInfoTitle = title;
				this.inputTarget = key;
				this.inputValue = value;
				if (this.info.groupRole !== 0) {
					this.$refs.popup.open();
				}
			},
			save() {
				this.info[this.inputTarget] = this.inputValue;
				this.updateUser(this.info);
				this.inputValue = '';
				this.$refs.popup.close();
			},
			Changepositional (e) {
				this.positionalIndex = e.detail.value;
				this.info.positional = this.positionalArray[e.detail.value];
				this.updateUser(this.info);
			},
			ChangeTier (e) {
				this.tierIndex = e.detail.value;
				this.info.rank = this.tierArray[e.detail.value];
				this.updateUser(this.info);
			},
			ChangeSeniority (e) {
				this.seniorityIndex = e.detail.value;
				this.info.seniority = this.seniorityArray[e.detail.value];
				this.updateUser(this.info);
			},
			ChangeEducation (e) {
				this.educationIndex = e.detail.value;
				this.info.education = this.educationArray[e.detail.value];
				this.updateUser(this.info);
			},
			switchAdministrator (e) {
				this.switch = e.detail.value;
				let status = e.detail.value ? 1 : 0;
				this.setManager(status);
			},
			setManager (status) {
				let postData = {
					'groupId': this.Info.groupInfo.id,
					'userId': this.info.id,
					'status': status
				}
				requestPost('/group/setManager', postData, res => {
					const {code, msg, data} = res.data;
					if (code === 'success') {
						getGroupInfo(this.Info.groupInfo.id);
					} else {
						uni.showToast({
							title: '系统错误 /group/setManager ' + msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			updateUser (Info) {
				if (this.info.groupRole !== 0) {
					requestPost('/user/update', Info, res => {
						const {code, msg, data} = res.data;
						console.log(res)
						if (code === 'success') {
							getUserInfo();
							getGroupInfo(this.Info.groupInfo.id);
						} else {
							uni.showToast({
								title: '系统错误 /user/update ' + msg,
								icon: 'none',
								duration: 2000
							})
						}
					})
				}
			},
			deleteUser (id) {
				let that = this;
				uni.showModal({
					title: '删除成员',
					content: '删除成员后，将不能对该成员进行排班',
					success(res) {
						if (res.confirm) {
							request('/group/deleteGourpUser', 'delete',
								{
									'groupId': that.Info.groupInfo.id,
									'userId': that.info.id
								},
								res => {
									console.log(res)
									const { code, msg, data } = res.data;
									if (code === 'success') {
										getGroupInfo(that.Info.groupInfo.id);
										uni.showToast({
											title: '已删除',
											duration: 1000
										})
										setTimeout(() => {
											uni.navigateBack({})
										}, 1000)
									}
								}
							)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-list {
		display: block;
		margin-top: 20rpx;
		.footer {
			.text {
				font-size: 28rpx;
				color: #999;
				position: absolute;
				right: 0;
				left: 0;
				top: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				flex-direction: row-reverse;
				.iconfont {
					padding: 0 10px;
					color: #999;
				}
			}
		}
		.header {
			display: flex;
			height: 100%;
			align-items: center;
			.text {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
	.remind {
		font-size: 24rpx;
		color: #999;
		padding: 12rpx 20rpx;
	}
	.deleteBtn {
		&::after {
			border: none;
		}
		margin-top: 30rpx;
		border-radius: 0;
		background-color: #fff;
		color: $danger-color;
	}
</style>
