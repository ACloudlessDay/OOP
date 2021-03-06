;(function(){
	function Slider(selector,setting){//	配置默认参数
				var defaultSetting = {
					speed:2000,
					isautoplay:true,
					startIndex:1,
					istxt:true
				};
				
			//	以下这段代码的作用：   如果 用户设置了参数就采用用户设置的参数，如果用户没有设置参数就用 默认参数
				if(setting){//	setting 参数对应你传入的对象   只有你有值的话才会进行判断    undefined 是 false 也就不会进入 if 判断				
					for(var p in  defaultSetting){//	for...in...  找出   defaultSetting 对象里面的所有属性
						if( setting[p] != undefined ){//	判断你传入的对象里面的属性  是否都是有值的	
							defaultSetting[p] = setting[p];//如果有 则修改 默认配置的参数既达到 如果有设置则用设置的没有则用默认的
						}
					}
				}
				this.speed = defaultSetting.speed				//	每隔speed播放一张
				this.isautoplay = defaultSetting.isautoplay;  	//	是否自动播放
				this.currentIndex = defaultSetting.startIndex	//	当前是第几张图
				this.istxt = defaultSetting.istxt;				//	是否需要文字域
				
				
				this.slider = document.querySelector(selector);//	将 .slider 传入

				this.num = this.slider.querySelectorAll("li").length ;//没有各加一张图之前的 图片的张数
				this.w  = this.slider.offsetWidth; //每张图的基本宽度
				
				
				this.addNode(); //前面各加一张图
				this.addIndirector();//	调用动态生成 span
				this.addBtns();//	调用创建按钮
				this.addTxt();//	调用动态生成文本域
			//	this.autoPlay();//	配置参数时，因为如果用户选择 false 的话 就不能再调用这个方法  所有 丢到下面的  是否判断里面
				

				this.timer = 0;//	定时器
			
				if( this.isautoplay == true){//	判断是否需要轮播
					this.slider.addEventListener("mouseenter",function(){//	鼠标移入暂停
						that.pause();//	暂停
					});
					this.slider.addEventListener("mouseleave",function(){//	鼠标移出开启
						that.autoPlay();//	自动播放
					});
					this.autoPlay();//	自动播放轮播图
				}
				
				
				this.isMoving = false;//	用来判断是否正在进行动画
				
				
				//this.currentIndex = 1; //当前是第几张图	//	上面设置了参数	//	因为设置了startIndex 所有注释掉
	
				//整体的图片容器 ul的宽度是  (this.num + 2)*w
				this.ul = this.slider.querySelector("ul");//   获取页面上的 ul 元素 	
//				console.log(this.ul);	
				this.ul.style.width = this.w * (this.num+2) +"px";//	设置 ul 元素的整体宽度  num + 2  是因为前后各加了两张图片
				
				var that = this;//	缓存 this
				
				this.ul.addEventListener("transitionend",function(){//	过渡动画结束时 调用函数
//					console.info("动画结束....");
					//获取当前的图片的索引：即当前是第几张？
//					console.info(that, that.currentIndex);
					
					if(that.currentIndex == 0){//	如果当前图片的 张数 等于 0 
						
						//当前是第0张时，直接拉到第n张的位置 
						//不要有过渡动画过过程：把动画的时间设置为0
						that.ul.style.transitionDuration = '0s';//	取消过渡动画
						that.ul.style.transform = "translateX("+ -that.w* that.num  +"px)";//	快速拉回到 that.num 张图片处						
						that.currentIndex = that.num;//	更新当前的图片张数
					}
					else if( that.currentIndex == that.num + 1){//	如果 当前的图片张数等于第  that.num + 1 张图片的时候  
						that.ul.style.transitionDuration = '0s';//	取消过渡动画
						that.ul.style.transform = "translateX("+ -that.w* 1  +"px)";//当前是第n+1张时，直接拉到第1张的位置						
						that.currentIndex = 1;//	更新当前的图片张数
						
					}
					
					that.isMoving = false;//	判断动画完成没  false 为完成
				});
			
//				this.slider.querySelector(".btnleft").addEventListener("click",function(){//	监听左按钮的点击事件					
//					that.prev();//	执行上一张 的方法
//				});
//				this.slider.querySelector(".btnright").addEventListener("click",function(){//	监听右按钮的点击事件	
//					that.next();//	执行下一张 的方法
//				})
				
				this.spans = this.slider.querySelectorAll(".indirector span");//	获取到页面上所有的 span
				this.goto( this.currentIndex );//	移动到第几张图
			}
			Slider.prototype = {
				constructor:Slider,//	重置构造器
				
				addNode:function(){//	给 ul 添加 两张图片
					var ul = this.slider.querySelector("ul");//	获取到页面上的 ul
//					console.info(ul);
					//把第一个li找到，复制一份，加入到最后
					var lis  = ul.querySelectorAll("li");//	有效图片的集合    有效图片的意思是  不算前后各添加的图片
					var firstLi = ul.querySelectorAll("li")[0];//	有效图片的集合里面的第一张
					var firstLiClone = firstLi.cloneNode(true);//	深克隆 有效图片里面的第一张
					console.info(firstLiClone);
					ul.appendChild(firstLiClone);//appendChild 是在最后一个子元素的后面再加入 到ul中
					
					//把最后一个li找到，复制一份，加入到最前面
					var lastLi  = ul.querySelectorAll("li")[lis.length-1];//	有效图片的集合里面的最后张
					var lastLiClone = lastLi.cloneNode(true);//	深克隆 有效图片里面的最后张				
					ul.insertBefore(lastLiClone,firstLi);//在父结点ul中找到firstLi，然后在前面插入lastLiClone
				},
				
				addBtns:function(){//	创建两个按钮
					var that = this;
					var btnLeft = document.createElement('span');//	创建 左按钮
					btnLeft.className = 'btn btnleft';//	给左按钮添加 类名
					
					var btnRight = document.createElement('span');//	创建 右按钮
					btnRight.className = 'btn btnright';//	给右按钮添加 类名
					
					this.slider.appendChild(btnLeft);//	将左按钮添加到页面上
					this.slider.appendChild(btnRight);//	将右按钮添加到页面上
					
					btnLeft.addEventListener('click',function(){//	给左按钮添加 点击事件监听
						that.prev();//	点击后执行 上一张 方法
					});
					btnRight.addEventListener('click',function(){//	给右按钮添加 点击事件监听
						that.next();//	点击后执行 下一张 方法
					});
				},
				
				addTxt:function(){//	动态创建文字域
					var div = document.createElement('div');
					div.className = 'txt';
					div.innerHTML = '<p></p>';
					this.slider.appendChild(div);
				},
				
				addIndirector:function(){//	创建 span 元素 并添加到页面
					var div = document.createElement('div');//	创建一个 div
					div.className = 'indirector';//	设置其 className
					for(var i=0;i<this.num;i++){//	循环 图片的数量
						var span = document.createElement('span');//循环一次创建一个span元素
						div.appendChild(span);//	将span元素添加到前面创建的 div 元素里
					//实现指示条上鼠标hover就进行页面的跳转
						span.index = i;//	自定义属性	i 为真正有效图片的数量   也就是6
						var that = this;//	缓存this
						span.addEventListener('mouseenter',function(){//	监听鼠标移上事件
//							console.log(this.index);	
							that.goto(this.index+1);//	为什么 index+1  因为下面的 标示    比图片整体上少两个  标示为 0 时图片要显示 1
						});
					}
					this.slider.appendChild(div);//	将 div 元素添加到到 slider 里面
				},
				
//				autoPlay:function(){//	自动播放
//					var that = this;
//					that.timer = setInterval(function(){
//						that.next();//	调用 下一张方法
//					},2000)					
//				},
//				
//				pause:function(){
//					clearInterval(this.timer);
//				},
				autoPlay:function(){
					var that = this;
					that.timer = setInterval(function(){
						that.next();
					},this.speed);
				},
				pause:function(){
					clearInterval ( this.timer);
				},
				
				goto:function(yourIndex){
//					通过移动ul,把第yourIndex张显示出来
//					2.动画的原理是：不断更新transform:translateX(值)
//					   第1张 ：transform:translateX(-w*1)
//					   第2张 ：transform:translateX(-w*2)
//					   第3张 ：transform:translateX(-w*3)
				//	判断是否正在进行动画
					if( this.isMoving == true ){
//						console.log('动画未完成，忽略本次操作');
						return;
					}
					
					this.isMoving = true;//	为了下次 可以继续判断
					
					this.ul.style.transitionDuration = '.5s';//	给ul 添加一个0.5秒的 过渡动画
					this.ul.style.transform = "translateX("+ -this.w*yourIndex  +"px)";//	ul 的位移					 
					this.currentIndex = yourIndex;//	当前的 图片张数
					
				//	更新指示条的状态
					var y  = ( ( this.currentIndex -1) + this.num) % this.num;
//				当前的span的序号 = (  (当前图片的索引-1) + 图片数量)  %  图片数量
				    for(var i = 0; i<this.spans.length;i++){
				     	if(i === y){//	如果 i 全等于 当前图片的 序号 则
				     		this.spans[i].className = "current";//	选中
				     	}
				     	else{
				     		this.spans[i].className = "";//	没选中
				     	}
				    }
				    
				    //更新文字区域的内容
				    //获取当前达到图片的alt
				  	if( this.istxt){//	判断是否需要文字区域
				    	var t = this.ul.querySelectorAll('img')[yourIndex].alt;//	yourIndex 形参传入的值是当前图片的张数
				   	 	this.slider.querySelector('.txt p').innerHTML = t;//	当前的图片显示的内容  = 当前图片的 alt 里面的内容
				   	}
				    
				},
				prev:function(){//	上一张的方法
					console.info("上一张");					
					var t = this.currentIndex;//	t = 当前的图片张数				
					this.goto( t - 1 );//	点击时  当前图片序号 - 1
				},
				next:function(){//	下一张的方法
//					console.info("下一张");
					var t = this.currentIndex;//	t = 当前的图片张数					
					this.goto( t + 1 );//	点击时  当前图片序号 + 1
				}
				
			}
			
//			var s1 = new Slider(".slider1",{speed:2500,istxt:true,startIndex:4});//	创建一个构造器  其类名 为  .slider
//			var s1 = new Slider(".slider2",{isautoplay:false,startIndex:2});//	创建一个构造器  其类名 为  .slider
			
		//	console.info(s1)
		window.Slider = Slider;//	把slider暴露出去
})();
