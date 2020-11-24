<template>
	<view>
		<u-alert-tips type="warning" :show-icon="true" :description="description"></u-alert-tips>
		<uni-list>
		    <uni-list-item title="所属医院" link to="/pages/departments/hospitalList/hospitalList"  :rightText="info.hospitalName" @click="selectHospital()" ></uni-list-item>
		    <uni-list-item title="所属科室" link to="/pages/departments/hospitalList/hospitalList"  :rightText="info.departmentName" @click="selectHospital()" ></uni-list-item>
		    <uni-list-item title="科室名称" link to="/pages/departments/hospitalList/hospitalList"  :rightText="info.officeName" @click="selectHospital()" ></uni-list-item>
		    <uni-list-item title="创建者" :rightText="info.creatorName"></uni-list-item>
		    <uni-list-item title="编号" :rightText="info.creatorId"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					hospitalName: '首都医科大学附属宣武医院',
					departmentName: '心血管内科',
					officeName: '心血管内科',
					creatorName: '赵易',
					creatorId: '201001'
				},
				description: '仅创建者和管理员可以修改科室名称和所属医院。'
			};
		},
		methods: {
			// 选择医院
			selectHospital () {
			}
		}
	}
</script>

<style lang="scss">

</style>
