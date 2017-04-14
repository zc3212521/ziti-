var storage = window.localStorage;

function SearchHistory(keyname) {
  this.keyname = keyname;
  this.list = getSearchHistory(keyname);
  this.maxsize = 30;
}

SearchHistory.prototype.getSearchHistory = function() {
  return this.list;
};

/**
 * 将查询历史保存到localStorage中
 * @param {list} his 查询历史数组
 */
SearchHistory.prototype.setSearchHistory = function(his) {
  if (!storage) {
    console.error('This browser does NOT support localStorage');
    return;
  }

  var strHis = JSON.stringify(his); 
  // console.info(strHis);
  //存入 
  storage[this.keyname] = strHis;
};

/**
 * 清空查询历史
 * @return 无
 */
SearchHistory.prototype.clearSearchHistory = function() {
  this.list = [];
  this.setSearchHistory([]);
};

/**
 * 删除单条查询历史
 * @param  {[type]} item [description]
 * @return 无
 */
SearchHistory.prototype.removeSearchHistory = function(item) {
  var index = this.list.indexOf(item);
  if (index >= 0) {
    this.list.splice(index, 1);
    this.setSearchHistory(this.list);
  }
};

/**
 * 增加搜索历史，如果要搜索的关键字已经存在于搜索历史中，则将要该关键字提升到最近搜索
 * @param {String} keyword 搜索词
 */
SearchHistory.prototype.addSearchHistory = function(keyword) {
  var index = this.list.indexOf(keyword);
  if (index >= 0) {
    this.list.splice(index, 1);
    // this.setSearchHistory(this.list);
  }
  
  this.list.unshift(keyword);
  // console.info(this.list.join());
  if(this.list.length >= this.maxsize){
	  this.list.pop();
  }
  this.setSearchHistory(this.list);
  
};

/**
 * 从localStorage中获取查询历史
 * @return {List} 查询历史数组
 */
function getSearchHistory(keyname) {
  if (!storage) {
    console.error('This browser does NOT support localStorage');
    return;
  }
  if (!keyname) {
    keyname = "searchHistory";
  }
  var strHis = storage[keyname];
  // console.info(strHis);
  if (strHis) {
    //重新转换为对象 
    return JSON.parse(strHis);
  } else {
    return [];
  }
}

module.exports = SearchHistory;