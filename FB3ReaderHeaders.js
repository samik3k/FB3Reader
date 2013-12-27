/// <reference path="Reader/FB3ReaderHead.ts" />
/// <reference path="Site/FB3ReaderSiteHead.ts" />
/// <reference path="DOM/FB3DOMHead.ts" />
/// <reference path="DataProvider/FB3DataProviderHead.ts" />
/// <reference path="Bookmarks/FB3BookmarksHead.ts" />
var Profiler = {};
function ProfileIn(Procedure) {
    if (!this.Profiler[Procedure]) {
        this.Profiler[Procedure] = { time: new Date(), deep: 1 };
    } else {
        this.Profiler[Procedure].deep++;
    }
    //	console.log(Array(this.Profiler[Procedure].deep + 1).join('>') + ' ' + Procedure);
}
function ProfileOut(Procedure) {
    var EndTime = new Date();

    //	console.log(Array(this.Profiler[Procedure].deep + 1).join('<') + ' ' + Procedure + " (" + (EndTime - this.Profiler[Procedure].time) + ')');
    this.Profiler[Procedure].deep--;
    if (!Profiler[Procedure].deep) {
        this.Profiler[Procedure] = null;
    }
}
//# sourceMappingURL=FB3ReaderHeaders.js.map
