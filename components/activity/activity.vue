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
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/457dc0b0-296f-11eb-899d-733ae62bed2f.jpg',
						title: ''
					},
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/462fd2a0-296f-11eb-8a36-ebb87efcf8c0.jpg',
						title: ''
					},
					{
						image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/457dc0b0-296f-11eb-899d-733ae62bed2f.jpg',
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
