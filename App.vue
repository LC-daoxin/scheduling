<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.authorize({
			    scope: 'scope.userInfo',
			    success(res) {
					console.log(res)
					uni.getUserInfo({
						provider: 'weixin',
						success: function (infoRes) {
							console.log('用户昵称为：' + infoRes.userInfo.nickName);
						}
					});
			    }
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	page {
		background-color: $bg-color;
		$text-color: #666;
	}
</style>
