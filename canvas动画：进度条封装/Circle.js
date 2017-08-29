;(function(){
	function Circle(selector,setting){
				
				var direction = {//	四个方向需要对应的值
					'right'  : 0,
					'left'   : Math.PI,
					'top'    : -Math.PI/2,
					'bottom' : Math.PI/2
				}
				
				var defaultsetting = {
					maxX:88,
					frontColor:"#ff0000",   // 前景色 默认是红色 
					backgroundColor:"#999", // 背景色 默认是灰色
					fontsize:20,			//	字体大小
					startDirection : 'right',//	开始方向
					linewidth: 10,//	线宽
				}
			
				if(setting){
					for(var p in defaultsetting){
						if(setting[p] != undefined){
							defaultsetting[p]=setting[p];
						}
					}
				}
				
				var circle
				if(typeof selector == 'string'){
					circle = document.querySelector(selector);
				}else{
					circle = selector;
				}
//				
//				var circle = document.querySelector(selector);
				
				var w = circle.offsetWidth;
				var o = {
					x : w/2,
					//	圆心的x坐标在画布的中间
					y : w/2,
					//	圆心的y坐标在画布的中间					
					r : w/2-defaultsetting.linewidth
					//圆心坐标    w/2-defaultsetting.linewidth  不超出画布  所以圆半径要减 线宽
				};
				

				var can = document.createElement("canvas");//创建一个canvas
				can.setAttribute('width',w+'px');
				can.setAttribute('height',w+'px');
				circle.appendChild(can);
				
				var startPoint = direction [defaultsetting.startDirection] || 0;
				
				
				var ctx = can.getContext("2d");//设置画布
				var x = 0; //	当前的百分比值   既从百分之多少开始
				var maxX = defaultsetting.maxX//	最大值为 100
				var y = 0;//	
				
				var timer = setInterval(function(){
					x++;//	当前百分比值 自增
					if( x >= maxX ){//	百分比值不超过 最大值
						clearInterval(timer);
					}
					y = startPoint + 2*Math.PI * x / 100;	//	起始角度
					ctx.clearRect(0,0,w,w);//	在给定矩形内清空一个矩形：  x轴坐标   y轴坐标   width  height    w 画布的宽
					ctx.lineWidth = defaultsetting.linewidth;//	线条的粗细
					ctx.beginPath();//	起始一条路径，或重置当前路径    定义路径
					ctx.strokeStyle=defaultsetting.frontColor;//	前景色线条颜色
					
					ctx.arc(o.x,o.y,o.r,startPoint,y);//	前景色	起始角 0 就是 3 点钟方向   
	//		公式：X%   	ctx.arc(100,100,80,0,2*Math.PI * X / 100);     随着 x 的自增   这个弧度会越来越完整  直到 x >= maxX 时才会停下
	//			圆的中心点的 X 坐标, 圆的中心点的 Y 坐标,  圆的半径, 圆的起始角,  圆的结束角,  最后还可以添加 顺逆时针的绘制   false： 顺,  true: 逆  
					ctx.stroke();//  绘制已定义的路径
					
					ctx.beginPath();//定义新的路径
					ctx.strokeStyle=defaultsetting.backgroundColor;//	线条色
					ctx.arc(o.x,o.y,o.r,y,2*Math.PI+startPoint);				
					ctx.stroke();//  绘制已定义的路径
					
					ctx.textAlign = 'center';//ctx.textAlign 文本对齐方式   居中
					ctx.font="20px 微软雅黑";
					ctx.textBaseline = "middle";//	垂直居中
					ctx.fillText(x+'%',o.x,o.y);
					
	//	这里说明一下   为什么前景色的终点 = 后景色的起点    前景色不断的画  后景色也需要不断的更新  当前景色滑到 50% 时 后景色应该  从50%开始画
				},1000/25);
			}
			
			window.Circle = Circle;
			
})();

//	以下是  jQuery 里面可以使用的调用方法
//$(function(){
//	
//		$(".item-3").each(function(index,ele){				
//			new Circle(
//				ele,{
//					linewidth:2,maxX: ele.getAttribute("data-number") }
//				);
//			console.info(index,ele)
//			
//		})
//		
//		
////			new Circle(".item-1",{
////			maxX:40,			    //默认的百分比的进度 88%
////			fontsize:16,			//默认字的大小
////			linewidth:2,			//线条的粗细
////		});
//});