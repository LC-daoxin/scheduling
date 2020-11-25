<template>
	<view class="activity">
		<view class="activity-body">
			<view class="activity-title">{{ title }}</view>
			<view class="activity-content">
				<u-swiper class="act-swiper" :list="list" :effect3d="true" bg-color="#ecf3f8"></u-swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				list: [
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/737195d0-2eee-11eb-8ff1-d5dcf8779628.png',
						title: ''
					},
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/75900900-2eee-11eb-bd01-97bc1429a9ff.png',
						title: ''
					},
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/74e06810-2eee-11eb-8ff1-d5dcf8779628.png',
						title: ''
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.activity {
		padding: 8px 0;
		&-body {
			font-size: 16px;
			// padding: 10px 20px 1px;
			background-color: rgb(248, 248, 248);
			// border-radius: 10px;
			.activity-title {
				font-size: 18px;
				font-weight: 400;
			}
			.activity-content {
				.act-swiper {
					width: 100%;
				}
			}
		}
	}
</style>
