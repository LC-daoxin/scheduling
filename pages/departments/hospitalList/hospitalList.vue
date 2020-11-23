<template>
	<view>
		<uni-search-bar :radius="100" placeholder="若无医院信息,请输入所在医院信息查找" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		<uni-list>
		    <uni-list-item  v-for="(item,index) in list" :key="index" :title="item.name"></uni-list-item>
		</uni-list>
		<button class="bottomBtn" @click="addHospital">没有我所在的医院，手动填写</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					id: 1001,
					name: '华北电力大学医院'
				},{
					id: 1002,
					name: '北京市朝阳区大屯医院'
				},{
					id: 1003,
					name: '北京朝阳三环肿瘤医院'
				},{
					id: 1004,
					name: '北京市昌平区医院'
				},{
					id: 1005,
					name: '北京和谐医院'
				},{
					id: 1006,
					name: '北京卫人医院'
				},{
					id: 1007,
					name: '北京大学第三医院'
				},{
					id: 1008,
					name: '首都医科大学附属北京天坛医院'
				},{
					id: 1009,
					name: '北京市中关村医院'
				},{
					id: 1010,
					name: '北京妇产医院'
				},{
					id: 1011,
					name: '北京市宣武中医医院'
				},{
					id: 1012,
					name: '首都医科大学附属宣武医院'
				},{
					id: 1013,
					name: '北京协和医院'
				},{
					id: 1014,
					name: '北京协和医院东院'
				},{
					id: 1015,
					name: '北京协和医院西院'
				},{
					id: 1016,
					name: '中日友好医院'
				},{
					id: 1017,
					name: '民航总医院'
				}],
				
				searchStatus: false // 搜索状态
			};
		},
		methods: {
			search (e) {
				console.log('search', e)
			},
			input (e) {
				console.log('input', e)
				if (e.value.trim() !== '') {
					this.searchStatus = true;
				}
			},
			cancel (e) {
				console.log('cancel', e)
			},
			// 添加医院
			addHospital () {
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg-color;
		$text-color: #666;
		.bottomBtn {
			padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
			padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
			background-color: $base-color;
			border-radius: 0;
			color: #fff;
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
