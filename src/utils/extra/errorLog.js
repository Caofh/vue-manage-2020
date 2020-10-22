import Vue from "vue";
import store from "@/store";
import { isArray, isString } from "@/utils/extra/validate";
import { errorLog } from "@/config/settings";

const needErrorLog = errorLog;
const checkNeed = () => {
  const env = process.env.NODE_ENV;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
};
if (checkNeed()) {
  Vue.config.errorHandler = (err, vm, info) => {
    console.error("lite-manage错误拦截:", err, vm, info);
    const url = window.location.href;
    Vue.nextTick(() => {
      store.dispatch("errorLog/addErrorLog", { err, vm, info, url });
    });
  };
}