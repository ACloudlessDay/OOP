;(function(){
	//取一个m 到  n之间的一个随机正数
	function r(m,n){ 
		//[m,n]
		var r1 = Math.random();//  [ 0 ,    1)
		var r2 = (n-m+1)*r1   ;//  [ 0, n-m+1)
		var r3 = m + r2       ;//  [ m, n+1  )
		var r4 = Math.floor(r3);// [ m,  n]
		return r4;
	}
	
	window.unit = {
		r:r
	};
	
})()
