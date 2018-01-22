# Olympus

#### 定位
一个层级分明、简单易用，让新人也能写出高健壮性、高可扩展性、高可维护性项目的综合性前端单页应用开发框架

#### 开发语言
TypeScript

#### 核心架构
MVC（整体架构）/MVVM（界面内数据绑定）

#### 多核通讯和解耦
采用观察者模式，利用一个全局唯一的消息内核进行模块间通讯，解耦模块间依赖。同时每个模块拥有一个私有的消息内核，用于派发模块内消息，模块内消息会被转发给全局内核，但全局消息不会被转发给模块内核。

请看[多核本地消息](./message.md)章节

#### 表现层结构
使用桥接模式拆分接口与实现，达到一套核心驱动多套表现层的目的（目前支持DOM、Egret两种表现层），同时支持表现层的未来可扩展性

请看[表现层桥](./bridge.md)章节

#### 依赖注入
为了防止开发者随意获取他人模块的引用导致增加耦合，Olympus一定程度上禁止了模块对外界暴露结构，以及获取他人引用的能力。但通过依赖注入可以有效地通过低耦合的方式获取引用，一般用于获取数据层Model对象

请看[依赖注入](./injection.md)章节

#### 数据绑定
你可以使用传统的方式开发界面，但Olympus提供的MVVM数据绑定可以帮你极大提升效率，减少代码量，降低耦合。如果你会用Vue，那么你也会用Olympus的数据绑定功能

请看[数据绑定](./bindings.md)章节

#### 其他值得说的
1. 业务模块高度封装，尝试将开发代码量降到最低；
2. 极大简化各系统复杂度，极大降低上手难度。