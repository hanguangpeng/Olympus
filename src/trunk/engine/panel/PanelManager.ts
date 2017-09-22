import { core } from "../../core/Core";
import { Injectable } from "../../core/injector/Injector"
import IConstructor from "../../core/interfaces/IConstructor";
import IBridge from "../bridge/IBridge";
import IPanel from "./IPanel";
import IPanelPolicy from "./IPanelPolicy";
import none from "./NonePanelPolicy";
import PanelMessage from "./PanelMessage";
import IPromptPanel, { IPromptParams, IPromptHandler, ButtonType } from "./IPromptPanel";
import { sceneManager } from "../scene/SceneManager";

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 * 
 * 弹窗管理器，包含弹出弹窗、关闭弹窗、弹窗管理等功能
*/
@Injectable
export default class PanelManager
{
    private _panels:IPanel[] = [];

    /**
     * 获取当前显示的弹窗数组（副本）
     * 
     * @param {IConstructor} [cls] 弹窗类型，如果传递该参数则只返回该类型的已打开弹窗，否则将返回所有已打开的弹窗
     * @returns {IPanel[]} 已打开弹窗数组
     * @memberof PanelManager
     */
    public getOpened(cls?:IConstructor):IPanel[]
    {
        if(!cls) return this._panels.concat();
        else return this._panels.filter(panel=>panel.constructor==cls);
    }

    /**
     * 打开一个弹窗
     * 
     * @param {IPanel} panel 要打开的弹窗
     * @param {*} [data] 数据
     * @param {boolean} [isModel=true] 是否模态弹出
     * @param {{x:number, y:number}} [from] 弹出起点位置
     * @returns {IPanel} 返回弹窗对象
     * @memberof PanelManager
     */
    public pop(panel:IPanel, data?:any, isModel:boolean=true, from?:{x:number, y:number}):IPanel
    {
        if(this._panels.indexOf(panel) < 0)
        {
            var policy:IPanelPolicy = panel.policy || panel.bridge.defaultPanelPolicy || none;
            // 添加显示
            var bridge:IBridge = panel.bridge;
            bridge.addChild(bridge.panelLayer, panel.skin);
            // 调用回调
            panel.onBeforePop(data, isModel, from);
            // 派发消息
            core.dispatch(PanelMessage.PANEL_BEFORE_POP, panel, isModel, from);
            // 调用策略接口
            policy.pop(panel, ()=>{
                // 调用回调
                panel.onAfterPop(data, isModel, from);
                // 派发消息
                core.dispatch(PanelMessage.PANEL_AFTER_POP, panel, isModel, from);
            }, from);
            // 记录
            this._panels.push(panel);
        }
        return panel;
    }

    /**
     * 关闭一个弹窗
     * 
     * @param {IPanel} panel 要关闭的弹窗
     * @param {*} [data] 数据
     * @param {{x:number, y:number}} [to] 关闭终点位置
     * @returns {IPanel} 返回弹窗对象
     * @memberof PanelManager
     */
    public drop(panel:IPanel, data?:any, to?:{x:number, y:number}):IPanel
    {
        var index:number = this._panels.indexOf(panel);
        if(index >= 0)
        {
            var policy:IPanelPolicy = panel.policy || panel.bridge.defaultPanelPolicy || none;
            // 调用回调
            panel.onBeforeDrop(data, to);
            // 派发消息
            core.dispatch(PanelMessage.PANEL_BEFORE_DROP, panel, to);
            // 调用策略接口
            policy.drop(panel, ()=>{
                // 调用回调
                panel.onAfterDrop(data, to);
                // 派发消息
                core.dispatch(PanelMessage.PANEL_AFTER_DROP, panel, to);
                // 移除显示
                var bridge:IBridge = panel.bridge;
                bridge.removeChild(bridge.panelLayer, panel.skin);
                // 销毁弹窗
                panel.dispose();
            }, to);
            // 移除记录
            this._panels.splice(index, 1);
        }
        return panel;
    }

    /************************ 下面是通用弹窗的逻辑 ************************/

    private _promptDict:{[type:string]:IPromptPanel} = {};
    /**
     * 显示提示窗口
     * 
     * @param {string} msg 要显示的文本
     * @param {...IPromptHandler[]} handlers 按钮回调数组
     * @returns {IPanel} 返回被显示的弹窗
     * @memberof PanelManager
     */
    public prompt(msg:string, ...handlers:IPromptHandler[]):IPanel;
    /**
     * 显示提示窗口
     * 
     * @param {IPromptParams} params 弹窗数据
     * @returns {IPanel} 返回被显示的弹窗
     * @memberof PanelManager
     */
    public prompt(params:IPromptParams):IPanel;
    /**
     * @private
     */
    public prompt(msgOrParams:string|IPromptParams, ...handlers:IPromptHandler[]):IPanel
    {
        var params:IPromptParams;
        if(typeof msgOrParams == "string")
        {
            params = {
                msg: msgOrParams as string,
                handlers: handlers
            };
        }
        else
        {
            params = msgOrParams;
        }
        // 取到当前场景的类型
        var type:string = sceneManager.currentScene.bridge.type;
        // 用场景类型取到弹窗对象
        var prompt:IPromptPanel = this._promptDict[type];
        if(prompt == null)
        {
            // 没有找到当前模块类型关联的通用弹窗类型，改用系统弹窗凑合一下
            alert(params.msg);
            return;
        }
        // 增加默认值
        for(var i in params.handlers)
        {
            var handler:IPromptHandler = params.handlers[i];
            if(handler.text == null) handler.text = handler.data;
            if(handler.buttonType == null) handler.buttonType = ButtonType.normal;
        }
        prompt.update(params);
        // 显示并返回弹窗
        return this.pop(prompt);
    }

    /**
     * 显示警告窗口（只有一个确定按钮）
     * 
     * @param {(string|IPromptParams)} msgOrParams 要显示的文本，或者弹窗数据
     * @param {()=>void} [okHandler] 确定按钮点击回调
     * @returns {IPanel} 返回被显示的弹窗
     * @memberof PanelManager
     */
    public alert(msgOrParams:string|IPromptParams, okHandler?:()=>void):IPanel
    {
        var params:IPromptParams;
        if(typeof msgOrParams == "string")
        {
            params = {msg: msgOrParams};
        }
        else
        {
            params = msgOrParams;
        }
        params.handlers = [
            {data:"确定", handler:okHandler, buttonType:ButtonType.important}
        ];
        return this.prompt(params);
    }

    /**
     * 显示确认窗口（有一个确定按钮和一个取消按钮）
     * 
     * @param {(string|IPromptParams)} msgOrParams 要显示的文本，或者弹窗数据
     * @param {()=>void} [okHandler] 确定按钮点击回调
     * @param {()=>void} [cancelHandler] 取消按钮点击回调
     * @returns {IPanel} 返回被显示的弹窗
     * @memberof PanelManager
     */
    public confirm(msgOrParams:string|IPromptParams, okHandler?:()=>void, cancelHandler? :()=>void):IPanel
    {
        var params:IPromptParams;
        if(typeof msgOrParams == "string")
        {
            params = {msg: msgOrParams};
        }
        else
        {
            params = msgOrParams;
        }
        params.handlers = [
            {data:"取消", handler:cancelHandler, buttonType:ButtonType.normal},
            {data:"确定", handler:okHandler, buttonType:ButtonType.important}
        ];
        return this.prompt(params);
    }
}
/** 再额外导出一个单例 */
export const panelManager:PanelManager = core.getInject(PanelManager)