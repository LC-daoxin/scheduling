<template>
	<div class="request-list">
		<navigator
			class="nav-item"
			:url="url"
			v-for="(item, index) of list"
			:key="index"
		>
			<request-item :dataArr="item">
				<view v-for="(param, key, paramIndex) in labelConfig" :key="paramIndex" class="request-item-content">{{ param }}：{{ item[key] }}</view>
			</request-item>
		</navigator>
		<div class="button-container">
			<navigator :url="url">
				<button class="button button--primary">申请</button>
			</navigator>
		</div>
	</div>
</template>

<script>
	import RequestItem from '@/components/request-item/RequestItem.vue';
	
	export default {
		props: {
			labelConfig: Object,
			list: Array,
			url: String
		},
		components: {
			RequestItem
		}
	}
</script>

<style lang="scss" scoped>
.request-list {
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
