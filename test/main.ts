/// <reference path="../dist/Olympus.d.ts"/>

import Core, {core} from "core/Core"
import IMessage from "core/message/IMessage"
import View from "view/View"
import Explorer from "env/explorer/Explorer"
import Query from "env/query/Query"
import External from "env/external/External"
import Hash from "env/hash/Hash"
import PopupManager from "engine/popup/PopupManager"
import System from "engine/system/System"

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-08-31
 * @modify date 2017-09-01
 * 
 * 测试项目
*/
core.listen("fuck", handler, "this");

core.dispatch("fuck");

function handler(msg:IMessage):void
{
    core.unlisten("fuck", handler, this);
}


@Injectable
class Fuck
{
    @Inject(Core)
    public core:Core;
}

class Fuck2
{
    @Inject(Fuck)
    public fuck:Fuck;

    @Inject(Core)
    public core:Core;

    @Inject(View)
    public view:View

    @Inject(Explorer)
    public explorer:Explorer;

    @Inject(Query)
    public query:Query;

    @Inject(External)
    public external:External;

    @Inject(Hash)
    public hash:Hash;

    @Inject(PopupManager)
    public popupManager:PopupManager;

    @Inject(System)
    public system:System;
}

var fuck2:Fuck2 = new Fuck2();
window["fuck2"] = fuck2;
window["Fuck2"] = Fuck2;
console.log(fuck2);