import Dictionary from "../../utils/Dictionary";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-06
 * @modify date 2017-11-06
 *
 * 定义一个依赖，一个观察者实现
*/
var Dep = /** @class */ (function () {
    function Dep() {
        this._map = new Dictionary();
    }
    /**
     * 添加数据变更订阅者
     * @param watcher 数据变更订阅者
     */
    Dep.prototype.watch = function (watcher) {
        this._map.set(watcher, watcher);
    };
    /**
     * 数据变更，通知所有订阅者
     * @param extra 可能的额外数据
     */
    Dep.prototype.notify = function (extra) {
        this._map.forEach(function (watcher) {
            watcher.update(extra);
        });
    };
    return Dep;
}());
export default Dep;
