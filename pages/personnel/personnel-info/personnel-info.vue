<template>
	<view>
		<uni-list class="uni-list">
		    <uni-list-item title="姓名" :rightText="info.name" @click="edit('更改姓名', 'name')">
				<template class="footer" slot="footer">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.name }}</view>
				</template>
			</uni-list-item>
		    <uni-list-item title="手机号" :rightText="info.phoneNumber" @click="edit('更改手机', 'phoneNumber')">
				<template class="footer" slot="footer">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.phoneNumber }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list class="uni-list">
		    <uni-list-item title="职称" :rightText="info.professionalTitle">
				<template class="footer" slot="footer">
					<picker class="picker" @change="ChangeProfessionalTitle" :value="professionalTitleindex" :range="professionalTitleArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ professionalTitleArray[professionalTitleindex] }}</view>
					</picker>
				</template>
			</uni-list-item>
		    <uni-list-item title="层级" :rightText="info.tier">
				<template class="footer" slot="footer">
					<picker class="picker" @change="ChangeTier" :value="tierindex" :range="tierArray">
						<view class="text"><text class="iconfont icon-xiangyou"></text>{{ tierArray[tierindex] }}</view>
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
		    <uni-list-item title="工号" :rightText="info.jobNumber" @click="edit('更改工号', 'jobNumber')">
				<template class="footer" slot="footer">
					<view class="text"><text class="iconfont icon-xiangyou"></text>{{ info.jobNumber }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list class="uni-list switch-list">
		    <uni-list-item>
				<template class="header" slot="header">
					<view class="text">是否管理员</view>
				</template>
				<template slot="footer">
					<switch @change="switchAdministrator" />
				</template>
			</uni-list-item>
		</uni-list>
		<view class="remind">开启后，该成员可以帮助您管理科室。</view>
		<button class="deleteBtn" @click="deleteUser">删除成员</button>
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
					name: '孙时',
					id: 201003,
					phoneNumber: '15201367242',
					professionalTitle: '副主任护师',
					tier: 'N4',
					seniority: 8,
					permission: '管理员',
					jobNumber: '20193453',
					education: '本科'
				},
				professionalTitleindex: 0,
				tierindex: 0,
				seniorityIndex: 0,
				educationIndex: 0,
				switch: false,
				professionalTitleArray: ['主任护师', '副主任护师', '主管护师', '护师', '护士', '其他'],
				tierArray: ['无', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5'],
				educationArray: ['高中及以下', '中专', '大专', '本科', '硕士', '博士'],
				seniorityArray: [],
				editInfoTitle: '', // 弹窗标题名
				inputTarget: '', // 输入的key
				inputValue: '', // 输入的value
			};
		},
		mounted () {
			for (let i = 0; i <= 60; i++) {
				this.seniorityArray.push(i)
			}
		},
		methods: {
			edit(title, key) {
			  this.editInfoTitle = title;
			  this.inputTarget = key;
			  this.$refs.popup.open();
			},
			save() {
			  this.info[this.inputTarget] = this.inputValue;
			  this.inputValue = '';
			  this.$refs.popup.close();
			},
			ChangeProfessionalTitle (e) {
				this.professionalTitleIndex = e.detail.value
			},
			ChangeTier (e) {
				this.tierIndex = e.detail.value
			},
			ChangeSeniority (e) {
				this.seniorityIndex = e.detail.value
			},
			ChangeEducation (e) {
				this.educationIndex = e.detail.value
			},
			switchAdministrator (e) {
				this.switch = e.detail.value
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
