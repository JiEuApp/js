        window.onload = function() {

            setTimeout(function e() {
                var btn = ['退出', '<span style="font-weight: bold;color: #e7534d">同意</span>'];

                mui.confirm(
                    '<hr class="style-two" style="height: 3px"/><p style="height:8px;"></p><div style="text-align: left;margin-left: 3px;font-size: 13px;color: #888">欢迎使用 “弥漫之夜” APP，我们非常重视您的个人信息和隐私保护，在您使用“弥漫之夜”服务之前，请您务必审慎阅读《<a href="javascript:;" id="zc" class="txt2" style="font-size: 12px;color: #888;"><u style="color: #01aaed">隐私政策</u></a>》和《<a href="javascript:;" id="xy" class="txt2" style="font-size: 12px;color: #888"><u style="color: #01aaed">用户协议</u></a>》，并充分理解协议条款内容。我们将严格按照您同意的各项条款使用您的个人信息，以便为您提供更好的服务。</div>',
                    '<span style="color: #666;font-size: 20px;font-weight: bold"><b>用户协议和隐私政策</b></span>', btn,
                    function(e) {

                        if (e.index == 0) {
                            api.closeWidget({});
                        }
                    }, 'div')
            }, 3000);
        }

        $('#QQ').click(function(event) {
            setTimeout(function e() {
                mui.toast('QQ启动中，稍等...')
            }, 1000);
            setTimeout(function e() {
                mui.toast('QQ启动中，11%...')
            }, 1200);
            setTimeout(function e() {
                mui.toast('QQ启动中，17%...')
            }, 1400);
            setTimeout(function e() {
                mui.toast('QQ启动中，23%...')
            }, 1600);
            setTimeout(function e() {
                mui.toast('QQ启动中，29%...')
            }, 1800);
            setTimeout(function e() {
                mui.toast('QQ启动中，35%...')
            }, 2000);
            setTimeout(function e() {
                mui.toast('QQ启动中，41%...')
            }, 2200);
            setTimeout(function e() {
                mui.toast('QQ启动中，48%...')
            }, 2400);
            setTimeout(function e() {
                mui.toast('QQ启动中，54%...')
            }, 2600);
            setTimeout(function e() {
                mui.toast('QQ启动中，60%...')
            }, 2800);
            setTimeout(function e() {
                mui.toast('QQ启动中，72%...')
            }, 3000);
            setTimeout(function e() {
                mui.toast('QQ启动中，84%...')
            }, 3200);
            setTimeout(function e() {
                mui.toast('QQ启动中，99%...')
            }, 3400);
            setTimeout(function e() {
                mui.toast('未获取到AccessToken，绑定失败')
            }, 7000);
        })

        $('#xy').click(function() {
            var btn = ['退出', '<span style="font-weight: bold;color: #e7534d">同意</span>'];

            mui.confirm(
                '<hr class="style-two" style="height: 3px"/><p style="height:8px;"></p><p style="text-align: left;margin-left: 3px;font-size: 13px;color: #888"><b>一、</b>我们可能会申请设备权限收集设备信息、日志信息，用于信息推送和安全风控，并申请存储权限，用于下载及缓存相关。<br><b>二、</b>我们可能会申请位置权限，用于帮助您在发布的信息中展示位置或丰富信息推荐维度。<br><b>三、</b>上述权限以及摄像头、麦克风、相册。存储空间、GPS等敏感权限均不会默认或强制开启收集信息。<br><b>四、</b>未经您同意，我们不会出售或出租您的任何信息。<br><b>五、</b>您可以访问、更正、删除个人信息，我们也提供账户注销、投诉方式。</p>',
                '<span style="color: #666;font-size: 20px;font-weight: bold"><b>服务协议</b></span>', btn,
                function(e) {

                    if (e.index == 0) {
                        api.closeWidget({});
                    }
                }, 'div');
        });

        $('#zc').click(function() {
            var btn = ['退出', '<span style="font-weight: bold;color: #e7534d">同意</span>'];

            mui.confirm(
                '<hr class="style-two" style="height: 3px"/><p style="height:8px;"></p><p style="font-size: 13px;color: #888">本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私政策属于本应用服务使用协议不可分割的一部分。</p>',
                '<span style="color: #666;font-size: 20px;font-weight: bold"><b>隐私政策</b></span>', btn,
                function(e) {

                    if (e.index == 0) {
                        api.closeWidget({});
                    }
                }, 'div');
        });
