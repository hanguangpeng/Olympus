/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-17
 * @modify date 2017-10-17
 * 
 * UI工具集
*/

/**
 * 包装EUI的DataGroup组件，使用传入的处理函数处理每个渲染器更新的逻辑
 * 
 * @export
 * @param {eui.DataGroup} group 被包装的DataGroup组件
 * @param {(data?:any, renderer?:any)=>void} rendererHandler 渲染器处理函数，每次数据更新时会被调用
 */
export function wrapEUIList(group:eui.DataGroup, rendererHandler:(data?:any, renderer?:any)=>void):void
{
    group.itemRenderer = ItemRenderer.bind(null, group.itemRendererSkinName, rendererHandler);
}

class ItemRenderer extends eui.ItemRenderer
{
    private _rendererHandler:(data?:any, renderer?:any)=>void;

    public constructor(skinName:any, rendererHandler:(data?:any, renderer?:any)=>void)
    {
        super();
        this.skinName = skinName;
        this._rendererHandler = rendererHandler;
    }

    protected dataChanged(): void
    {
        super.dataChanged();
        this._rendererHandler(this.data, this);
    }
}