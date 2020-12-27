<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<uni-list>
		    <uni-list-item title="班种名称">
				<template class="footer" slot="footer" @click="edit('班种名称', 'workName', info.workName)">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.workName }}</view>
				</template>
			</uni-list-item>
		    <view class="time">
				<view class="time-item">
					<view class="start">
						<view class="title">开始时间</view>
						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChangeA" @change="createTime" :value="multiIndexA" :range="multiArray" range-key="label">
							<view class="uni-input"><text v-if="multiArray[0][multiIndexA[0]].value === 1">{{multiArray[0][multiIndexA[0]].label}}</text> {{multiArray[1][multiIndexA[1]].value}}:{{multiArray[2][multiIndexA[2]].value}}</view>
						</picker>
					</view>
					<view class="end">
						<view class="title">结束时间</view>
						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChangeB" @change="createTime"  :value="multiIndexB" :range="multiArray" range-key="label">
							<view class="uni-input"><text v-if="multiArray[0][multiIndexB[0]].value === 1">{{multiArray[0][multiIndexB[0]].label}}</text> {{multiArray[1][multiIndexB[1]].value}}:{{multiArray[2][multiIndexB[2]].value}}</view>
						</picker>
					</view>
				</view>
				<view class="time-item" v-if="!timeShow">
					<view class="start">
						<view class="title">开始时间</view>
						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChangeC" @change="createTime" :value="multiIndexC" :range="multiArray" range-key="label">
							<view class="uni-input"><text v-if="multiArray[0][multiIndexC[0]].value === 1">{{multiArray[0][multiIndexC[0]].label}}</text> {{multiArray[1][multiIndexC[1]].value}}:{{multiArray[2][multiIndexC[2]].value}}</view>
						</picker>
					</view>
					<view class="end">
						<view class="title">结束时间</view>
						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChangeD" @change="createTime" :value="multiIndexD" :range="multiArray" range-key="label">
							<view class="uni-input"><text v-if="multiArray[0][multiIndexD[0]].value === 1">{{multiArray[0][multiIndexD[0]].label}}</text> {{multiArray[1][multiIndexD[1]].value}}:{{multiArray[2][multiIndexD[2]].value}}</view>
						</picker>
					</view>
				</view>
				<view class="addBtn" v-if="timeShow" @click="addTimeItem"><text class="iconfont icon-jia"></text>添加时间段</view>
				<view class="addBtn" v-else @click="delTimeItem">删除时间段</view>
			</view>
		    <uni-list-item title="时长(可修改)">
				<template class="footer" slot="footer" @click="edit('时长', 'duration', info.duration)">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.duration + ' 小时' }}</view>
				</template>
			</uni-list-item>
		    <uni-list-item title="类型" :rightText="info.type">
				<template class="footer" slot="footer">
					<picker class="picker" @change="ChangeType" :value="typeIndex" :range="typeArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ typeArray[typeIndex] }}</view>
					</picker>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="remind">类型为"休息"的班种将不会计入总工时，不会收到上班提醒。</view>
		<uni-list class="uni-list" v-if="pageType === '2'">
		    <uni-list-item>
				<template class="header" slot="header">
					<view class="text">启用</view>
				</template>
				<template slot="footer">
					<switch :checked="info.status === 0" @change="switchOpen" />
				</template>
			</uni-list-item>
		</uni-list>
		<button v-if="pageType === '1'" class="bottomBtn delete" @click="cancel">取消</button>
		<button v-else class="bottomBtn delete" @click="deleteClass">删除</button>
		<button v-if="pageType === '1'" class="bottomBtn save" @click="addClass">添加</button>
		<button v-else class="bottomBtn save" @click="saveClass">保存</button>
		<popup :title="editInfoTitle" ref="popup">
			<input type="text" v-model="inputValue"/>
			<button class="button button--primary" @click="saveChange">保存</button>
		</popup>
	</view>
</template>

<script>
	import { requestPost, requestDelete } from '@/utils/request.js'
	import { CompareTime } from '@/utils/index';
	export default {
		data() {
			return {
				editInfoTitle: '', // 弹窗标题名
				inputTarget: '', // 输入的key
				inputValue: '', // 输入的value
				info: {
					id: '',
					workName: '',
					duration: '',
					status: 0,
					timeInterval: [],
					type: 0
				},
				typeIndex: 0,
				typeArray: ['正常上班', '休息'],
				pageType: '1',
				multiArray: [[{ label: '当日', value: 0 }, { label: '次日', value: 1 }],[],[]],
				multiIndexA: [0, 0, 0],
				multiIndexB: [0, 22, 0],
				multiIndexC: [0, 0, 0],
				multiIndexD: [0, 22, 0],
				timeShow: true,
				startOrEnd: true // 默认操作开始时间
			};
		},
		onShow() {
			for(let i = 0 ; i<24; i++) {
				let hour = i > 9 ? i : '0' + i;
				this.multiArray[1].push({ label: hour + ' 时', value: hour })
			}
			for(let i = 0 ; i<60; i++) {
				let minute = i > 9 ? i : '0' + i;
				this.multiArray[2].push({ label: minute + ' 分', value: minute })
			}
		},
		onLoad(option) {
			this.info.id = option.id;
			this.pageType = option.pageType
			if (option.pageType === '2') {
				this.info.duration = option.duration;
				this.info.status = parseInt(option.status);
				this.info.type = this.typeIndex = option.type;
				this.info.workName = option.workName;
				this.info.timeInterval = option.timeInterval.split(',');
				let timeOne = this.info.timeInterval[0].split('-');
				let time1; // 第一段时间 开始 时
				let time3; // 第一段时间 结束 时
				if (timeOne[0].indexOf('次日') === -1) {
					time1 = timeOne[0].split(':')[0];
				} else {
					time1 = timeOne[0].split(':')[0].slice(2);
					this.multiIndexA[0] = 1;
				}
				let time2 = timeOne[0].split(':')[1];// 第一段时间 开始 分
				if (timeOne[1].indexOf('次日') === -1) {
					time3 = timeOne[1].split(':')[0];
				} else {
					time3 = timeOne[1].split(':')[0].slice(2);
					this.multiIndexB[0] = 1;
				}
				let time4 = timeOne[1].split(':')[1];// 第一段时间 结束 分
				this.multiIndexA[1] = parseInt(time1);
				this.multiIndexA[2] = parseInt(time2)
				this.multiIndexB[1] = parseInt(time3)
				this.multiIndexB[2] = parseInt(time4)
				if (this.info.timeInterval.length === 2) {
					this.timeShow = false;
					let timeTwo = this.info.timeInterval[1].split('-');
					let time5; // 第二段时间 开始 时
					let time7; // 第二段时间 结束 时
					if (timeTwo[0].indexOf('次日') === -1) {
						time5 = timeTwo[0].split(':')[0];
					} else {
						time5 = timeTwo[0].split(':')[0].slice(2);
						this.multiIndexC[0] = 1;
					}
					let time6 = timeTwo[0].split(':')[1];// 第二段时间 开始 分
					if (timeTwo[0].indexOf('次日') === -1) {
						time7 = timeTwo[1].split(':')[0];
					} else {
						time7 = timeTwo[1].split(':')[0].slice(2);
						this.multiIndexD[0] = 1;
					}
					let time8 = timeTwo[1].split(':')[1];// 第二段时间 结束 分
					this.multiIndexC[1] = parseInt(time5)
					this.multiIndexC[2] = parseInt(time6)
					this.multiIndexD[1] = parseInt(time7)
					this.multiIndexD[2] = parseInt(time8)
				} else if (this.info.timeInterval.length === 1) {
					this.timeShow = true;
				}
			}
		},
		onReady() {
			if (this.pageType === '2') {
				uni.setNavigationBarTitle({
				    title: '编辑班种'
				});
			}
		},
		methods: {
			edit(title, key, value) {
			  this.editInfoTitle = title;
			  this.inputTarget = key;
			  this.inputValue = value
			  this.$refs.popup.open();
			},
			saveChange() {
			    this.info[this.inputTarget] = this.inputValue;
				this.inputValue = '';
				this.$refs.popup.close();
			},
			ChangeType (e) {
				this.info.type = this.typeIndex = e.detail.value;
			},
			// 是否启用
			switchOpen (e) {
				this.info.status = Number(!e.detail.value);
			},
			// 添加时间段
			addTimeItem () {
				this.timeShow = false;
				this.createTime();
			},
			delTimeItem () {
				this.timeShow = true;
				this.createTime();
			},
			cancel () {
				uni.navigateBack({})
			},
			deleteClass () {
				requestDelete(`/schedul/deleteWork/${this.info.id}`, res => {
					const {code, msg, data} = res.data
					if (code === 'success') {
						uni.showToast({
							title: '删除成功',
							content: msg,
							duration: 1000
						})
						setTimeout(() => {
							uni.navigateBack({})
						}, 1000)
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			},
			saveClass () {
				let postData = {
					'id': parseInt(this.info.id),
					'workName': this.info.workName,
					'time': this.info.timeInterval,
					'duration': parseFloat(this.info.duration),
					'type': parseInt(this.info.type),
					'status': parseInt(this.info.status)
				}
				console.log(postData)
				requestPost('/schedul/setWork', postData, res => {
					const {code, msg, data} = res.data;
					if (code === 'success') {
						uni.showToast({
							title: '保存成功',
							content: msg,
							duration: 800
						})
						setTimeout(() => {
							uni.navigateBack({})
						}, 800)
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 800
						})
					}
				})
			},
			addClass () {
				this.createTime();
				let postData = {
					'workName': this.info.workName,
					'time': this.info.timeInterval,
					'duration': this.info.duration,
					'type': parseInt(this.info.type)
				}
				requestPost('/schedul/addWork', postData, res => {
					const {code, msg, data} = res.data;
					if (code === 'success') {
						uni.showToast({
							title: '添加成功',
							content: msg,
							duration: 800
						})
						setTimeout(() => {
							uni.navigateBack({})
						}, 800)
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 800
						})
					}
				})
			},
			bindMultiPickerColumnChangeA (e) {
				console.log(e)
				this.multiIndexA[e.detail.column] = e.detail.value;
				this.startOrEnd = true;
				this.$forceUpdate()
			},
			bindMultiPickerColumnChangeB (e) {
				console.log(e)
				this.multiIndexB[e.detail.column] = e.detail.value;
				this.startOrEnd = false;
				this.$forceUpdate()
			},
			bindMultiPickerColumnChangeC (e) {
				this.multiIndexC[e.detail.column] = e.detail.value;
				this.startOrEnd = true;
				this.$forceUpdate()
			},
			bindMultiPickerColumnChangeD (e) {
				this.multiIndexD[e.detail.column] = e.detail.value;
				this.startOrEnd = false;
				this.$forceUpdate()
			},
			// 时间显示以及处理
			createTime (e) {
				let Time1 = (this.multiArray[0][this.multiIndexA[0]].value === 1 ? '次日': '') + this.multiArray[1][this.multiIndexA[1]].value + ':' + this.multiArray[2][this.multiIndexA[2]].value;
				let Time2 = (this.multiArray[0][this.multiIndexB[0]].value === 1 ? '次日': '') + this.multiArray[1][this.multiIndexB[1]].value + ':' + this.multiArray[2][this.multiIndexB[2]].value;
				let Time3 = (this.multiArray[0][this.multiIndexC[0]].value === 1 ? '次日': '') + this.multiArray[1][this.multiIndexC[1]].value + ':' + this.multiArray[2][this.multiIndexC[2]].value;
				let Time4 = (this.multiArray[0][this.multiIndexD[0]].value === 1 ? '次日': '') + this.multiArray[1][this.multiIndexD[1]].value + ':' + this.multiArray[2][this.multiIndexD[2]].value;
				let hours = 0;
				if (Time1.indexOf('次日') !== -1 && Time2.indexOf('次日') !== -1 || Time1.indexOf('次日') === -1 && Time2.indexOf('次日') === -1) {
					if (CompareTime(Time1.substr(-5, 5), Time2.substr(-5, 5))) {
						this.uTipsTime(this.startOrEnd);
					} else {
						this.info.timeInterval[0] = Time1 + '-' + Time2;
						hours += Number(this.diffTime(Time1, Time2));
					}
				} else if (Time1.indexOf('次日') !== -1 && Time2.indexOf('次日') === -1) {
					this.uTipsTime(this.startOrEnd);
				} else {
					this.info.timeInterval[0] = Time1 + '-' + Time2;
					hours += Number(this.diffTime(Time1, Time2));
				}
				if (!this.timeShow) {
					if (Time3.indexOf('次日') !== -1 && Time4.indexOf('次日') !== -1 || Time3.indexOf('次日') === -1 && Time4.indexOf('次日') === -1) {
						if (CompareTime(Time3.substr(-5, 5), Time4.substr(-5, 5))) {
							this.uTipsTime(this.startOrEnd);
						} else {
							this.info.timeInterval[1] = Time3 + '-' + Time4;
							hours += Number(this.diffTime(Time3, Time4));
						}
					} else if (Time3.indexOf('次日') !== -1 && Time4.indexOf('次日') === -1) {
						this.uTipsTime(this.startOrEnd);
					} else {
						this.info.timeInterval[1] = Time3 + '-' + Time4;
						hours += Number(this.diffTime(Time3, Time4));
					}
				}
				this.info.duration = hours.toFixed(2);
			},
			// 提示时间大小
			uTipsTime (s) {
				let title = s ? '开始时间不能大于结束时间' : '结束时间不能小于开始时间'
				this.$refs.uTips.show({
					title: title,
					type: 'error',
					duration: '1500'
				})
			},
			// 计算小时差
			diffTime (startDate, endDate) {
				let newStartDate;
				let newEndDate;
				if (startDate.indexOf('次日') !== -1) {
					newStartDate = new Date('2020/01/02 ' + startDate.substr(-5, 5) + ':00')
				} else {
					newStartDate = new Date('2020/01/01 ' + startDate.substr(-5, 5) + ':00')
				}
				if (endDate.indexOf('次日') !== -1) {
					newEndDate = new Date('2020/01/02 ' + endDate.substr(-5, 5) + ':00')
				} else {
					newEndDate = new Date('2020/01/01 ' + endDate.substr(-5, 5) + ':00')
				}
			    let diff = newEndDate.getTime() - newStartDate.getTime(); // 时间差的毫秒数
			    //计算出小时数
			    let hours = (diff/(3600*1000)).toFixed(2);
				return hours;
			}
		}
	}
</script>

<style lang="scss">
	.time {
		width: 100%;
		min-height: 40px;
		display: flex;
		flex-direction: column;
		border-top: 1px solid $border-color;
		.time-item {
			width: 100%;
			min-height: 50px;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			padding: 0 15rpx;
			.start {
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-right: 1px solid $border-color;
				padding: 15rpx;
				box-sizing: border-box;
			}
			.end {
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				padding: 15rpx 30rpx;
				box-sizing: border-box;
			}
			.title {
				font-size: 28rpx;
				color: $light-color;
			}
			.uni-input {
				font-size: 32rpx;
			}
		}
		.addBtn {
			display: flex;
			align-items: center;
			padding-left: 40rpx;
			width: 100%;
			height: 40px;
			color: $base-color;
			.iconfont {
				padding-right: 10rpx;
			}
		}
		
	}
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
				color: #3b4144;
			}
		}
	}
	.bottomBtn {
		&.delete {
			background-color: #fff;
			left: 0;
			color: $base-color;
		}
		&.save {
			background-color: $base-color;
			right: 0;
			color: #fff;
		}
		padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
		padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
		border-radius: 0;
		font-weight: 500;
		width: 50%;
		position: fixed;
		bottom: 0;
	}
	.remind {
		font-size: 24rpx;
		color: #999;
		padding: 12rpx 20rpx;
	}
</style>
