
#
# ScoreBase #
## ScoreObject => 计分板对象 : ScoreboardObjective : Object
## ScoreName => 计分板对象标识符 : ScoreboardObjective.id : string
## ScoreDisplayerName => 计分板对象显示名称 : ScoreboardObjective.displayerName : string
## PlayerName => 玩家/虚拟玩家名称 ： Player.name : string
## 


|Name|return|Example|解释|TODO|
|----|------|-------|----|------|
|获取计分板对象|ScoreObject \| Array\<ScoreObject\>|`GetObject(ScoreName)`<br>`GetObject()`*※留空*|`返回指定名称（ObjectName，不是指displayName）的`*对象*`，留空则返回一个包含所有计分板对象的`*数组*|YES
|获取计分板对象全体成员列表|Array\<ScoreboardIdentity\>|`GetPartic(ScoreObject)`<br>`GetPartic()`*※留空*|`返回指定计分板对象的成员（ScoreboardIdentity），留空则返回一个包含所有计分板对象`*成员*`的数组`|YES
|获取指定计分板对象的指定玩家的分数|number|`GetPoints( ScoreObject \| ScoreName, PlayerName)`|`第一参数可为 计分板对象 或 计分板标识符,第二参数为 玩家名称。返回一个整数表示的分数`|YES
|判断一个指定名称的计分板对象是否存在,存在则返回这个计分板对象|undefined \| ScoreObject|`AssScoreObject(ScoreName)`|`传入计分板标识符，判断是否存在，不存在则返回undefined，存在则返回这个计分板对象`|YES
|判断一个指定名称的计分板成员是否存在,存在则返回这个计分板成员对象|undefined \| ScoreboardIdentity|`AssPartic(PlayerName)`|`传入计分板成员标识符，判断是否存在，不存在则返回undefined，存在则返回这个成员对象`|YES
|删除一个计分板对象(异步版本)|Promise\<CommandResult\>|`DelObjectAsync( ScoreObject \| ScoreName)`|`删除一个指定的计分板对象，异步版本，可传入计分板对象或计分板标识符，返回一个Promise，不懂得可以不理睬`|YES
|创建一个计分板对象(异步版本)|Promise\<CommandResult\>|`NewObjectAsync( ScoreName, ScoreDisplayerName)`|`创建一个指定标识符和显示名称的计分板对象，异步版本，返回一个Promise，不懂得可以不理睬`|YES
|删除一个计分板对象(非异步版本)|undefined|`DelObjectAsync( ScoreObject \| ScoreName)`|`删除一个指定的计分板对象，非异步版本，可传入计分板对象或计分板标识符无返回值`|YES
|创建一个计分板对象(非异步版本)|undefined|`NewObject( ScoreName, ScoreDisplayerName,?(可选,计分板类型，不填默认dummy) Default:"dummy")`|`创建一个指定标识符和显示名称的计`|YES
|展示或隐藏指定区域的展示内容|undefined|`DisObject( number \| ['list','sidebar','belowname'],?(可选，计分板标识符) ScoreName,?(可选,排列类型，不填默认ascending) Default:"ascending")`|`第一个参数为展示区域，可以传入指定区域的名称，或传入0~2的整数，代指['list','sidebar','belowname']。第二个参数传入计分板标识，可选，留空则隐藏此区域计分板，第三个参数可选，设置排列方式，传入['ascending','descending']其一，或0~1的整数`|YES



    GetObject: GetScoreObject,
    GetPartic: GetScorePartic,
    GetPoints: GetScorePoints,
    AssObject: AssScoreObject,
    AssPartic: AssScorePartic,
    DelObjectAsync: DelScoreObjectAsync,
    NewObjectAsync: NewScoreObjectAsync,
    DelObject: DelScoreObject,
    NewObject: NewScoreObject,
    DisObject: DisScoreObject,
    AddPointsAsync: AddScorePointsAsync,
    SetPointsAsync: SetScorePointsAsync,
    AddPoints: AddScorePoints,
    SetPoints: SetScorePoints,
