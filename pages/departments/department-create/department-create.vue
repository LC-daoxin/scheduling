<template>
	<view>
		<uni-list>
		    <uni-list-item link to="/pages/departments/hospitalList/hospitalList"  :rightText="info.hospitalName" @click="selectHospital()" >
				<template slot="header">
					<text class="title">所属医院</text><text class="red">*</text>
				</template>
			</uni-list-item>
		    <uni-list-item link to="/pages/departments/department-select/department-select"  :rightText="info.departmentName" @click="selectHospital()" >
				<template slot="header">
					<text class="title">所属科室</text><text class="red">*</text>
				</template>
			</uni-list-item>
		    <uni-list-item>
				<template slot="header">
					<text class="title">科室名称</text><text class="red">*</text>
				</template>
				<template slot="footer">
					<input class="uni-input" placeholder-style="text-align: right" placeholder="输入科室名称" />
				</template>
			</uni-list-item>
		    <uni-list-item>
				<template slot="header">
					<text class="title">您的姓名</text><text class="red">*</text>
				</template>
				<template slot="footer">
					<input class="uni-input" placeholder-style="text-align: right" placeholder="输入您的姓名" />
				</template>
			</uni-list-item>
		</uni-list>
		<button class="createBtn" @click="create">创建科室</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					hospitalName: '',
					departmentName: '',
					officeName: '',
					creatorName: ''
				}
			};
		},
		methods: {
			create () {},
			selectHospital () {}
		}
	}
</script>

<style lang="scss">
	.uni-input {
		text-align: right;
	}
	.title {
		font-size: 28rpx;
	}
	.red {
		display: inline-block;
		color: red;
		vertical-align: top;
	}
	.createBtn {
		width: 90%;
		margin-top: 30rpx;
		background-color: $base-color;
		color: #fff;
	}
</style>
