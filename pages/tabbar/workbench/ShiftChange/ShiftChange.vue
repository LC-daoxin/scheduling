<template>
	<request-list :label-config="shiftChange" :list="requestList" :url="requestUrl"></request-list>
</template>

<script>
import RequestList from '@/components/RequestList.vue'
import {
	shiftChange
} from '@/utils/requestListConfig.js'

export default {
	name: 'Overtime',
	data() {
		return {
			shiftChange,
      requestUrl: '/pages/tabbar/workbench/ShiftChange/ShiftChangeRequest',
			requestList: [
				{
					status: 0,
					requestTime: '11-30 10:45',
					sourceClass: '',
          newClass: '',
          changeDate: '2020-12-01'
				}
			]
		};
	},
	components: {
		RequestList
	}
};
</script>

<style lang="scss" scoped>
.overtime {
	height: calc(100vh - 10rem);
	padding: 1em 1em 2em;
	overflow: hidden auto;

	.button-container {
		position: absolute;
		width: calc(100vw - 2rem);
		bottom: 1rem;
	}

	.nav-item + .nav-item {
		margin-top: 0.5rem;
	}
}

::v-deep .request-status {
	margin-left: 0;
}
</style>
