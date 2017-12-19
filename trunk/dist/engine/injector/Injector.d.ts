import { IResponseDataConstructor } from "../net/ResponseData";
import IModuleConstructor from "../module/IModuleConstructor";
import "reflect-metadata";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-19
 * @modify date 2017-09-19
 *
 * 负责注入的模块
*/
/** 定义数据模型，支持实例注入，并且自身也会被注入 */
export declare function ModelClass(...args: any[]): any;
/** 定义界面中介者，支持实例注入，并可根据所赋显示对象自动调整所使用的表现层桥 */
export declare function MediatorClass(cls: IConstructor): IConstructor;
/** 定义模块，支持实例注入 */
export declare function ModuleClass(cls: IModuleConstructor): IConstructor;
/** 处理消息 */
export declare function MessageHandler(prototype: any, propertyKey: string): void;
export declare function MessageHandler(type: string): MethodDecorator;
/** 处理全局消息 */
export declare function GlobalMessageHandler(prototype: any, propertyKey: string): void;
export declare function GlobalMessageHandler(type: string): MethodDecorator;
/** 处理通讯消息返回 */
export declare function ResponseHandler(prototype: any, propertyKey: string): void;
export declare function ResponseHandler(cls: IResponseDataConstructor): MethodDecorator;
/** 处理全局通讯消息返回 */
export declare function GlobalResponseHandler(prototype: any, propertyKey: string): void;
export declare function GlobalResponseHandler(cls: IResponseDataConstructor): MethodDecorator;
/** 在Module内托管Mediator */
export declare function DelegateMediator(prototype: any, propertyKey: string): any;
/**
 * 一次绑定多个属性
 *
 * @export
 * @param {{[path:string]:any}} uiDict ui属性路径和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindValue(uiDict: {
    [path: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定一个属性
 *
 * @export
 * @param {string} path ui属性路径
 * @param {string} exp 表达式
 * @returns {PropertyDecorator}
 */
export declare function BindValue(path: string, exp: string): PropertyDecorator;
export interface BindFuncDict {
    [path: string]: string[] | string | undefined | BindFuncDict;
}
/**
 * 一次绑定多个方法
 *
 * @export
 * @param {BindFuncDict} funcDict ui方法和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindFunc(funcDict: BindFuncDict): PropertyDecorator;
/**
 * 一次绑定一个方法
 *
 * @export
 * @param {string} path ui方法路径
 * @param {string[]|string} [exp] 参数表达式或参数表达式数组
 * @returns {PropertyDecorator}
 */
export declare function BindFunc(path: string, exp?: string[] | string): PropertyDecorator;
/**
 * 一次绑定多个事件
 *
 * @export
 * @param {{[type:string]:any}} evtDict 事件类型和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindOn(evtDict: {
    [type: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定一个事件
 *
 * @export
 * @param {string} type 事件类型
 * @param {string} exp 表达式
 * @returns {PropertyDecorator}
 */
export declare function BindOn(type: string, exp: string): PropertyDecorator;
/**
 * 为指定对象一次绑定一个事件
 *
 * @export
 * @param {string} path ui属性路径
 * @param {string} type 事件类型
 * @param {string} exp 表达式
 * @returns {PropertyDecorator}
 */
export declare function BindOn(path: string, type: string, exp: string): PropertyDecorator;
/**
 * 一次绑定多个显示判断
 *
 * @export
 * @param {{[path:string]:any}} uiDict ui属性路径和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindIf(uiDict: {
    [path: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定一个显示判断
 *
 * @export
 * @param {string} path ui属性路径
 * @param {string} exp 表达式
 * @returns {PropertyDecorator}
 */
export declare function BindIf(path: string, exp: string): PropertyDecorator;
/**
 * 绑定当前显示对象的显示判断
 *
 * @export
 * @param {string} exp 表达式
 * @returns {PropertyDecorator}
 */
export declare function BindIf(exp: string): PropertyDecorator;
/**
 * 一次绑定多个数据集合，如果要指定当前显示对象请使用$target作为key
 *
 * @export
 * @param {{[name:string]:any}} uiDict ui属性和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindFor(uiDict: {
    [name: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定一个数据集合
 *
 * @export
 * @param {string} name ui属性名称
 * @param {string} exp 表达式
 * @returns {PropertyDecorator}
 */
export declare function BindFor(name: string, exp: string): PropertyDecorator;
/**
 * 绑定数据集合到当前显示对象
 *
 * @export
 * @param {string} exp 遍历表达式，形如："a in b"（a遍历b的key）或"a of b"（a遍历b的value）
 * @returns {PropertyDecorator}
 */
export declare function BindFor(exp: string): PropertyDecorator;
/**
 * 一次绑定多个消息
 *
 * @export
 * @param {{[type:string]:{[name:string]:any}}} msgDict 消息类型和ui表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindMessage(msgDict: {
    [type: string]: {
        [name: string]: any;
    };
}): PropertyDecorator;
/**
 * 一次绑定一个消息
 *
 * @export
 * @param {IConstructor|string} type 消息类型或消息类型名称
 * @param {string} uiDict ui表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindMessage(type: IConstructor | string, uiDict: {
    [name: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定多个全局消息
 *
 * @export
 * @param {{[type:string]:{[name:string]:any}}} msgDict 消息类型和ui表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindGlobalMessage(msgDict: {
    [type: string]: {
        [name: string]: any;
    };
}): PropertyDecorator;
/**
 * 一次绑定一个全局消息
 *
 * @export
 * @param {IConstructor|string} type 消息类型或消息类型名称
 * @param {string} uiDict ui表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindGlobalMessage(type: IConstructor | string, uiDict: {
    [name: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定多个通讯消息
 *
 * @export
 * @param {{[type:string]:{[name:string]:any}}} resDict 通讯消息类型和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindResponse(resDict: {
    [type: string]: {
        [name: string]: any;
    };
}): PropertyDecorator;
/**
 * 一次绑定一个通讯消息
 *
 * @export
 * @param {IResponseDataConstructor|string} type 通讯消息类型或通讯消息类型名称
 * @param {string} uiDict ui表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindResponse(type: IResponseDataConstructor | string, uiDict: {
    [name: string]: any;
}): PropertyDecorator;
/**
 * 一次绑定多个全局通讯消息
 *
 * @export
 * @param {{[type:string]:{[name:string]:any}}} resDict 通讯消息类型和表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindGlobalResponse(resDict: {
    [type: string]: {
        [name: string]: any;
    };
}): PropertyDecorator;
/**
 * 一次绑定一个全局通讯消息
 *
 * @export
 * @param {IResponseDataConstructor|string} type 通讯消息类型或通讯消息类型名称
 * @param {string} uiDict ui表达式字典
 * @returns {PropertyDecorator}
 */
export declare function BindGlobalResponse(type: IResponseDataConstructor | string, uiDict: {
    [name: string]: any;
}): PropertyDecorator;
