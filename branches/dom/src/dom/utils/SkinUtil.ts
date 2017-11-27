import IMediator from "engine/mediator/IMediator";
import { assetsManager } from "engine/assets/AssetsManager";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-26
 * @modify date 2017-10-26
 * 
 * 为DOM提供皮肤转换的工具集
*/
/**
 * 为中介者包装皮肤
 * 
 * @export
 * @param {IMediator} mediator 中介者
 * @param {(HTMLElement|string|string[])} skin 皮肤，可以是HTMLElement，也可以是皮肤字符串，也可以是皮肤模板地址或地址数组
 * @returns {HTMLElement} 皮肤的HTMLElement形式，可能会稍后再填充内容，如果想在皮肤加载完毕后再拿到皮肤请使用complete参数
 */
export function wrapSkin(mediator:IMediator, skin:HTMLElement|string|string[]):HTMLElement
{
    var result:HTMLElement;
    if(skin instanceof HTMLElement)
    {
        result = skin;
    }
    else
    {
        // 生成一个临时的div
        result = document.createElement("div");
        // 篡改mediator的onOpen方法，先于onOpen将皮肤附上去
        var oriFunc:any = mediator.hasOwnProperty("onOpen") ? mediator.onOpen : null;
        mediator.onOpen = function(...args:any[]):void
        {
            if(skin instanceof Array)
            {
                // 是数组，将所有内容连接起来再一起赋值
                skin = skin.map(getContent).join("");
            }
            // 赋值皮肤内容
            result.innerHTML = <string>skin;
            // 使用正则表达式将拥有id的节点赋值给mediator
            var reg:RegExp = /id=("([^"]+)"|'([^']+)')/g;
            var res:RegExpExecArray;
            while(res = reg.exec(<string>skin))
            {
                var id:string = res[2] || res[3];
                mediator[id] = result.querySelector("#" + id);
            }
            // 恢复原始方法
            if(oriFunc) mediator.onOpen = oriFunc;
            else delete mediator.onOpen;
            // 调用原始方法
            mediator.onOpen.apply(this, args);
        };
    }
    // 赋值皮肤
    mediator.skin = result;
    // 同步返回皮肤
    return result;
}

function getContent(skin:string):string
{
    if(skin.indexOf("<") >= 0 && skin.indexOf(">") >= 0)
    {
        // 是皮肤字符串，直接返回
        return skin;
    }
    else
    {
        // 是皮肤路径或路径短名称，获取后返回
        return assetsManager.getAssets(skin);
    }
}