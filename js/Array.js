;(function(){
	
//	数组去重	
	Array.prototype.distinct = function(){
		var newArr = [],
			obj = {},
			i=0,
			len=this.length;
		for(i=0;i<len;i++ ){
			if( !obj[this[i]] ){
				newArr.push(this[i]);
				obj[this[i]]='x';
			}
		}
		return newArr;
	}		
	
//	数组里元素的个数
	Array.prototype.count=function(){
		var obj={},
			i=0,
			len=this.length;
		for( i = 0; i < len; i++ ){
			var t =this[i];
//					if( !obj[this[i]] ){
//						obj[this[i]]=1;
//					}else{
//						obj[this[i]]+=1;
//					}
			obj[this[i]] = !obj[this[i]] ? 1 : (obj[this[i]]+1);
		}
		return obj;
	}
	
//	求数组的最大值
	Array.prototype.max = function(){
		var max=this[0];
			i=0,
			len=this.length;
		for(i=0;i<len;i++){
//					if(max<this[i]){
//						max = this[i]
//					}
			max = max < this[i] ? this[i] : max;
		}
		return max;
	}
	
	//	求数组的最小值
	Array.prototype.min = function(){
		var min=this[0];
			i=0,
			len=this.length;
		for(i=0;i<len;i++){
//					if(min>this[i]){
//						min = this[i]
//					}
			min = min > this[i] ? this[i] : min;
		}
		return min;
	}
})();
	
//	数组的排序 从小到大
function minMaxSort(a,b){
	return a - b;
}
//	数组的排序 从大到小
function maxMinSort(a,b){
	return b - a;
}



