/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 全局变量配置
 */
module.exports = {
  // 缓存路由的最大数量
  keepAliveMaxNum: 99,
  // token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "lite-manage",
  // 是否显示在页面高亮错误
  errorLog: ["development", "test", "production"],
  // 项目标题
  title: "lite-manage",
  // 加载时显示文字
  loadingText: "正在加载中...",
  // 消息框消失时间
  messageDuration: 3000,




};
